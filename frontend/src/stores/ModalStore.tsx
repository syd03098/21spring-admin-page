import React, { createContext, MutableRefObject, ReactNode, useCallback, useContext, useState } from 'react';
import usePortalHook from '@hooks/usePortalHook';
import Desktop from '@components/atom/Desktop';
import Mobile from '@components/atom/Mobile';

type responsive = 'desktop' | 'mobile' | 'both';

interface ModalContext {
    isOpen: boolean;
    overlayRef: MutableRefObject<null>;
    appendModal: (contents: JSX.Element, mode: responsive) => void;
    closeModal: () => void;
    Portal: ({ children }: { children: ReactNode }) => React.ReactPortal | null;
    contents: JSX.Element | null;
}

function CreateModalContext(): ModalContext {
    const { isPortalOpen, openPortal, closePortal, overlayRef, Portal } = usePortalHook();
    const [contents, setContents] = useState<JSX.Element | null>(null);

    const makeCustomElement = useCallback((jsxElement: JSX.Element, mode: responsive) => {
        switch (mode) {
            case 'desktop':
                return <Desktop>{jsxElement}</Desktop>;
            case 'mobile':
                return <Mobile>{jsxElement}</Mobile>;
            default:
                return jsxElement;
        }
    }, []);

    const appendModal = useCallback(
        (jsxElement: JSX.Element, mode: responsive) => {
            const customElement = makeCustomElement(jsxElement, mode);
            setContents(customElement);
            openPortal();
        },
        [makeCustomElement, openPortal],
    );

    const closeModal = useCallback(() => {
        setContents(null);
        closePortal();
    }, [closePortal]);

    return {
        isOpen: isPortalOpen,
        overlayRef,
        appendModal,
        closeModal,
        Portal,
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
