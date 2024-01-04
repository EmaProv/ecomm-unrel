import React from "react";

function ProductGallery({ product }) {
  const { images1, images2, slug } = product;

  const [heroImg1, ...rest1] = images1;
  const [heroImg2, ...rest2] = images2;

  /* const [mainImg, galleryImg0, ...galleryImg] = images; */

  /* const arr1 = images.splice(1, 7);

  const half = Math.ceil(arr1.length / 2);
  const firstHalf = arr1.slice(0, half);
  const secondHalf = arr1.slice(-half);

  const [heroImg, ...rest1] = firstHalf;
  const [midImg, ...rest2] = secondHalf; */

  console.log(images1, images2);
  return (
    <>
      <div className="gallery-track">
        <div className="gallery">
          <div className="gallery-cont-img-hero">
            <img
              /* src={galleryImg0} */ src={heroImg1}
              alt={slug}
              className="gallery-img-hero"
            />
          </div>

          {rest1.map((product, index) => (
            <div className="gallery-cont-img" key={index}>
              <img
                key={index}
                src={product}
                alt={slug}
                className="gallery-img"
              />
            </div>
          ))}

          <div className="gallery-cont-img-hero">
            <img
              /* src={galleryImg0} */ src={heroImg2}
              alt={slug}
              className="gallery-img-hero"
            />
          </div>

          {rest2.map((product, index) => (
            <div className="gallery-cont-img" key={index}>
              <img
                key={index}
                src={product}
                alt={slug}
                className="gallery-img"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductGallery;

/* 
    *Array distructuring*
    const { images } = product;
    const [mainImg, ...defaultImg] = images 
*/
