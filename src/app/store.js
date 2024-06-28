// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../features/registration/registrationSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    // Add other reducers here as your app grows
  },
});