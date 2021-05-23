import React, { useCallback, useMemo } from 'react';
import Desktop from '@components/atom/Desktop';
import UosIcon from '@components/atom/icons/Uos';
import ButtonLink from '@components/atom/ButtonLink';
import Button from '@components/atom/Button';
import TicketStatus from '@components/molecule/ticketStatus';
import Mobile from '@components/atom/Mobile';
import { sendLogoutRequest } from '@utils/api/auth';
import {
    StyledBackground,
    StyledLayout,
    StyledList,
    StyledCenteredLogo,
} from '@components/organism/globalNavbar/style';
import { useToast } from '@stores/ToastStore';
import { useAuth } from '@pages/context';

const GlobalNavbar = (): JSX.Element => {
    const { logined } = useAuth();
    const { appendToast } = useToast();

    const onLogout = useCallback(async () => {
        try {
            const status = await sendLogoutRequest();
            if (status === 200) window.location.reload();
        } catch (_) {
            appendToast('로그아웃에 실패했습니다. 잠시후 다시 시도해주세요.', { type: 'error', timeout: 8000 });
        }
    }, [appendToast]);

    const desktopNavbarContents = useMemo(
        () => (
            <StyledList>
                {!logined && (
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
                {logined && (
                    <Button onClick={onLogout} fullHeight>
                        로그아웃
                    </Button>
                )}
                <TicketStatus />
            </StyledList>
        ),
        [logined, onLogout],
    );

    const mobileNavbarContents = useMemo(
        () => (
            <StyledLayout>
                <TicketStatus />
                {!logined && (
                    <ButtonLink href="/login" size="small" type="default">
                        로그인
                    </ButtonLink>
                )}
                {logined && (
                    <Button onClick={onLogout} fullHeight>
                        로그아웃
                    </Button>
                )}
            </StyledLayout>
        ),
        [logined, onLogout],
    );

    return (
        <StyledBackground>
            <Desktop>
                <StyledLayout>
                    <ButtonLink href="/" icon={<UosIcon />} fullHeight />
                    {desktopNavbarContents}
                </StyledLayout>
            </Desktop>
            <Mobile>
                <StyledCenteredLogo>
                    <ButtonLink href="/" icon={<UosIcon width={42} height={28} />} fullHeight />
                </StyledCenteredLogo>
                {mobileNavbarContents}
            </Mobile>
        </StyledBackground>
    );
};

export default GlobalNavbar;
