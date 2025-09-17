import fetchArrivals from '../backend/fetchArrivals';
import { getStopPointsFromPostcode } from '../backend/postcodeService';
import React, { useState } from 'react';
import type { Arrival } from '../backend/Arrival';
import type { StopPoint } from '../backend/StopPoint';

function App() : React.JSX.Element {
  const [arrivalsByStopId, setArrivalsByStopId] = useState<Record<string, Arrival[]>>({});
  const [postcode, setPostcode] = useState<string>("");
  const [stopPoints, setStopPoints] = useState<StopPoint[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  function sortArrivalsAndUpdateRecord(stopId: string, arrivals: Arrival[]) : void {
    const sorted = arrivals.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
    setArrivalsByStopId(prev => ({ ...(prev ?? {}), [stopId]: sorted }));
  }

  function formatArrivalTime(seconds: number) : string {
    const minutes = Math.round(seconds / 60);
    if (minutes === 0) {
      return "Due";
    }
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-cyan-700 m-6 drop-shadow-sm">
          BusBoard
        </h1>

        <div className="flex space-x-2 mb-6">
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="border-2 border-cyan-600 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter a postcode"
          />
          <button
            onClick={async () => {
              setHasSearched(true);
              const stopPointsFromPostcode = await getStopPointsFromPostcode(postcode);
              const nearestTwoStopPoints = stopPointsFromPostcode?.sort((a, b) => a.distance - b.distance).slice(0, 2) ?? [];
              setStopPoints(nearestTwoStopPoints);
              const ids = nearestTwoStopPoints.map(sp => sp.id);
              
              const pairs = await Promise.all(ids.map(async id => [id, (await fetchArrivals(id)) ?? []] as const));
              
              for (const [id, arrivals] of pairs) sortArrivalsAndUpdateRecord(id, arrivals);
            }}
            className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          {Object.keys(arrivalsByStopId).length > 0 ? (
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {stopPoints.map((sp, stopIndex) => (
                <div key={stopIndex} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-center text-cyan-700">
                    {sp.commonName} ({sp.indicator})
                  </h3>
                  {(arrivalsByStopId[sp.id] || []).map((arrival, index) => (
                    <div className="mb-2 rounded p-2 bg-gray-100" key={index}>
                      <div className="text-lg">
                        <strong>{arrival.lineName}</strong> to{" "}
                        {arrival.destinationName}
                      </div>
                      <div className="text-md font-semibold">
                        {formatArrivalTime(arrival.timeToStation)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (( hasSearched ) ?
          <p className="text-gray-500 text-center">No arrivals found for this postcode.</p>
         : (
            <p className="text-gray-500 text-center">
              Enter a postcode and click Search to see arrivals
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
