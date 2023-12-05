import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_WEATHER_API_KEY`);
      const data = await response.json();
      setWeather(data);
    });
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <h3>{weather.weather[0].main}</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
