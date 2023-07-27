import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { apiSlice } from "./api/api.slice";
import authReducer from "./user/auth.slice";
import uiReducer from "./ui/ui.slice";
import eventReducer from "./event/event.slice";
import ticketReducer from "./ticket/ticket.slice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import {setupListeners} from '@reduxjs/toolkit/query';

const userTransform = {
  in: (state) => {
    // Extract the token from the user state and persist it separately
    const { token, attendee_details, ...userData } = state;
    return { ...userData };
  },
  out: (state) => {
    // Combine the persisted data with the token in the user state
    const { persistedToken, persistedAttendee, ...userData } = state;
    return {
      ...userData,
      token: persistedToken,
      attendee_details: persistedAttendee,
    };
  },
};

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  ui: uiReducer,
  event: eventReducer,
  ticket: ticketReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(thunk)
      .concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
//.concat(logger)
// enable listener behavior for the store
// setupListeners(store.dispatch);

export const persistor = persistStore(store);
