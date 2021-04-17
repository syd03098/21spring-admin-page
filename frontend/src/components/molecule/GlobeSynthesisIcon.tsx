import React from 'react';
import ConfirmIcon from '@components/atom/icons/ConfirmIcon';
import Globe from '@components/atom/Globe';
import styled, { css } from 'styled-components';
import FlexBox from '@components/atom/Flexbox';
import ErrorIcon from '@components/atom/icons/ErrorIcon';
import InfoIcon from '@components/atom/icons/InfoIcon';

interface Props {
    iconType: 'success' | 'error' | 'default';
}

export default ({ iconType }: Props): JSX.Element => {
    return (
        <>
            <StyledGlobe iconType={iconType} />
            <IconWrap>
                {iconType === 'success' && <ConfirmIcon size={16} />}
                {iconType === 'error' && <ErrorIcon size={24} />}
                {iconType === 'default' && <InfoIcon size={20} />}
            </IconWrap>
        </>
    );
};

const StyledGlobe = styled(Globe)<{ iconType: string }>`
    width: 24px;
    height: 24px;
    background-color: ${({ iconType }) =>
        (iconType === 'success' &&
            css`
                ${({ theme }) => theme.green}
            `) ||
        (iconType === 'error' &&
            css`
                ${({ theme }) => theme.red}
            `) ||
        (iconType === 'default' &&
            css`
                ${({ theme }) => theme.primary100}
            `)};
`;

const IconWrap = styled(FlexBox)`
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.smoke1};
    z-index: 1;
`;
