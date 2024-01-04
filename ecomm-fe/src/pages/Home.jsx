import React /* , { useContext } */ from "react";
import { Link } from "react-router-dom";
import "../style/home.scss";
/* import { ProductContext } from "../context"; */

import HomeCarouselCustom from "../components/home/HomeCarouselCustom";
import UnderHeroMarquee from "../components/home/UnderHeroMarquee";

import ImgHomeDet2 from "../images/jordan_2_x_off_white_home.png";

import ImgHomeLat1 from "../images/8.jpg";

function Home() {
  /* const context = useContext(ProductContext);
  const { hotRelease: productsCount } = context; */

  return (
    <div className="home_layout">
      <div className="hero-img">
        <div className="hero-txt">
          <Link to="/nasdaq">
            <div className="os_button">
              <h2>TURN ON &#9888;</h2>
            </div>
          </Link>
        </div>
        <UnderHeroMarquee />
      </div>

      <div className="home-carousel">
        <HomeCarouselCustom /* productsCount={productsCount} */ />
      </div>

      <div className="home-det-cont">
        <div className="home-details">
          <img src={ImgHomeDet2} alt="shoe" className="home-details-img" />
          <div className="home-details-txt">
            <h1>Title</h1>
            <p>
              Laboris labore velit est eu irure. In ad consequat voluptate
              pariatur in qui excepteur quis id et ipsum eiusmod veniam
              consectetur. Laboris labore fugiat proident et enim minim sint
              voluptate. Adipisicing nostrud in laboris culpa qui ullamco
              eiusmod pariatur pariatur ex labore magna.
            </p>
            <Link to="/collections" className="btn-primary">
              Store
            </Link>
          </div>
          {/* <img src={ContSVG1} alt="cont svg" /> */}
        </div>
        <div className="svg-cont" />
      </div>

      <div className="home-lateral">
        <div className="home-lateral-grid">
          <img src={ImgHomeLat1} alt="suca" />
          <img src={ImgHomeLat1} alt="suca" />
          <img src={ImgHomeLat1} alt="suca" />
          <img src={ImgHomeLat1} alt="suca" />
        </div>
      </div>

      <div className="home-dx">
        <div className="skyline" />
      </div>
    </div>
  );
}

export default Home;
