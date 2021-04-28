import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import useLatest from 'react-use/lib/useLatest';

interface ToastOption {
    type?: 'success' | 'error' | 'default';
    timeout?: number;
}

interface ToastStoreReturnType {
    messages: Toast[];
    appendToast: (message: string, { type, timeout }?: ToastOption) => void;
    deleteToast: (id: number) => void;
}

function CreateToastContext(): ToastStoreReturnType {
    const [messages, setMessages] = useState<Toast[]>([]);
    const latestMessage = useLatest(messages);

    const appendToast = useCallback((message: string, { type = 'default', timeout = 3000 }: ToastOption = {}) => {
        if (message) {
            setMessages((prev) => [
                ...prev,
                {
                    type,
                    timeout,
                    message,
                    createdAt: new Date().getTime(),
                },
            ]);
        }
    }, []);

    const deleteToast = useCallback(
        (id: number) => {
            setMessages(latestMessage.current.filter((message) => message.createdAt !== id));
        },
        [latestMessage],
    );

    return {
        messages,
        appendToast,
        deleteToast,
    };
}

export const ToastStoreContext = createContext<ToastStoreReturnType | null>(null);

export const ToastStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return <ToastStoreContext.Provider value={CreateToastContext()}>{children}</ToastStoreContext.Provider>;
};

export const useToast = (): ToastStoreReturnType => {
    const store = useContext(ToastStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \ntoastStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
