import React, { useCallback, useMemo } from 'react';
import Desktop from '@components/atom/Desktop';
import UosIcon from '@components/atom/icons/Uos';
import Gear from '@components/atom/icons/Gear';
import ButtonLink from '@components/atom/ButtonLink';
import Button from '@components/atom/Button';
import TicketStatus from '@components/molecule/ticketStatus';
import Mobile from '@components/atom/Mobile';
import { useAuth } from '@stores/AuthStore';
import { sendLogoutRequest } from '@utils/api/auth';
import {
    StyledBackground,
    StyledLayout,
    StyledList,
    StyledCenteredLogo,
} from '@components/organism/globalNavbar/style';

const GlobalNavbar = (): JSX.Element => {
    const { currentUser, setCurrentUser } = useAuth();

    const onLogout = useCallback(async () => {
        try {
            const status = await sendLogoutRequest();
            if (status === 200) {
                setCurrentUser(null);
                window.location.reload();
            }
        } catch (_) {}
    }, [setCurrentUser]);

    const desktopNavbarContents = useMemo(
        () => (
            <>
                {!currentUser && (
                    <>
                        <ButtonLink href="/login" fullHeight size="small">
                            로그인
                        </ButtonLink>
                        <ButtonLink
                            css={`
                                margin: 0 8px;
                            `}
                            href="/create"
                            type="default"
                            size="small"
                        >
                            회원가입
                        </ButtonLink>
                    </>
                )}
                {currentUser && (
                    <>
                        {currentUser.isAdmin && (
                            <Button icon={<Gear size={18} />} size="small" fullHeight>
                                개발자모드
                            </Button>
                        )}
                        <Button onClick={onLogout} fullHeight>
                            로그아웃
                        </Button>
                    </>
                )}
            </>
        ),
        [currentUser, onLogout],
    );

    const mobileNavbarContents = useMemo(
        () => (
            <>
                {!currentUser && (
                    <ButtonLink href="/login" size="small" type="default">
                        로그인
                    </ButtonLink>
                )}
                {currentUser && (
                    <Button onClick={onLogout} fullHeight>
                        로그아웃
                    </Button>
                )}
            </>
        ),
        [currentUser, onLogout],
    );

    return (
        <StyledBackground>
            <Desktop>
                <StyledLayout>
                    <ButtonLink href="/" icon={<UosIcon />} fullHeight />
                    <StyledList>
                        {desktopNavbarContents}
                        <TicketStatus />
                    </StyledList>
                </StyledLayout>
            </Desktop>
            <Mobile>
                <StyledCenteredLogo>
                    <ButtonLink href="/" icon={<UosIcon width={42} height={28} />} fullHeight />
                </StyledCenteredLogo>
                <StyledLayout>
                    <TicketStatus />
                    {mobileNavbarContents}
                </StyledLayout>
            </Mobile>
        </StyledBackground>
    );
};

export default GlobalNavbar;
