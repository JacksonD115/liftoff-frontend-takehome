import {
    CloudRain,
    CloudSun,
    Thermometer,
    Wind,
} from 'lucide-react-native';
import { ActivityIndicator, Text, View } from 'react-native';

import { assessRidingWeather } from '../api/weather';
import type { RidingWeather } from '../types';

type Props = {
    weather: RidingWeather | null;
    loading: boolean;
    error: string | null;
};

export function RidingWeatherPanel({
    weather,
    loading,
    error,
}: Props) {
    if (loading) {
        return (
          <View className="items-center rounded-2xl bg-surface p-5">
            <ActivityIndicator color="#36B9F4" />
            <Text className="mt-2 text-xs text-gray-400">
              Checking riding conditions...
            </Text>
          </View>
        );
      }
    
      if (error || !weather) {
        return (
          <View className="rounded-2xl bg-surface p-4">
            <Text className="text-xs text-gray-400">
              {error || 'Weather unavailable.'}
            </Text>
          </View>
        );
      }
    
      const assessment = assessRidingWeather(weather);
    
      const statusColor = {
        good: '#36B9F4',
        fair: '#F5C76C',
        poor: '#EF7777',
      }[assessment.status];
    
      return (
        <View className="gap-4 rounded-2xl bg-surface p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-white">
                Riding Conditions
              </Text>
              <Text className="mt-1 text-xs text-gray-400">
                Toronto · Current weather
              </Text>
            </View>
    
            <CloudSun size={26} color="#36B9F4" />
          </View>
    
          <View className="flex-row items-center gap-4">
            <Text className="text-3xl font-bold text-white">
              {Math.round(weather.temperature)}°C
            </Text>
    
            <View className="flex-1">
              <Text
                className="text-xs font-semibold"
                style={{ color: statusColor }}
              >
                {assessment.label}
              </Text>
    
              <Text className="mt-1 text-xs text-gray-400">
                {assessment.description}
              </Text>
            </View>
          </View>
    
          <View className="h-px bg-white/10" />
    
          <View className="flex-row justify-between">
            <View className="flex-1 items-center gap-2">
              <Thermometer size={18} color="#A8B0C0" />
              <Text className="text-[10px] text-gray-400">
                Feels like
              </Text>
              <Text className="text-xs text-white">
                {Math.round(weather.feelsLike)}°C
              </Text>
            </View>
    
            <View className="flex-1 items-center gap-2">
              <Wind size={18} color="#A8B0C0" />
              <Text className="text-[10px] text-gray-400">
                Wind
              </Text>
              <Text className="text-xs text-white">
                {Math.round(weather.windSpeed)} km/h
              </Text>
            </View>
    
            <View className="flex-1 items-center gap-2">
              <CloudRain size={18} color="#A8B0C0" />
              <Text className="text-[10px] text-gray-400">
                Rain
              </Text>
              <Text className="text-xs text-white">
                {weather.precipitation.toFixed(1)} mm
              </Text>
            </View>
          </View>
    
          <Text className="text-center text-[10px] text-gray-500">
            Weather data: Open-Meteo
          </Text>
        </View>
    );
}