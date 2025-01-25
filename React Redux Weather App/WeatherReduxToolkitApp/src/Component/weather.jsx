import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchForecast } from "../Store/Reducers/WeatherSlice";

const Weather = () => {
  const [city, setCity] = useState("Islamabad");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const forecast = useSelector((state) => state.weather.forecast);

  useEffect(() => {
    dispatch(fetchWeather(city));
    dispatch(fetchForecast(city));
  }, [dispatch, city]);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
      dispatch(fetchForecast(city));
    }
  };

  const getWeatherIconUrl = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}.png`;

  console.log(weather)
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Weather App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {weather.status === "loading" && (
          <p className="text-center">Loading...</p>
        )}
        {weather.status === "failed" && (
          <p className="text-center text-red-500">
            {`Error: ${weather.error}`}
          </p>
        )}
        {weather.status === "succeeded" && weather.data && (
          <div className="text-center">
            <h2 className="text-xl font-bold">{weather.data.name}</h2>
            <p className="text-lg">{weather.data.weather[0].description}</p>
            <div className="flex justify-center items-center">
              <img
                src={getWeatherIconUrl(weather.data.weather[0].icon)}
                alt={weather.data.weather[0].description}
                className="w-12 h-12"
              />
              <p className="text-4xl font-bold">{weather.data.main.temp}°C</p>
            </div>
          </div>
        )}
        {forecast.status === "succeeded" && forecast.data && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">5-Day Forecast:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {forecast.data.list.slice(0, 5).map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="text-center">
                    <p className="text-sm">
                      {new Date(item.dt * 1000).toLocaleDateString()}
                    </p>
                    <img
                      src={getWeatherIconUrl(item.weather[0].icon)}
                      alt={item.weather[0].description}
                      className="w-12 h-12 mx-auto"
                    />
                    <p className="text-md font-bold">
                      {item.weather[0].description}
                    </p>
                    <p className="text-xl font-semibold">{item.main.temp}°C</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
