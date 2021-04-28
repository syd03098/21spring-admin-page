import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { StyledPreventScroll } from '@utils/styleFunctions';

interface AdminStoreReturnType {
    toggleTab: () => void;
    currentTab: string;
    changeCurrentTab: (newTab: string) => void;
    ModalContainer: ({ children }: { children: ReactNode }) => JSX.Element | null;
}

function CreateAdminContext(): AdminStoreReturnType {
    const [isOpen, setOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState<string>('movies');

    const ModalContainer = useCallback(
        ({ children }: { children: ReactNode }) => {
            return isOpen ? (
                <>
                    <StyledPreventScroll />
                    {children}
                </>
            ) : null;
        },
        [isOpen],
    );

    const toggleModal = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);

    const changeCurrentTab = useCallback(
        (newTab: string) => {
            if (currentTab !== newTab) setCurrentTab(newTab);
        },
        [currentTab],
    );

    return {
        toggleTab: toggleModal,
        currentTab,
        changeCurrentTab,
        ModalContainer,
    };
}

export const AdminStoreContext = createContext<AdminStoreReturnType | null>(null);

export const AdminStoreProvider = ({ children }: { children: JSX.Element[] }): JSX.Element => {
    return <AdminStoreContext.Provider value={CreateAdminContext()}>{children}</AdminStoreContext.Provider>;
};

export const useAdminDashBoard = (): AdminStoreReturnType => {
    const store = useContext(AdminStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nadminStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
