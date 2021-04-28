import React from 'react';
import styled, { css } from 'styled-components';
import Globe from '@components/atom/Globe';

interface Props {
    type: MovieGrade;
}

const ViewGrade = ({ type }: Props): JSX.Element => {
    return <StyledGlobeGrade type={type} />;
};

const StyledGlobeGrade = styled(Globe)<{ type: MovieGrade }>`
    text-align: center;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    line-height: 24px;
    color: ${({ theme }) => theme.smoke1};
    font-size: 14px;
    font-weight: bold;

    ${({ type }) =>
        (type === 'all' &&
            css`
                background-color: ${({ theme }) => theme.green}};
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

    ::before {
        content: '${(props) => props.type}';
    }
`;

export default ViewGrade;
