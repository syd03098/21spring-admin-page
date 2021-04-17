import React from 'react';
import { useForm } from 'react-hook-form';
import {
    StyledInput,
    StyledTitle,
    StyledDivider,
    StyledFieldSet,
    StyledLabel,
    StyledJoinMember,
    StyledSubmitButton,
} from './LoginForm.style';

interface Props {
    onSubmit: (data: LoginFormType) => void;
}

const LoginForm = ({ onSubmit }: Props): JSX.Element => {
    const { handleSubmit, errors, register } = useForm();

    const loginHandler = (data: LoginFormType): void => {
        onSubmit(data);
    };

    return (
        <>
            <StyledTitle>Sign in</StyledTitle>
            <StyledDivider />
            <form onSubmit={handleSubmit(loginHandler)}>
                <StyledFieldSet>
                    <StyledLabel>
                        Username or Email Address
                        <span>{errors.account && errors.account.message}</span>
                    </StyledLabel>
                    <StyledInput type="text" name="account" ref={register({ required: 'required' })} />
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLabel>
                        Password<span>{errors.password && errors.password.message}</span>
                    </StyledLabel>
                    <StyledInput type="password" name="password" ref={register({ required: 'required' })} />
                </StyledFieldSet>
                <StyledSubmitButton type="submit" value="Sign In" />
            </form>
            <StyledJoinMember>
                Not a Member?
                <button type="button">Sign up Now</button>
            </StyledJoinMember>
        </>
    );
};

export default LoginForm;
