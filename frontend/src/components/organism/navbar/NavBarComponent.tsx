import React from 'react';
import ShowDesktop from '@components/atom/ShowDesktop';
import ShowMobile from '@components/atom/ShowMobile';
import MenuIcon from '@components/atom/icons/Menu';
import NavbarItem from '@components/organism/navbar/NavbarItem';
import styled from 'styled-components';
import Flex from '@components/atom/FlexBox';
import TicketStatusIcon from '@components/molecule/TicketStatusIcon';
import { useAdminDashBoard } from '@stores/AdminStore';
import { flexCenter } from '@utils/styleFunctions';
import ButtonLink from '@components/atom/ButtonLink';
import UosIcon from '@components/atom/icons/UosIcon';
import { StyledDesktopNavBox, StyledMobileNavContainer } from './NavbarComponent.style';

const NavBarComponent = (): JSX.Element => {
    const { toggleTab } = useAdminDashBoard();

    return (
        <>
            {/* 데스크톱 */}
            <ShowDesktop>
                <StyledDesktopNavBox>
                    <Flex align="stretch">
                        <ButtonLink href="/" style={{ padding: 0 }} icon={<UosIcon />} />
                        <Flex align="center" onClick={toggleTab} style={{ padding: '0 12px' }}>
                            admin
                        </Flex>
                    </Flex>
                    <Flex>
                        <NavbarItem prependIcon={<ButtonLink href="/create">Sign Up</ButtonLink>} />
                        <NavbarItem
                            padded
                            prependIcon={
                                <ButtonLink type="pink" href="/login">
                                    Sign In
                                </ButtonLink>
                            }
                        />
                    </Flex>
                </StyledDesktopNavBox>
            </ShowDesktop>
            {/* 모바일 */}
            <ShowMobile>
                <StyledMobileNavContainer>
                    <NavbarItem prependIcon={<MenuIcon />} />
                    <NavbarLogo>
                        <UosIcon />
                    </NavbarLogo>
                    <TicketStatusIcon />
                </StyledMobileNavContainer>
            </ShowMobile>
        </>
    );
};

const NavbarLogo = styled.div`
    ${flexCenter};
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 60px;
    margin: 0 auto;
`;

export default NavBarComponent;
