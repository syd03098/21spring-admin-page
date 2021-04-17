import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

const globalStyle = css`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
    }

    *:focus {
        outline: none;
    }

    button {
        background: none;
        outline: none;
    }

    body,
    body * {
        font-family: 'Helvetica Neue', -apple-system, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }
`;

export default createGlobalStyle`
  ${normalize}
  ${globalStyle}
`;
