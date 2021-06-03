import React, { useMemo } from 'react';
import Ticket from '@components/atom/icons/Ticket';
import styled, { css } from 'styled-components';
import Globe from '@components/atom/Globe';
import { useTickets } from '@pages/ticketContext';

const TicketStatus = (): JSX.Element => {
    const { count: fetchedCount } = useTickets();

    const displayedCount: string = useMemo(() => {
        return fetchedCount > 9 ? '+9' : String(fetchedCount);
    }, [fetchedCount]);

    return (
        <TicketWrap href="/profile">
            <TicketContents>
                <Ticket size={30} />
                <GlobeContainer active={fetchedCount > 0}>{displayedCount}</GlobeContainer>
            </TicketContents>
        </TicketWrap>
    );
};

const TicketWrap = styled.a`
    display: flex;
    align-items: center;
    justify-items: center;
    text-decoration: none;
    margin: 0 8px;
`;

const TicketContents = styled.div`
    position: relative;
    color: ${({ theme }) => theme.black80};
`;

const GlobeContainer = styled(Globe)<{ active: boolean }>`
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

    ${(props) =>
        props.active &&
        css`
            background-color: ${({ theme }) => theme.pink};
        `}
`;

export default TicketStatus;
