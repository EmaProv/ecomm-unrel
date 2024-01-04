import React, { Component } from "react";

import Img2 from "../images/3.jpg";

import "../style/about.scss";

class About extends Component {
  render() {
    return (
      <div className="about-layout">
        <div className="about-title">
          <h1>ABOUT US</h1>
        </div>

        <div className="about-descr">
          <img src={Img2} alt="iimage" className="about-img" />
          <div className="about-descr-txt">
            <h1>ECOMM</h1>
            <p>
              Voluptate minim consequat tempor non fugiat proident fugiat
              pariatur sint consequat ut veniam. Esse cupidatat Lorem minim elit
              enim ipsum eu. Deserunt enim magna velit anim eu amet. Nostrud est
              eu reprehenderit magna pariatur cillum labore. Reprehenderit
              veniam anim ex nulla labore anim. Dolor exercitation incididunt in
              officia pariatur irure in eu officia sint elit ea. Officia id
              magna reprehenderit mollit laboris occaecat culpa eiusmod commodo
              minim.Aliquip amet irure voluptate consequat cupidatat nostrud
              nisi deserunt incididunt eiusmod eiusmod minim eiusmod. Eu
              deserunt id consectetur minim eu fugiat veniam consequat
              consectetur Lorem consectetur. Minim reprehenderit aliqua labore
              elit excepteur cillum velit sit ut cillum aliquip. Sit id duis
              quis culpa reprehenderit eu eu anim do et non pariatur nostrud
              occaecat.
            </p>
          </div>
        </div>

        <div className="about-contact-cont">
          <div className="about-contact-txt">
            <h1>CONTACT US</h1>
            <ul>
              <li>email: </li>
              <li>social: </li>
              <li>telegram: </li>
            </ul>
          </div>
          <img src={Img2} alt="iimage" className="about-img" />
        </div>
      </div>
    );
  }
}

export default About;
