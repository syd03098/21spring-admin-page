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
    type?: 'primary' | 'smoke' | 'pink' | 'red';
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const Button = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
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
            style,
            ...rest
        }: PropsWithChildren<Props>,
        ref,
    ) => {
        return (
            <StyledButton
                ref={ref}
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

const StyledButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;
    border-radius: 4px;
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

    &.primary {
        background-color: ${({ theme }) => theme.primary100};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.primary100)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.primary100)};
        }
    }
    &.smoke {
        background-color: ${({ theme }) => theme.smoke80};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.smoke80)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.smoke80)};
        }
    }
    &.pink {
        background-color: ${({ theme }) => theme.pink};
        color: ${({ theme }) => theme.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.pink)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.pink)};
        }
    }

    svg {
        margin-right: 4px;
    }
`;

export default Button;
