import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
    dateTop: string;
    dateBottom: string;
    onSelect: () => void;
    selected: boolean;
}

const DateSelectCard = ({ dateTop, dateBottom, onSelect, selected }: Props): JSX.Element => {
    return (
        <StyledDateSelectCard selected={selected} onClick={onSelect}>
            <StyledDateContents>
                <dt>{dateTop}</dt>
                <dd>{dateBottom}</dd>
            </StyledDateContents>
        </StyledDateSelectCard>
    );
};

const StyledDateSelectCard = styled.li<{ selected: boolean }>`
    display: inline-flex;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.smoke80};
    margin-right: 6px;
    color: ${({ theme }) => theme.black100};
    cursor: pointer;
    ${(props) =>
        props.selected &&
        css`
            background-color: ${({ theme }) => theme.pink};
            color: ${({ theme }) => theme.white};
            border: 1px solid transparent;
        `}
`;

const StyledDateContents = styled.div`
    position: relative;
    padding: 0 12px;
    text-align: center;
    letter-spacing: -0.6px;
    user-select: none;
    dt {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
        margin-top: 12px;
    }
    dd {
        font-size: 20px;
        font-weight: 600;
        margin: 12px 0;
    }
`;

export default DateSelectCard;
