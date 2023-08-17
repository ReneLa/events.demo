import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {} from "../event/event.slice";

// import { Mutex } from "async-mutex";

// const mutex = new Mutex();

// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://summit.ticket.rw/api",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   // wait until the mutex is available without locking it
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);

//   const token = api.getState().auth.token;

//   if (result?.error?.data.status === 401) {
//     // checking whether the mutex is locked
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         const refreshResult = await baseQuery("/refresh", api, extraOptions);
//         console.log("refresh result", refreshResult);
//         if (refreshResult.data) {
//           // api.dispatch();
//           // retry the initial query
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           console.log("refresh failed", token);
//           // api.dispatch();
//         }
//       } finally {
//         // release must be called once the mutex should be released again.
//         release();
//       }
//     } else {
//       // wait until the mutex is available without locking it
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }
//   return result;

//   // let result = await baseQuery(args, api, extraOptions);
//   // console.log(args, api, extraOptions);
//   // if (result?.error?.data.status === 401) {
//   //   console.log("sending refresh token");
//   //   // send refresh token to get new access token
//   //   const refreshResult = await baseQuery("/refresh", api, extraOptions);

//   //   if (refreshResult?.data) {
//   //     // const user = api.getState().auth.user;
//   //     // store the new token
//   //     // api.dispatch(setCredentials(refreshResult.data.token));
//   //     // retry the original query with new access token
//   //     result = await baseQuery(args, api, extraOptions);
//   //   } else {
//   //     // api.dispatch(setCredentials(null));
//   //   }
//   // }
//   // return result;
// };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
//   tagTypes: ["ticket"],
// });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://summit.ticket.rw/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ticket", "tickets"],
  endpoints: (builder) => ({}),
});
