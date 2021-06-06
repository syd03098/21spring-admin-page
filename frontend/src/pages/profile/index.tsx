import React, { useCallback, useMemo, useState } from 'react';
import GlobalNavbar from '@components/organism/globalNavbar';
import { useAuth } from '@pages/authContext';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import { fetchUserProfile, getTickets } from '@utils/api/profile';
import Loading from '@pages/Loading';
import { TicketDetail, UserProfile } from '@utils/api/profile/types';
import Masthead from '@components/molecule/masthead';
import FlexBox from '@components/atom/FlexBox';
import {
    StyledEmailFormWrap,
    StyledEmailFormContents,
    StyledSelectTabWrap,
    StyledTabSelectNav,
    StyledMastheadContainer,
} from '@pages/profile/style';
import EmailForm from '@components/molecule/forms/nonMemberOnly/EmailForm';
import { EmailFormData } from '@components/molecule/forms/types';
import { useToast } from '@stores/ToastStore';
import TicketGroup from '@components/molecule/ticketGroup';
import TabButton from '@components/molecule/TabButton';
import ChangePasswordForm from '@components/molecule/changePasswordForm';

export type ProfileTab = 'tickets' | 'canceled' | 'changePassword' | '';

interface TicketList {
    canceled: TicketDetail[];
    tickets: TicketDetail[];
}

const Profile = (): JSX.Element => {
    const [isReady, setReady] = useState(false);
    const [currentTab, setCurrentTab] = useState<ProfileTab>('tickets');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [ticketPackage, setTicketPackage] = useState<TicketList | null>(null);
    const { logined } = useAuth();
    const { appendToast } = useToast();

    const fetchProfilePageResources = useCallback(
        async (form?: EmailFormData) => {
            Promise.all([logined ? fetchUserProfile() : null, getTickets(form)])
                .then(([profile, tickets]) => {
                    if (logined) {
                        setUserProfile(profile);
                        setTicketPackage(tickets);
                    } else {
                        if (!form) return;
                        setUserProfile({
                            username: 'guest',
                            email: form.email,
                        });
                        setTicketPackage(tickets);
                    }
                })
                .catch(() => {
                    setTicketPackage({
                        tickets: [],
                        canceled: [],
                    });
                    appendToast('회원정보를 가져오는데 실패했습니다. 다시 시도해주세요.', {
                        type: 'error',
                        timeout: 8000,
                    });
                })
                .finally(() => setReady(true));
        },
        [appendToast, logined],
    );

    const profileContents = useMemo(() => {
        if (!ticketPackage) {
            return <></>;
        }
        const { tickets, canceled } = ticketPackage;
        switch (currentTab) {
            case 'tickets':
                return <TicketGroup currentTab={currentTab} tickets={tickets} />;
            case 'canceled':
                return <TicketGroup currentTab={currentTab} tickets={canceled} />;
            case 'changePassword':
                return <ChangePasswordForm onSuccess={() => setCurrentTab('tickets')} />;
            default:
                return <></>;
        }
    }, [currentTab, ticketPackage]);

    useEffectOnce(() => {
        if (!logined) {
            setReady(true);
            return;
        }
        (async () => fetchProfilePageResources())();
    });

    if (!isReady) return <Loading message="Fetching Tickets..." />;
    return (
        <>
            <GlobalNavbar />
            <FlexBox column="column">
                {!logined && !userProfile && !ticketPackage && (
                    <StyledEmailFormWrap>
                        <StyledEmailFormContents>
                            <EmailForm
                                message="비회원 예매시 입력한 이메일을 입력해주세요."
                                onSubmit={fetchProfilePageResources}
                            />
                        </StyledEmailFormContents>
                    </StyledEmailFormWrap>
                )}
                {userProfile && ticketPackage && (
                    <>
                        {userProfile && (
                            <StyledMastheadContainer>
                                <Masthead userInfo={userProfile} onChangeTab={() => setCurrentTab('changePassword')} />
                            </StyledMastheadContainer>
                        )}
                        {userProfile && (
                            <StyledSelectTabWrap>
                                <StyledTabSelectNav>
                                    <TabButton
                                        active={currentTab === 'tickets'}
                                        count={ticketPackage.tickets.length}
                                        name="예매내역"
                                        onSelectTab={() => setCurrentTab('tickets')}
                                    />
                                    <TabButton
                                        active={currentTab === 'canceled'}
                                        count={ticketPackage.canceled.length}
                                        name="취소내역"
                                        onSelectTab={() => setCurrentTab('canceled')}
                                    />
                                </StyledTabSelectNav>
                            </StyledSelectTabWrap>
                        )}
                        {profileContents}
                    </>
                )}
            </FlexBox>
        </>
    );
};

export default Profile;
