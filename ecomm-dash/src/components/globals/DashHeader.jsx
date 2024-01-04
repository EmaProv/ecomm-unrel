import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavBtn } from "./Navmenu";

function DashHeader({ isMob }) {
  const [title, setTitle] = useState("DASHBOARD");
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("DASHBOARD");
    } else if (location.pathname === "/warehouse") {
      setTitle("WAREHOUSE");
    } else if (location.pathname === "/sales-analytics") {
      setTitle("SALES");
    } else if (location.pathname === "/users-analytics") {
      setTitle("USERS");
    } else if (location.pathname === "/private-area") {
      setTitle("PRIVATE AREA");
    } else if (location.pathname === "/user-profile") {
      setTitle("PROFILE");
    } else if (
      location.pathname === "/add-admin" ||
      location.pathname === "/edit-admin/:id" ||
      location.pathname === "/add-product" ||
      location.pathname === "/edit-prod/:id"
    ) {
      setTitle("ACTION");
    } else if (location.pathname === "//product/:id") {
      setTitle("PRODUCT");
    }
  }, [location]);

  return (
    <div className="dash-header-cont">
      <div className="dash-header-btn">{isMob ? <NavBtn /> : null}</div>
      <div className="dash-header-title">
        <h2>
          <Link to="/">
            <b>ECOMM™ </b>
          </Link>
          {title}
        </h2>
      </div>
    </div>
  );
}

export default DashHeader;
