import fetchArrivals from '../backend/fetchArrivals';
import { getStopPointsFromPostcode } from '../backend/postcodeService';
import { useState } from 'react';
import type { Arrival } from '../backend/Arrival';

function App() {
  const [arrivalsData, setArrivalsData] = useState<Arrival[][]>([]);
  const [postcode, setPostcode] = useState<string>("");
  const [stopIds, setStopIds] = useState<string[]>([]);

  const [hasSearched, setHasSearched] = useState<boolean>(false);

  function formatArrivalTime(seconds: number) {
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
              const stopPoints = await getStopPointsFromPostcode(postcode);
              setStopIds(stopPoints?.map((s) => s.id) ?? []);
              if (stopIds.length > 0) {
                let arrivals: Arrival[][] = [];
                for (const id of stopIds) {
                  const stopArrivals = await fetchArrivals(id);
                  arrivals.push(stopArrivals ?? []);
                }
                setArrivalsData(arrivals);
              }
            }}
            className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          {arrivalsData.length > 0 ? (
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {arrivalsData.map((arrivalsForStop, stopIndex) => (
                <div key={stopIndex} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-center text-cyan-700">
                    Stop {stopIndex + 1}
                  </h3>
                  {arrivalsForStop.map((arrival, index) => (
                    <div className="mb-2 rounded p-2 bg-gray-100" key={index}>
                      <div className="text-lg">
                        <strong>{arrival.lineName}</strong> to{" "}
                        {arrival.destinationName}
                      </div>
                      <div className="text-md font-semibold">
                        {Math.round(arrival.timeToStation / 60)} mins
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (( hasSearched ) ?
          <p className="text-gray-500 text-center">No arrivals found for this stop ID.</p>
         : (
            <p className="text-gray-500 text-center">
              Enter a stop ID and click Search to see arrivals
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
