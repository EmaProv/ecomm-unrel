import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../productRedux";

import { publicReq } from "../../reqMethods";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicReq.get("/prods");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
