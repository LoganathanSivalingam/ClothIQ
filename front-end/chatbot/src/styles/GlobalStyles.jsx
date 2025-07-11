// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
    color: #333;
  }

  #root {
    display: flex;
    min-height: 100vh;
  }
`;

export default GlobalStyle;