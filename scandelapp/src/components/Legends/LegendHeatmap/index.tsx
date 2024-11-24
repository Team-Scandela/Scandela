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

    const stopPropagation = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
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
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>Légende du filtre Heatmap</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre heatmap ce compose de:
                                <br />- Différentes zones avec certains niveaux concentration de la lumière.
                                <br />- En bleu quand la zone à un luminosité faible.
                                <br />- En vert quand la zone à un luminosité moyenne.
                                <br />- En rouge quand la zone à un luminosité forte.
                                <br />- Ces informations permettent de voir l'état de la pollution lumineuse sur certaines zones.
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

export default HeatmapPannel;
