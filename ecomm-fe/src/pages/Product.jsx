import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicReq } from "../reqMethods";

import "../style/product.scss";

import Accordion from "../components/global/Accodion";
import ProductGallery from "../components/product/ProductGallery";
import ProductGalleryMob from "../components/product/ProductGalleryMob";
import CheckoutFramer from "../components/product/CheckoutFramer";

function getWitdh() {
  const { innerWidth: width } = window;
  return { width };
}

const Product = () => {
  const [product, setProduct] = useState({});
  const [screenWidth, setScreenWidth] = useState(getWitdh());

  const location = useLocation();
  const slug = location.pathname.split("/")[2];

  useEffect(() => {
    function handlerResize() {
      setScreenWidth(getWitdh());
    }

    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  /* RIMUOVERE QUANDO NON SERVE PIU' */
  console.log(screenWidth.width);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicReq.get("/prods/" + slug);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [slug]);

  if (product === null) {
    return (
      <div className="product-error">
        <h2>Product Not Foud!</h2>
        <Link to="/">HOME</Link>
      </div>
    );
  }

  const isMob = screenWidth.width < 830;

  return (
    <div className="product-layout" key={product.id}>
      {/* {isMob && <ProductGalleryMob product={product} />} */}
      <div className="product-title">
        <h1>{product.name}</h1>
        <p>{product.specName}</p>
      </div>

      <div className="product-grid">
        <div className="product-gallery">
          {/* {!isMob && <ProductGallery product={product} />} */}
        </div>

        <div className="product-details">
          <div className="product-details-title">
            <div className="product-details-title-row1">
              <form>
                <select className="custom-dropdown">
                  {/* {product.size.map((s) => (
                    <option key={product.id}>{s}</option>
                  ))} */}
                </select>
              </form>
            </div>

            <CheckoutFramer />
          </div>

          <div className="product-desc">
            <div className="product-desc-title">
              <h2>Descrizione</h2>
            </div>
            <div className="product-desc-txt">
              <p>{product.desc}</p>
            </div>
          </div>

          <Accordion title="Checkout Info">
            <p>
              Adipisicing magna commodo cupidatat dolor. Non exercitation
              reprehenderit consequat amet eiusmod culpa irure reprehenderit
              velit esse. Non culpa excepteur aliquip est exercitation cupidatat
              sunt minim duis. Ullamco fugiat elit nulla ullamco aliquip id
              irure esse tempor nulla. Do qui in eu sit aliqua voluptate.
              Deserunt qui in et proident cupidatat aute ut consequat sit eu
              elit ad consectetur exercitation.
            </p>
          </Accordion>

          <Accordion title="Shipping">
            <p>
              Adipisicing magna commodo cupidatat dolor. Non exercitation
              reprehenderit consequat amet eiusmod culpa irure reprehenderit
              velit esse. Non culpa excepteur aliquip est exercitation cupidatat
              sunt minim duis. Ullamco fugiat elit nulla ullamco aliquip id
              irure esse tempor nulla. Do qui in eu sit aliqua voluptate.
              Deserunt qui in et proident cupidatat aute ut consequat sit eu
              elit ad consectetur exercitation.
            </p>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Product;
