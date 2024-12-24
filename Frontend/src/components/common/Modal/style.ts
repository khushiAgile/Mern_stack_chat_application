import styled from 'styled-components';

// Styled wrapper for the modal content
export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  background-color: #e3d5ff;
  height: 100%;
  min-height: 300px;
  max-height: auto !important;
`;

// Styled close button
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

// Styled title for the modal
export const ModalTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 1.5rem;
`;

// Overlay styling for the modal
export const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  width: '500px',
  height: '500px',
  padding: '0px',
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
