import { createSlice } from "@reduxjs/toolkit";

export const adminRedux = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAdminStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    getAdminSuccess: (state, action) => {
      state.isFetching = false;
      state.admins = action.payload;
      state.success = true;
    },
    getAdminFailure: (state) => {
      state.isFetching = false;
      state.success = false;
      state.error = true;
    },
    //DELETE
    deleteAdminStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    deleteAdminSuccess: (state, action) => {
      state.isFetching = false;
      state.admins.splice(
        state.admins.findIndex((item) => item._id === action.payload),
        1
      );
      state.success = true;
    },
    deleteAdminFailure: (state) => {
      state.isFetching = false;
      state.success = false;
      state.error = true;
    },
    //UPDATE
    updateAdminStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    updateAdminSuccess: (state, action) => {
      state.isFetching = false;
      state.admins[
        state.admins.findIndex((admin) => admin._id === action.payload.id)
      ] = action.payload.admin;
      state.success = true;
    },
    updateAdminFailure: (state) => {
      state.isFetching = false;
      state.success = false;
      state.error = true;
    },
    //ADD
    addAdminStart: (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    },
    addAdminSuccess: (state, action) => {
      state.isFetching = false;
      state.admins.push(action.payload);
      state.success = true;
    },
    addAdminFailure: (state) => {
      state.isFetching = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const {
  getAdminStart,
  getAdminSuccess,
  getAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  deleteAdminFailure,
  updateAdminStart,
  updateAdminSuccess,
  updateAdminFailure,
  addAdminStart,
  addAdminSuccess,
  addAdminFailure,
} = adminRedux.actions;

export default adminRedux.reducer;
