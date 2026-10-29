'use client';
import { useEffect, useState } from 'react';
import type { Weather } from '@/lib/types';

const labels: Record<number, string> = { 0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain', 71: 'Light snow', 80: 'Rain showers', 95: 'Thunderstorm' };
export function WeatherCard() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/weather');
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load weather.');
      setWeather(result.data);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load weather.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  return <section className="weather-card" aria-labelledby="weather-heading">
    <div><p className="eyebrow">LIVE API · OPEN-METEO</p><h2 id="weather-heading">Hyderabad weather</h2><p className="muted">Current conditions, refreshed on demand</p></div>
    {loading ? <p role="status">Loading current weather…</p> : error ? <div><p role="alert">{error}</p><button className="button button-secondary" onClick={() => void load()}>Retry</button></div> : weather ? <div className="weather-value"><strong>{weather.temperature}°C</strong><span>{labels[weather.weatherCode] ?? `Weather code ${weather.weatherCode}`}</span><small>Wind {weather.windSpeed} km/h · {weather.time}</small><button className="text-button" onClick={() => void load()}>Refresh weather ↻</button></div> : null}
  </section>;
}
