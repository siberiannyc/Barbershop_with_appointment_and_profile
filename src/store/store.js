import { configureStore, combineReducers } from "@reduxjs/toolkit";
import servCatReducer from "./servSlice";
import modalReducer from "./modalSlice";
import shopReducer from "./shopSlice";
import dateReducer from "./dateSlice";
import shiftReducer from "./shiftSlice";
import barberReducer from "./barberSlice";
import customerReducer from "./customerSlice";
import firebaseReducer from "./firebaseSlice";
import loginReducer from "./loginSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  services: servCatReducer,
  modals: modalReducer,
  shop: shopReducer,
  date: dateReducer,
  shift: shiftReducer,
  barber: barberReducer,
  customer: customerReducer,
  firebase: firebaseReducer,
  login: loginReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["firebase", "barber", "services", "customer", "shop", "login"],
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
