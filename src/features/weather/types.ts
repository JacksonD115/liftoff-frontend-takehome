export type RidingWeather = {
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
    time: string;
};
  
export type RidingAssessment = {
    label: string;
    description: string;
    status: 'good' | 'fair' | 'poor';
};