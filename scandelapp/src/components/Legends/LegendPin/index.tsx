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
                        <S.h2>Légende du filtre Pin/Cluster</S.h2>
                        <S.p>
                            Le filtre Pin/Cluster ce compose de:
                            <br />- Clusters qui affichent les différentes zones
                            avec des éclairages.
                            <br />- Cluster rouge signifie zone avec beaucoup
                            d'éclairage
                            <br />- Cluster orange/jaune signifie une
                            concentration moyenne d'éclairage.
                            <br />- Cluster vert signifie peu d'éclairage dans
                            la zone.
                            <br />- Ce filtre permet de mieux comprendre la
                            répartition de l'éclairage dans sa ville.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default PinPannel;
