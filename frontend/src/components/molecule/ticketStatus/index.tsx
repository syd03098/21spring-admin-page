import React from 'react';
import Ticket from '@components/atom/icons/Ticket';
import styled from 'styled-components';
import Globe from '@components/atom/Globe';

const TicketStatus = (): JSX.Element => {
    return (
        <TicketWrap href="/profile">
            <TicketContents>
                <Ticket size={30} />
                <GlobeContainer>0</GlobeContainer>
            </TicketContents>
        </TicketWrap>
    );
};

const TicketWrap = styled.a`
    padding: 0 8px;
    text-decoration: none;
`;

const TicketContents = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.black80};
`;

const GlobeContainer = styled(Globe)`
    background-color: ${({ theme }) => theme.smoke100};
    width: 16px;
    height: 16px;
    top: 0;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};
`;

export default TicketStatus;
