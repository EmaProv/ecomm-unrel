import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "70px",
    opacity: 0,
  },
  visible: {
    y: "70px",
    opacity: 1,
    transition: { delay: 0.1 },
  },
};

function ProdNasdaqRow({ product }) {
  const [isOpen, setOpen] = useState(false);
  const [isMob, setIsMob] = useState(false);
  const { ledWallLable, name, brand, slug, pngImg, retailPrice } = product;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateMedia = () => {
    setIsMob(window.innerWidth < 830);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      {!isMob ? (
        <div className="product-row" onClick={handleOpen}>
          <h3>{ledWallLable}</h3>
          <img
            src={pngImg}
            alt={slug}
            style={{ width: "60%", margin: "auto 0" }}
          />
          <h3>{brand}</h3>
          <h3>{name}</h3>
          <h3 style={{ alignItem: "right" }}>€ {retailPrice}</h3>

          <div className="product-row-overlay" />
        </div>
      ) : (
        <div className="product-row-mob" onClick={handleOpen}>
          <img
            src={pngImg}
            alt={slug}
            style={{ width: "60%", margin: "auto 0" }}
          />
          <h3>
            {brand} {name}
          </h3>
          <h3 style={{ alignItem: "right" }}>€ {retailPrice}</h3>
          <div className="product-row-overlay" />
        </div>
      )}

      <AnimatePresence exitBeforeEnter onExitComplete={handleClose}>
        {isOpen && (
          <motion.div
            className="modal-backdrop-nasdaq"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="modal-nasdaq" variants={modal}>
              <h1>{name}</h1>
              <div className="modal-nasdaq-cont">
                <img src={pngImg} alt={slug} className="modal-nasdaq-img" />
                <div className="modal-nasdaq-det">
                  <a href="https://www.google.it/"> TEST</a>
                </div>

                <div className="modal-nasdaq-market">
                  <h1>MARKET SIZE DA ALTRI STORE</h1>
                </div>
              </div>

              <div className="modal-nasdaq-cont-footer">
                <button className="modal-nasdaq-btn" onClick={handleClose}>
                  Chiudi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProdNasdaqRow;
