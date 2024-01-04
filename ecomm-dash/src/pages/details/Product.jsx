import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicReq } from "../../reqMethods";
import { UilEye, UilEdit } from "@iconscout/react-unicons";

import "../../styles/product.css";

function Product() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicReq.get("/prods/" + id);
        setProduct(res.data);
      } catch (err) {
        return console.log(err);
      }
    };
    getProduct();
  }, [id]);

  return (
    <div className="prod-det-layout">
      <div className="prod-det-cont">
        <div className="prod-det-grid-header">
          <div className="prod-det-grid-header-field">
            <img
              className="prod-det-img"
              src={"https://d296ypy9nm1p85.cloudfront.net/" + product.png}
              alt={product.slug}
            />
            <Link to={`/edit-prod/` + product._id}>Edit</Link>
          </div>
          <div className="prod-det-grid-header-files">
            <div className="prod-det-grid-header-field">
              <lable>PNG</lable>
              {product.png ? "1/1" : "0/1"}
              <button>
                <UilEye />
              </button>
            </div>
            <div className="prod-det-grid-header-field">
              <lable>JPG</lable>
              {product.images ? `${product.images.length}/6` : "0/6"}
              <button>
                <UilEye />
              </button>
            </div>
            <div className="prod-det-grid-header-field">
              <lable>Ricevuta</lable>
              {product.pdf ? "1/1" : "0/1"}
              <button>
                <UilEye />
              </button>
            </div>
          </div>
        </div>
        <div className="prod-det-grid-top">
          <div className="prod-det-grid-field">
            <lable>SKU</lable>
            <p>{product.sku}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>PID</lable>
            <p>{product.pid}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Slug</lable>
            <p>{product.slug}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Brand</lable>
            <p>{product.brand}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Modello</lable>
            <p>{product.model}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Colorway</lable>
            <p>{product.colorway}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Genere</lable>
            <p>{product.gen}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Categoria</lable>
            <p>{product.category}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Prezzo Retail</lable>
            <p>€ {product.priceRetail}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Prezzo</lable>
            <p>€ {product.price}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Nome Led Wall</lable>
            <p>{product.led_wall_slug}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Led Wall</lable>{" "}
            <p>{product.led_wall === true ? "Si" : "No"}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Hot Release</lable>{" "}
            <p>{product.hot_rel === true ? "Si" : "No"}</p>
          </div>
        </div>
        <div className="prod-det-grid-mid">
          <div className="prod-det-grid-field">
            <lable>Descrizione</lable> <p>{product.desc}</p>
          </div>
          <div className="prod-det-grid-field">
            <lable>Tags</lable> <p>{product.tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
