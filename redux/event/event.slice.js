import {createSlice,createSelector} from '@reduxjs/toolkit';
import {apiSlice} from '../api/api.slice';


const slice = createSlice({
  name: 'event',
  initialState: {
    summit:null, 
  },
  reducers: {},
  extraReducers:(builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getEvent.matchFulfilled,
      (state, { payload }) => {
        state.summit = payload.data;
      }
    )
  },
});

export const eventApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEvent: builder.query({
      query: () => ({
        url: `/show/2/summit`,
        method: 'GET',
      }),
    }),
    getTickets: builder.query({
      query: () => ({
        url: `/list-tickets`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
    useGetEventQuery, useGetTicketsQuery
} = eventApi;

// Selector to get the fetched event
export const selectEvent = createSelector(
  (state) => state.api, // Assuming you have the 'api' reducer from createApi middleware
  (apiState) => {
    const eventData = eventApi.endpoints.getEvent.select()(apiState);
    return eventData.data; // Access the data property of the returned result
  }
);

export default slice.reducer;