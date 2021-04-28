import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { flexCenter } from '@utils/styleFunctions';
import classNames from 'classnames';

interface Props {
    label?: string;
    prependIcon?: ReactNode;
    padded?: boolean;
    onClick?: () => void;
}

const NavbarItem = ({ prependIcon, label, padded, onClick }: Props): JSX.Element => {
    return (
        <>
            <NavbarItemWrap className={classNames({ padded })} onClick={onClick}>
                {!!label && label}
                {!!prependIcon && prependIcon}
            </NavbarItemWrap>
        </>
    );
};

const NavbarItemWrap = styled.div`
    ${flexCenter};
    cursor: pointer;

    &.padded {
        padding: 0 12px;
    }
`;

export default NavbarItem;
