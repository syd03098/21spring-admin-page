import styled from 'styled-components';
import { flexCenter } from '@utils/styleFunctions';

// 어드민 모달 zIndex
const zIndex = 1000;

export const StyledModalPosition = styled.div`
    ${flexCenter};
    z-index: ${zIndex};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
`;

export const StyledModalBackground = styled.div`
    z-index: ${zIndex + 1};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.black80};
    opacity: 0.7;
`;

export const StyledModalContainer = styled.div`
    display: flex;
    align-items: stretch;
    z-index: ${zIndex + 2};
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.white};
    border-radius: 8px;
    overflow: hidden;
`;
