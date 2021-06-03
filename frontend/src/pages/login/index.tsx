import React, { useCallback, useMemo, useState } from 'react';
import LoginForm from '@components/molecule/forms/LoginForm';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import SignUpForm from '@components/molecule/forms/SignUpForm';
import { StyledWrap, StyledContainer, StyledTitle, StyledDivider, StyledTopHeader } from '@pages/login/style';
import UOSIcon from '@components/atom/icons/Uos';
import { LoginFormData, SignUpFormData } from '@components/molecule/forms/types';
import { sendLoginRequest, sendSignUpRequest } from '@utils/api/auth';
import ErrorBlock from '@components/molecule/errorBlock';
import { useAuth } from '@pages/authContext';

const Login = (): JSX.Element => {
    const [error, setError] = useState<string | null>(null);
    const [isDisabled, setDisabled] = useState<boolean>(false);
    const isLogin = useLocation().pathname === '/login';
    const { logined, setLogined } = useAuth();
    const history = useHistory();

    const onLogin = useCallback(
        async (data: LoginFormData) => {
            setDisabled(true);
            setError(null);
            try {
                const response = await sendLoginRequest({
                    userId: data.userId,
                    password: data.password,
                });
                if (response === 200) {
                    setLogined(true);
                    history.goBack();
                }
            } catch (e) {
                setError(e.response.data);
                setDisabled(false);
            }
        },
        [history, setLogined],
    );

    const onRegister = useCallback(
        async (data: SignUpFormData) => {
            setDisabled(true);
            setError(null);
            try {
                const response = await sendSignUpRequest({
                    userId: data.userId,
                    userName: data.userName,
                    email: data.email,
                    password: data.password,
                });
                if (response === 201) {
                    setLogined(true);
                    history.goBack();
                }
            } catch (e) {
                setError(e.response.data);
                setDisabled(false);
            }
        },
        [history, setLogined],
    );

    const pageContents = useMemo(() => {
        return (
            <>
                <StyledTopHeader href="/">
                    <UOSIcon width={56} height={28} />
                </StyledTopHeader>
                <StyledTitle>{isLogin ? `로그인` : `회원가입`}</StyledTitle>
                <StyledDivider />
                {isLogin ? (
                    <LoginForm onLogin={onLogin} isDisabled={isDisabled} />
                ) : (
                    <SignUpForm onRegister={onRegister} isDisabled={isDisabled} />
                )}
            </>
        );
    }, [isDisabled, isLogin, onRegister, onLogin]);

    if (!logined) {
        return (
            <>
                {error && <ErrorBlock errorMessage={error} />}
                <StyledWrap>
                    <StyledContainer>{pageContents}</StyledContainer>
                </StyledWrap>
            </>
        );
    }
    return <Redirect to="/" />;
};

export default Login;
