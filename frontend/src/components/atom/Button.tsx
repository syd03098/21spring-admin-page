import React, { CSSProperties, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import classNames from 'classnames';

interface Props {
    icon?: JSX.Element;
    size?: 'small' | 'large';
    fullHeight?: boolean;
    stretch?: boolean;
    type?: 'primary' | 'smoke' | 'pink' | 'red' | 'white' | 'default';
    className?: string;
    disabled?: boolean;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
    (
        {
            children,
            icon,
            type,
            size = 'large',
            stretch = false,
            fullHeight = false,
            onClick,
            className,
            disabled = false,
            style,
            ...rest
        }: PropsWithChildren<Props>,
        ref,
    ) => {
        return (
            <StyledButton
                ref={ref}
                disabled={disabled}
                className={classNames([className, type, fullHeight && 'full', size && `size-${size}`])}
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

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    border-radius: 4px;
    letter-spacing: -0.8px;
    color: currentColor;
    &.size-small {
        padding: 6px 8px;
        height: 28px;
    }
    &.size-large {
        padding: 8px 12px;
        height: 40px;
    }
    &.stretch {
        display: flex;
        width: 100%;
    }
    &.full {
        height: 100%;
    }
    &:disabled {
        opacity: 0.5;
        cursor: initial;
    }
    &.primary {
        background-color: ${({ theme }) => theme.primary100};
        color: ${({ theme }) => theme.white};
        &:hover:not(:disabled) {
            background-color: ${({ theme }) => lighten(0.1, theme.primary100)};
        }
        &:active:not(:disabled) {
            background-color: ${({ theme }) => darken(0.1, theme.primary100)};
        }
    }
    &.smoke {
        background-color: ${({ theme }) => theme.smoke80};
        color: ${({ theme }) => theme.white};
        &:hover:not(:disabled) {
            background-color: ${({ theme }) => lighten(0.1, theme.smoke80)};
        }
        &:active:not(:disabled) {
            background-color: ${({ theme }) => darken(0.1, theme.smoke80)};
        }
    }
    &.pink {
        background-color: ${({ theme }) => theme.pink};
        color: ${({ theme }) => theme.white};
        &:hover:not(:disabled) {
            background-color: ${({ theme }) => lighten(0.1, theme.pink)};
        }
        &:active:not(:disabled) {
            background-color: ${({ theme }) => darken(0.1, theme.pink)};
        }
    }
    &.white {
        background-color: transparent;
        color: ${({ theme }) => theme.white};
        border: 1px solid ${({ theme }) => theme.white};
    }
    &.default {
        border: 1px solid ${({ theme }) => theme.black80};
    }
    & > svg + span {
        margin-left: 4px;
    }
`;

export default Button;
