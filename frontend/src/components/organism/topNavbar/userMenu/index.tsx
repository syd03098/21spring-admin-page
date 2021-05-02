import React from 'react';
import Gear from '@components/atom/icons/Gear';
import Ticket from '@components/atom/icons/Ticket';
import ButtonLink from '@components/atom/ButtonLink';
import styled from 'styled-components';
import { fadeIn } from '@utils/animations';
import Button from '@components/atom/Button';
import { useToast } from '@stores/ToastStore';

const UserMenu = (): JSX.Element => {
    const { appendToast } = useToast();

    // todo: 로그인상태에따라 item 들을 변화시킬것;
    return (
        <Animation>
            <UserMenuList>
                <Button
                    stretch
                    icon={<Gear size={20} />}
                    onClick={(): void => {
                        appendToast('개발자모드는 Desktop에서 가능합니다.', { type: 'error', timeout: 5000 });
                    }}
                >
                    개발자모드
                </Button>
                <ButtonLink href="/profile" stretch icon={<Ticket size={18} />}>
                    사용자정보
                </ButtonLink>
                <DivideLine />
                <ButtonLink href="/login" stretch>
                    로그인
                </ButtonLink>
                <ButtonLink href="/create" type="pink">
                    회원가입
                </ButtonLink>
            </UserMenuList>
        </Animation>
    );
};

const DivideLine = styled.div`
    width: 80%;
    height: 1px;
    margin: 4px 0;
    background-color: ${({ theme }) => theme.smoke50};
`;

const Animation = styled.div`
    animation: ${fadeIn} 0.1s ease;
`;

const UserMenuList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 144px;
    background-color: ${({ theme }) => theme.white};
    padding: 12px 0 20px;
    border-radius: 8px;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.smoke50}, 0 4px 12px 0 ${({ theme }) => theme.smoke80};
`;

export default UserMenu;
