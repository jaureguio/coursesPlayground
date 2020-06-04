import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Counter from "./Counter";

import "./styles.css";

const Home = () => (
  <div>
    Welcome!
    <Link to="/counters">Go to counters</Link>
  </div>
);

const Application = () => {
  return (
    <main className="Application">
      <Route exact path="/" component={Home} />
      <Route path="/counters" component={Counter} />
    </main>
  );
};

render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById("root")
);
