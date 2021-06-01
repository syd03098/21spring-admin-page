import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Seat, ShowInfo } from '@utils/api/ticktes/types';
import styled from 'styled-components';
import Flex from '@components/atom/FlexBox';
import useSet from 'react-use/esm/useSet';
import { CounterState, CountersResource } from '@components/organism/modal/tickets/types';
import { useToast } from '@stores/ToastStore';
import { StyledBottomFixed, StyledOptionControlArea, StyledSeatButton } from '@components/organism/modal/tickets/style';
import Close from '@components/atom/icons/Close';
import Counter from '@components/molecule/counter';
import produce from 'immer';
import FullModalLayout from '@components/layouts/FullModalLayout';
import OptionOverView from '@components/organism/modal/tickets/optionOverview';

interface Props {
    counterState: CounterState[];
    maxNumber: number;
    showInfo: ShowInfo;
    seatList: Seat[][];
}

const labels = ['성인', '청소년', '노약자'];

const Tickets = ({ counterState: initialState, maxNumber, seatList, showInfo }: Props): JSX.Element => {
    const [countersData, setCountersData] = useState<CountersResource>({ ticketsLimit: 0, counters: initialState });
    const [isReady, setReady] = useState<boolean>(false);
    const [selectedTicketSet, { has, toggle }] = useSet(new Set<number>([]));
    const { appendToast } = useToast();
    const totalPrice = useMemo(
        () =>
            isReady
                ? countersData.counters
                      .filter(({ amount }) => amount !== 0)
                      .map(({ amount, movieFee }) => {
                          return amount * movieFee;
                      })
                      .reduce((acc, cur) => acc + cur)
                : 0,
        [countersData.counters, isReady],
    );

    useEffect(() => {
        if (countersData.ticketsLimit === 0 || selectedTicketSet.size !== countersData.ticketsLimit) {
            setReady(false);
            return;
        }
        setReady(true);
    }, [countersData.ticketsLimit, selectedTicketSet.size]);

    const onClickMinusHandler = useCallback(
        (idx: number) => {
            if (countersData.counters[idx].amount === 0) {
                return;
            }
            setCountersData(
                produce(countersData, (draft) => {
                    draft.ticketsLimit = Math.max(0, draft.ticketsLimit - 1);
                    draft.counters[idx].amount = Math.max(0, draft.counters[idx].amount - 1);
                }),
            );
        },
        [countersData],
    );

    const onClickPlusHandler = useCallback(
        (idx: number) => {
            if (countersData.ticketsLimit + 1 <= maxNumber) {
                setCountersData(
                    produce(countersData, (draft) => {
                        draft.ticketsLimit += 1;
                        draft.counters[idx].amount += 1;
                    }),
                );
            } else {
                appendToast('최대 예매 가능한 티켓 수는 8개 입니다.', { type: 'error', timeout: 8000 });
            }
        },
        [appendToast, countersData, maxNumber],
    );

    const onSelectSeatHandler = useCallback(
        (seatNo: number) => {
            if (countersData.ticketsLimit === 0) {
                appendToast('인원을 선택해주세요.', { type: 'default', timeout: 3000 });
                return;
            }
            toggle(seatNo);
        },
        [appendToast, countersData.ticketsLimit, toggle],
    );

    return (
        <FullModalLayout
            closeIcon={<Close size={20} />}
            title="인원/좌석 선택"
            contents={
                <Flex justify="center" column="column" style={{ height: '100%' }}>
                    <Scrollable>
                        <TicketsDisplay>
                            {seatList.map((row, num) => {
                                const rowNameEn = String.fromCharCode(num + 65);
                                return (
                                    <Flex key={`row-${rowNameEn}`}>
                                        {row.map((seat) => (
                                            <StyledSeatButton
                                                key={seat.seatNo}
                                                selected={has(seat.seatNo)}
                                                disabled={
                                                    (!has(seat.seatNo) &&
                                                        countersData.ticketsLimit !== 0 &&
                                                        countersData.ticketsLimit === selectedTicketSet.size) ||
                                                    seat.seatType === 2 ||
                                                    seat.seatType === 0
                                                }
                                                onClick={() => onSelectSeatHandler(seat.seatNo)}
                                            >
                                                {rowNameEn}
                                                {seat.seatColumn}
                                            </StyledSeatButton>
                                        ))}
                                    </Flex>
                                );
                            })}
                        </TicketsDisplay>
                    </Scrollable>
                    <StyledBottomFixed>
                        <StyledOptionControlArea>
                            <OptionOverView
                                isReady={isReady}
                                showInfo={showInfo}
                                totalPrice={totalPrice}
                                selectedTicket={[...selectedTicketSet]}
                                ticketAmount={countersData.counters.map(({ movieFee, ...rest }) => rest)}
                            />
                            <ScrollableCounters>
                                {countersData.counters.map(({ amount, customerTypeId }, idx) => (
                                    <Counter
                                        key={labels[idx]}
                                        label={labels[idx]}
                                        quantity={amount}
                                        isDisabled={
                                            countersData.ticketsLimit !== 0 &&
                                            countersData.ticketsLimit === selectedTicketSet.size
                                        }
                                        onClickMinusHandler={() => onClickMinusHandler(idx)}
                                        onClickPlusHandler={() => onClickPlusHandler(idx)}
                                    />
                                ))}
                            </ScrollableCounters>
                        </StyledOptionControlArea>
                    </StyledBottomFixed>
                </Flex>
            }
        />
    );
};

const Scrollable = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    overflow: auto;
`;

const ScrollableCounters = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex: 1 1 auto;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-bottom: 12px;
    & > div:first-child {
        margin: 0 6px 0 0;
    }
    & > div:last-child {
        margin: 0 0 0 6px;
    }
    & > div:not(:first-child):not(:last-child) {
        margin: 0 6px;
    }
`;

const TicketsDisplay = styled.div`
    width: min-content;
    padding: 36px 12px;
    margin: auto;
`;

export default Tickets;
