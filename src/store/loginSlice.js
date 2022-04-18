import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   Initial States here
  snackbar: false,
  userId: "",
  user: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  },
  errors: {
    email: false,
    firstName: false,
    lastName: false,
    phone: false,
    password: false,
  },
  loader: false,
  userFetch: false,
  isAuth: false,
  isSigned: false,
  isLogged: false,
  isSet: false,
  checkAuth: false,
  userData: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userId(state, action) {
      console.log(`User Id changed to ${action.payload}`);
      state.userId = action.payload;
    },
    user(state, action) {
      console.log(`User changed to ${action.payload}`);
      state.user = action.payload;
    },
    userData(state, action) {
      state.userData = action.payload;
    },
    errors(state, action) {
      console.log(`Errors changed to ${action.payload}`);
      state.errors = action.payload;
    },
    snackbar(state, action) {
      console.log(`Snackbar state changed to ${action.payload}`);
      state.snackbar = action.payload;
    },
    loader(state, action) {
      console.log(`Loader state changed to ${action.payload}`);
      state.loader = action.payload;
    },
    userFetch(state, action) {
      console.log(`Register state changed to ${action.payload}`);
      state.userFetch = action.payload;
    },
    isLogged(state, action) {
      console.log(`Login state changed to ${action.payload}`);
      state.isLogged = action.payload;
    },
    isSigned(state, action) {
      console.log(`SignUp state changed to ${action.payload}`);
      state.isSigned = action.payload;
    },
    isSet(state, action) {
      console.log(`Profile set state changed to ${action.payload}`);
      state.isSet = action.payload;
    },
    checkAuth(state, action) {
      console.log(`User logged. ${action.payload}`);
      state.checkAuth = action.payload;
    },
    isAuth(state, action) {
      console.log(`User authorization: ${action.payload}`);
      state.isAuth = action.payload;
    },

    resetUser() {
      return user.initialState;
    },
    resetErrors() {
      return errors.initialState;
    },
    resetLogin() {
      return initialState;
    },
  },
});

export const {
  snackbar,
  loader,
  userId,
  user,
  errors,
  resetUser,
  resetLogin,
  resetErrors,
  userFetch,
  isSigned,
  isLogged,
  isAuth,
  isSet,
  userData,
  checkAuth,
} = loginSlice.actions;
export default loginSlice.reducer;
