import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servCat: "HAIRCUT",
  services: [],
  serviceTime: [],
  finishTime: "",
  totalTime: 0,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    serviceCategory(state, action) {
      console.log(`Service category is changed to ${action.payload}`);
      state.servCat = action.payload;
    },
    services(state, action) {
        console.log(`services changed to: ${action.payload}`);
      state.services = action.payload;
    },
    serviceTime(state, action) {
        console.log(`service time changed to: ${action.payload}`);
      state.serviceTime = action.payload;
    },
    totalTime(state, action) {
        console.log(`Total service time changed to: ${action.payload}`);
      state.totalTime = action.payload;
    },
    finishTime(state, action) {
        console.log(`Finish time changed to: ${action.payload}`);
      state.finishTime = action.payload;
    },
    resetServices() {
      return initialState;
    },
  },
});

export const {
  serviceCategory,
  services,
  serviceTime,
  finishTime,
  resetServices,
  totalTime,
} = servicesSlice.actions;
export default servicesSlice.reducer;
