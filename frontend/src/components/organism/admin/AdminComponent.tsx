import React, { lazy, useMemo, useRef } from 'react';
import { useAdminDashBoard } from '@stores/AdminStore';
import styled from 'styled-components';
import { flexCenter } from '@utils/styleFunctions';
import CloseIcon from '@components/atom/icons/Close';
import ShowDesktop from '@components/atom/ShowDesktop';
import SideNavButton from '@components/organism/admin/SideNavButton';
import { StyledModalPosition, StyledModalContainer, StyledModalBackground } from './AdminComponent.style';

const Movies = lazy(() => import('@components/organism/admin/Movies'));
const Schedules = lazy(() => import('@components/organism/admin/Schedules'));
const Persons = lazy(() => import('@components/organism/admin/Persons'));
const Reservations = lazy(() => import('@components/organism/admin/Reservations'));
const Members = lazy(() => import('@components/organism/admin/Members'));
const Seats = lazy(() => import('@components/organism/admin/Seats'));

const AdminComponent = (): JSX.Element => {
    const { ModalContainer, toggleTab, currentTab } = useAdminDashBoard();
    const contentsRef = useRef<HTMLDivElement>(null);

    const mainContents = useMemo(() => {
        switch (currentTab) {
            case 'movies':
                return <Movies />;
            case 'schedules':
                return <Schedules />;
            case 'persons':
                return <Persons />;
            case 'reservations':
                return <Reservations />;
            case 'members':
                return <Members />;
            case 'seats':
                return <Seats />;
            default:
                return <></>;
        }
    }, [currentTab]);

    return (
        <ModalContainer>
            <ShowDesktop>
                <StyledModalPosition>
                    <StyledModalBackground />
                    <StyledModalContainer>
                        {/* 사이드바 */}
                        <ModalSideNavBar>
                            <ModalSideNavContents>
                                <Subtitle>Options</Subtitle>
                                <SideNavButton id="movies" label="영화 정보" />
                                <SideNavButton id="schedules" label="영화 상영 일정" />
                                <SideNavButton id="persons" label="인물 관리" />
                                <SideNavButton id="reservations" label="예매 내역" />
                                <SideNavButton id="members" label="고객 관리" />
                                <SideNavButton id="seats" label="좌석 관리" />
                            </ModalSideNavContents>
                        </ModalSideNavBar>
                        <DivideLine />
                        {/* 우측 컨텐츠 */}
                        <ModalMainContents ref={contentsRef}>{mainContents}</ModalMainContents>
                        <CloseButtonWrap onClick={toggleTab}>
                            <CloseIcon size={20} />
                        </CloseButtonWrap>
                    </StyledModalContainer>
                </StyledModalPosition>
            </ShowDesktop>
        </ModalContainer>
    );
};

export default AdminComponent;

const ModalSideNavBar = styled.div`
    background-color: ${({ theme }) => theme.smoke50};
    min-width: 240px;
    overflow: auto;
    user-select: none;
`;

const ModalSideNavContents = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0 16px 0;
`;

const Subtitle = styled.div`
    font-weight: bold;
    font-size: 20px;
    color: ${({ theme }) => theme.black80};
    padding: 30px 12px 20px 12px;
`;

const DivideLine = styled.div`
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.smoke80};
`;

const ModalMainContents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden auto;
    position: relative;
`;

const CloseButtonWrap = styled.div`
    ${flexCenter};
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
