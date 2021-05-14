import React, { useMemo } from 'react';
import Flex from '@components/atom/FlexBox';
import styled from 'styled-components';

interface Props {
    errorMessage: string;
}

const ErrorBlock = ({ errorMessage }: Props): JSX.Element => {
    const errorMessageContents = useMemo(
        () => (
            <Flex align="center" justify="center">
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </Flex>
        ),
        [errorMessage],
    );

    return <ErrorBlockWrap>{errorMessageContents}</ErrorBlockWrap>;
};

const ErrorBlockWrap = styled.div`
    background-color: ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.white};
    padding: 10px 16px;
`;

const ErrorMessage = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.8px;
    margin: 0;
    padding: 0;
`;

export default ErrorBlock;
