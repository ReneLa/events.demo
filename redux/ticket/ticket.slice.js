import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    ticket_type:{}
  },
  reducers: {
    saveTicket:(state,{payload})=>{
      state.ticket_type = payload;
    }
  },
});



export const {saveTicket} = slice.actions;

export default slice.reducer;