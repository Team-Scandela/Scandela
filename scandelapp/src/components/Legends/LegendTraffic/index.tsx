import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_5th.png';
import { useTranslation, Trans } from 'react-i18next';

const TrafficPannel: React.FC = () => {
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
                <S.TrafficIcon />
            </S.Button>
            {isModalOpen && (
                <S.Backdrop onClick={closeModal}>
                    <S.ModalWrapper onClick={stopPropagation}>
                        <S.CloseWrapper>
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>{t('trafficFilterLegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                <Trans i18nKey="trafficFilterDescription">
                                    <br />
                                </Trans>
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="210" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <div className="line dark-blue"></div>
                                <span>{t('darkBlueLineExplanation')}</span>
                            </div>
                            <div>
                                <div className="line blue"></div>
                                <span>{t('blueLineExplanation')}</span>
                            </div>
                            <div>
                                <div className="line pink"></div>
                                <span>{t('pinkLineExplanation')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default TrafficPannel;
