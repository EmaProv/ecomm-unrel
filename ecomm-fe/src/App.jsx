import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/global/NavbarDef";
import Footer from "./components/global/Footer";

import Home from "./pages/Home";
import Nasdaq from "./pages/Nasdaq";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import About from "./pages/About";
import Error from "./pages/Error";

import "./style/global.scss";

function App() {
  /* const user = true */
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path={"/collections/:cat?"} element={<Collections />} />
        <Route exact path="/nasdaq" element={<Nasdaq />} />
        <Route exact path="/:brand/:slug" element={<Product />} />
        <Route element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
