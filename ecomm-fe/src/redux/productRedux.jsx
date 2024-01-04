import { createSlice } from "@reduxjs/toolkit";

export const productRedux = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
      state.success = true;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } =
  productRedux.actions;

export default productRedux.reducer;
