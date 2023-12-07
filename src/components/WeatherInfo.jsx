import React from 'react';
import './Weather.css';

const WeatherInfo = ({ children }) => {
  // Generate a random color
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

  // Apply the random color to the style
  const style = {
    color: randomColor,
    fontFamily: 'Arial, Helvetica, sans-serif',
    textAlign: 'center',
    padding: '5px',
    marginBottom: '20px',
    fontSize: '20px',
  };

  return <p style={style}>{children}</p>;
};

export default WeatherInfo;