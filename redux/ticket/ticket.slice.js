import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api.slice";

const slice = createSlice({
  name: "ticket",
  initialState: {
    ticket_type: {},
    ticket: null,
  },
  reducers: {
    saveTicket: (state, { payload }) => {
      state.ticket_type = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getUserTickets.matchFulfilled,
      (state, { payload }) => {
        if (payload.data.length > 0) {
          state.ticket = payload.data[payload.data.length - 1];
        }
      }
    );
  },
});

const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserTickets: builder.query({
      query: () => ({
        url: "/list-transactions",
        method: "GET",
      }),
      providesTags: ["ticket"],
    }),
  }),
});

export const { useGetUserTicketsQuery } = ticketSlice;

export const { saveTicket } = slice.actions;

export default slice.reducer;
