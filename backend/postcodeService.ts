import axios from 'axios';
import type { StopPoint } from './StopPoint';
import type { Coordinate } from './Coordinate';

async function getLatLongFromPostcode(postcode: string) {
    const API_URL = `https://api.postcodes.io/postcodes/${postcode}`;
    try {
        const response = await axios.get(API_URL);
        return response.data.result as Coordinate;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}

async function getStopPointsFromLatLong(lat: number, long: number) {
    const API_URL = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram`;
    try {
        const response = await axios.get(API_URL);
        return response.data.stopPoints as StopPoint[];
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}

export async function getStopPointsFromPostcode(postcode: string) {
    const latlong: Coordinate | undefined = await getLatLongFromPostcode(postcode);
    const stopPoints = await getStopPointsFromLatLong(latlong?.latitude!, latlong?.longitude!);
    return stopPoints;
}
