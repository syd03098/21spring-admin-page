import { createGlobalStyle, keyframes } from 'styled-components';

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

export const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
