import React from 'react';
import { useForm } from 'react-hook-form';
import {
    StyledDivider,
    StyledLabel,
    StyledJoinMember,
    StyledFieldSet,
    StyledTitle,
    StyledInput,
    StyledSubmitButton,
} from './LoginForm.style';

interface Props {
    onSubmit: () => void;
}

const LoginForm = ({ onSubmit }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const loginHandler = (): void => {
        onSubmit();
    };

    return (
        <>
            <StyledTitle>Sign in</StyledTitle>
            <StyledDivider />
            <form onSubmit={handleSubmit(loginHandler)}>
                <StyledFieldSet>
                    <StyledLabel>Username or Email Address {errors.account && <span>required</span>}</StyledLabel>
                    <StyledInput type="text" {...register('account', { required: true })} />
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLabel>Password {errors.password && <span>required</span>}</StyledLabel>
                    <StyledInput type="password" {...register('password', { required: true })} />
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
