import React, { useState } from 'react';
import * as S from './elements';

const EcoPannel: React.FC = () => {
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
                <S.LeafIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>Légende du filtre Trâme noire</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre de la trâme noire ce compose de:
                                <br />- Différentes zones colorées qui ont une sensibilité en lien avec l'écologie.
                                <br />- Les zones sont cliquables et permettent d'afficher des informations sur la zone.
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

export default EcoPannel;
