import React from 'react';
import styled from 'styled-components';
import { rotate } from '@utils/animations';

interface Props {
    size?: number;
}

const Spinner = ({ size = 24 }: Props): JSX.Element => {
    return <StyledSpinner size={size} />;
};

const StyledSpinner = styled.div<{ size: number }>`
    border-style: solid;
    border-color: transparent;
    border-left-color: ${({ theme }) => theme.primary50};
    border-left-width: 4px;
    border-radius: 50%;
    animation: ${rotate} 0.5s linear infinite;
    display: inline-block;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`;

export default Spinner;
