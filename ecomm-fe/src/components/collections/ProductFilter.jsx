import React, { useContext, useState } from "react";
import { ProductContext } from "../../context";

//get all unique values
const getUnique = (products, value) => {
  return [...new Set(products.map((product) => product[value]))];
};

function ProductFilter({ products }) {
  const [isExpanded, setExpand] = useState(true);

  const toggleOpen = () => {
    setExpand(!isExpanded);
  };

  return (
    <section className="product-filter">
      <div className="product-filter-title" onClick={() => toggleOpen()}>
        <h2>Filter</h2>
      </div>

      <div
        className=/* "product-filter-cont"  */ {
          isExpanded ? "product-filter-cont show" : "product-filter-cont"
        }
      >
        <div className="product-filter-grid">
          <form>
            <label htmlFor="brand">Brand</label>
            <select name="brand" id="brand" defaultValue="all">
              <option>all</option>
              <option>nike</option>
              <option>yezee</option>
              <option>off-white</option>
            </select>
          </form>
          <form>
            <label htmlFor="size">Size</label>
            <select name="size" id="size" defaultValue="44">
              <option>44</option>
              <option>45</option>
              <option>46</option>
            </select>
          </form>
          <form>
            <label htmlFor="sort">Ordina</label>
            <select name="sort" id="sort" defaultValue="newest">
              <option>newest</option>
              <option>asc</option>
              <option>desc</option>
            </select>
          </form>
        </div>
      </div>
    </section>
  );
}
export default ProductFilter;
