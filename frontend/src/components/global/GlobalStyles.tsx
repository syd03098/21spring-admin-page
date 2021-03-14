import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
  
  ${normalize}
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  *:focus {
    outline: none;
  }
  
  button {
    outline: none;
  }
  
  body, body * {
    font-family: "Helvetica Neue",-apple-system, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;
