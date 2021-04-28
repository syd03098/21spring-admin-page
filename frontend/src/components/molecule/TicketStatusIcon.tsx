import React from 'react';
import styled from 'styled-components';
import TicketIcon from '@components/atom/icons/Ticket';
import Globe from '@components/atom/Globe';
import FlexBox from '@components/atom/FlexBox';

const TicketStatusIcon = (): JSX.Element => {
    return (
        <NavBarItem>
            <TicketIcon />
            <NavbarTicketGlobe />
            <NavbarTicketLength>0</NavbarTicketLength>
        </NavBarItem>
    );
};

export default TicketStatusIcon;

const NavBarItem = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.black40};
`;

const NavbarTicketGlobe = styled(Globe)`
    top: 12px;
    right: 16px;
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.smoke100};
    color: ${({ theme }) => theme.white};
`;

const NavbarTicketLength = styled(FlexBox)`
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 12px;
    right: 16px;
    width: 16px;
    height: 16px;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.smoke50};
`;
