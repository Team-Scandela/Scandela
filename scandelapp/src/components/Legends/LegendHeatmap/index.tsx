import React, { useState } from 'react';
import * as S from './elements';

const HeatmapPannel: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <div>
            <S.Button onClick={openModal}>
                <S.HeatmapIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                    <S.h2 >Légende du filtre Heatmap</S.h2> 
                        <S.p >Le filtre Heatmap ce compose de:
                            <br />- plusieurs zones de chaleur.
                            <br />- rouge signifie zone à forte utilisation de lumière et un éclairage dense.
                            <br />- orange/jaune signifie que la luminosité est moyennement dense.
                            <br />- vert/bleu signigie que la luminosité est assez faible mais présente et non naturelle.
                            <br />- Ce filtre permet de mieux comprendre l'impact de la pollution lumineuse dans sa ville.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default HeatmapPannel;