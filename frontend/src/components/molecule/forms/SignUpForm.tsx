import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    StyledFieldSet,
    StyledHalfFieldSet,
    StyledLabel,
    StyledInput,
    StyledError,
    StyledSubmitButton,
    StyledBottomLink,
} from '@components/molecule/forms/style';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import Flex from '@components/atom/FlexBox';
import { SignUpFormData } from '@components/molecule/forms/types';

interface Props {
    onRegister: (data: SignUpFormData) => void;
    isDisabled: boolean;
}

const SignUpForm = ({ onRegister, isDisabled }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setFocus,
    } = useForm();

    const signUpHandler = useCallback(
        (data: SignUpFormData): void => {
            onRegister(data);
        },
        [onRegister],
    );

    useEffectOnce(() => {
        setFocus('userid');
    });

    return (
        <>
            <form
                css={`
                    margin: 12px 0;
                `}
                onSubmit={handleSubmit(signUpHandler)}
            >
                <Flex justify="space-between">
                    <StyledHalfFieldSet>
                        <StyledLabel>사용자계정</StyledLabel>
                        {errors.userid && <StyledError>{errors.userid.message}</StyledError>}
                        <StyledInput
                            type="text"
                            placeholder="16자 이하"
                            {...register('userid', {
                                required: 'require',
                                maxLength: { value: 16, message: 'too long' },
                            })}
                        />
                    </StyledHalfFieldSet>
                    <StyledHalfFieldSet>
                        <StyledLabel>이름</StyledLabel>
                        {errors.username && <StyledError>{errors.username.message}</StyledError>}
                        <StyledInput
                            type="text"
                            placeholder="30자 이하"
                            {...register('username', {
                                required: 'require',
                                maxLength: { value: 30, message: 'too long' },
                            })}
                        />
                    </StyledHalfFieldSet>
                </Flex>
                <StyledFieldSet>
                    <StyledLabel>이메일주소</StyledLabel>
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
                <StyledSubmitButton type="submit" disabled={isDisabled} value="Create Account" />
            </form>
            <StyledBottomLink>
                이미 가입하셨나요? <Link to="/login">로그인</Link>
            </StyledBottomLink>
        </>
    );
};

export default SignUpForm;
