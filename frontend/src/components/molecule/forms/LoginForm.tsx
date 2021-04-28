import React from 'react';
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
import { useEffectOnce } from 'react-use';

interface Props {
    onSubmit: () => void;
}

const LoginForm = ({ onSubmit }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setFocus,
    } = useForm();

    const loginHandler = (): void => {
        onSubmit();
    };

    useEffectOnce(() => {
        setFocus('email');
    });

    return (
        <>
            <form style={{ margin: '12px 0' }} onSubmit={handleSubmit(loginHandler)}>
                <StyledFieldSet>
                    <StyledLabel>이메일 주소</StyledLabel>
                    {errors.email && <StyledError>{errors.email.message}</StyledError>}
                    <StyledInput type="text" placeholder="이메일" {...register('email', { required: 'require' })} />
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
                <StyledSubmitButton type="submit" value="Sign In" />
            </form>
            <StyledBottomLink>
                회원이 아니신가요? <Link to="/create">회원가입</Link>
            </StyledBottomLink>
        </>
    );
};

export default LoginForm;
