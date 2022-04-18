import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: {
    activeShop: { name: "" },
  },
  mainPage: null,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    initShop(state, action) {
      console.log(`Shop has changed`);
      state.shop = action.payload;
    },
    mainPage(state, action) {
      state.mainPage = action.payload;
    },
    resetShop() {
      return initialState;
    },
  },
});

export const { initShop, resetShop, mainPage } = shopSlice.actions;
export default shopSlice.reducer;
