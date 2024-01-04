import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  getLastCopStart,
  getLastCopSuccess,
  getLastCopFailure,
} from "../reducers/productRedux";
import {
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
} from "../reducers/AdminRedux";
import { publicReq, userReq } from "../../reqMethods";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicReq.get("/prods");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getLastCop = async (dispatch) => {
  dispatch(getLastCopStart());
  try {
    const res = await userReq.get("/prods/last-cop");
    dispatch(getLastCopSuccess(res.data));
  } catch (err) {
    dispatch(getLastCopFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userReq.delete(`/prods/${id}`);
    if (res.status === 200) {
      dispatch(deleteProductSuccess(id));
    }
  } catch (err) {
    dispatch(deleteProductFailure());
    console.log(err);
  }
};

export const addProduct = async (props, product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userReq.post(`/prods`, product);
    props.setResApi({
      resStatus: res.response.status,
      msg: res.response.data.msg,
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    props.setResApi({
      resStatus: err.response.status,
      msg: err.response.data.msg,
    });
    console.log(err);
    dispatch(addProductFailure());
  }
};

export const getAdmins = async (dispatch) => {
  dispatch(getAdminStart());
  try {
    const res = await userReq.get("/users-zero");
    dispatch(getAdminSuccess(res.data));
  } catch (err) {
    dispatch(getAdminFailure());
  }
};

export const deleteAdmin = async (id, dispatch) => {
  dispatch(deleteAdminStart());
  try {
    const res = await userReq.delete(`/users-zero/${id}`);
    /* if (res.status === 200) {
      dispatch(deleteAdminSuccess(id));
    } */
  } catch (err) {
    dispatch(deleteAdminFailure());
  }
};

export const updateAdmin = async (props, id, admin, dispatch) => {
  dispatch(updateAdminStart());
  try {
    const res = await userReq.put(`/users-zero/${id}`, admin);
    console.log(res);
    props.setResApi({
      resStatus: res.status,
      msg: res.statusText,
    });
    dispatch(updateAdminSuccess({ id, admin }));
  } catch (err) {
    console.log(err);
    if (err && err.response) {
      props.setResApi({
        resStatus: err.response.status,
        msg: err.response.data.msg,
      });
    } else {
      props.setResApi({
        resStatus: err.status,
        msg: err.statusText,
      });
    }
    dispatch(updateAdminFailure());
  }
};

export const addAdmin = async (props, admin, dispatch) => {
  dispatch(addAdminStart());
  try {
    const res = await userReq.post(`/users-zero/create`, admin);

    if (res && res.response) {
      props.setResApi({
        resStatus: res.response.status,
        msg: res.response.data.msg,
      });
    } else {
      props.setResApi({
        resStatus: res.status,
        msg: res.statusText,
      });
    }
    dispatch(addAdminSuccess(res.data));
  } catch (err) {
    console.log(err);
    if (err && err.response) {
      props.setResApi({
        resStatus: err.response.status,
        msg: err.response.data.msg,
      });
    } else {
      props.setResApi({
        resStatus: err.status,
        msg: err.statusText,
      });
    }
    dispatch(addAdminFailure());
  }
};
