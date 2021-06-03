import React from 'react';
import styled from 'styled-components';
import User from '@components/atom/icons/User';
import { flexCenter, fullDisplay } from '@utils/styleFunctions';

interface Props {
    userId?: string;
}

const Avatar = ({ userId }: Props): JSX.Element => {
    return (
        <StyledGlobe>
            {!userId && <User size={89} />}
            {userId && (
                <StyledBackground>
                    <StyledLabel>{userId}</StyledLabel>
                </StyledBackground>
            )}
        </StyledGlobe>
    );
};

const StyledGlobe = styled.div`
    display: flex;
    flex-shrink: 0;
    position: relative;
    border: 1px solid ${({ theme }) => theme.smoke80};
    border-radius: 50%;
    overflow: hidden;
    width: 90px;
    height: 90px;
`;

const StyledBackground = styled.div`
    position: absolute;
    background-color: ${({ theme }) => theme.pink};
    ${fullDisplay};
    ${flexCenter};
`;

const StyledLabel = styled.span`
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.white};
`;

export default Avatar;
