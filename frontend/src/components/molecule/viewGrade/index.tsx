import React, { CSSProperties, useMemo } from 'react';
import { MovieGrade } from '@components/molecule/viewGrade/types';
import styled, { css } from 'styled-components';
import Globe from '@components/atom/Globe';

interface Props {
    viewGrade: MovieGrade;
    style?: CSSProperties;
}

const ViewGrade = ({ viewGrade, style }: Props): JSX.Element => {
    const grade = useMemo(() => {
        switch (viewGrade) {
            case '00':
                return 'All';
            case '12':
                return '12';
            case '15':
                return '15';
            case '18':
                return '18';
            default:
                return '';
        }
    }, [viewGrade]);

    return (
        <StyledGlobe type={grade} style={style}>
            <StyledViewGrade>{grade}</StyledViewGrade>
        </StyledGlobe>
    );
};

const StyledGlobe = styled(Globe)<{ type: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    z-index: 1;
    ${({ type }) =>
        (type === 'All' &&
            css`
                background-color: ${({ theme }) => theme.green};
            `) ||
        (type === '12' &&
            css`
                background-color: ${({ theme }) => theme.skyblue};
            `) ||
        (type === '15' &&
            css`
                background-color: ${({ theme }) => theme.yellow};
            `) ||
        (type === '18' &&
            css`
                background-color: ${({ theme }) => theme.red};
            `)};
`;

const StyledViewGrade = styled.div`
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.4px;
`;

export default ViewGrade;
