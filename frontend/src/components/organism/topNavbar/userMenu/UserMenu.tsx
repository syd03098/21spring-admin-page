import React from 'react';
import Flex from '@components/atom/FlexBox';
import UserMenuButton from '@components/organism/topNavbar/userMenu/UserMenuButton';
import Gear from '@components/atom/icons/Gear';
import Ticket from '@components/atom/icons/Ticket';
import ButtonLink from '@components/atom/ButtonLink';
import styled from 'styled-components';
import { fadeIn } from '@utils/animations';

const UserMenu = (): JSX.Element => {
    // todo: 로그인상태에따라 item 들을 변화시킬것;

    return (
        <UserMenuList>
            <Flex column="column">
                <UserMenuButton icon={<Gear size={20} />}>개발자모드</UserMenuButton>
                <UserMenuButton href="/profile" icon={<Ticket size={18} />}>
                    사용자정보
                </UserMenuButton>
            </Flex>
            <UserMenuButton href="/login">로그인</UserMenuButton>
            <ButtonLink href="/create" type="pink">
                회원가입
            </ButtonLink>
        </UserMenuList>
    );
};

const UserMenuList = styled.div`
    display: inline-flex;
    position: fixed;
    flex-direction: column;
    top: 45px;
    right: 8px;
    background-color: white;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.smoke30};
    box-shadow: 0 10px 50px ${({ theme }) => theme.smoke50};
    animation: ${fadeIn} 0.1s ease-in;
`;

export default UserMenu;
