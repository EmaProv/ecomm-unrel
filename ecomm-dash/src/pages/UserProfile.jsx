import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import imgProf from "../imgs/bg.jpg";
import "../styles/userProfile.css";

function UserProfile() {
  const id = useSelector((state) => state.user.currentUser.userId);
  const actualUser = useSelector((state) =>
    state.admin.admins.find((a) => a._id === id)
  );

  return (
    <div className="user-info-layout">
      <div className="user-info-card">
        <img alt="avatar" src={imgProf} className="user-info-card-avatar" />
        <h3>Ciao, {actualUser.name}</h3>
        <Link to={`/edit-admin/` + actualUser._id} className="link-btn">
          Edit Profile
        </Link>
      </div>

      <div className="user-info-grid-cont">
        <h3>User Info</h3>
        <div className="user-info-grid">
          <span>Name</span>
          <div className="user-info-field">
            <p>{actualUser.name}</p>
          </div>
          <span>Surname</span>
          <div className="user-info-field">
            <p>{actualUser.surname}</p>
          </div>
          <span>Email</span>
          <div className="user-info-field">
            <p>{actualUser.email}</p>
          </div>
          <span>Username</span>
          <div className="user-info-field">
            <p>{actualUser.username}</p>
          </div>
          <span>Password</span>
          <div className="user-info-field">
            <Link to="/">Reset Password</Link>
          </div>
        </div>
      </div>

      <div className="user-info-settings-cont">
        <h3>IPOSTAZIONI</h3>
        <div className="user-info-settings-grid">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              /* onClick={handleChangeTheme}
              checked={theme === "light"} */
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
