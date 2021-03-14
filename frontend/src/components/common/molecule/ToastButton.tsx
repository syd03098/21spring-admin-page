import React from 'react';
import ThemedButton from '@components/common/atom/ThemedButton';
import { HiCheck, HiOutlineX } from 'react-icons/hi';
import usePortalHook from '@hooks/usePortalHook';
import Sty from './ToastButton.style';

const ToastButton = (): JSX.Element => {
    const { isPortalOpen, Portal, openPortal, closePortal } = usePortalHook({});

    return (
        <>
            <ThemedButton backgroundColor="#66d9e8" onClick={openPortal}>
                <HiCheck size={24} />
                <span>Toast 테스트</span>
            </ThemedButton>
            {isPortalOpen && (
                <Portal>
                    <Sty.Overlay>
                        <Sty.Contents>
                            <span>등록이 완료되었습니다.</span>
                            <HiOutlineX style={{ cursor: 'pointer' }} size={16} onClick={closePortal} />
                        </Sty.Contents>
                    </Sty.Overlay>
                </Portal>
            )}
        </>
    );
};

export default ToastButton;
