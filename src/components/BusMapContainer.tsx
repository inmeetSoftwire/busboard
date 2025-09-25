import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import type { Coordinate } from "../../backend/types/Coordinate";
import type { StopPoint } from "../../backend/types/StopPoint";

interface BusMapContainerProps {
  stopPoints: StopPoint[]
}

export default function BusMapContainer({stopPoints}: BusMapContainerProps) : React.JSX.Element {
  const firstStopPoint: StopPoint | null = stopPoints?.length > 0 ? stopPoints[0] : null;
  const secondStopPoint: StopPoint | null = stopPoints?.length > 1 ? stopPoints[1] : null;

  let mapCenterCoordinate: Coordinate | null = null
  if (firstStopPoint && secondStopPoint) {
    mapCenterCoordinate = {
      latitude: (firstStopPoint.lat + secondStopPoint.lat) / 2,
      longitude: (firstStopPoint.lon + secondStopPoint.lon) / 2
    }
  }
  return (
    <div className="flex flex-1 items-center w-fit max-w-xl bg-white shadow-md rounded-lg p-4 mb-4">
      {mapCenterCoordinate && (
      <MapContainer center={[mapCenterCoordinate.latitude, mapCenterCoordinate.longitude]} zoom={15} style={{height: "400px", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {firstStopPoint && (
          <Marker position={[firstStopPoint.lat, firstStopPoint.lon]}>
            <Popup>
              {firstStopPoint.commonName} ({firstStopPoint.stopLetter})
            </Popup>
          </Marker>
        )}
        {secondStopPoint && (
          <Marker position={[secondStopPoint.lat, secondStopPoint.lon]}>
            <Popup>
              {secondStopPoint.commonName} ({secondStopPoint.stopLetter})
            </Popup>
          </Marker>
        )}
        
      </MapContainer>)}
    </div>
  );
}
