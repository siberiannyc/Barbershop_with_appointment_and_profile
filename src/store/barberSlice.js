import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barber: {
    availableTime: {},
    shop: "Upper East Side",
    reservations: {},
    name: "DAVID",
    innerId: 111,
  },
  barberId: "",
  barberRatingId: "",
  shopBarbers: [],
  freeSlots: [],
  freeSlotsUS: [],
  barbFetched: false,
  barbUpdate: false,
  multiFetched: false,
  isRandom: false,
  isNotRandom: false,
  filterSlots: false,
  timeConfirm: false,
  deleteBarber: false,
  allBarbers: {},
  allBarbersTimes: {},
  daySlots: [],
};

export const barberSlice = createSlice({
  name: "barber",
  initialState,
  reducers: {
    barber(state, action) {
      console.log(`Barber information has changed to: ${action.payload}`);
      state.barber = action.payload;
    },
    barberId(state, action) {
      console.log(`Barber ID has been changed to: ${action.payload}`);
      state.barberId = action.payload;
    },
    barberRatingId(state, action) {
      console.log(`Barber ID for rating has been changed to: ${action.payload}`);
      state.barberRatingId = action.payload;
    },
    shopBarbers(state, action) {
      console.log(`Available barbers changed to: ${action.payload}`);

      state.shopBarbers = action.payload;
    },
    freeSlots(state, action) {
      console.log(`Free slots has changed to: ${action.payload}`);

      state.freeSlots = action.payload;
    },
    freeSlotsUS(state, action) {
      console.log(`Free slots US has changed to: ${action.payload}`);

      state.freeSlotsUS = action.payload;
    },
    barbFetched(state, action) {
      console.log(`Barber fetched: ${action.payload}`);

      state.barbFetched = action.payload;
    },
    barbUpdate(state, action) {
      console.log(`Barber update: ${action.payload}`);

      state.barbUpdate = action.payload;
    },
    deleteBarber(state, action) {
      console.log(`Barber ready to delete: ${action.payload}`);

      state.deleteBarber = action.payload;
    },
    multiFetched(state, action) {
      console.log(`Multi barbers changed: ${action.payload}`);

      state.multiFetched = action.payload;
    },
    isRandom(state, action) {
      console.log(`Any barber: ${action.payload}`);

      state.isRandom = action.payload;
    },
    isNotRandom(state, action) {
      console.log(`Particular barber: ${action.payload}`);

      state.isNotRandom = action.payload;
    },
    filterSlots(state, action) {
      console.log(`Slots are filtered to: ${action.payload}`);

      state.filterSlots = action.payload;
    },
    timeConfirm(state, action) {
      console.log(`The time is confirmed: ${action.payload}`);

      state.timeConfirm = action.payload;
    },
    allBarbers(state, action) {
      console.log(`All barbers are: ${action.payload}`);

      state.allBarbers = action.payload;
    },
    allBarbersTimes(state, action) {
      console.log(`All barbers times are: ${action.payload}`);

      state.allBarbersTimes = action.payload;
    },
    daySlots(state, action) {
      console.log(`Day slots are:${action.payload}`);
      state.daySlots = action.payload;
    },

    resetBarber() {
      return initialState;
    },
    resetBarberChoice() {
      return barber.initialState;
    },
  },
});

export const {
  barber,
  barberId,
  barberRatingId,
  resetBarber,
  shopBarbers,
  freeSlots,
  freeSlotsUS,
  barbFetched,
  barbUpdate,
  multiFetched,
  isRandom,
  isNotRandom,
  allBarbers,
  allBarbersTimes,
  daySlots,
  filterSlots,
  deleteBarber,
  timeConfirm,
  resetBarberChoice,
} = barberSlice.actions;
export default barberSlice.reducer;
