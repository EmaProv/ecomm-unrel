import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context";

import Marquee from "react-fast-marquee";

const upArr = <h3>&#8593;</h3>;
const downArr = <h3>&#8595;</h3>;

function UnderHeroMarquee() {
  const context = useContext(ProductContext);
  const { ledWall: products } = context;

  return (
    <div className="marquee-cont">
      <Marquee
        gradient={false}
        pauseOnHover={true}
        speed={50}
        className="home-marquee"
      >
        {products.map((product) => (
          <div
            className={
              product.price > 150
                ? "home-marquee-product"
                : "home-marquee-product down"
            }
            key={product.id}
          >
            <Link to="/nasdaq" /* to={`/collections/${product.slug}`} */>
              {product.ledWall.ledWallLable}
            </Link>
            {product.price > 150 ? upArr : downArr}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default UnderHeroMarquee;
