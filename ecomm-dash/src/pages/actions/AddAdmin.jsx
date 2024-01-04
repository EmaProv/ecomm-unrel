import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UilSave } from "@iconscout/react-unicons";

import { addAdmin } from "../../redux/api/user-zero-api";

import LoadingCard from "../../components/globals/LoadingCard";

import "../../styles/addAdmin.css";

export default function AddAdmin({ usrMgr }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [inputs, setInputs] = useState();
  const [isMgr, setIsMgr] = useState(false);

  const [resApi, setResApi] = useState({ resStatus: 0, msg: "" });
  const [reqState, setReqState] = useState("LOAD");
  const [showMod, setShowMod] = useState(false);
  const [onSucc, setOnSucc] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (showMod) {
      setTimeout(updStatus(resApi), 3000);
    }

    if (onSucc) {
      setTimeout(onSuccActions, 2000);
    }
  }, [resApi, onSucc]);

  const handleSave = (e) => {
    setShowMod(true);

    e.preventDefault();
    const adminInput = { ...inputs, isMgr };

    addAdmin({ setResApi }, adminInput, dispatch);
  };

  const updStatus = (resApi) => {
    if (
      resApi.resStatus === 200 ||
      resApi.resStatus === 201 ||
      resApi.resStatus === 209
    ) {
      setReqState("PASS");
      setOnSucc(true);
    } else {
      setReqState("FAIL");
      setOnSucc(false);
    }
  };

  const onSuccActions = () => {
    setShowMod(false);
    navigate("/private-area");
  };

  const handleChangeChk = (chkValue) => {
    setIsMgr(chkValue.target.checked);
  };

  return (
    <>
      <div className="add-admin-layout">
        <div className="add-admin-form-cont">
          <form>
            <div className="form_field_cont">
              <div className="form_input_cont">
                <label htmlFor="" className="form_input_details">
                  Nome
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  name="name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <label htmlFor="" className="form_input_details">
                  Cognome
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="surname"
                  name="surname"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <label htmlFor="" className="form_input_details">
                  Email
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <label htmlFor="" className="form_input_details">
                  Username
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <label htmlFor="" className="form_input_details">
                  Password
                </label>
                <input
                  type="password"
                  className="form__input"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {usrMgr && (
              <div className="form_field_cont">
                <div className="form_input_cont">
                  <div className="form_check">
                    <input
                      type="checkbox"
                      id="isMgr"
                      name="isMgr"
                      checked={isMgr}
                      onChange={(event) => {
                        handleChangeChk(event);
                      }}
                    />
                    <label htmlFor="isMgr">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                      Manager
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="form_btn_cont">
              <button type="submit" className="form__btn" onClick={handleSave}>
                <lable htmlFor="lable" className="btn__text">
                  Salva
                </lable>
                <lable htmlFor="lable" className="btn__icon">
                  <UilSave />
                </lable>
              </button>
            </div>
          </form>
        </div>
      </div>
      {showMod ? (
        <LoadingCard res={resApi} reqState={reqState} showMod={setShowMod} />
      ) : null}
    </>
  );
}
