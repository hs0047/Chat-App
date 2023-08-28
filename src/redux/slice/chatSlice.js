import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_URL, FETCH_CHAT_HISTORY } from "../Urls";

const INITIAL_STATE = {
  isLoading: false,
  data: undefined,
  isError: undefined,
  chatHistory: undefined,
  isHistoryLoading: undefined,
  selectedChatHistory: undefined
}
export const sendChat = createAsyncThunk("SEND_CHAT", async (data) => {
  try {
    const response = await axios.post(CHAT_URL, {
      chatData: data,
    });
    // If you want to get something back
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const fetchHistory = createAsyncThunk("FETCH_CHAT_HISTORY", async (data) => {
  try {
    const response = await axios.post(FETCH_CHAT_HISTORY, {
      id: data
    });
    // If you want to get something back
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const setCurrentChatHistory = createAsyncThunk("SET_CHAT_HISTORY", async (data) => {
  return data
});

export const clearChat = createAsyncThunk("CLEAR_CHAT");

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(sendChat.pending, (state, action) => {
      state.isLoading = true;
      state.data = undefined;
    });
    builder.addCase(sendChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(sendChat.rejected, (state, action) => {
      state.isLoading = false;
      state.data = undefined;
    });
    builder.addCase(fetchHistory.pending, (state, action) => {
      state.isHistoryLoading = true;
      state.chatHistory = undefined;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.isHistoryLoading = false;
      state.chatHistory = action.payload;
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.isHistoryLoading = false;
      state.chatHistory = undefined;
    });
    builder.addCase(setCurrentChatHistory.fulfilled, (state, action) => {
      state.selectedChatHistory = action.payload;
    });
    builder.addCase(clearChat.pending, (state, action) => {
      state.isLoading = false;
      state.selectedChatHistory = undefined;
      state.data = undefined;
    });
  },
});

export default chatSlice.reducer;
