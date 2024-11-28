import React, { useState } from 'react';
import * as S from './elements';
import { useTranslation, Trans } from 'react-i18next';
import exemple from '../../../assets/exemple_6th.png'
import { AiFillPushpin, AiFillThunderbolt, AiFillCloseCircle} from 'react-icons/ai';

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
                        <S.h2>{t('filterLegendHeader')}</S.h2>
                        <S.LegendWrapper>
                            <S.p>
                                <Trans i18nKey="filterDescription">
                                    <br />
                                </Trans>
                            </S.p>
                        </S.LegendWrapper>
                        <S.ExampleWrapper>
                            <img src={exemple} alt="exemple" width="455" height="210" />
                        </S.ExampleWrapper>
                        <S.IconsExplanationsWrapper>
                            <div>
                                <AiFillPushpin size={48} color="blue" />
                                <span>{t('bluePinExplanation')}</span>
                            </div>
                            <div>
                                <AiFillThunderbolt size={48} color="blue" />
                                <span>{t('blueLightningExplanation')}</span>
                            </div>
                            <div>
                                <AiFillThunderbolt size={48} color="yellow" />
                                <span>{t('yellowLightningExplanation')}</span>
                            </div>
                        </S.IconsExplanationsWrapper>
                    </S.ModalWrapper>
                </S.Backdrop>
            )}
        </div>
    );
};

export default EcoPannel;
