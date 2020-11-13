import React from "react";
import { App } from "./App";
import ReactDom from "react-dom";

const Index = () => {
  return <App />;
};

ReactDom.render(<Index />, document.getElementById("root"));
