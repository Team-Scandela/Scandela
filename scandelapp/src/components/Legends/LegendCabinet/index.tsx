import React, { useState } from 'react';
import * as S from './elements';

const CabinetPannel: React.FC = () => {
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
                <S.LeafIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.h2 >Légende du filtre Armoire Électrique</S.h2> 
                        <S.p >Le filtre des armoires éléectrique ce compose de:
                            <br />- Les armoires électrique noté d'un éclair jaune.
                            <br />- sont cliquables et vous redirige vers le parc de l'armoire électrique.
                            <br />- permettent de comprendre le parc de gestion d'une armoire éléectrique.
                        </S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default CabinetPannel;