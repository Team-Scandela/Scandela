import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_4th.png';
import { useTranslation, Trans } from 'react-i18next';
import { AiFillPushpin, AiOutlineSelect, AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';

const ZonePannel: React.FC = () => {
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
                <S.ZoneIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>
                                <AiFillCloseCircle size={24} color="#FAC710" />
                            </S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>{t('componentFilterLegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                <Trans i18nKey="componentFilterDescription">
                                    <br />
                                </Trans>
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="160" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <AiOutlineSelect size={64} color="yellow" />
                                <span>{t('selectorExplanation')}</span>
                            </div>
                            <div>
                                <AiOutlineEye size={64} color="yellow" />
                                <span>{t('haloExplanation')}</span>
                            </div>
                            <div>
                                <AiFillPushpin size={64} color="yellow" />
                                <span>{t('yellowPinExplanation')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default ZonePannel;
