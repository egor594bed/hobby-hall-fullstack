import React from "react";
import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.LoaderWrapper}>
      <div className={classes.Loader}></div>
    </div>
  );
};

export default Loader;
