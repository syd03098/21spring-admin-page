import React, { useCallback } from 'react';
import LoginForm from '@components/molecule/forms/LoginForm';
import { useLocation } from 'react-router-dom';
import SignUpForm from '@components/molecule/forms/SignUpForm';
import { StyledWrap, StyledContainer, StyledTitle, StyledDivider, StyledTopHeader } from '@pages/login/style';
import UOSIcon from '@components/atom/icons/Uos';

const Login = (): JSX.Element => {
    const isLogin = useLocation().pathname === '/login';
    const onSubmit = useCallback(() => {
        // TODO * LoginForm
    }, []);
    const onRegister = useCallback(() => {
        // TODO * SignUpForm
    }, []);

    return (
        <StyledWrap>
            <StyledContainer>
                <StyledTopHeader href="/">
                    <UOSIcon width={56} height={28} />
                </StyledTopHeader>
                <StyledTitle>{isLogin ? `로그인` : `회원가입`}</StyledTitle>
                <StyledDivider />
                {isLogin ? <LoginForm onSubmit={onSubmit} /> : <SignUpForm onRegister={onRegister} />}
            </StyledContainer>
        </StyledWrap>
    );
};

export default Login;
