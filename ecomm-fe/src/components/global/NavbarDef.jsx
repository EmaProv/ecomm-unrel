import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import pngX from "../../images/png/syspng/close_g_w.png";
import pngMenu from "../../images/png/syspng/menu_g_w.png";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleOpen = () => {
    document.getElementById("sidemenu").style.width = "100%";

    document.getElementById("sidemenu").style.opacity = "1";
    document.getElementById("sidemenu-cont").style.opacity = "1";
    setClick(!click);
  };

  const handleClose = () => {
    document.getElementById("sidemenu").style.width = "0";
    document.getElementById("sidemenu").style.opacity = "0";
    document.getElementById("sidemenu-cont").style.opacity = "0";
    setClick(false);
  };

  return (
    <>
      <nav className="navbar-def">
        <div className="nav-def-brand">
          <Link to="/" onClick={handleClose}>
            Ecomm
          </Link>
        </div>

        <div className="nav-def-links">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/collections">
            <p>Collections</p>
          </Link>
          <Link to="/nasdaq">
            <p>Shoesdaq</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>

        <div className="nav-def-actions"></div>

        <button type="button" className="nav-def-btn">
          {click ? (
            <img
              src={pngX}
              alt="close ico"
              className="nav-def-icon-close"
              onClick={handleClose}
            />
          ) : (
            <img
              src={pngMenu}
              alt="menu ico"
              className="nav-def-icon"
              onClick={handleOpen}
            />
          )}
        </button>
      </nav>

      <div id="sidemenu" className="nav-def-sidemenu">
        <div id="sidemenu-cont" className="nav-def-sidemenu-cont">
          <Link to="/" onClick={handleClose}>
            <p>Home</p>
          </Link>
          <Link to="/collections" onClick={handleClose}>
            <p>Collections</p>
          </Link>
          <Link to="/nasdaq" onClick={handleClose}>
            <p>Shoesdaq</p>
          </Link>
          <Link to="/about" onClick={handleClose}>
            <p>About</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
