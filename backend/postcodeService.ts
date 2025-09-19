import axios from 'axios';
import type { Coordinate } from './types/Coordinate';

export async function getCoordinateFromPostcode(postcode: string) : Promise<Coordinate | null> {
    const API_URL = `https://api.postcodes.io/postcodes/${postcode}`;
    try {
        const response = await axios.get<{result: Coordinate}>(API_URL);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
    return null;
}
