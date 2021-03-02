import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  
  ${normalize}
  
  * {
    box-sizing: border-box;
  }
  
  body, body * {
    font-family: "Helvetica Neue",-apple-system, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;
