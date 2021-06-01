import React, { useCallback } from 'react';
import {
    StyledError,
    StyledFieldSet,
    StyledInput,
    StyledLabel,
    StyledSubmitButton,
} from '@components/molecule/forms/style';
import { useForm } from 'react-hook-form';
import { EmailFormData } from '@components/molecule/forms/types';
import styled from 'styled-components';

interface Props {
    message: string;
    onSubmit: (form: EmailFormData) => void;
    isDisabled?: boolean;
}

// 비회원 전용, 이메일과 비밀번호를 입력받음
const EmailForm = ({ message, onSubmit, isDisabled }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = useCallback(
        (data: EmailFormData) => {
            onSubmit(data);
        },
        [onSubmit],
    );

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <StyledFieldSet>
                <StyledLabel>이메일</StyledLabel>
                {errors.userId && <StyledError>{errors.userId.message}</StyledError>}
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
                    placeholder="패스워드"
                    {...register('password', { required: 'require' })}
                />
            </StyledFieldSet>
            <Message>{message}</Message>
            <StyledSubmitButton type="submit" disabled={isDisabled} value={isDisabled ? 'Processing...' : 'Submit'} />
        </form>
    );
};

const Message = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.smoke100};
    margin: 12px 0;
`;

export default EmailForm;
