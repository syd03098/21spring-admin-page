import styled from 'styled-components';

export const StyledBottomFixed = styled.div`
    flex: 0 0 auto;
    background-color: ${({ theme }) => theme.white};
    padding: 12px 8px 0 8px;
    border-radius: 10px 10px 0 0;
    border: 1px solid ${({ theme }) => theme.smoke80};
`;

export const StyledOptionControlArea = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 720px;
    margin: 0 auto;
`;
