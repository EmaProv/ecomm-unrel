import React from "react";

const CarouselArrow = ({ direction, doSlide }) => {
  return (
    <div
      className={
        direction === "next" ? "carousel-arrow-left" : "carousel-arrow-right"
      }
      onClick={doSlide}
    >
      {direction === "next" ? <>&#8641;</> : <>&#8637;</>}
    </div>
  );
};

export default CarouselArrow;
