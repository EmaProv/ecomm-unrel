import React from "react";

import ProductContainer from "../components/collections/ProductContainer";

import "../style/collections.scss";

function Collections() {
  return (
    <div className="collections-layout">
      <div className="collections-title">
        <h1>THE COLLECTIONS</h1>
      </div>

      <div className="collections-grid-cont">
        <ProductContainer />
      </div>
    </div>
  );
}

export default Collections;
