import React from 'react';
import { UserProfile } from '@utils/api/profile/types';
import { useAuth } from '@pages/authContext';
import FlexBox from '@components/atom/FlexBox';
import styled from 'styled-components';
import Point from '@components/molecule/point/Point';
import Button from '@components/atom/Button';
import Avatar from '@components/molecule/masthead/Avatar';

interface Props {
    userInfo: UserProfile;
    onChangeTab: () => void;
}

const Masthead = ({ userInfo, onChangeTab }: Props): JSX.Element => {
    const { logined } = useAuth();
    const { userId, username, email } = userInfo;
    return (
        <FlexBox align="center" justify="center">
            <Avatar userId={userId} />
            <Templates>
                <h2>
                    <strong>{username}</strong>님<br />
                    반갑습니다!
                </h2>
                <p>{email}</p>
                {logined && (
                    <>
                        <Point inline={false} />
                        <Button type="default" onClick={onChangeTab}>
                            비밀번호변경
                        </Button>
                    </>
                )}
            </Templates>
        </FlexBox>
    );
};

const Templates = styled.div`
    margin-left: 36px;
    @media (max-width: 479px) {
        margin-left: 20px;
    }
    h2 {
        font-size: 22px;
        margin: 5px 0 10px 0;
        color: ${({ theme }) => theme.black40};
        letter-spacing: -0.8px;
        line-height: 1.2;
        strong {
            color: ${({ theme }) => theme.black80};
        }
    }
    p {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.4px;
        color: ${({ theme }) => theme.black60};
    }
    button {
        margin-top: 12px;
    }
`;

export default Masthead;
