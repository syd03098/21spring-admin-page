import React, { useCallback, useState } from 'react';
import { useModal } from '@stores/ModalStore';
import {
    StyledContentsWrap,
    StyledContentsInner,
    StyledSelectShowContainer,
    StyledSelectShowGridTemplate,
} from '@components/organism/modal/select/style';
import ArrowLeft from '@components/atom/icons/ArrowLeft';
import moment from 'moment/moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import { getScheduleListBody, ScheduleResponseBody } from '@utils/api/show';
import { useToast } from '@stores/ToastStore';
import ViewGrade from '@components/molecule/viewGrade';
import { MovieGrade } from '@components/molecule/viewGrade/types';
import ShowSelectCard from '@components/organism/modal/select/cards/ShowSelectCard';
import DateSelectCard from '@components/organism/modal/select/cards/DateSelectCard';
import { getTicketingDataResponseBody } from '@utils/api/tickets';
import Tickets from '@components/organism/modal/tickets';
import FullModalLayout from '@components/layouts/FullModalLayout';

interface Props {
    movieId: number;
    resources: ScheduleResponseBody;
}

const Select = ({ movieId, resources: initialData }: Props): JSX.Element => {
    const [selected, setSelected] = useState<number>(0);
    const [schedules, setSchedules] = useState<ScheduleResponseBody>(initialData);
    const { movieName, showSchedule, movieGrade } = schedules;
    const { appendModal } = useModal();
    const { appendToast } = useToast();

    const selectDateHandler = useCallback(
        async (id: number, idx: number) => {
            if (selected !== idx) {
                getScheduleListBody(id)
                    .then((res) => {
                        setSchedules(res);
                        setSelected(idx);
                    })
                    .catch((_) => {
                        appendToast('영화일정정보를 불러오는데 실패했습니다. 다시시도해주세요.', {
                            type: 'error',
                            timeout: 8000,
                        });
                    });
            }
        },
        [appendToast, selected],
    );

    const openTicketModalHandler = useCallback(
        async (showId: number) => {
            try {
                const response = await getTicketingDataResponseBody(showId);
                const { showInfo, seats, seatFee } = response;
                appendModal(
                    <Tickets
                        counterState={seatFee.map((props) => {
                            return {
                                ...props,
                                amount: 0,
                            };
                        })}
                        maxNumber={8}
                        showInfo={showInfo}
                        seatList={seats}
                    />,
                    'both',
                );
            } catch (err) {
                appendToast('티켓 정보를 불러오는데 실패했습니다. 다시 시도해주세요.', {
                    type: 'error',
                    timeout: 8000,
                });
            }
        },
        [appendModal, appendToast],
    );

    return (
        <FullModalLayout
            closeIcon={<ArrowLeft size={24} />}
            title="상영일정선택"
            contents={
                <StyledContentsWrap>
                    <StyledContentsInner>
                        <HeaderRow>
                            <ViewGrade viewGrade={movieGrade as MovieGrade} />
                            <h3>{movieName}</h3>
                        </HeaderRow>
                        <ScrollableX>
                            <SelectableDateList>
                                {showSchedule.map((schedule, num) => {
                                    const momentObject = moment(schedule.showDate);
                                    const dateKr = momentObject.format('(dd)');
                                    const dateString = momentObject.format('M.DD');
                                    return (
                                        <DateSelectCard
                                            key={dateString}
                                            dateTop={dateKr}
                                            dateBottom={dateString}
                                            onSelect={() => selectDateHandler(movieId, num)}
                                            selected={selected === num}
                                        />
                                    );
                                })}
                            </SelectableDateList>
                        </ScrollableX>
                        <StyledSelectShowContainer>
                            <StyledSelectShowGridTemplate>
                                {showSchedule[selected].showList.map((show) => {
                                    const startTime = moment(show.showStartTime).format('HH:mm');
                                    const endTime = moment(show.showEndTime).format('HH:mm');
                                    return (
                                        <ShowSelectCard
                                            key={show.showId}
                                            available={show.seatsAvailable}
                                            capacity={show.seatsCapacity}
                                            isDisabled={show.seatsAvailable === 0}
                                            runningTime={
                                                <p>
                                                    <strong>{startTime}</strong> ~ {endTime}
                                                </p>
                                            }
                                            theaterName={show.theaterName}
                                            onSelect={() => openTicketModalHandler(show.showId)}
                                        />
                                    );
                                })}
                            </StyledSelectShowGridTemplate>
                        </StyledSelectShowContainer>
                    </StyledContentsInner>
                </StyledContentsWrap>
            }
        />
    );
};

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    div {
        position: relative;
        display: inline-flex;
        margin: 0 4px;
    }
`;

const ScrollableX = styled.div`
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
    padding: 8px 0;
`;

const SelectableDateList = styled.ul`
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export default Select;
