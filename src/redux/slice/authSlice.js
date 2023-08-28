// counterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL_2 } from '../Urls';

export const checkAuth = createAsyncThunk("CHECK_AUTH", async () => {
  try {
    const response = await axios.post(LOGIN_URL_2);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const authSlice = createSlice({
  name: 'counter',
  initialState: {
    id: undefined,
    name: undefined,
    email: undefined
  },
  reducers: {
    saveProfile: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email

    },
    clearProfile: (state) => {
      state = {
        id: undefined,
        name: undefined,
        email: undefined
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
      state.data = undefined;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.data = undefined;
    });
  },
});

export const { saveProfile, clearProfile } = authSlice.actions;
export default authSlice.reducer;
