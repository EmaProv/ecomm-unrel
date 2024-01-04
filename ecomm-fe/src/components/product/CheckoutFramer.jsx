import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import pngIg from "../../images/png/syspng/instagram_png.png";
import pngTg from "../../images/png/syspng/telegram_png.png";
import pngX from "../../images/png/syspng/close_g_n.png";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const CheckoutFramer = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="checkout-cont">
      <button className="checkout-btn" onClick={handleOpen}>
        Checkout Esterno
      </button>

      <AnimatePresence exitBeforeEnter onExitComplete={handleClose}>
        {isOpen && (
          <motion.div
            className="modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="modal-checkout" variants={modal}>
              <div className="modal-checkout-cont-header">
                <button className="modal-checkout-btn" onClick={handleClose}>
                  <img src={pngX} alt="png close" />
                </button>
              </div>
              <div className="modal-checkout-cont">
                <h1>Checkout Esterno</h1>
                <p>
                  Ecomm lab utilizza i metodi di checkout tradizionali che
                  preferisci.
                </p>
                <div className="modal-checkout-links">
                  <a
                    href="https://www.instagram.com/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="modal-checkout-link-card">
                      <img src={pngIg} alt="png instagram" />
                      <h3>Instagram</h3>
                    </div>
                  </a>

                  <a
                    href="https://www.telegram.com/"
                    aria-label="Telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="modal-checkout-link-card">
                      <img src={pngTg} alt="png telegram" />
                      <h3>Ecomm Bot</h3>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutFramer;
