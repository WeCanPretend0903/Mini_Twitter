import React, { useState, useEffect } from 'react';
import './Weather.css';
import { StyledWButton, ButtonContainer, Image } from './Styles';
import { ThreeDots as Loader } from 'react-loader-spinner';
import WeatherInfo from './WeatherInfo';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Array of NYC coordinates
  const nycCoordinates = [
    { lat: 40.7128, lon: -74.0060 }, // Manhattan
    { lat: 40.6782, lon: -73.9442 }, // Brooklyn
    { lat: 40.5795, lon: -74.1502 }, // Staten Island
    { lat: 40.7831, lon: -73.9712 }, // Upper West Side
    { lat: 40.7306, lon: -73.9352 }, // Astoria
    { lat: 40.7394, lon: -73.8779 }, // Elmhurst
    // Add more coordinates as needed
  ];

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Randomly select a coordinate from the array
      const randomCoordinate = nycCoordinates[Math.floor(Math.random() * nycCoordinates.length)];
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=674730b7396b44318ad04255230612&q=${randomCoordinate.lat},${randomCoordinate.lon}`);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className='weather-box'>
      {loading ? (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : weather && weather.location && weather.current ? (
        <div>
          <h1 className='weather-text'>Location: {weather.location.name}</h1>
          <h2 className='weather-text2'>Weather: {weather.current.condition.text}</h2>
          <Image>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
          </Image>
          <p className= "weatherInfo">Description: {weather.current.condition.text}</p>
          <p className= "weatherInfo">Temperature: {weather.current.temp_c}°C</p>
          <p className= "weatherInfo">Feels Like: {weather.current.feelslike_c}°C</p>
          <p className= "weatherInfo">Wind: {weather.current.wind_kph} kph</p>
          <p className= "weatherInfo">Humidity: {weather.current.humidity}%</p>
          <p className= "weatherInfo">Precipitation: {weather.current.precip_mm} mm</p>
          <p className= "weatherInfo">Pressure: {weather.current.pressure_mb} mb</p>
          <p className= "weatherInfo">Visibility: {weather.current.vis_km} km</p>
          <p className= "weatherInfo">UV Index: {weather.current.uv}</p>
          <ButtonContainer>
            <StyledWButton onClick={fetchWeather}>Refresh</StyledWButton>
          </ButtonContainer>
        </div>
      ) : (
        <p>Failed to load weather data.</p>
      )}
    </div>
  );
};

export default Weather;
