import { createGlobalStyle, css } from 'styled-components';
import { normalize } from '@pages/Normalize';

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

    body {
        @media (min-width: 720px) {
            padding-top: 80px;
        }
        @media (max-width: 719px) {
            padding-top: 64px;
        }
    }
`;

export default createGlobalStyle`
  ${normalize}
  ${globalStyle}
`;
