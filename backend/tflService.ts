import axios from 'axios';
import type { Arrival } from './types/Arrival';
import type { Coordinate } from './types/Coordinate';
import type { StopPoint } from './types/StopPoint';
const api_key = import.meta.env.VITE_TFL_API_KEY;

export async function fetchArrivals(stopId: string) : Promise<Arrival[] | null> {
    const API_URL = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?app_key=${api_key}`;
    try {
        const response = await axios.get<Arrival[]>(API_URL);
        const data = response.data;
        const sortedAndSlicedData = data?.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
        return sortedAndSlicedData;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}

export async function getStopPointsFromCoordinate(coordinate: Coordinate) : Promise<StopPoint[] | null> {
    const { latitude: lat, longitude: long } = coordinate;
    const API_URL = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram&app_key=${api_key}`;
    try {
        const response = await axios.get<{stopPoints: StopPoint[]}>(API_URL);
        const stopPoints = response.data.stopPoints;
        return stopPoints;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}

