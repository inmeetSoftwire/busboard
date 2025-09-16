import fetchArrivals from '../backend/fetchArrivals';
import { useState } from 'react';
import type { Arrival } from '../backend/Arrival';

function App() {
  const [arrivalsData, setArrivalsData] = useState<Arrival[]>([]);
  const [stopId, setStopId] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  function formatArrivalTime(seconds: number) {
    const minutes = Math.round(seconds / 60);
    if (minutes == 0) {
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
          value={stopId}
          onChange={(e) => setStopId(e.target.value)}
          className="border-2 border-cyan-600 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter a stop ID"
        />
        <button
          onClick={async () => {
            setHasSearched(true);
            const data = await fetchArrivals(stopId);
            if (data) setArrivalsData(data);
          }}
          className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
        {arrivalsData.length > 0 ? (
          <div className="whitespace-pre-wrap text-gray-700 text-sm">
            {arrivalsData.map((arrival, index) => (
              <div className="mb-2 rounded p-2 bg-gray-100" key={index}>
                <div className="text-lg"><strong>{arrival.lineName}</strong> to {arrival.destinationName}</div> <br></br>
                <strong className='text-md'>{formatArrivalTime(arrival.timeToStation)}</strong>
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

  )
}

export default App
