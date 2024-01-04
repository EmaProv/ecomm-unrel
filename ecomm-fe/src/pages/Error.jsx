import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div className="error-layout">
        <div className="hero-img">
          <div className="err-txt">
            <h1>ERROR 404: </h1>
            <h1>SHOES NOT FOUND!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
