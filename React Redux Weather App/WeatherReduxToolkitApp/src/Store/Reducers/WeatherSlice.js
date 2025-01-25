import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '382d8a2e62914e252123f21e6612c6b9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Thunk to fetch current weather
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
});

// Thunk to fetch 5-day forecast
export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: {
      data: null,
      status: 'idle',
      error: null,
    },
    forecast: {
      data: null,
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Current Weather
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weather.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.status = 'succeeded';
        state.weather.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weather.status = 'failed';
        state.weather.error = action.error.message;
      });

    // 5-Day Forecast
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.forecast.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast.status = 'succeeded';
        state.forecast.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.forecast.status = 'failed';
        state.forecast.error = action.error.message;
      });
  },
});
export default weatherSlice.reducer;