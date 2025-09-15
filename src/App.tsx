import fetchArrivals from '../backend/fetchArrivals';
import { useState } from 'react';

function App() {
  const [arrivalsData, setArrivalsData] = useState<string>();
  const [stopId, setStopId] = useState<string>("");
  return (
    <>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <input value={stopId} onChange={(e) => setStopId(e.target.value)} className="border-2 border-cyan-600 rounded m-4 p-2" placeholder="Enter a stop ID" />
        <div>{arrivalsData}</div>
        <div>
          <button onClick={async () => {
            const data = await fetchArrivals(stopId);
            setArrivalsData(data);
          }}>Click me!</button>
        </div>
      </>
  )
}

export default App
