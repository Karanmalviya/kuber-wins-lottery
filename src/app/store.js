import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import appReducer from "./appReducer";



const store = configureStore({
  reducer: appReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
