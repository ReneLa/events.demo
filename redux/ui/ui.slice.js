import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "auth",
  initialState: {
    formStep: 1,
  },
  reducers: {
    setFormStep: (state, { payload }) => {
      state.formStep = payload;
    },
  },
});

export const { setFormStep } = uiSlice.actions;
export default uiSlice.reducer;
