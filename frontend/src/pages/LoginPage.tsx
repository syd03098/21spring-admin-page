import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import ErrorBlock from '@components/atom/ErrorBlock';
import LoginForm from '@components/molecule/LoginForm';
import styled from 'styled-components';

const LoginPage = observer(
    (): JSX.Element => {
        const [error, setError] = useState<string | null>(null);

        const onSubmit = useCallback(async (data: any) => {
            // todo 로그인후 수행
        }, []);

        return (
            <>
                <ErrorBlock type="warning" error={error} />
                <StyledWrap>
                    <StyledContainer>
                        <LoginForm onSubmit={onSubmit} />
                    </StyledContainer>
                </StyledWrap>
            </>
        );
    },
);

export const StyledWrap = styled.div`
    width: 100%;
    padding: 0 20px;
`;

export const StyledContainer = styled.div`
    max-width: 420px;
    margin: auto;
`;

export default LoginPage;
