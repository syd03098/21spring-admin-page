import { createGlobalStyle } from 'styled-components';

export const flexCenter = (): string => `
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const fullDisplay = (): string => `
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const StyledPreventScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
