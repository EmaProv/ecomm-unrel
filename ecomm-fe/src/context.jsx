import React, { Component } from "react";
import allData from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    sortedproducts: [],
    hotRelease: [],
    ledWall: [],
    loading: true,
    type: "all",
    brand: "all",
    size: "5 US",
    price: 0,
    maxPrice: 0,
  };

  //getData da CMS

  componentDidMount() {
    //this.getData
    let products = this.formatData(allData);

    let hotRelease = products.filter((product) => product.hotRelease === true);

    let ledWall = products.filter(
      (product) => product.ledWall.isLedWall === true
    );

    let maxPrice = Math.max(...products.map((product) => product.price));

    let maxSize = Math.max(...products.map((product) => product.size));

    this.setState({
      products,
      sortedProducts: products,
      hotRelease,
      ledWall,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  formatData(datas) {
    let tempData = datas.map((data) => {
      let id = data.sys.id;
      let images1 = data.fields.images1.map((image) => image.fields.file.url);
      let images2 = data.fields.images2.map((image) => image.fields.file.url);
      let pngImg = data.fields.pngImg.fields.file.url;
      let sizes = data.fields.sizes.map((s) => s.size.sizeNum);
      let ledWallLable = data.fields.ledWall.ledWallLable;

      let product = {
        ...data.fields,
        pngImg,
        images1,
        images2,
        id,
        sizes,
        ledWallLable,
      };

      return product;
    });
    return tempData;
  }

  getProduct = (slug) => {
    let tempProducts = [...this.state.products];

    const product = tempProducts.find((product) => product.slug === slug);

    return product;
  };

  handleChange = (e) => {
    const target = e.target;
    const value = e.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterProducts
    );

    console.log({ name, value });
  };

  filterProducts = () => {
    console.log("hello");
    /* let { products, type, price, maxSize, maxPrice } = this.state;

    let tempProducts = [...products];

    if (type !== "all") {
      tempProducts = tempProducts.filter((product) => product.type === type);
    }

    this.setState({
      sortedproducts: tempProducts,
    }); */
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getProduct: this.getProduct,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export function withProductConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ProductConsumer>
        {(value) => <Component {...props} context={value} />}
      </ProductConsumer>
    );
  };
}

export { ProductProvider, ProductConsumer, ProductContext };
