import React from 'react';
import ConfirmIcon from '@components/atom/icons/ConfirmIcon';
import Globe from '@components/atom/Globe';
import styled, { css } from 'styled-components';
import ErrorIcon from '@components/atom/icons/ErrorIcon';
import InfoIcon from '@components/atom/icons/InfoIcon';
import FlexBox from '@components/atom/FlexBox';

interface Props {
    iconType: 'success' | 'error' | 'default';
}

const GlobeSynthesisIcon = ({ iconType }: Props): JSX.Element => {
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

export default GlobeSynthesisIcon;

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
