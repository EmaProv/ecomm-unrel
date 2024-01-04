import React from "react";
import loadingGif from "../../images/gif/spinner-400px.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h4>product loading...</h4>
      <img src={loadingGif} alt="loading" />
    </div>
  );
}
