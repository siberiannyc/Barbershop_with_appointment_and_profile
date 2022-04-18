import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shift: "none",
};

export const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    shift(state, action) {
      state.shift = action.payload;
    },
  },
});

export const { shift } = shiftSlice.actions;
export default shiftSlice.reducer;
