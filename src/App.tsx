import { getNearestStopPointsFromPostcode, getStopArrivalsFromStopPoints, sortAndSliceArrivals } from '../backend/backendService';
import React, { useState } from 'react';
import { formatArrivalTime } from '../utils/timeFormatter';
import type { StopPoint } from '../backend/types/StopPoint';
import type { StopArrivals } from '../backend/types/StopArrivals';

function App() : React.JSX.Element {
  const [arrivalsByStopId, setArrivalsByStopId] = useState<StopArrivals[]>([]);
  const [postcode, setPostcode] = useState<string>("");
  const [stopPoints, setStopPoints] = useState<StopPoint[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hasSearched = stopPoints !== null;
  const isArrivalsByStopIdEmpty = arrivalsByStopId.length === 0 ;

  async function retrieveArrivalDataAndUpdateStates() : Promise<void> {
    if (postcode.trim() === "") {
      return;
    }
    setIsLoading(true);
    setStopPoints([]); // stopPoints isLoading && null initially, set to empty array to indicate user has searched at least once
    const nearestTwoStopPoints = await getNearestStopPointsFromPostcode(postcode, 2);
    if (nearestTwoStopPoints) {
      setStopPoints(nearestTwoStopPoints)
      const stopArrivals = await getStopArrivalsFromStopPoints(nearestTwoStopPoints);
      const sortedAndSlicedArrivals = sortAndSliceArrivals(stopArrivals, 5);
      setArrivalsByStopId(sortedAndSlicedArrivals);
      console.log(sortedAndSlicedArrivals);
    } else {
      setArrivalsByStopId([]);
    }
    setIsLoading(false);
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
            onClick={retrieveArrivalDataAndUpdateStates}
            className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          {!isArrivalsByStopIdEmpty && !isLoading && (
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {stopPoints?.map((stopPoint, stopIndex) => (
                <div key={stopIndex} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-center text-cyan-700">
                    {stopPoint.commonName} (Stop {stopPoint.stopLetter})
                  </h3>
                  {(arrivalsByStopId.find(a => a.stopId === stopPoint.id)?.arrivals || []).map((arrival, index) => (
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
          )}
          {isArrivalsByStopIdEmpty && hasSearched && !isLoading && (
            <div className="text-center text-gray-500">
              No arrivals found for this postcode.
            </div>
          )}
          {isArrivalsByStopIdEmpty && !hasSearched && !isLoading && (
            <div className="text-center text-gray-500">
              Enter a postcode and click "Search" to see arrivals.
            </div>
          )}
          {isLoading && (
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-700"></div>
          )}
        </div>
      </div>
    </>
  );
}

export default App
