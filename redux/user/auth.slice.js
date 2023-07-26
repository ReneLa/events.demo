import {createSlice} from '@reduxjs/toolkit';
import {apiSlice} from '../api/api.slice';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    newUser:{},
    ticket:{},
    new_register:null,
    pay_status:null
  },
  reducers: {
    setCredentials: (state, {payload}) => {
      state.user = payload;
      state.token = payload.data;
    },
    saveUser:(state,{payload})=>{
      state.newUser = payload;
    }
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
        state.new_register=payload.data;
        state.pay_status=payload.data.payment_status
      }
    ),
    builder.addMatcher(
      apiSlice.endpoints.getUserTickets.matchFulfilled,
      (state, { payload }) => {
        if(payload.data.length>0){
          state.ticket = payload.data[0];
        }
      }
    ),
    builder.addMatcher(
      apiSlice.endpoints.getPayStatus.matchFulfilled,
      (state, { payload }) => {
       //
      }
    )
  },
});

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      loginUser: builder.mutation({
        query: user => ({
          url: '/login',
          method: 'POST',
          body:user  
        }),
        invalidatesTags:['ticket']
      }),
      registerUser: builder.mutation({
        query: user => ({
          url: '/register',
          method: 'POST',
          body: user,
        }),
      }),
      getUserTickets: builder.query({
        query: () => ({
          url: '/list-transactions',
          method: 'GET',
        }),
        providesTags:['ticket']
      }),
      getPayStatus: builder.query({
        query: (code) => ({
          url: `/check/${code}/mtn`,
          method: 'GET',
        }),
        // providesTags:['ticket']
      }),
    }),
  });
  
  export const {
    useLoginUserMutation,
    useRegisterUserMutation, 
   useLazyGetUserTicketsQuery, 
   useGetUserTicketsQuery, 
   useLazyGetPayStatusQuery
  } = userSlice;


export const {setCredentials, saveUser} = slice.actions;

export default slice.reducer;