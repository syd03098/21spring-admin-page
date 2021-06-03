import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ProfileTab } from '@pages/profile';
import { TicketDetail } from '@utils/api/profile/types';
import Chat from '@components/atom/icons/Chat';
import TicketCard from '@components/molecule/ticketGroup/TicketCard';
import { requestCancelTicket } from '@utils/api/profile';
import { useToast } from '@stores/ToastStore';
import { useHistory } from 'react-router-dom';

interface Props {
    currentTab: ProfileTab;
    tickets: TicketDetail[];
}

const TicketGroup = ({ currentTab, tickets }: Props): JSX.Element => {
    const { appendToast } = useToast();
    const history = useHistory();

    const onCancelTicketHandler = useCallback(
        async (payId: number) => {
            try {
                const { status } = await requestCancelTicket(payId);
                if (status === 204) {
                    history.go(0);
                }
            } catch (e) {
                appendToast('해당 티켓을 예매 취소하는데 실패했습니다.', { type: 'error', timeout: 5000 });
            }
        },
        [appendToast, history],
    );

    return (
        <StyledTicketsContainer>
            {tickets.length !== 0 && (
                <StyledGridTemplates>
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.payId}
                            currentTab={currentTab}
                            ticketDetail={ticket}
                            onCancelTicket={() => onCancelTicketHandler(ticket.payId)}
                        />
                    ))}
                </StyledGridTemplates>
            )}
            {tickets.length === 0 && (
                <Message>
                    <Chat size={28} />
                    <p>검색된 내역이 없습니다.</p>
                </Message>
            )}
        </StyledTicketsContainer>
    );
};

const StyledTicketsContainer = styled.div`
    display: block;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px;
    @media (min-width: 720px) {
        padding: 0 36px;
    }
`;

const StyledGridTemplates = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
    grid-gap: 36px;
    justify-items: center;
`;

const Message = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 36px;
    p {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.4px;
    }
`;

export default TicketGroup;
