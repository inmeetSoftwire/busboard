import React from "react";
import type { StopPoint } from "../../backend/types/StopPoint";
import type { StopArrivals } from "../../backend/types/StopArrivals";
import ArrivalListItem from "./ArrivalListItem";

interface StopArrivalsContainerProps {
    stopPoint: StopPoint;
    stopIndex: number;
    arrivalsByStopId: StopArrivals[];
}

export default function StopArrivalsContainer({stopPoint, stopIndex, arrivalsByStopId} : StopArrivalsContainerProps) : React.JSX.Element {
  return (
    <div key={stopIndex} className="mb-4">
      <h3 className="text-xl font-semibold mb-2 text-center text-cyan-700">
        {stopPoint.commonName} (Stop {stopPoint.stopLetter})
      </h3>
      {(arrivalsByStopId.find(a => a.stopId === stopPoint.id)?.arrivals || []).map((arrival, arrivalIndex) =>
        <ArrivalListItem arrival={arrival} arrivalIndex={arrivalIndex}></ArrivalListItem>  
      )}
    </div>
  );
}
