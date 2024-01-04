import React, { useState } from "react";
import Modal from "react-modal";
// eslint-disable-next-line
import { Link } from "react-router-dom";

Modal.setAppElement("#root");
function Checkout() {
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

      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            top: 50,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="checkout-modal-cont">
          <h1>Checkout Esterno</h1>
          <p>
            Ecomm utilizza i metodi di checkout tradizionali che preferisci.
          </p>
        </div>

        <div className="checkout-modal-grid">
          <div className="chekout-modal-cont-card">Vinted</div>
          <div className="chekout-modal-cont-card">ebay</div>
          <div className="chekout-modal-cont-card">BOH</div>
        </div>

        <div className="chcekout-modal-cont-footer">
          <button className="chcekout-modal-btn" onClick={handleClose}>
            Chiudi
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Checkout;
