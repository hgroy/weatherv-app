import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import clear_icon from "../assets/clear.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputref = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if(city === ""){
        alert("enter city name");
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("New York");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder="search city" />
        <img src={search_icon} alt="" onClick =
        {() => search(inputref.current.value)} />
      </div>
      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col1">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
