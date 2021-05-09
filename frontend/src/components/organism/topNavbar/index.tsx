import React from 'react';
import Desktop from '@components/atom/Desktop';
import styled from 'styled-components';
import UosIcon from '@components/atom/icons/Uos';
import Gear from '@components/atom/icons/Gear';
import ButtonLink from '@components/atom/ButtonLink';
import Button from '@components/atom/Button';
import TicketStatus from '@components/molecule/ticketStatus';
import Mobile from '@components/atom/Mobile';

const GlobalNavbar = (): JSX.Element => {
    return (
        <Background>
            <Desktop>
                {/* todo: 로그인상태, 사용자권한에 따라 다르게 표시 */}
                <Layout>
                    <ButtonLink href="/" icon={<UosIcon />} fullHeight />
                    <List>
                        {/* todo: 사용자의 권한이 어드민이 아니거나, 로그인중이 아니면 개발자모드를 비활성화 */}
                        <Button icon={<Gear size={18} />} size="small" fullHeight>
                            개발자모드
                        </Button>
                        <ButtonLink href="/login" fullHeight size="small">
                            로그인
                        </ButtonLink>
                        <ButtonLink href="/create" type="default" size="small" style={{ margin: '0 8px' }}>
                            회원가입
                        </ButtonLink>
                        <TicketStatus />
                    </List>
                </Layout>
            </Desktop>
            <Mobile>
                <MobileLayout>
                    <TicketStatus />
                    <CenteredLogo>
                        <ButtonLink href="/" icon={<UosIcon width={42} height={28} />} fullHeight />
                    </CenteredLogo>
                    <ButtonLink href="/login" size="small" type="default">
                        로그인
                    </ButtonLink>
                    {/* todo: 로그인중이면 로그아웃버튼 활성화 */}
                </MobileLayout>
            </Mobile>
        </Background>
    );
};

const Background = styled.header`
    position: fixed;
    top: 0;
    background-color: ${({ theme }) => theme.white};
    user-select: none;
    width: 100%;
    z-index: 10;
    box-shadow: ${({ theme }) => theme.smoke50} 0 1px 0 0;
`;

const Layout = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1 0 auto;
    height: 60px;
    padding: 0 20px;
`;

const List = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const MobileLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
    height: 54px;
    padding: 0 12px;
`;

const CenteredLogo = styled.div`
    display: flex;
    max-width: 80px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 54px;
    margin: 0 auto;
`;

export default GlobalNavbar;
