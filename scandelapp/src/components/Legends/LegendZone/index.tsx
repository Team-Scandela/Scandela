import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_4th.png';
import pin_jaune from '../../../assets/pin_jaune.png';
import selecteur from '../../../assets/selecteur.png';
import halo from '../../../assets/halo.png';
import { useTranslation, Trans } from 'react-i18next';

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
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
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
                                <img src={selecteur} alt="selecteur" />
                                <span>{t('selectorExplanation')}</span>
                            </div>
                            <div>
                                <img src={halo} alt="halo" />
                                <span>{t('haloExplanation')}</span>
                            </div>
                            <div>
                                <img src={pin_jaune} alt="pin jaune" />
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
