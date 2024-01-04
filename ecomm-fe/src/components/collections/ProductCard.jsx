import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  /* const { specName, name, slug, pngImg, retailPrice, _id } = item; */

  return (
    <div className="product-card">
      <Link to={`/${item.brand}/${item._id}`}>
        <div className="product-card-img-bg">
          <img src={item.pngImg} alt={item.slug} style={{ width: "100%" }} />
        </div>
      </Link>
      <div className="product-card-spec">
        <p>{item.specName}</p>
        <p>{item.name}</p>
        <p>€ {item.retailPrice}</p>
      </div>
    </div>
  );
}

export default ProductCard;

//Nel componente sotto render
/* products = products.map((product) => {
      return <ProductCard key={product.id} product={product} />;
    }); */
