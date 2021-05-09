import React, { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import styled from 'styled-components';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import classNames from 'classnames';

interface Props {
    type?: 'primary' | 'smoke' | 'pink' | 'red' | 'default';
    size?: 'small' | 'large';
    fullHeight?: boolean;
    stretch?: boolean;
    icon?: JSX.Element;
    style?: CSSProperties;
    className?: string;
    href: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, PropsWithChildren<Props>>(
    (
        {
            children,
            type,
            size = 'large',
            fullHeight = false,
            stretch = false,
            icon,
            className,
            style,
            href,
            ...rest
        }: PropsWithChildren<Props>,
        ref,
    ) => {
        return (
            <StyledButtonLink
                ref={ref}
                className={classNames([
                    className,
                    type,
                    size && `size-${size}`,
                    fullHeight && 'full',
                    stretch && 'stretch',
                ])}
                href={href}
                style={style}
                {...rest}
            >
                {icon !== null && icon}
                {children !== null && children}
            </StyledButtonLink>
        );
    },
);

export default ButtonLink;

const StyledButtonLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    color: currentColor;

    &.size-small {
        height: 28px;
        padding: 6px 8px;
    }

    &.size-large {
        height: 40px;
        padding: 8px 12px;
    }

    &.full {
        height: 100%;
    }

    &.stretch {
        display: flex;
        width: 100%;
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
    &.default {
        border: 1px solid ${({ theme }) => theme.black80};
    }

    svg {
        margin-right: 4px;
    }
`;
