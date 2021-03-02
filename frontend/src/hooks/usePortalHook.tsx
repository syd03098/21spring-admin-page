import {
    MutableRefObject,
    ReactNode,
    ReactPortal,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';

interface Props {
    targetEl?: HTMLElement | null;
}

type PortalHookReturnType = {
    isPortalOpen: boolean;
    openPortal: () => void;
    closePortal: () => void;
    Portal: ({ children }: { children: ReactNode }) => ReactPortal | null;
    overlayRef: MutableRefObject<null>;
};

const usePortalHook = ({ targetEl }: Props): PortalHookReturnType => {
    const [isOpen, makePortal] = useState(false);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef(null);

    const appendTo = useMemo(() => {
        return targetEl || document.body;
    }, [targetEl]);

    useEffect(() => {
        if (!portalRef.current) portalRef.current = document.createElement('div');
    }, []);

    const openPortal = useCallback(() => {
        if (portalRef.current) makePortal(true);
    }, []);

    const closePortal = useCallback(() => {
        if (portalRef.current && isOpen) makePortal(false);
    }, [isOpen]);

    const overlayClickedHandler = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            const clicked = e.target as HTMLElement;
            if (overlayRef.current && clicked === overlayRef.current) closePortal();
        },
        [closePortal],
    );

    const Portal = useCallback(({ children }: { children: ReactNode }) => {
        const container = portalRef.current;
        return container ? createPortal(children, container) : null;
    }, []);

    useEffect(() => {
        if (!portalRef.current) return;

        const node = portalRef.current;
        appendTo.appendChild(node);
        window.addEventListener('click', overlayClickedHandler as any);
        // eslint-disable-next-line consistent-return
        return (): void => {
            window.removeEventListener('click', overlayClickedHandler as any);
            appendTo.removeChild(node);
        };
    }, [appendTo, isOpen, overlayClickedHandler]);

    return {
        isPortalOpen: isOpen,
        openPortal,
        closePortal,
        Portal,
        overlayRef,
    };
};

export default usePortalHook;
