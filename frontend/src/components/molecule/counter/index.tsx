import React from 'react';
import Button from '@components/atom/Button';
import Plus from '@components/atom/icons/Plus';
import Minus from '@components/atom/icons/Minus';
import styled from 'styled-components';

interface Props {
    label: string;
    quantity: number;
    onClickPlusHandler?: () => void;
    onClickMinusHandler?: () => void;
    isDisabled: boolean;
}

const Counter = ({ label, quantity, onClickMinusHandler, onClickPlusHandler, isDisabled }: Props): JSX.Element => {
    return (
        <StyledCounter>
            <span>{label}</span>
            <StyledButtonContainer>
                <Button icon={<Minus size={20} />} onClick={onClickMinusHandler} disabled={isDisabled} />
                <input readOnly value={quantity} />
                <Button icon={<Plus size={20} />} onClick={onClickPlusHandler} disabled={isDisabled} />
            </StyledButtonContainer>
        </StyledCounter>
    );
};

export const StyledCounter = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    span {
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.black80};
        margin-bottom: 3px;
        letter-spacing: -0.8px;
    }
`;

export const StyledButtonContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.smoke80};
    box-shadow: ${({ theme }) => theme.smoke30} 0 0 2px 1px;
    border-radius: 4px;
    input {
        width: 20px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }
`;

export default Counter;
