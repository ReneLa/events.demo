import {createSlice} from '@reduxjs/toolkit';


const uiSlice = createSlice({
  name: 'auth',
  initialState: {
    formStep:0
  },
  reducers: {
    setFormStep: (state, {payload}) => {
      state.formStep = payload;
    },
  },
});

export const {setFormStep} =uiSlice.actions;
export default uiSlice.reducer;