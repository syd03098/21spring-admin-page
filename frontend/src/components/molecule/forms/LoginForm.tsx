import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    StyledLabel,
    StyledBottomLink,
    StyledFieldSet,
    StyledInput,
    StyledError,
    StyledSubmitButton,
} from '@components/molecule/forms/style';
import { LoginFormData } from '@components/molecule/forms/types';
import useEffectOnce from 'react-use/esm/useEffectOnce';

interface Props {
    onLogin: (data: LoginFormData) => void;
    isDisabled: boolean;
}

const LoginForm = ({ onLogin, isDisabled }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setFocus,
    } = useForm();

    const loginHandler = useCallback(
        (data: LoginFormData) => {
            onLogin(data);
        },
        [onLogin],
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
                onSubmit={handleSubmit(loginHandler)}
            >
                <StyledFieldSet>
                    <StyledLabel>사용자계정</StyledLabel>
                    {errors.userid && <StyledError>{errors.userid.message}</StyledError>}
                    <StyledInput
                        type="text"
                        placeholder="계정"
                        {...register('userid', {
                            required: 'require',
                            maxLength: { value: 16, message: 'too long' },
                        })}
                    />
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLabel>패스워드</StyledLabel>
                    {errors.password && <StyledError>{errors.password.message}</StyledError>}
                    <StyledInput
                        type="password"
                        placeholder="패스워드"
                        {...register('password', { required: 'require' })}
                    />
                </StyledFieldSet>
                <StyledSubmitButton
                    type="submit"
                    disabled={isDisabled}
                    value={isDisabled ? 'Processing...' : 'Sign In'}
                />
            </form>
            <StyledBottomLink>
                회원이 아니신가요? <Link to="/create">회원가입</Link>
            </StyledBottomLink>
        </>
    );
};

export default LoginForm;
