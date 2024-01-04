import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UilConstructor, UilPlus } from "@iconscout/react-unicons";
import AdminTable from "../components/dataTables/AdminTable";
import { useSelector } from "react-redux";

import "../styles/privateArea.css";

export default function PrivateArea({ usrMgr }) {
  return (
    <div className="private-area-layout">
      <div className="private-area-action">
        {usrMgr ? (
          <Link to="/add-admin">
            <button type="button" className="custom_btn">
              <span className="custom_btn_txt">Add Admin</span>
              <span className="custom_btn_ico">
                <UilPlus />
              </span>
            </button>
          </Link>
        ) : null}
      </div>
      <div className="private-area-table-cont">
        <h3>Team</h3>
        <AdminTable mgr={usrMgr} />
      </div>
    </div>
  );
}
