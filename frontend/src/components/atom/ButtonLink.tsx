import React, { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import styled from 'styled-components';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import classNames from 'classnames';

interface Props {
    type?: 'primary' | 'smoke' | 'pink' | 'red' | 'default';
    icon?: JSX.Element;
    style?: CSSProperties;
    href: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, PropsWithChildren<Props>>(
    ({ children, type = 'default', icon, style, href, ...rest }: PropsWithChildren<Props>, ref) => {
        return (
            <StyledButtonLink className={classNames([type])} href={href} ref={ref} style={style} {...rest}>
                {!!icon && icon}
                {!!children && children}
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
    color: white;
    padding: 10px 16px;
    &.primary {
        background-color: ${({ theme }) => theme.primary100};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.primary100)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.primary100)};
        }
    }
    &.smoke {
        background-color: ${({ theme }) => theme.smoke80};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.smoke80)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.smoke80)};
        }
    }
    &.pink {
        background-color: ${({ theme }) => theme.pink};
        &:hover {
            background-color: ${({ theme }) => lighten(0.1, theme.pink)};
        }
        &:active {
            background-color: ${({ theme }) => darken(0.1, theme.pink)};
        }
    }
    &.default {
        color: ${({ theme }) => theme.black100};
    }
`;
