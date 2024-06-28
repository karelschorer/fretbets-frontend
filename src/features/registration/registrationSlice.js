// src/features/registration/registrationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
    'registration/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || 'Registration failed');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearRegistrationStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRegistrationStatus } = registrationSlice.actions;

export default registrationSlice.reducer;