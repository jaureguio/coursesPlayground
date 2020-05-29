import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { primaryFont } from "./typography";

export const GlobalStyles = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-size: ${primaryFont};
  }

  main {
    width: 90%;
    margin: 0 auto;
  }
`;
