import React, { createContext, MutableRefObject, ReactNode, useCallback, useContext, useState } from 'react';
import usePortalHook from '@hooks/usePortalHook';

interface ModalContext {
    isOpen: boolean;
    modalOverlayRef: MutableRefObject<null>;
    appendModal: (contents: JSX.Element) => void;
    closeModal: () => void;
    Modal: ({ children }: { children: ReactNode }) => JSX.Element;
    contents: JSX.Element | null;
}

function CreateModalContext(): ModalContext {
    const { isPortalOpen, openPortal, closePortal, overlayRef, Portal } = usePortalHook();
    const [contents, setContents] = useState<JSX.Element | null>(null);

    const appendModal = useCallback(
        (jsxElement: JSX.Element) => {
            setContents(jsxElement);
            openPortal();
        },
        [openPortal],
    );

    const closeModal = useCallback(() => {
        setContents(null);
        closePortal();
    }, [closePortal]);

    const Modal = useCallback(
        ({ children }: { children: ReactNode }) => {
            return <>{isPortalOpen && <Portal>{children}</Portal>}</>;
        },
        [Portal, isPortalOpen],
    );

    return {
        isOpen: isPortalOpen,
        modalOverlayRef: overlayRef,
        appendModal,
        closeModal,
        Modal,
        contents,
    };
}

export const ModalStoreContext = createContext<ModalContext | null>(null);

export const ModalStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return <ModalStoreContext.Provider value={CreateModalContext()}>{children}</ModalStoreContext.Provider>;
};

export const useModal = (): ModalContext => {
    const store = useContext(ModalStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nmodalStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
