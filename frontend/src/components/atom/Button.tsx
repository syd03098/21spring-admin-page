import React, { CSSProperties, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
    icon?: JSX.Element;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    style?: CSSProperties;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
    ({ children, icon, onClick, style, ...rest }: PropsWithChildren<Props>, ref) => {
        return (
            <StyledButton ref={ref} onClick={onClick} style={style} {...rest}>
                {!!icon && icon}
                {!!children && children}
            </StyledButton>
        );
    },
);

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
`;

export default Button;
