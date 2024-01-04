import {
  loginFail,
  loginStart,
  loginSuccess,
  logout,
} from "../reducers/UserZeroRedux";
import { publicReq } from "../../reqMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicReq.post("/auth-zero/v1/signin", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};

export const Logout = async (dispatch) => {
  dispatch(logout());
};
