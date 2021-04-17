import React from 'react';
import styled from 'styled-components';
import Toast from '@components/atom/Toast';
import { observer } from 'mobx-react';
import { useRootStore } from '@stores/RootStore';

const ToastList = observer(
    (): JSX.Element => {
        const { uiStore } = useRootStore();
        return (
            <>
                <StyledToastList>
                    {uiStore.orderedToasts.map((toast) => {
                        return (
                            <Toast
                                key={toast.createdAt}
                                toast={toast}
                                onclose={(): void => {
                                    uiStore.removeToast(toast.createdAt);
                                }}
                            />
                        );
                    })}
                </StyledToastList>
            </>
        );
    },
);

export default ToastList;

const StyledToastList = styled.ol`
    position: fixed;
    right: 0;
    bottom: 0;
    list-style: none;
    padding: 0 8px;
    z-index: 1000;
`;
