import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UilSave } from "@iconscout/react-unicons";
import "../../styles/editAdmin.css";

import { useSelector } from "react-redux";
import { updateAdmin } from "../../redux/api/user-zero-api";
import LoadingCard from "../../components/globals/LoadingCard";

export default function EditAdmin({ usrMgr }) {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const [inputs, setInputs] = useState();
  const [isMgr, setIsMgr] = useState(false);

  const [resApi, setResApi] = useState({ resStatus: 0, msg: "" });
  const [reqState, setReqState] = useState("LOAD");
  const [showMod, setShowMod] = useState(false);
  const [onSucc, setOnSucc] = useState();

  const initialAdmin = useSelector((state) =>
    state.admin.admins.find((a) => a._id === id)
  );

  useEffect(() => {
    if (initialAdmin.isMgr === true) {
      setIsMgr(true);
    }
    setInputs(initialAdmin);
  }, [initialAdmin]);

  useEffect(() => {
    if (showMod) {
      setTimeout(updStatus(resApi), 3000);
    }

    if (onSucc) {
      setTimeout(onSuccActions, 2000);
    }
  }, [resApi, onSucc]);

  const handleUpdate = (e) => {
    setShowMod(true);

    e.preventDefault();
    const adminInput = { ...inputs, isMgr };

    updateAdmin({ setResApi }, id, adminInput, dispatch);
    console.log(resApi);
    console.log(reqState);
  };
  console.log(resApi);
  console.log(reqState);

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

  /* Read inputs from fields */
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeChk = (chkValue) => {
    setIsMgr(chkValue.target.checked);
  };

  return (
    <>
      <div className="edit-admin-layout">
        <div className="edit-admin-form-cont">
          <form>
            <div className="form_field_cont">
              <div className="form_input_cont">
                <lable htmlFor="" className="form_input_details">
                  Nome
                </lable>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  defaultValue={initialAdmin.name}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <lable htmlFor="" className="form_input_details">
                  Cognome
                </lable>
                <input
                  type="text"
                  className="form__input"
                  id="surname"
                  name="surname"
                  onChange={handleChange}
                  defaultValue={initialAdmin.surname}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <lable htmlFor="" className="form_input_details">
                  Email
                </lable>
                <input
                  type="text"
                  className="form__input"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  defaultValue={initialAdmin.email}
                />
              </div>
            </div>

            <div className="form_field_cont">
              <div className="form_input_cont">
                <lable htmlFor="" className="form_input_details">
                  Username
                </lable>
                <input
                  type="text"
                  className="form__input"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  defaultValue={initialAdmin.username}
                />
              </div>
            </div>

            {usrMgr ? (
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
                    <lable htmlFor="isMgr">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                      Manager
                    </lable>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="form_btn_cont">
              <button
                type="submit"
                className="form__btn"
                onClick={handleUpdate}
              >
                <span className="btn__text">Salva</span>
                <span className="btn__icon">
                  <UilSave />
                </span>
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
