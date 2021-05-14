import styled from 'styled-components';
import { fullDisplay } from '@utils/styleFunctions';

export const StyledBackground = styled.header`
    position: fixed;
    top: 0;
    background-color: ${({ theme }) => theme.white};
    user-select: none;
    width: 100%;
    z-index: 10;
    box-shadow: ${({ theme }) => theme.smoke50} 0 1px 0 0;
`;

export const StyledLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;

    @media (max-width: 719px) {
        height: 54px;
        padding: 0 12px;
    }

    @media (min-width: 720px) {
        height: 60px;
        padding: 0 20px;
    }
`;

export const StyledList = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const StyledCenteredLogo = styled.div`
    display: flex;
    max-width: 80px;
    position: absolute;
    ${fullDisplay};
    height: 54px;
    margin: 0 auto;
`;
