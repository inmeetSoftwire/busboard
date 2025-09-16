import axios from 'axios';
import type { Arrival } from './Arrival';

async function fetchArrivals(stopId: string) {
    const TFL_API_KEY = import.meta.env.TFL_API_KEY;
    const API_URL = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?api_key=${TFL_API_KEY}`;
    try {
        const response = await axios.get<Arrival[]>(API_URL);
        const data = response.data;
        const sortedAndSlicedData = data?.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
        return sortedAndSlicedData;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}


export default fetchArrivals;