import React, { useState } from 'react';
import * as S from './elements';

const ZonePannel: React.FC = () => {
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
                <S.ZoneIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>Légende du filtre par composant</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                Le filtre par composant est composé de:
                                <br />- Une recherche d'éclairages en particulier via certains critères.
                                <br />- un affichage de la zone d'éclairage individuel de chaque lampadaire avec un halo de lumière.
                                <br />- Des points jaune là ou les lampadaires sont trouvé en rapport avec les critères.
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

export default ZonePannel;
