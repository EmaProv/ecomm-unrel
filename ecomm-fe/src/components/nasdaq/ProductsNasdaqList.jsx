import React from "react";
import ProdNasdaqRow from "./ProdNasdaqRow";
import ProdTableRow from "./ProdTableRow";

const styles = {
  single_row: {
    color: "black",
    cursor: "default",
  },
};

function ProductsNasdaqList({ products }) {
  if (products.lenght === 0) {
    return (
      <div>
        <h1>Sorry, no products here.</h1>
      </div>
    );
  }
  return (
    <div className="product-nasdaq-list">
      <div className="productlist-nasdaq-center">
        <table>
          <thead>
            <tr style={styles.single_row}>
              <th></th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return <ProdTableRow key={product.id} product={product} />;
            })}
          </tbody>
        </table>
        {/* {products.map((product) => {
          return <ProdNasdaqRow key={product.id} product={product} />;
        })} */}
      </div>
    </div>
  );
}

export default ProductsNasdaqList;
