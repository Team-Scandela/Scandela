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
                        <S.h2>Légende du filtre Heatmap</S.h2>
                        <S.p>
                            Le filtre Qualité d'éclairage ce compose de:
                            <br />- plusieurs cercle de différentes couleurs.
                            <br />- rouge signifie que la qualité de l'éclairage
                            est mauvaise en fonction de certains critères.
                            <br />- orange/jaune signifie que la qualité de
                            l'éclairage est correct mais pas optimale.
                            <br />- vert signifie que la qualité de l'éclairage
                            est correct'.
                            <br />- Ce filtre permet de mieux comprendre la
                            qualité globale de son éclairage dans sa ville.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default ColorPannel;
