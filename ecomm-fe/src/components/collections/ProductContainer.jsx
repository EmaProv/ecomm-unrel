import React, { useState } from "react";
import { useLocation } from "react-router-dom";

/* import ProductFilter from "./ProductFilter"; */
import ProductList from "./ProductList";

import Loading from "../global/Loading";

function ProductContainer() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("0");
  const [isExpanded, setExpand] = useState(true);

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const toggleOpen = () => {
    setExpand(!isExpanded);
  };

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value /* .toLowercase */,
    });
  };

  console.log(filters);

  /* const { loading, sortedProducts /* , products  } = context;

  if (loading) {
    return <Loading />;
  } */

  return (
    <div className="products-container">
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
              <label htmlFor="cat">Categorie</label>
              <select name="cat" id="cat" defaultValue="all">
                <option>all</option>
                <option>shoes</option>
                <option>t-shirt</option>
                <option>pants</option>
              </select>
            </form>
            <form>
              <label htmlFor="brand">Brand</label>
              <select
                name="brand"
                id="brand"
                defaultValue="all"
                onChange={handleFilters}
              >
                <option>all</option>
                <option>nike</option>
                <option>yezee</option>
                <option>off-white</option>
              </select>
            </form>
            <form>
              <label htmlFor="size">Size</label>
              <select
                name="size"
                id="size"
                defaultValue="44"
                onChange={handleFilters}
              >
                <option>44</option>
                <option>45</option>
                <option>46</option>
              </select>
            </form>
            <form>
              <label htmlFor="sort">Ordina</label>
              <select
                name="sort"
                id="sort"
                defaultValue="newest"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="0">newest</option>
                <option value="1">asc</option>
                <option value="2">desc</option>
              </select>
            </form>
          </div>
        </div>
      </section>
      <ProductList cat={cat} filters={filters} sort={sort} />
    </div>
  );
}

export default ProductContainer;
