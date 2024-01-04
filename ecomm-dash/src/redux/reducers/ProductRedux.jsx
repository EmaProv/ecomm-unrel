import { createSlice } from "@reduxjs/toolkit";

export const productRedux = createSlice({
  name: "product",
  initialState: {
    products: [],
    lastCop: [],
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
    //GET LAST COP
    getLastCopStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    getLastCopSuccess: (state, action) => {
      state.isFetching = false;
      state.lastCop = action.payload;
      state.success = true;
    },
    getLastCopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      state.success = true;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    updateProductSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
    //ADD
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.success = true;
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  getLastCopStart,
  getLastCopSuccess,
  getLastCopFailure,
} = productRedux.actions;

export default productRedux.reducer;
