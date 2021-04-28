import React from 'react';
import styled from 'styled-components';
import { useToast } from '@stores/ToastStore';
import Toast from '@components/atom/Toast';

const ToastList = (): JSX.Element => {
    const { deleteToast, messages } = useToast();

    return (
        <ToastListWrap>
            {messages.map((message) => {
                return (
                    <Toast
                        key={message.createdAt}
                        toast={message}
                        onclose={(): void => {
                            deleteToast(message.createdAt);
                        }}
                    />
                );
            })}
        </ToastListWrap>
    );
};

const ToastListWrap = styled.ul`
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0 4px;
    list-style: none;
    z-index: 2000;
`;

export default ToastList;
