import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function ProductList({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/prods?cat=${cat}`
            : "http://localhost:5000/api/prods/"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "0") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "1") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (filteredProducts.lenght === 0) {
    return (
      <div>
        <h1>Sorry, no products here.</h1>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="productlist-center">
        {cat
          ? filteredProducts.map((item) => {
              return <ProductCard key={item._id} item={item} />;
            })
          : products.map((item) => {
              return <ProductCard key={item._id} item={item} />;
            })}
      </div>
    </div>
  );
}

export default ProductList;
