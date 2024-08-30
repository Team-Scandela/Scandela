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
                        <S.h2 >Trâme noire informations</S.h2> 
                        <S.p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, natus voluptates. Tempora modi unde, iure quas quidem repellendus voluptatum asperiores error voluptates minus animi dicta vitae consectetur illo doloribus numquam!</S.p>
                        <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default EcoPannel;