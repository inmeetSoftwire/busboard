import axios from 'axios';
import type { Arrival } from './types/Arrival';
import type { Coordinate } from './types/Coordinate';
import type { StopPoint } from './types/StopPoint';
const api_key = import.meta.env.VITE_TFL_API_KEY;
const BASE_URL = 'https://api.tfl.gov.uk';

export async function fetchArrivals(stopId: string) : Promise<Arrival[] | null> {
    const arrivalsUrl = `${BASE_URL}/StopPoint/${stopId}/Arrivals?app_key=${api_key}`;
    try {
        const response = await axios.get<Arrival[]>(arrivalsUrl);
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
    const stopPointsUrl = `${BASE_URL}/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram&app_key=${api_key}`;
    try {
        const response = await axios.get<{stopPoints: StopPoint[]}>(stopPointsUrl);
        const stopPoints = response.data.stopPoints;
        return stopPoints;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}

