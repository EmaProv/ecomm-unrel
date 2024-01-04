import React, { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "../src/components/globals/ScrollToTop";

import "./styles/global.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import WareHouse from "./pages/WareHouse";
import SalesAnalytics from "./pages/analytics/SalesAnalytics";
import UsersAnalytics from "./pages/analytics/UsersAnalytics";
import PrivateArea from "./pages/PrivateArea";
import UserProfile from "./pages/UserProfile";
import AddAdmin from "./pages/actions/AddAdmin";
import AddProduct from "./pages/actions/AddProduct";
import EditAdmin from "./pages/actions/EditAdmin";
import EditProduct from "./pages/actions/EditProduct";
import Product from "./pages/details/Product";

import Navbar from "./components/globals/Navmenu";
import DashHeader from "./components/globals/DashHeader";

const ThemeContext = createContext(null);

function App() {
  const [isMob, setIsMob] = useState(window.innerWidth < 800);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismob = window.innerWidth < 770;
        if (ismob !== isMob) setIsMob(ismob);
      },
      false
    );
  }, [isMob]);

  // const user = true;

  const user = useSelector((state) => state.user.currentUser);
  const userMgr = useSelector(
    (state) =>
      state.user.currentUser &&
      (state.user.currentUser.mgr === true ||
        state.user.currentUser.sudo === true)
  );

  return (
    <>
      <ScrollToTop>
        {/* <ThemeContext.Provider> */}
        {user ? <Navbar isMob={isMob} /> : null}
        {user ? <DashHeader isMob={isMob} /> : null}
        <Routes>
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/"
            element={user ? <Home mgr={userMgr} /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/warehouse"
            element={user ? <WareHouse /> : <Navigate to="/login" />}
          />
          {/* Analytics */}
          <Route
            exact
            path="/sales-analytics"
            element={user ? <SalesAnalytics /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/users-analytics"
            element={user ? <UsersAnalytics /> : <Navigate to="/login" />}
          />
          {/* Private Area */}
          <Route
            exact
            path="/private-area"
            element={
              user ? <PrivateArea usrMgr={userMgr} /> : <Navigate to="/login" />
            }
          />
          {/* User Profile */}
          <Route
            exact
            path="/user-profile"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          />
          {/* User Action */}
          <Route
            exact
            path="/add-admin"
            element={
              user ? <AddAdmin usrMgr={userMgr} /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/edit-admin/:id"
            element={
              user ? <EditAdmin usrMgr={userMgr} /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/add-product"
            element={user ? <AddProduct /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/edit-prod/:id"
            element={user ? <EditProduct /> : <Navigate to="/login" />}
          />

          {/* Details */}
          <Route
            exact
            path="/product/:id"
            element={user ? <Product /> : <Navigate to="/login" />}
          />
        </Routes>
        {/* </ThemeContext.Provider> */}
      </ScrollToTop>
    </>
  );
}

export default App;
