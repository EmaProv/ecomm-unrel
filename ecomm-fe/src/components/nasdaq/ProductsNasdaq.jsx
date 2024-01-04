import React from "react";
import ProductsNasdaqList from "./ProductsNasdaqList";

import Loading from "../global/Loading";

import { withProductConsumer } from "../../context";

function ProductsNasdaq({ context }) {
  const { loading, sortedProducts /* , products */ } = context;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="nasdaq-container">
      {/* <ProductFilter products={products} /> */}
      <ProductsNasdaqList products={sortedProducts} />
    </div>
  );
}

export default withProductConsumer(ProductsNasdaq);
