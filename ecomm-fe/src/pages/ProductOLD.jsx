import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context";

import Accordion from "../components/global/Accodion";
import ProductGallery from "../components/product/ProductGallery";
import ProductGalleryMob from "../components/product/ProductGalleryMob";
import CheckoutFramer from "../components/product/CheckoutFramer";

import "../style/product.scss";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.state.match.props.slug,
      isMobile: false,
    };

    console.log(this.state);
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  static contextType = ProductContext;

  useLocation() {
    const id = location.pathname.split("/")[2];
    console.log(id);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth < 830 });
  }

  render() {
    const { getProduct } = this.context;
    const product = getProduct(this.state.slug);
    if (product !== null) {
      return (
        <div className="product-error">
          <h2>No product foud!</h2>
          <Link to="/">HOME</Link>
        </div>
      );
    }
    const { specName, name, sizes } = product;
    const isMob = this.state.isMobile;
    return (
      <div className="product-layout" key={product.id}>
        {isMob ? <ProductGalleryMob product={product} /> : null}
        <div className="product-title">
          <h1>{name}</h1>
          <p>{specName}</p>
        </div>

        <div className="product-grid">
          <div className="product-gallery">
            {!isMob ? <ProductGallery product={product} /> : null}
          </div>

          <div className="product-details">
            <div className="product-details-title">
              <div className="product-details-title-row1">
                <form>
                  <select className="custom-dropdown">
                    {sizes.map((s, i) => (
                      <option key={product.id}>{s}</option>
                    ))}
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

            <div className="product-desc">
              <div className="product-desc-title">
                <h2>Styles</h2>
              </div>
              <div className="product-desc-styles">
                {product.style.map((st, i) => (
                  <p className="product-desc-styles-single" key={i}>
                    {st}{" "}
                  </p>
                ))}
              </div>
            </div>

            <Accordion title="Checkout Info">
              <p>
                Adipisicing magna commodo cupidatat dolor. Non exercitation
                reprehenderit consequat amet eiusmod culpa irure reprehenderit
                velit esse. Non culpa excepteur aliquip est exercitation
                cupidatat sunt minim duis. Ullamco fugiat elit nulla ullamco
                aliquip id irure esse tempor nulla. Do qui in eu sit aliqua
                voluptate. Deserunt qui in et proident cupidatat aute ut
                consequat sit eu elit ad consectetur exercitation.
              </p>
            </Accordion>

            <Accordion title="Shipping">
              <p>
                Adipisicing magna commodo cupidatat dolor. Non exercitation
                reprehenderit consequat amet eiusmod culpa irure reprehenderit
                velit esse. Non culpa excepteur aliquip est exercitation
                cupidatat sunt minim duis. Ullamco fugiat elit nulla ullamco
                aliquip id irure esse tempor nulla. Do qui in eu sit aliqua
                voluptate. Deserunt qui in et proident cupidatat aute ut
                consequat sit eu elit ad consectetur exercitation.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
