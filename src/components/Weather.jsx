import React, { useState, useEffect } from 'react';
import './Weather.css';
const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=674730b7396b44318ad04255230612&q=40.7128,-74.0060`);
      const data = await response.json();
      setWeather(data);
    });
  }, []);

  return (
    <div className='weather-box'>
      {weather && weather.location && weather.current ? (
        <div>
          <h1 className='weather-text'>Location: {weather.location.name}</h1>
          <h2>Weather: {weather.current.condition.text}</h2>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <p>Description: {weather.current.condition.text}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Wind: {weather.current.wind_kph} kph</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;

