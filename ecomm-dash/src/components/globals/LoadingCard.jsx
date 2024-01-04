import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

function LoadingCard(props) {
  const [state, setState] = useState("LOAD");

  console.log(state);
  useEffect(() => {
    setState(props.reqState);
  }, [props.reqState]);

  const onCloseModal = () => {
    props.showMod(false);
  };
  if (state === "LOAD") {
    return (
      <div className="loading-card-cont">
        <div className="loading-card">
          <h4>Loading...</h4>
        </div>
      </div>
    );
  } else if (state === "PASS") {
    return (
      <div className="loading-card-cont">
        <div className="loading-card">
          {props && props.reqState === "PASS" && (
            <h4>Operazione completata!</h4>
          )}
        </div>
      </div>
    );
  } else if (state === "PASS_EDTPR") {
    return (
      <div className="loading-card-cont">
        <div className="loading-card">
          {props && props.reqState === "PASS_EDTPR" && (
            <h4>Operazione completata!</h4>
          )}
          <Link to="/warehouse">Torna al Magazzino</Link>
        </div>
      </div>
    );
  } else {
    <div className="loading-card-cont">
      <div className="loading-card">
        <h4>Errore durante la fase di creazione</h4>
        {props.res.resStatus && <h5>Err code: {props.res.resStatus}</h5>}
        {props.res.msg && (
          <>
            <h5>Err msg: </h5>
            <h5>{props.res.msg} </h5>
          </>
        )}
        <button onClick={onCloseModal}>Riprova</button>
      </div>{" "}
    </div>;
  }
}

export default LoadingCard;
