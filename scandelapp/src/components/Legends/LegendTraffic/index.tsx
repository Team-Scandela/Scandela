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

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
                    <S.h2 >Légende du filtre Heatmap</S.h2> 
                        <S.p >Le filtre traffic ce compose de:
                            <br />- plusieurs lignes de traffic.
                            <br />- bleu clair signal un traffic peu dense.
                            <br />- bleu foncé signal un traffic assez dense.
                            <br />- rose/rouge signal que le traffic est très dense que le passage est fréquent et donc important.
                            <br />- Ce filtre permet de mieux comprendre le traffic dans sa ville.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default TrafficPannel;