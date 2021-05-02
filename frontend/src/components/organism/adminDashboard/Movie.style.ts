import styled from 'styled-components';

export const StyledMovieComponentWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    width: 100%;
    height: 100%;
`;

export const StyledMovieComponent = styled.section`
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
`;

export const StyledTabSubTitle = styled.h3`
    color: ${({ theme }) => theme.black60};
    margin-top: 8px;
    margin-bottom: 16px;
`;

export const StyledMovieSearchContainer = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 36px;
    border-radius: 4px;
    padding: 0 4px;
    margin: 8px 0;
    background-color: ${({ theme }) => theme.smoke50};
`;
