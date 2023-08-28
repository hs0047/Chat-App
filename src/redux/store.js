import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import chatSlice from "./slice/chatSlice";
import composeSlice from "./slice/composeSlice";

export const store = configureStore({
  reducer: {
    profile: authSlice,
    composeMsg: composeSlice,
    chatMsg: chatSlice,
  },
});
