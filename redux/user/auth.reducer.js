import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api.slice";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    ticket: {},
    pay_status: null,
    attendee_details: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload;
    },
    saveAttendee: (state, { payload }) => {
      state.attendee_details = payload;
    },
    logout: (state, {}) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
      }
    ),
      builder.addMatcher(
        apiSlice.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
        }
      ),
      builder.addMatcher(
        apiSlice.endpoints.getUserTickets.matchFulfilled,
        (state, { payload }) => {
          if (payload.data.length > 0) {
            state.ticket = payload.data[0];
          }
        }
      ),
      builder.addMatcher(
        apiSlice.endpoints.getPayStatus.matchFulfilled,
        (state, { payload }) => {
          state.pay_status = payload.payment_status;
        }
      ),
      builder.addMatcher(
        apiSlice.endpoints.buyTicket.matchFulfilled,
        (state, { payload }) => {
          if (payload.payment_status === "SUCCESSFUL") {
            state.pay_status = payload.payment_status;
          }
        }
      );
  },
});

export const { setCredentials, saveAttendee, logout } = slice.actions;

export default slice.reducer;
