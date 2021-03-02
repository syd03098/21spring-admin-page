import React from 'react';
import useAsyncErrorHook from '@hooks/useAsyncErrorHook';
import { HiOutlinePlus, HiChatAlt } from 'react-icons/hi';
import styled, { keyframes } from 'styled-components';
import usePortalHook from '@hooks/usePortalHook';
import ThemedButton from '@components/common/atom/ThemedButton';
import ToastButton from '@components/common/molecule/ToastButton';

export default (): JSX.Element => {
    const makeAsyncError = useAsyncErrorHook();
    const { isPortalOpen, openPortal, overlayRef, Portal } = usePortalHook({});

    return (
        <>
            <span>DB 관리 페이지</span>
            <FlexBox>
                <ThemedButton
                    backgroundColor="#4285f4"
                    onClick={(): void => {
                        makeAsyncError(new Error('ErrorBoundary 테스트'));
                    }}
                >
                    <HiOutlinePlus size={24} />
                    <span>에러테스트</span>
                </ThemedButton>
                <ThemedButton backgroundColor="#22cc88" onClick={openPortal}>
                    <HiChatAlt size={24} />
                    <span>Portal 테스트</span>
                </ThemedButton>
                <ToastButton />
            </FlexBox>
            {isPortalOpen && (
                <Portal>
                    <Overlay ref={overlayRef}>
                        <ModalContents>
                            <h1>내 프로필 편집</h1>
                        </ModalContents>
                    </Overlay>
                </Portal>
            )}
        </>
    );
};

const visible = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const Overlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding: 24px;

    &::before {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        content: '';
        animation: ${visible} 80ms linear;
    }
`;

const ModalContents = styled.div`
    max-width: 700px;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 8px 48px 0 rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    > h1 {
        font-size: 22px;
        color: #1c1d1c;
    }
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 12px 0 0 0;
`;
