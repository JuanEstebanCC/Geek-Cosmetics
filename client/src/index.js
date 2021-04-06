import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cosmetics from "./pages/Cosmetics";
import NewCosmetics from "./pages/NewCosmetics";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/cosmetics" component={Cosmetics} />
      <Route exact path="/cosmetics/new" component={NewCosmetics} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
