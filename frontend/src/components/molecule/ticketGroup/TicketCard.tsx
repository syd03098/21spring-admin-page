import React, { useMemo } from 'react';
import { TicketDetail } from '@utils/api/profile/types';
import styled, { css } from 'styled-components';
import Button from '@components/atom/Button';
import { ProfileTab } from '@pages/profile';
import { makeCustomerIdLabel, makeTicketStateLabel } from '@utils/utilFunctions';
import {
    StyledTicketCardWrap,
    StyledTicketCardContents,
    StyledTicketCardTemplates,
    StyledTicketDetailRow,
} from '@components/molecule/ticketGroup/TicketCard.style';

interface Props {
    currentTab: ProfileTab;
    ticketDetail: TicketDetail;
    onCancelTicket: () => void;
}

const TicketCard = ({ currentTab, ticketDetail, onCancelTicket }: Props): JSX.Element => {
    const { seatsList, theaterName, movieName, payPrice, payDate, payState, showCount, showStartTime } = ticketDetail;

    const ticketListString = useMemo(() => {
        let string = '';
        seatsList.forEach((seat) => {
            string += `${makeCustomerIdLabel(seat.customerType)}(${String.fromCharCode(seat.seatRow + 64)}${
                seat.seatCol
            }) `;
        });
        return string;
    }, [seatsList]);

    const ticketCardContents = useMemo(
        () => (
            <>
                <h2>
                    {movieName}({showCount}회차)
                </h2>
                <TicketDetailRow>
                    <dt>상영일시</dt>
                    <dd>{showStartTime}</dd>
                </TicketDetailRow>
                <TicketDetailRow>
                    <dt>상영관</dt>
                    <dd>{theaterName}</dd>
                </TicketDetailRow>
                <TicketDetailRow>
                    <dt>결제일시</dt>
                    <dd>{payDate}</dd>
                </TicketDetailRow>
                <TicketDetailRow>
                    <dt>결제금액</dt>
                    <dd>{payPrice}원</dd>
                </TicketDetailRow>
                <TicketDetailBreakLine>
                    <dt>좌석</dt>
                    <dd>{ticketListString}</dd>
                </TicketDetailBreakLine>
            </>
        ),
        [movieName, payDate, payPrice, showCount, showStartTime, theaterName, ticketListString],
    );

    return (
        <StyledTicketCardWrap>
            <StyledTicketCardContents>
                <StyledTicketCardTemplates>
                    {ticketCardContents}
                    <TicketStateRow currentTab={currentTab} payState={payState}>
                        <span>{makeTicketStateLabel(payState)}</span>
                        {currentTab === 'tickets' && (
                            <Button type="default" onClick={onCancelTicket}>
                                예매취소
                            </Button>
                        )}
                    </TicketStateRow>
                </StyledTicketCardTemplates>
            </StyledTicketCardContents>
        </StyledTicketCardWrap>
    );
};

const TicketDetailRow = styled(StyledTicketDetailRow)`
    display: flex;
    dt {
        width: 90px;
    }
    dd {
        margin: 0 0 0 8px;
    }
`;

const TicketDetailBreakLine = styled(StyledTicketDetailRow)`
    display: block;
    dd {
        margin: 4px 0 0 0;
    }
`;

const TicketStateRow = styled.div<{ currentTab: ProfileTab; payState: number }>`
    display: flex;
    align-items: center;
    margin-top: 16px;
    justify-content: ${(props) => (props.currentTab === 'tickets' ? 'space-between' : 'flex-start')};

    span {
        font-size: 15px;
        font-weight: bold;
        letter-spacing: -0.6px;
        ${(props) =>
            props.payState === 2
                ? css`
                      color: ${({ theme }) => theme.pink};
                  `
                : css`
                      color: ${({ theme }) => theme.black80};
                  `}
    }
`;

export default TicketCard;
