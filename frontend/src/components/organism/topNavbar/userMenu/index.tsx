import React from 'react';
import Gear from '@components/atom/icons/Gear';
import Ticket from '@components/atom/icons/Ticket';
import ButtonLink from '@components/atom/ButtonLink';
import styled from 'styled-components';
import { fadeIn } from '@utils/animations';
import Button from '@components/atom/Button';

const UserMenu = (): JSX.Element => {
    // todo: 로그인상태에따라 item 들을 변화시킬것;

    return (
        <UserMenuList>
            <Button icon={<Gear size={20} />}>개발자모드</Button>
            <ButtonLink href="/profile" icon={<Ticket size={18} />}>
                사용자정보
            </ButtonLink>
            <DivideLine />
            <ButtonLink href="/login" stretch>
                로그인
            </ButtonLink>
            <ButtonLink href="/create" type="pink" stretch>
                회원가입
            </ButtonLink>
        </UserMenuList>
    );
};

const DivideLine = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.smoke50};
    margin: 4px 0;
`;

const UserMenuList = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: end;
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
