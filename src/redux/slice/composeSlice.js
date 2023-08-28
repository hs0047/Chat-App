import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMPOSE_MESSAGE_URL } from "../Urls";

export const composeMessage = createAsyncThunk("type/postData", async (data) => {
  try {
    const response = await axios.post(COMPOSE_MESSAGE_URL, {
      chatData: data,
      isComposeMessage: true
    });
    // If you want to get something back
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const clearComposeMessage = createAsyncThunk("CLEAR_COMPOSE_MESSAGE");

const composeSlice = createSlice({
  name: "composeSlice",
  initialState: {
    isLoading: false,
    fomattedData: undefined,
    isError: undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(composeMessage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(composeMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fomattedData = action.payload;
    });
    builder.addCase(composeMessage.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(clearComposeMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fomattedData = undefined
    });
  },
});

export default composeSlice.reducer;
