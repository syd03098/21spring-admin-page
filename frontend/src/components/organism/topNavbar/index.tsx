import React, { useCallback } from 'react';
import Desktop from '@components/atom/Desktop';
import Mobile from '@components/atom/Mobile';
import styled from 'styled-components';
import UosIcon from '@components/atom/icons/Uos';
import Menu from '@components/atom/icons/Menu';
import Close from '@components/atom/icons/Close';
import Flex from '@components/atom/FlexBox';
import Ticket from '@components/atom/icons/Ticket';
import Gear from '@components/atom/icons/Gear';
import ButtonLink from '@components/atom/ButtonLink';
import Button from '@components/atom/Button';
import { useModal } from '@stores/ModalStore';
import UserMenu from '@components/organism/topNavbar/userMenu';

const GlobalNavbar = (): JSX.Element => {
    const { isOpen, appendModal, modalOverlayRef: overlayRef } = useModal();

    const UserMenuIcon = useCallback(() => {
        return isOpen ? <Close size={24} /> : <Menu />;
    }, [isOpen]);

    const appendUserMenuHandler = useCallback(() => {
        appendModal(
            <Overlay ref={overlayRef}>
                <UserMenu />
            </Overlay>,
            'mobile',
        );
    }, [appendModal, overlayRef]);

    return (
        <Wrap>
            <Desktop>
                {/* todo: 로그인상태에 따라 다르게 표시해야함, 사용자의 권한이 어드민이 아니면 개발자모드를 비활성화 */}
                <TopHeader>
                    <HeaderList>
                        <ButtonLink href="/" icon={<UosIcon />} fullHeight />
                        <Button icon={<Gear size={20} />} fullHeight size="small">
                            개발자모드
                        </Button>
                        <ButtonLink href="/profile" icon={<Ticket size={20} />} fullHeight size="small">
                            사용자정보
                        </ButtonLink>
                    </HeaderList>
                    <Flex align="center">
                        <ButtonLink href="/login" fullHeight>
                            로그인
                        </ButtonLink>
                        <ButtonLink href="/create" type="pink">
                            회원가입
                        </ButtonLink>
                    </Flex>
                </TopHeader>
            </Desktop>
            <Mobile>
                <MobileHeader>
                    <ButtonLink href="/" icon={<UosIcon />} fullHeight />
                    <Button icon={<UserMenuIcon />} onClick={appendUserMenuHandler} fullHeight />
                </MobileHeader>
            </Mobile>
        </Wrap>
    );
};

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
`;

export const Wrap = styled.div`
    position: fixed;
    top: 0;
    background-color: ${({ theme }) => theme.white};
    user-select: none;
    width: 100%;
    z-index: 10;
`;

export const TopHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1 0 auto;
    height: 80px;
    padding: 0 20px;
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.smoke50};
`;

export const HeaderList = styled.ul`
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
`;

export const MobileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
    height: 60px;
    padding: 0 12px;
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.smoke50};
`;

export default GlobalNavbar;
