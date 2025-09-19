import axios from "axios";
import type { Coordinate } from './types/Coordinate'
// ...existing code...

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? '';

export type WeatherData = {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  name?: string;
};

export async function getWeatherFromCoordinate(coordinate: Coordinate) : Promise<WeatherData | null> {
  const { latitude, longitude } = coordinate;

  if (!API_KEY) {
    console.error('VITE_WEATHER_API_KEY not set');
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const result: WeatherData = {
      weather: (data.weather ?? []).map((w: any) => ({
        description: w.description,
        icon: w.icon
      })),
      main: {
        temp: data.main?.temp,
        feels_like: data.main?.feels_like,
        humidity: data.main?.humidity
      },
      name: data.name
    };

    return result;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}
