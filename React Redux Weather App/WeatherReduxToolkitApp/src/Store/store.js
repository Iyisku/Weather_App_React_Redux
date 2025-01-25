import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Reducers/WeatherSlice';

export const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });