import React from 'react';
import { useModal } from '@stores/ModalStore';
import styled from 'styled-components';
import { fullDisplay } from '@utils/styleFunctions';

const SharedModal = (): JSX.Element => {
    const { Portal: StyledPortal, contents, overlayRef, isOpen } = useModal();
    return (
        <>
            {isOpen && (
                <StyledPortal>
                    <StyledBackground>
                        <StyledOverlay ref={overlayRef}>{contents}</StyledOverlay>
                    </StyledBackground>
                </StyledPortal>
            )}
        </>
    );
};

const StyledBackground = styled.div`
    position: fixed;
    ${fullDisplay};
    z-index: 1000;
`;

const StyledOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.4);
`;

export default SharedModal;
