import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { apiSlice } from "./api/api.slice";
import authReducer from "./user/auth.slice";
import uiReducer from "./ui/ui.slice";
import eventReducer from "./event/event.slice";
import ticketReducer from "./ticket/ticket.slice";

import { persistReducer, persistStore, createTransform } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import {setupListeners} from '@reduxjs/toolkit/query';

const tokenTransform = createTransform(
  (inboundState, key) => ({ token: inboundState.token }),
  (outboundState, key) => ({ token: outboundState.token })
);

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  ui: uiReducer,
  event: eventReducer,
  ticket: ticketReducer,
});

const persistConfig = {
  key: "root_v3",
  storage,
  whitelist: ["auth"],
  transforms: [tokenTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // .concat(logger)
  // .concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

//.concat(logger)
// enable listener behavior for the store
// setupListeners(store.dispatch);

export const persistor = persistStore(store);
