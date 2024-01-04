import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UilTrashAlt } from "@iconscout/react-unicons";
import { deleteAdmin } from "../../../redux/api/user-zero-api";

function DeleteBtn({ id }) {
  const [showMod, setShowMod] = useState(false);

  const dispatch = useDispatch();

  const selAdmin = useSelector((state) =>
    state.admin.admins.find((a) => a._id === id)
  );

  const onDeleteAdmin = () => {
    deleteAdmin(id, dispatch);
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
              Are you sure do you want to delete: <b>{selAdmin.username}</b>?
            </p>

            <button onClick={onDeleteAdmin}>Delete</button>
            <button onClick={handleModalClose}>Exit</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteBtn;
