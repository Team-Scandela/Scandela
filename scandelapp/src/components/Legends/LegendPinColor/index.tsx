import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_3rd.png';
import pin_vert from '../../../assets/pin_vert.png';
import pin_orange from '../../../assets/pin_orange.png';
import pin_rouge from '../../../assets/pin_rouge.png';
import { useTranslation, Trans } from 'react-i18next';

const ColorPannel: React.FC = () => {
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
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                        </S.CloseWrapper>
                        <S.h2>{t('bulbQualityFilterLegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                <Trans i18nKey="bulbQualityFilterDescription">
                                    <br />
                                </Trans>
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="210" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <img src={pin_vert} alt="pin vert" />
                                <span>{t('greenPinExplanation')}</span>
                            </div>
                            <div>
                                <img src={pin_orange} alt="pin orange" />
                                <span>{t('orangePinExplanation')}</span>
                            </div>
                            <div>
                                <img src={pin_rouge} alt="pin rouge" />
                                <span>{t('redPinExplanation')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default ColorPannel;
