import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  timePicker: "",
  customDate: "",
  customTime: [],
  daySlots: [],
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    date(state, action) {
            console.log(`Date switched to: ${action.payload}`);

      state.date = action.payload;
    },
    timePicker(state, action) {
            console.log(`Time picker: ${action.payload}`);

      state.timePicker = action.payload;
    },
    customDateChoice(state, action) {
            console.log(`User chose the date: ${action.payload}`);

      state.customDate = action.payload;
    },
    customTimeArr(state, action) {
            console.log(`Appointments slots are: ${action.payload}`);

      state.customTime = action.payload;
    },
    daySlot(state, action) {
      console.log(`Day Slots are fetched ${action.payload}`);
      state.daySlots = action.payload;
    },
    resetDate() {
      return initialState;
    },
  },
});

export const {
  date,
  timePicker,
  customDateChoice,
  customTimeArr,
  resetDate,
  daySlots,
} = dateSlice.actions;
export default dateSlice.reducer;
