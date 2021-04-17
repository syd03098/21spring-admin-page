import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

const globalStyle = css`
    * {
        box-sizing: border-box;
        &:focus {
            outline: none;
        }
    }

    input,
    button {
        margin: 0;
        border: 0;
        background: none;
        outline: none;
    }

    body {
        margin: 0;
        padding: 0;
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
