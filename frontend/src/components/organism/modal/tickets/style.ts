import styled, { css } from 'styled-components';

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

export const StyledSeatButton = styled.button<{ selected: boolean }>`
    display: inline-flex;
    width: 28px;
    height: 21px;
    margin: 5px 2px;
    border: transparent;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.smoke50};
    border: 1px solid ${({ theme }) => theme.smoke80};
    border-radius: 5px 5px 2px 2px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    ${(props) =>
        props.selected &&
        css`
            background-color: ${({ theme }) => theme.pink};
            color: ${({ theme }) => theme.white};
            border: transparent;
        `}
    &:disabled {
        background-color: ${({ theme }) => theme.black30};
        border: transparent;
        color: transparent;
        cursor: initial;
    }
`;
