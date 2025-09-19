import { type WeatherData } from "../../backend/weatherService";
// ...existing code...

interface WeatherContainerProps {
  weatherData: WeatherData | null;
}

export default function WeatherContainer({ weatherData } : WeatherContainerProps) {
  if (!weatherData) {
    return <div className="text-sm text-gray-500">Weather unavailable</div>;
  }

  const primary = weatherData.weather?.[0];
  const iconUrl = primary?.icon ? `https://openweathermap.org/img/wn/${primary.icon}@2x.png` : undefined;

  return (
    <div className="flex items-center space-x-3 w-fit max-w-xl bg-white shadow-md rounded-lg p-4 mb-4">
      {iconUrl && <img src={iconUrl} alt={primary.description} className="w-16 h-16" />}
      <div>
        <div className="text-xl font-semibold text-cyan-600">
          {Math.round(weatherData.main.temp)}°C
        </div>
        <div className="text-lg capitalize text-cyan-600">
          {primary?.description ?? "No description"}
        </div>
        <div className="text-md text-gray-400">
          Feels like {Math.round(weatherData.main.feels_like)}°C · Humidity {weatherData.main.humidity}%
        </div>
      </div>
    </div>
  );
}