import axios from 'axios';



async function fetchArrivals(stopId: string) {
    const API_URL = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`;
    try {
        const response = await axios.get(API_URL);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error('Error fetching arrivals:', error);
    }
}


export default fetchArrivals;