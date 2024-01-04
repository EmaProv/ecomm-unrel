import React from "react";

function ProductGalleryMob({ product }) {
  const { images1, images2, slug } = product;

  /* const galleryImgMob = images.splice(1, 7); */
  // eslint-disable-next-line
  const newGalleryMob = images1.concat(images2);
  //const [mainImg, ...galleryImgMob] = images;

  console.log(newGalleryMob);

  return (
    <div className="gallery-track-mob">
      <div className="swiper-cont">
        {newGalleryMob.map((product, index) => (
          <div className="gallery-swiper-cont-img" key={index}>
            <img
              key={index}
              src={product}
              alt={slug}
              className="gallery-swiper-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGalleryMob;
