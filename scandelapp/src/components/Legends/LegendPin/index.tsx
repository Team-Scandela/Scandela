import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_1sr.png';
import { useTranslation, Trans } from 'react-i18next';
import { FaRegCircle } from 'react-icons/fa';
import { AiFillPushpin, AiFillCloseCircle } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';

const PinPannel: React.FC = () => {
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
                <S.CircleIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                    <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>
                                <AiFillCloseCircle size={24} color="#FAC710" />
                            </S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>{t('pinFilterLegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                <Trans i18nKey="pinFilterDescription">
                                    <br />
                                </Trans>
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="210" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <FaRegCircle size={48} color="green" />
                                <span>{t('greenCircleExplanation')}</span>
                            </div>
                            <div>
                                <FaRegCircle size={48} color="yellow" />
                                <span>{t('yellowCircleExplanation')}</span>
                            </div>
                            <div>
                                <FaRegCircle size={48} color="red" />
                                <span>{t('RedCircleExplanation')}</span>
                            </div>
                            <div>
                                <AiFillPushpin size={48} color="yellow" />
                                <span>{t('yellowPinExplanation')}</span>
                            </div>
                            <div>
                                <MdAddCircleOutline size={48} color="#FAC710" />
                                <span>{t('popupDescription')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default PinPannel;
