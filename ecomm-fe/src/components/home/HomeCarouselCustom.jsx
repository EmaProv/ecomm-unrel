import React, { useContext /* , useState */ } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context";

//import CarouselArrow from "./CarouselArrow";
import defImg from "../../images/2.jpg";

function HomeCarouselCustom(/* { productsCount } */) {
  /* const [slideIndex, setSlideIndex] = useState(0);
  const length = productsCount.length;

  const nextSlide = () => {
    setSlideIndex(slideIndex === length - 1 ? 0 : slideIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex === 0 ? length - 1 : slideIndex - 1);
  };

  if (!Array.isArray(productsCount) || productsCount <= 0) {
    return null;
  } */

  const context = useContext(ProductContext);
  const { hotRelease: products } = context;

  return (
    <>
      <div className="home-carousel-custom-cont">
        {products.map((product, index) => (
          <div className="home-carousel-custom-card" key={product.id}>
            <Link to={`/collections/${product.slug}`}>
              <div className="home-carousel-custom-card-img-cont">
                <img
                  src={product.pngImg || defImg}
                  alt={product.slug}
                  className="home-carousel-custom-card-img"
                />
              </div>
            </Link>

            <div className="home-carousel-custom-card-spec">
              <h3>{product.name}</h3>
              <p>{product.specName}</p>
              <h2>€ {product.retailPrice}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="home-carousel-custom-arrow-cont">
        <CarouselArrow doSlide={prevSlide} direction="prev" />
        <CarouselArrow doSlide={nextSlide} direction="next" />
      </div> */}
    </>
  );
}

export default HomeCarouselCustom;
