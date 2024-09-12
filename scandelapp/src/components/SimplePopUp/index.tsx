import React, { useState } from 'react';
import { PopupContainer, Header, DescriptionBox, CloseButton } from './elements';

interface PopupProps {
  name: string;
  description: string;
  onClose: () => void;
  style?: React.CSSProperties; // Ajout de la prop 'style' pour positionner dynamiquement la pop-up
}

const Popup: React.FC<PopupProps> = ({ name, description, onClose, style }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Appel de la prop onClose pour fermer la pop-up
  };

  return (
    <>
      {isOpen && (
        <PopupContainer style={style}> {/* Utilisation de la prop 'style' ici */}
          <Header>
            <span>{name}</span>
            <CloseButton onClick={handleClose}>X</CloseButton>
          </Header>
          <DescriptionBox>
            <p>{description}</p>
          </DescriptionBox>
        </PopupContainer>
      )}
    </>
  );
};

export default Popup;
