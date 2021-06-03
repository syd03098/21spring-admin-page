import React, { useCallback } from 'react';
import {
    StyledError,
    StyledFieldSet,
    StyledInput,
    StyledLabel,
    StyledSubmitButton,
} from '@components/molecule/forms/style';
import { useForm } from 'react-hook-form';
import { ChangePasswordFormData } from '@components/molecule/forms/types';

interface Props {
    onSubmit: (form: ChangePasswordFormData) => void;
    isDisabled: boolean;
}

const PasswordForm = ({ onSubmit, isDisabled }: Props): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = useCallback(
        (form: ChangePasswordFormData) => {
            onSubmit(form);
        },
        [onSubmit],
    );

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <StyledFieldSet>
                <StyledLabel>기존 비밀번호</StyledLabel>
                {errors.password && <StyledError>{errors.password.message}</StyledError>}
                <StyledInput
                    type="password"
                    {...register('password', {
                        required: 'require',
                        maxLength: { value: 16, message: 'too long' },
                    })}
                />
            </StyledFieldSet>
            <StyledFieldSet>
                <StyledLabel>새 비밀번호</StyledLabel>
                {errors.newPassword && <StyledError>{errors.newPassword.message}</StyledError>}
                <StyledInput
                    type="password"
                    placeholder="6자 이상"
                    {...register('newPassword', {
                        required: 'require',
                        minLength: { value: 6, message: 'too short' },
                    })}
                />
            </StyledFieldSet>
            <StyledSubmitButton type="submit" disabled={isDisabled} value={isDisabled ? 'Processing...' : 'Submit'} />
        </form>
    );
};

export default PasswordForm;
