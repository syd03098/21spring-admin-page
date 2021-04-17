import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import LoginForm from '@components/molecule/LoginForm';

const LoginPage = observer(
    (): JSX.Element => {
        const onSubmit = useCallback(() => {
            console.log('!!!');
        }, []);

        return (
            <>
                <StyledWrap>
                    <StyledContainer>
                        <LoginForm onSubmit={onSubmit} />
                    </StyledContainer>
                </StyledWrap>
            </>
        );
    },
);

const StyledWrap = styled.div`
    width: 100%;
    padding: 0 20px;
`;

const StyledContainer = styled.div`
    max-width: 420px;
    margin: auto;
`;

export default LoginPage;
