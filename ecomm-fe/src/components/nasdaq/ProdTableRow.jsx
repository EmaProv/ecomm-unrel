import React, { useEffect, useRef, useState } from "react";
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
    tdansition: { delay: 0.1 },
  },
};

function ProdTableRow({ product }) {
  const [isOpen, setOpen] = useState(false);
  const [isMob, setIsMob] = useState(false);
  const { ledWallLable, name, brand, slug, pngImg, retailPrice } = product;

  const dragAreaRef = useRef();

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
        <tr onClick={handleOpen}>
          {/* <div className="product-row" onClick={handleOpen}> */}
          <td>
            <h3>{ledWallLable}</h3>
          </td>
          <td>
            <img
              src={pngImg}
              alt={slug}
              style={{ width: "100%", margin: "auto 0" }}
            />
          </td>
          <td>
            <h3>{brand}</h3>
          </td>
          <td>
            <h3>{name}</h3>
          </td>
          <td>
            <h3 style={{ alignItem: "right" }}>€ {retailPrice}</h3>
          </td>
          {/* </div> */}
        </tr>
      ) : (
        <tr onClick={handleOpen}>
          {/* <div className="product-row-mob" onClick={handleOpen}> */}
          <td>
            <img
              src={pngImg}
              alt={slug}
              style={{ width: "60%", margin: "auto 0" }}
            />
          </td>
          <td>
            <h3>
              {brand} {name}
            </h3>
          </td>
          <td>
            <h3 style={{ alignItem: "right" }}>€ {retailPrice}</h3>
          </td>
          {/* </div> */}
        </tr>
      )}

      <motion.div className="modal-backdrop-drag-area" ref={dragAreaRef} />
      <AnimatePresence exitBeforeEnter onExitComplete={handleClose}>
        {isOpen && (
          <motion.div
            className="modal-backdrop-nasdaq"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            drag
            dragConstraints={dragAreaRef}
          >
            <motion.div className="modal-nasdaq" variants={modal}>
              <div className="modal-nasdaq-header">
                <i>x</i>
              </div>
              <h1>{name}</h1>
              <div className="modal-nasdaq-cont">
                <img src={pngImg} alt={slug} className="modal-nasdaq-img" />
                <div className="modal-nasdaq-det">
                  <a href="https://www.google.it/"> TEST</a>
                </div>

                <div className="modal-nasdaq-market">
                  <h1>MARKET SIZE DA ALtdI STORE</h1>
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

export default ProdTableRow;
