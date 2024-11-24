import React, { useState } from 'react';
import * as S from './elements';

const TrafficPannel: React.FC = () => {
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
                <S.TrafficIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>Légende du filtre de Traffic</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre de Traffic est composé de:
                                <br />- Différentes lignes de couleurs pour indiqué le niveau d'utilisation d'une route.
                                <br />- De lignes bleu quand peu utilisé.
                                <br />- De lignes rose quand assez utilisé.
                                <br />- De lignes rouge quand très utilisé.
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

export default TrafficPannel;
