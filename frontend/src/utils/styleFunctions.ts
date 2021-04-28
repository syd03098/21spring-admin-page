import { createGlobalStyle } from 'styled-components';

export const flexCenter = (): string => `
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledPreventScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
