import React, { useCallback, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    StyledFieldSet,
    StyledLabel,
    StyledInput,
    StyledError,
    StyledSubmitButton,
    StyledBottomLink,
} from '@components/molecule/forms/style';

interface Props {
    onRegister: () => void;
}

const SignUpForm = ({ onRegister }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setFocus,
    } = useForm();

    const signUpHandler = useCallback((): void => {
        onRegister();
    }, [onRegister]);

    useLayoutEffect(() => {
        setFocus('username');
    }, [setFocus]);

    return (
        <>
            <form style={{ margin: '12px 0' }} onSubmit={handleSubmit(signUpHandler)}>
                <StyledFieldSet>
                    <StyledLabel>사용자 이름</StyledLabel>
                    {errors.username && <StyledError>{errors.username.message}</StyledError>}
                    <StyledInput type="text" placeholder="이름" {...register('username', { required: 'require' })} />
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLabel>이메일 주소</StyledLabel>
                    {errors.email && <StyledError>{errors.email.message}</StyledError>}
                    <StyledInput
                        type="text"
                        placeholder="이메일"
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'invalid input',
                            },
                            required: 'require',
                        })}
                    />
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLabel>패스워드</StyledLabel>
                    {errors.password && <StyledError>{errors.password.message}</StyledError>}
                    <StyledInput
                        type="password"
                        placeholder="+6자 이상"
                        {...register('password', {
                            required: 'require',
                            minLength: { value: 6, message: 'too short' },
                        })}
                    />
                </StyledFieldSet>
                <StyledSubmitButton type="submit" value="Create Account" />
            </form>
            <StyledBottomLink>
                이미 가입하셨나요? <Link to="/login">로그인</Link>
            </StyledBottomLink>
        </>
    );
};

export default SignUpForm;
