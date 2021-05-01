import React, { CSSProperties, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import classNames from 'classnames';

interface Props {
    icon?: JSX.Element;
    radius?: '2px' | '4px' | '8px';
    type?: 'primary' | 'smoke' | 'pink' | 'red';
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    style?: CSSProperties;
}

const Button = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ children, icon, radius, type, onClick, className, style, ...rest }: PropsWithChildren<Props>, ref) => {
        return (
            <StyledButton
                ref={ref}
                className={classNames([className, radius && `radius-${radius}`, type && `type-${type}`])}
                onClick={onClick}
                style={style}
                {...rest}
            >
                {icon != null && icon}
                {children != null && children}
            </StyledButton>
        );
    },
);

const StyledButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    height: 40px;
    color: initial;

    &.type-primary {
        padding: 10px 16px;
        background-color: ${({ theme }) => theme.primary100};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.primary100)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.primary100)};
        }
    }
    &.type-smoke {
        padding: 10px 16px;
        background-color: ${({ theme }) => theme.smoke80};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.smoke80)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.smoke80)};
        }
    }
    &.type-pink {
        padding: 10px 16px;
        background-color: ${({ theme }) => theme.pink};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.pink)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.pink)};
        }
    }

    &.radius-2px {
        border-radius: 2px;
    }

    &.radius-4px {
        border-radius: 4px;
    }

    &.radius-8px {
        border-radius: 8px;
    }

    svg {
        margin-right: 4px;
    }
`;

export default Button;
