import axios from 'axios';
import type { StopPoint } from './types/StopPoint';
import type { Coordinate } from './types/Coordinate';

async function getCoordinateFromPostcode(postcode: string) : Promise<Coordinate | null> {
    const API_URL = `https://api.postcodes.io/postcodes/${postcode}`;
    try {
        const response = await axios.get<{result: Coordinate}>(API_URL);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}

async function getStopPointsFromCoordinate(coordinate: Coordinate) : Promise<StopPoint[] | null> {
    const { latitude: lat, longitude: long } = coordinate;
    const API_URL = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram`;
    try {
        const response = await axios.get(API_URL);
        return response.data.stopPoints as StopPoint[];
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}

export async function getStopPointsFromPostcode(postcode: string) : Promise<StopPoint[] | null> {
    const coordinate: Coordinate | null = await getCoordinateFromPostcode(postcode);
    const stopPoints = coordinate ? await getStopPointsFromCoordinate(coordinate) : null;
    if (!stopPoints) {
        return null;
    }
    return stopPoints;
}
