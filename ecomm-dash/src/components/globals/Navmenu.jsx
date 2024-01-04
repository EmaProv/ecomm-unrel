import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  UilEstate,
  UilBox,
  UilChart,
  UilUsersAlt,
  UilCog,
  UilSignout,
  UilMoon,
  UilBars,
  UilMultiply,
  UilConstructor,
} from "@iconscout/react-unicons";

import { Logout } from "../../redux/api/auth-api";

import "../../styles/globals/sidenav.css";

export const NavBtn = () => {
  const handleOpenMob = () => {
    document.getElementById("sidenav-mob").style.width = "100%";
    document.getElementById("sidenav-mob").style.opacity = "1";
    document.getElementById("sidenav-mob").style.padding = "10px";
  };
  return (
    <span className="mobile-open-nav-btn" onClick={handleOpenMob}>
      <i>
        <UilBars />
      </i>
    </span>
  );
};

function Navmenu({ isMob }) {
  const [isOpen, setIsOpen] = useState(false);

  const refNav = useRef();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onLogOut = (e) => {
    e.preventDefault();
    Logout(dispatch);
    navigate("/login");
  };

  useLayoutEffect(() => {
    if (refNav.current) {
      const navW = refNav.current.offsetWidth;

      if (navW > 73) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.marginLeft = "240px";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.marginLeft = "73px";
  };

  /* const handleOpenMob = () => {
    document.getElementById("sidenav-mob").style.width = "100%";
    document.getElementById("sidenav-mob").style.opacity = "1";
    document.getElementById("sidenav-mob").style.padding = "10px";
  }; */

  const handleCloseMob = () => {
    document.getElementById("sidenav-mob").style.width = "0";
    document.getElementById("sidenav-mob").style.opacity = "0";
  };

  return (
    <>
      {isMob ? (
        <div className="sidenav-mob" id="sidenav-mob" ref={refNav}>
          <div className="navbar-header-mob" id="navbar-header">
            <span className="logo_name-mob" id="logo_name">
              Ecomm™
            </span>
            <span className="sidenav-open-btn">
              <i>
                <UilMultiply onClick={handleCloseMob} />
              </i>
            </span>
          </div>

          <div className="menu-items-mob">
            <ul className="nav-links-mob">
              <li onClick={handleCloseMob}>
                <Link to="/">
                  <i>
                    <UilEstate />
                  </i>
                  <span className="link-name-mob">Dahsboard</span>
                </Link>
              </li>
              <li onClick={handleCloseMob}>
                <Link to="/warehouse">
                  <i>
                    <UilBox />
                  </i>
                  <span className="link-name-mob">Magazzino</span>
                </Link>
              </li>
              <li onClick={handleCloseMob}>
                <Link to="/sales-analytics">
                  <i>
                    <UilChart />
                  </i>
                  <span className="link-name-mob">Finanze</span>
                </Link>
              </li>
              <li onClick={handleCloseMob}>
                <Link to="/users-analytics">
                  <i>
                    <UilUsersAlt />
                  </i>
                  <span className="link-name-mob">Gestione Clienti</span>
                </Link>
              </li>
              <li onClick={handleCloseMob}>
                <Link to="/private-area">
                  <i>
                    <UilConstructor />
                  </i>
                  <span className="link-name-mob">Area Riservata</span>
                </Link>
              </li>
            </ul>

            <ul className="navbar-footer-mob">
              {/* <li onClick={handleCloseMob}>
                <Link to="/user-profile">
                  <i>
                    <UilCog />
                  </i>
                  <span className="link-name-mob">Account</span>
                </Link>
              </li> */}

              <li onClick={handleCloseMob}>
                <Link to="/" onClick={onLogOut}>
                  <i>
                    <UilSignout />
                  </i>
                  <span className="link-name-mob">Logout</span>
                </Link>
              </li>
              <div className="footer-box-mob" id="footer-box">
                <p>Ecomm™ 2022 ~ v1.0</p>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={`sidenav${isOpen ? "-open" : ""}`}
          id="sidenav"
          ref={refNav}
        >
          <div
            className={`navbar-header${isOpen ? "-open" : ""}`}
            id="navbar-header"
          >
            <span
              className={`logo_name${isOpen ? "-open" : ""}`}
              id="logo_name"
            >
              Ecomm™
            </span>
            <span className="sidenav-open-btn">
              {isOpen ? (
                <i>
                  <UilMultiply onClick={handleClose} />
                </i>
              ) : (
                <i>
                  <UilBars onClick={handleOpen} />
                </i>
              )}
            </span>
          </div>

          {/* <div className="sidenav_main_cont"> */}
          <div className={`menu-items${isOpen ? "-open" : ""}`}>
            <ul className={`nav-links${isOpen ? "-open" : ""}`}>
              <li>
                <Link to="/">
                  <i>
                    <UilEstate />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Dahsboard
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/warehouse">
                  <i>
                    <UilBox />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Magazzino
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/sales-analytics">
                  <i>
                    <UilChart />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Finanze
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/users-analytics">
                  <i>
                    <UilUsersAlt />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Gestione Clienti
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/private-area">
                  <i>
                    <UilConstructor />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Area Riservata
                  </span>
                </Link>
              </li>
            </ul>

            <ul className={`navbar-footer${isOpen ? "-open" : ""}`}>
              {/* <li>
                <Link to="/user-profile">
                  <i>
                    <UilCog />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Account
                  </span>
                </Link>
              </li> */}

              <li>
                <Link to="/" onClick={onLogOut}>
                  <i>
                    <UilSignout />
                  </i>
                  <span className={`link-name${isOpen ? "-open" : ""}`}>
                    Logout
                  </span>
                </Link>
              </li>
              <div
                className={`footer-box${isOpen ? "-open" : ""}`}
                id="footer-box"
              >
                <p>Ecomm™ 2022 ~ v1.0</p>
              </div>
            </ul>
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default Navmenu;
