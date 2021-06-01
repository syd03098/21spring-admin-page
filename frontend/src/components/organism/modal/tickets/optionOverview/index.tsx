import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from '@components/atom/Button';
import {
    StyledOverViewRow,
    StyledOptionOverView,
    StyledOptionControlArea,
} from '@components/organism/modal/tickets/optionOverview/style';
import { MovieGrade } from '@components/molecule/viewGrade/types';
import ViewGrade from '@components/molecule/viewGrade';
import FlexBox from '@components/atom/FlexBox';
import { ShowInfo } from '@utils/api/ticktes/types';
import moment from 'moment/moment';
import { useModal } from '@stores/ModalStore';
import EmailForm from '@components/molecule/forms/nonMemberOnly/EmailForm';
import { TicketAmount } from '@utils/api/show/types';
import { requestPurchaseTickets } from '@utils/api/show';
import { EmailFormData } from '@components/molecule/forms/types';
import { useToast } from '@stores/ToastStore';
import { useAuth } from '@pages/context';
import usePortalHook from '@hooks/usePortalHook';
import SmallPopup from '@components/molecule/smallPopup';

interface Props {
    showInfo: ShowInfo;
    totalPrice?: number;
    selectedTicket: number[];
    ticketAmount: TicketAmount[];
    isReady: boolean;
}

const OptionOverView = ({ showInfo, totalPrice, selectedTicket, ticketAmount, isReady }: Props): JSX.Element => {
    const [isSending, setSending] = useState<boolean>(false);
    const {
        Portal,
        openPortal: openNonMemberForm,
        closePortal: closeNonMemberForm,
        isPortalOpen: isNonMemberFormOpened,
    } = usePortalHook();
    const { closeModal } = useModal();
    const { appendToast } = useToast();
    const { moviePosterUrl, movieName, movieGrade, theaterName, showStartTime, showEndTime, showId } = showInfo;
    const { logined } = useAuth();

    const runningTime = useMemo(() => {
        const start = moment(showStartTime).format('MM.DD(dd) HH:mm');
        const end = moment(showEndTime).format('MM.DD(dd) HH:mm');
        return `${start} ~ ${end}`;
    }, [showEndTime, showStartTime]);

    const optionPane = useMemo(
        () => (
            <OptionSummary>
                <FlexBox align="center">
                    <ViewGrade viewGrade={movieGrade as MovieGrade} />
                    <h3>{movieName}</h3>
                </FlexBox>
                <p>{runningTime}</p>
                <p>{theaterName}</p>
                <span>총 {totalPrice} 원</span>
            </OptionSummary>
        ),
        [movieGrade, movieName, runningTime, theaterName, totalPrice],
    );

    // todo: 포인트로 결제하는 api
    //

    const onRequestPurchaseHandler = useCallback(
        async (emailForm?: EmailFormData) => {
            try {
                const response = await requestPurchaseTickets(showId, {
                    email: emailForm && emailForm.email,
                    password: emailForm && emailForm.password,
                    payType: 1,
                    seatIds: selectedTicket,
                    ticketAmount,
                });
                const { status } = response;
                if (status === 201) {
                    closeModal();
                    appendToast('예매에 성공했습니다. 자세한 내역은 예매내역에서 확인하세요.', {
                        type: 'success',
                        timeout: 10000,
                    });
                }
            } catch (err) {
                appendToast('알수없는 오류가 발생했습니다. 다시 시도해주세요.', {
                    type: 'error',
                    timeout: 5000,
                });
                setSending(false);
            }
        },
        [appendToast, closeModal, selectedTicket, showId, ticketAmount],
    );

    return (
        <StyledOverViewRow>
            <StyledOptionOverView>
                <ThumbnailArea>
                    <img src={moviePosterUrl} alt={movieName} loading="lazy" />
                </ThumbnailArea>
                {optionPane}
            </StyledOptionOverView>
            <StyledOptionControlArea>
                <Button
                    type="pink"
                    disabled={!isReady || isSending}
                    onClick={async () => {
                        if (logined) {
                            setSending(true);
                            await onRequestPurchaseHandler();
                        } else {
                            openNonMemberForm();
                        }
                    }}
                >
                    결제하기
                </Button>
                <Button type="default" disabled={!isReady || isSending}>
                    포인트결제
                </Button>
            </StyledOptionControlArea>
            {isNonMemberFormOpened && (
                <Portal>
                    <SmallPopup
                        contents={
                            <EmailForm
                                message="예약한 티켓을 열람할때 사용할 이메일과 패스워드를 입력하세요."
                                isDisabled={isSending}
                                onSubmit={async (form: EmailFormData) => {
                                    setSending(true);
                                    await onRequestPurchaseHandler(form);
                                }}
                            />
                        }
                        closePopupHandler={closeNonMemberForm}
                        headerTitle="비회원 예매"
                    />
                </Portal>
            )}
        </StyledOverViewRow>
    );
};

const ThumbnailArea = styled.div`
    display: block;
    position: relative;
    margin-left: 6px;
    margin-right: 6px;
    max-width: 84px;
    max-height: 120px;
    border: 1px solid ${({ theme }) => theme.smoke80};
    overflow: hidden;
    border-radius: 6px;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    @media (max-width: 360px) {
        display: none;
    }
`;

const OptionSummary = styled.div`
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
    & > :first-child {
        margin-bottom: 10px;
        > div {
            position: relative;
            display: inline-flex;
            margin-right: 4px;
            flex-shrink: 0;
        }
        h3 {
            font-size: 16px;
            margin: 0;
            color: ${({ theme }) => theme.black100};
            letter-spacing: -0.8px;
        }
    }
    p {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.black80};
        margin: 0 0 5px 0;
        letter-spacing: -0.6px;
    }
    span {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.4px;
    }
`;

export default OptionOverView;
