import React, { useState } from 'react';
import * as S from './elements';
import exemple from '../../../assets/exemple_1sr.png';
import pin_jaune from '../../../assets/pin_jaune.png';
import pop_up1 from '../../../assets/pop_up1.png';
import cercle_jaune from '../../../assets/cercle_jaune.png';
import cercle_vert from '../../../assets/cercle_vert.png';
import cercle_rouge from '../../../assets/cercle_rouge_leg.png';
import { useTranslation, Trans } from 'react-i18next';

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
                            <S.CloseButton onClick={closeModal}>X</S.CloseButton>
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
                                <img src={cercle_vert} alt="cercle vert" />
                                <span>{t('greenCircleExplanation')}</span>
                            </div>
                            <div>
                                <img src={cercle_jaune} alt="cercle jaune" />
                                <span>{t('yellowCircleExplanation')}</span>
                            </div>
                            <div>
                                <img src={cercle_rouge} alt="cercle rouge" />
                                <span>{t('redCircleExplanation')}</span>
                            </div>
                            <div>
                                <img src={pin_jaune} alt="pin jaune" />
                                <span>{t('yellowPinExplanation')}</span>
                            </div>
                            <div>
                                <img src={pop_up1} alt="pop_up1" />
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
