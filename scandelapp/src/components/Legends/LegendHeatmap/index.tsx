import React, { useState } from 'react';
import { ImageContainer, ModalContent, ModalOverlay, legendHeatmapImage } from './elements';

interface LegendHeatmapProps {
  imageSrc: string;
  caption: string;
  modalContent: React.ReactNode;
}

const LegendHeatmap: React.FC<LegendHeatmapProps> = ({ imageSrc, caption, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <ImageContainer onClick={openModal}>
        <img src={imageSrc} alt={caption} className="legendHeatmapImage" />
        <div>{caption}</div>
      </ImageContainer>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <button onClick={closeModal} className="closeButton">Close</button>
            {modalContent}
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default LegendHeatmap;
