import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { UilTrashAlt } from "@iconscout/react-unicons";
import { deleteProduct } from "../../../redux/api/user-zero-api";

function DeleteBtnWH({ id, brand, colorway }) {
  const [showMod, setShowMod] = useState(false);
  const [onSucc, setOnSucc] = useState();

  const dispatch = useDispatch();

  const onDeleteProd = () => {
    deleteProduct(id, dispatch);
  };

  const handleModalOpen = () => {
    setShowMod(true);
  };

  const handleModalClose = () => {
    setShowMod(false);
  };

  return (
    <>
      <button onClick={handleModalOpen} className="private-area-del-btn">
        <UilTrashAlt />
      </button>

      {showMod ? (
        <div className="action-card-cont">
          <div className="action-card">
            <p>
              Are you sure do you want to delete:
              <b>{brand}</b> <b>{colorway}</b>?
              <br />
              (ID: {id})
            </p>

            <button onClick={onDeleteProd}>Delete</button>
            <button onClick={handleModalClose}>Exit</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteBtnWH;
