import { useEffect, useState } from 'react';

import { fetchRidingWeather } from '../api/weather';
import type { RidingWeather } from '../types';

export function useRidingWeather() {
  const [weather, setWeather] = useState<RidingWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRidingWeather(controller.signal);

        if (!controller.signal.aborted) {
          setWeather(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Unable to load weather conditions.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => controller.abort();
  }, []);

  return { weather, loading, error };
}