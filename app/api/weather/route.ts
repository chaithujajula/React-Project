import { NextResponse } from 'next/server';

// Open-Meteo current conditions: free, no API key required. Coordinates default to Hyderabad.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat') ?? '17.3850');
  const lon = Number(searchParams.get('lon') ?? '78.4867');
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ error: 'Provide valid latitude and longitude.' }, { status: 400 });
  }
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(lat));
    url.searchParams.set('longitude', String(lon));
    url.searchParams.set('current', 'temperature_2m,wind_speed_10m,weather_code');
    url.searchParams.set('timezone', 'auto');
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error('Weather provider returned an error.');
    const payload = await response.json();
    return NextResponse.json({ data: {
      temperature: payload.current.temperature_2m,
      windSpeed: payload.current.wind_speed_10m,
      weatherCode: payload.current.weather_code,
      time: payload.current.time,
      units: { temperature: payload.current_units.temperature_2m, windSpeed: payload.current_units.wind_speed_10m }
    } });
  } catch {
    return NextResponse.json({ error: 'Weather is temporarily unavailable. Try again shortly.' }, { status: 502 });
  }
}
