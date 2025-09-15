import axios from 'axios';

async function getLatLongFromPostcode(postcode: string) {
    const API_URL = `https://api.postcodes.io/postcodes/${postcode}`;
    try {
        const response = await axios.get(API_URL);
        console.log(JSON.stringify(response.data));
        return response.data.result as { latitude: number; longitude: number };
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}

async function getStopPointsFromLatLong(lat: number, long: number) {
    const API_URL = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram`;
    try {
        const response = await axios.get(API_URL);
        return response.data.stopPoints as { id: string; commonName: string, indicator: string, distance: number}[];
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}

export async function getStopPointsFromPostcode(postcode: string) {
    const latlong = await getLatLongFromPostcode(postcode);
    const stopPoints = await getStopPointsFromLatLong(latlong?.latitude!, latlong?.longitude!);
    const nearestTwoStopPoints = stopPoints?.sort((a, b) => a.distance! - b.distance!).slice(0, 2);
    return nearestTwoStopPoints;
}