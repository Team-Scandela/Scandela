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

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
                    <S.h2 >Légende du filtre Heatmap</S.h2> 
                        <S.p >Le filtre pollution lumineuse ce compose de:
                            <br />- plusieurs halo de lumière.
                            <br />- plus le halo est grand plus cela signal que la Propagation est forte.
                            <br />- Ce filtre permet de mieux comprendre l'impact de la pollution lumineuse dans sa ville sur une plus petite zone.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default ZonePannel;