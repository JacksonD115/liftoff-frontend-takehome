import type { RidingAssessment, RidingWeather } from "../types";

type WeatherResponse = {
    current: {
        time: string;
        temperature_2m: number;
        apparent_temperature: number;
        wind_speed_10m: number;
        precipitation: number;
        weather_code: number;
    };
};

export async function fetchRidingWeather(
    signal?: AbortSignal
): Promise<RidingWeather> {
    const params = new URLSearchParams({
        // Toronto
        latitude: '43.6532',
        longitude: '-79.3832',
        current: [
          'temperature_2m',
          'apparent_temperature',
          'wind_speed_10m',
          'precipitation',
          'weather_code',
        ].join(','),
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        precipitation_unit: 'mm',
        timezone: 'America/Toronto',
    });

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    const current = data.current;

    if (
        !current ||
        ![
            current.temperature_2m,
            current.apparent_temperature,
            current.wind_speed_10m,
            current.precipitation,
            current.weather_code,
        ].every((value) => Number.isFinite(value))
    ) {
        throw new Error('Invalid weather response');
    }

    return {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        windSpeed: current.wind_speed_10m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        time: current.time,
    };
}

export function assessRidingWeather(
    weather: RidingWeather
  ): RidingAssessment {
    const {
      temperature,
      windSpeed,
      precipitation,
      weatherCode,
    } = weather;
  
    const severeWeather = [
      65, 66, 67,
      75, 77,
      82, 85, 86,
      95, 96, 99,
    ].includes(weatherCode);
  
    if (
      severeWeather ||
      precipitation > 2 ||
      windSpeed > 35 ||
      temperature < 0 ||
      temperature > 35
    ) {
      return {
        label: 'Poor for riding',
        description: 'Conditions may make cycling difficult or unsafe.',
        status: 'poor',
      };
    }
  
    if (
      precipitation > 0 ||
      windSpeed > 20 ||
      temperature < 10 ||
      temperature > 30
    ) {
      return {
        label: 'Fair for riding',
        description: 'Consider the conditions before heading out.',
        status: 'fair',
      };
    }
  
    return {
      label: 'Good for riding',
      description: 'Weather conditions look comfortable for cycling.',
      status: 'good',
    };
}