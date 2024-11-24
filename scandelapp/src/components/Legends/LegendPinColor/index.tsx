import React, { useState } from 'react';
import * as S from './elements';

const ColorPannel: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const stopPropagation = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
    };

    return (
        <div>
            <S.Button onClick={openModal}>
                <S.CircleIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>Légende du filtre Qualité de bulbe</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre qualité de bulbe ce compose de:
                                <br />- Différents cercles de couleurs en fonction de la qualité du bulbe.
                                <br />- Cercles vert pour une très bonne qualité d'éclairage.
                                <br />- Cercles jaune pour une moyenne qualité d'éclairage.
                                <br />- Cercles rouge pour une mauvaise qualité d'éclairage.
                                <br />- Cercles vert par défaut pour les clusters.
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>

                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>

                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default ColorPannel;
