import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerData: {},
  avatarColor: "",
  appBarbers: [],
  isUpdated: false,
  lastVisit: {},
  nextVisit: {},
  daysSinceLast: 0,
  success: false,
  emailSuccess: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerData(state, action) {
      console.log(`Customer is: ${action.payload}`);

      state.customerData = action.payload;
    },
    avatarColor(state, action) {
      console.log(`Avatar color has changed to: ${action.payload}`);

      state.avatarColor = action.payload;
    },
    appBarbers(state, action) {
      console.log(`App barbers are: ${action.payload}`);

      state.appBarbers = action.payload;
    },
    isUpdated(state, action) {
      console.log(`Customer update switched to to: ${action.payload}`);

      state.isUpdated = action.payload;
    },
    lastVisit(state, action) {
      console.log(`Last visit: ${action.payload}`);

      state.lastVisit = action.payload;
    },
    nextVisit(state, action) {
      console.log(`Next visit: ${action.payload}`);

      state.nextVisit = action.payload;
    },
    daysSinceLast(state, action) {
      console.log(`Days since last visit: ${action.payload}`);

      state.daysSinceLast = action.payload;
    },
    success(state, action) {
      state.success = action.payload;
    },
    emailSuccess(state, action) {
      state.emailSuccess = action.payload;
    },
    resetCustomer() {
      return initialState;
    },
  },
});

export const {
  customerData,
  resetCustomer,
  isUpdated,
  avatarColor,
  appBarbers,
  lastVisit,
  nextVisit,
  daysSinceLast,
  success,
  emailSuccess,
} = customerSlice.actions;
export default customerSlice.reducer;
