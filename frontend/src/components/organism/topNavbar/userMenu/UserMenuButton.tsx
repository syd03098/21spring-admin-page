import React, { MouseEventHandler, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import Button from '@components/atom/Button';

interface Props {
    icon?: JSX.Element;
    children?: ReactNode;
    href?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

const UserMenuButton = ({ icon, href, children, onClick }: Props): JSX.Element => {
    const customChildren = useMemo(() => {
        return (
            <Button icon={icon}>
                <span>{children}</span>
            </Button>
        );
    }, [children, icon]);

    return href ? (
        <UserMenuBtnLink href={href} onClick={onClick}>
            {customChildren}
        </UserMenuBtnLink>
    ) : (
        <UserMenuBtn onClick={onClick}>{customChildren}</UserMenuBtn>
    );
};

const UserMenuBtnLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 12px 0 6px;
    text-decoration: none;
`;

const UserMenuBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 12px 0 6px;
`;

export default UserMenuButton;
