import React, { useCallback } from 'react';
import styled from 'styled-components';
import LoginForm from '@components/molecule/LoginForm';

const LoginPage = (): JSX.Element => {
    const onSubmit = useCallback(() => {}, []);

    return (
        <>
            <StyledWrap>
                <StyledContainer>
                    <LoginForm onSubmit={onSubmit} />
                </StyledContainer>
            </StyledWrap>
        </>
    );
};

const StyledWrap = styled.div`
    width: 100%;
    padding: 0 20px;
`;

const StyledContainer = styled.div`
    max-width: 420px;
    margin: auto;
`;

export default LoginPage;
