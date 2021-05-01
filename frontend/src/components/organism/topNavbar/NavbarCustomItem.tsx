import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import ButtonLink from '@components/atom/ButtonLink';
import Button from '@components/atom/Button';

interface Props {
    href?: string;
    icon?: JSX.Element;
    children?: ReactNode;
}

const NavbarCustomItem = ({ href, icon, children }: Props): JSX.Element => {
    const customChildren = useMemo(
        () =>
            href ? (
                <ButtonLink href={href} icon={icon}>
                    <span>{children}</span>
                </ButtonLink>
            ) : (
                <Button icon={icon}>
                    <span>{children}</span>
                </Button>
            ),
        [children, href, icon],
    );

    return <NavBarColumnWrap>{customChildren}</NavBarColumnWrap>;
};

const NavBarColumnWrap = styled.li`
    display: flex;
    align-items: center;
    padding: 0 10px;
    list-style: none;
`;

export default NavbarCustomItem;
