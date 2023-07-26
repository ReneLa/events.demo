import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {apiSlice} from './api/api.slice';
import authReducer from './user/auth.slice';
import uiReducer from './ui/ui.slice'
import eventReducer from './event/event.slice'
import ticketReducer from './ticket/ticket.slice';
// import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer, 
    ui: uiReducer,
    event:eventReducer, 
    ticket:ticketReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
//.concat(logger)
// enable listener behavior for the store
// setupListeners(store.dispatch);