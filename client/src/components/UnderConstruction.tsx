import React from "react";

const UnderConstruction = () => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: "10px",
        flexGrow: "1",
      }}
    >
      <img src={require("../assets/img/dev.jpg")}></img>
    </div>
  );
};

export default UnderConstruction;
