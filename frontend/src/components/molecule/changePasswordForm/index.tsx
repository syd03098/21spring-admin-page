import React, { useCallback, useState } from 'react';
import { requestChangePassword } from '@utils/api/profile';
import { ChangePasswordFormData } from '@components/molecule/forms/types';
import { useToast } from '@stores/ToastStore';
import styled from 'styled-components';
import PasswordForm from '@components/molecule/forms/PasswordForm';

interface Props {
    onSuccess: () => void;
}

const ChangePasswordForm = ({ onSuccess }: Props): JSX.Element => {
    const [isSending, setSending] = useState<boolean>(false);
    const { appendToast } = useToast();

    const onSubmitChangePasswordForm = useCallback(
        async (form: ChangePasswordFormData) => {
            setSending(true);
            try {
                const response = await requestChangePassword(form);
                const { status } = response;
                if (status === 200) {
                    appendToast('비밀번호를 변경하는데 성공했습니다.', { type: 'success', timeout: 5000 });
                    onSuccess();
                }
            } catch (e) {
                appendToast(e.response.data, { type: 'error', timeout: 5000 });
                setSending(false);
            }
        },
        [appendToast, onSuccess],
    );

    return (
        <StyledChangePasswordFormWrap>
            <StyledChangePasswordFormContents>
                <PasswordForm isDisabled={isSending} onSubmit={onSubmitChangePasswordForm} />
            </StyledChangePasswordFormContents>
        </StyledChangePasswordFormWrap>
    );
};

const StyledChangePasswordFormWrap = styled.div`
    display: flex;
    position: relative;
    padding: 16px 0;
    @media (min-width: 720px) {
        padding: 36px 0;
    }
`;

const StyledChangePasswordFormContents = styled.div`
    flex: 1 1 auto;
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
`;

export default ChangePasswordForm;
