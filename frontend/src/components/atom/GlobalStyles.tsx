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
        padding: 0;
        border: 0;
        background: none;
        outline: none;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }
`;

export default createGlobalStyle`
  ${normalize}
  ${globalStyle}
`;
