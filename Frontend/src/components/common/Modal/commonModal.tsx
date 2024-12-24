import { CloseButton, ModalContent, ModalTitle, customStyles } from './style';

import React from 'react';
import Modal from 'react-modal';

// Ensure the modal's root element is set for accessibility
Modal.setAppElement('#root');

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title ?? 'Modal'}
    >
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        <div>{children}</div>
      </ModalContent>
    </Modal>
  );
};

export default CommonModal;
