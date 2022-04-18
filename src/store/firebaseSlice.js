import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedOut: false,
  isFetched: false,
  isSubmitted: false,
  systemMessage: "",
  careers: null,
  careerCard: null,
};

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    isLoggedOut(state, action) {
      console.log(`Logged out status changed to: ${action.payload}`);

      state.isLoggedOut = action.payload;
    },
    isFetched(state, action) {
      console.log(`isFetched is ${action.payload}`);
      state.isFetched = action.payload;
    },
    isSubmitted(state, action) {
      console.log(`isSubmitted status changed to: ${action.payload}`);

      state.isSubmitted = action.payload;
    },

    systemMessage(state, action) {
      console.log(`The error is: ${action.payload}`);
      state.systemMessage = action.payload;
    },
    careers(state, action) {
      console.log(`The careers are: ${action.payload}`);
      state.careers = action.payload;
    },
    careerCard(state, action) {
      state.careerCard = action.payload;
    },

    resetFirebase() {
      return initialState;
    },
  },
});

export const {
  isLoggedOut,
  isFetched,
  isSubmitted,
  resetFirebase,
  systemMessage,
  careers,
  careerCard,
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
