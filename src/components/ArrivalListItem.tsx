import React from "react";
import { formatArrivalTime } from "../../utils/timeFormatter";
import type { Arrival } from "../../backend/types/Arrival";

interface ArrivalListItemProps {
    arrival: Arrival;
    arrivalIndex: number;
}

export default function ArrivalListItem({arrival, arrivalIndex} : ArrivalListItemProps) : React.JSX.Element {
  return (
    <div className="mb-2 rounded p-2 bg-gray-100" key={arrivalIndex}>
      <div className="text-lg">
        <strong>{arrival.lineName}</strong> to{" "}
        {arrival.destinationName}
      </div>
      <div className="text-md font-semibold">
        {formatArrivalTime(arrival.timeToStation)}
      </div>
    </div>
  );
}
