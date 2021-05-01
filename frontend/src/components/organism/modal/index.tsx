import React from 'react';
import { useModal } from '@stores/ModalStore';

const Modal = (): JSX.Element => {
    const { Modal: StyledModal, contents } = useModal();
    return <StyledModal>{contents}</StyledModal>;
};

export default Modal;
