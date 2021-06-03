import styled from 'styled-components';
import { fullDisplay } from '@utils/styleFunctions';

export const StyledEmailFormWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    ${fullDisplay};
`;

export const StyledEmailFormContents = styled.div`
    position: relative;
    padding: 0 24px;
    width: 100%;
    max-width: 480px;
`;

export const StyledMastheadContainer = styled.div`
    position: relative;
    padding: 28px 0 0;

    @media (min-width: 720px) {
        padding: 60px 0 28px 0;
    }
`;

export const StyledSelectTabWrap = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 48px 0;
    @media (max-width: 719px) {
        padding: 24px 0;
    }
`;

export const StyledTabSelectNav = styled.ul`
    display: flex;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    list-style: none;
    border-bottom: 2px solid #f3f3f4;
    margin: 0 16px;
    @media (min-width: 720px) {
        margin: 0 36px;
    }
`;
