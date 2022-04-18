import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: false,
  activeLoader: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addService(state, action) {
            console.log(`AddService status changed to: ${action.payload}`);

      state.modalState = true;
    },
    noService(state, action) {
            console.log(`noService status changed to: ${action.payload}`);

      state.modalState = false;
    },
    activeLoader(state, action) {
        console.log(`Loader is active: ${action.payload}`);
      state.activeLoader = action.payload;
    },
  },
});

export const { addService, noService, activeLoader } = modalSlice.actions;
export default modalSlice.reducer;
