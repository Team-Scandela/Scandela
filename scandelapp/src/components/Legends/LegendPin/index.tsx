import React, { useState } from 'react';
import * as S from './elements';

const PinPannel: React.FC = () => {
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
                        <S.h2>Légende du filtre par lampadaires</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre par lampadaire ce compose de:
                                <br />- Clusters qui affiche le nombre de lampadaire par zones en fonction du zoom.
                                <br />- De points jaune pour chaque lampadaire à l'endroit exact.
                                <br />- De points jaune cliquable pour chaque lampadaire.
                                <br />- De pop-up qui affichent des informations sur les lampadaires.
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

export default PinPannel;
