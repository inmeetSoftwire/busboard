import { getNearestStopPointsFromPostcode, getStopArrivalsFromStopPoints, sortAndSliceArrivals } from '../backend/backendService';
import React, { useState } from 'react';
import type { StopPoint } from '../backend/types/StopPoint';
import type { StopArrivals } from '../backend/types/StopArrivals';
import StopArrivalsContainer from './components/StopArrivalsContainer';



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
    const nearestTwoStopPoints = await getNearestStopPointsFromPostcode(postcode, 2);
    if (nearestTwoStopPoints) {
      setStopPoints(nearestTwoStopPoints)
      const stopArrivals = await getStopArrivalsFromStopPoints(nearestTwoStopPoints);
      const sortedAndSlicedArrivals = sortAndSliceArrivals(stopArrivals, 5);
      setArrivalsByStopId(sortedAndSlicedArrivals);
      console.log(sortedAndSlicedArrivals);
    } else {
      setStopPoints([]); // stopPoints is null initially, set to empty array to indicate user has searched at least once
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
                <StopArrivalsContainer stopPoint={stopPoint} stopIndex={stopIndex} arrivalsByStopId={arrivalsByStopId}></StopArrivalsContainer>
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
