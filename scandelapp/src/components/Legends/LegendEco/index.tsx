import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_7th.png';
import pop_up2 from '../../../assets/pop_up2.png';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const EcoPannel: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

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
                            <S.CloseButton onClick={closeModal}>
                                <AiFillCloseCircle size={24} color="#FAC710" />
                            </S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>{t('filter2LegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p dangerouslySetInnerHTML={{ __html: t('filterDescription') }} />
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="210" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <img src={pop_up2} alt="pop_up2" />
                                <span>{t('popup2Description')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default EcoPannel;
