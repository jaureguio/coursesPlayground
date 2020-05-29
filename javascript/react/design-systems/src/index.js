import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  SignUpModal,
} from "./components";
import { GlobalStyles, darkTheme, defaultTheme } from "./utils";

const App = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);
  const [showModal, setShowModal] = useState(true);
  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : defaultTheme}>
      <button
        style={{ margin: "0 16px 24px", padding: "18px", background: "none" }}
        onClick={() => setUseDarkTheme((theme) => !theme)}
      >
        {useDarkTheme ? "default theme" : "dark theme"}
      </button>
      <button
        style={{ margin: "0 16px 24px", padding: "18px", background: "none" }}
        onClick={() => setShowModal((s) => !s)}
      >
        Toggle Modal
      </button>
      <div
        style={{
          background: useDarkTheme
            ? defaultTheme.primaryColor
            : darkTheme.primaryColor,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <SignUpModal showModal={showModal} setShowModal={setShowModal} />
      </div>
      <GlobalStyles />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
