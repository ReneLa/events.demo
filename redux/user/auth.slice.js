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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data;
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

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      // invalidatesTags: ["ticket"],
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getUserTickets: builder.query({
      query: () => ({
        url: "/list-transactions",
        method: "GET",
      }),
      // providesTags: ["ticket"],
    }),
    getPayStatus: builder.query({
      query: (code) => ({
        url: `/check/${code}/mtn`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    buyTicket: builder.mutation({
      query: (info) => ({
        url: "/make-payment",
        method: "POST",
        body: info,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetUserTicketsQuery,
  useGetUserTicketsQuery,
  useLazyGetPayStatusQuery,
  useBuyTicketMutation,
} = userSlice;

export const { setCredentials, saveAttendee } = slice.actions;

export default slice.reducer;
