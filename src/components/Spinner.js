import React from "react";
import loader from "./loader.gif";

const Spinner = () => {
  return (
    <div className="loader-container ">
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Spinner;
