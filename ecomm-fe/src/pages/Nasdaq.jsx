import React from "react";
import "../style/nasdaq.scss";

import ProductsNasdaq from "../components/nasdaq/ProductsNasdaq";

function Nasdaq() {
  const handleCloseWindow = () => {
    document.getElementById("nasdaq-window").style.display = "none";
  };
  return (
    <div className="nasdaq-layout">
      <div className="ecomm-os">
        <div className="nasdaq-window" id="nasdaq-window">
          <div className="nasdaq-window-header">
            <i onClick={handleCloseWindow}>x</i>
          </div>
          <div className="nasdaq-flex-cont">
            <ProductsNasdaq />
          </div>
        </div>
      </div>
      {/* <div className="nasdaq-title">
        <h1>SHOESDAQ</h1>
      </div>

      <div className="nasdaq-grid-cont">
        <ProductsNasdaq />
      </div> */}
    </div>
  );
}

export default Nasdaq;
