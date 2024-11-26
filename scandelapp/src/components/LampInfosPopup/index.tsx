import { useState, useEffect } from 'react';
import {
    PannelContainer,
    PopupText,
    PopupTitle,
    PopupTextActions,
    PopupSubTextLampName,
    PopupTextActionsTitle,
    PopupTextInfoTitle,
    PopupTextLampName,
    CloseIcon,
    ListDetailContainer,
} from './elements';
import { useTranslation } from 'react-i18next';

import MissingLampPopup from '../MissingLampPopup/';

import * as images from './ficheImports';

interface LampInfosPopupProps {
    isDark: boolean;
    id: string;
    selectedLampId: string | null;
    optimisationTemplateData: any;
    onClosePopup: () => void;
}

const LampInfosPopup: React.FC<LampInfosPopupProps> = ({
    id,
    isDark,
    selectedLampId,
    optimisationTemplateData,
    onClosePopup,
}) => {
    const { t } = useTranslation();
    const [lampData, setLampData] = useState(null);

    useEffect(() => {
        const getLampData = async () => {
            const username = process.env.REACT_APP_REQUEST_USER;
            const password = process.env.REACT_APP_REQUEST_PASSWORD;
            const urlLamp =
                process.env.REACT_APP_BACKEND_URL + `lamps/${selectedLampId}`;

            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            setLampData(await response.json());
        };
        getLampData();
    }, [selectedLampId]);

    const [isLampHavingDecision, setIsLampHavingDecision] = useState(
        !!optimisationTemplateData
    );
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 600, y: 50 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const closePopup = () => {
        onClosePopup();
    };

    const startDragging = (e: any) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const onDragging = (e: any) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y,
            });
        }
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onDragging);
            window.addEventListener('mouseup', stopDragging);
        } else {
            window.removeEventListener('mousemove', onDragging);
            window.removeEventListener('mouseup', stopDragging);
        }
        return () => {
            window.removeEventListener('mousemove', onDragging);
            window.removeEventListener('mouseup', stopDragging);
        };
    }, [isDragging, onDragging]);

    // Fonction pour déterminer la qualité de l'éclairage
    const GetQualityInfo = (type: string) => {
        switch (type) {
            case 'SHP':
            case 'IMC':
            case 'IM':
                return {
                    text: t('badQuality'),
                };
            case 'MBF':
            case 'IC':
            case 'SBP':
                return {
                    text: t('midQuality'),
                };
            case 'DIC':
            case 'HAL':
            case 'LED':
            case 'TL':
            case 'TF':
            case 'FC':
                return {
                    text: t('goodQuality'),
                };
            default:
                return {
                    text: t('unknownQuality'),
                };
        }
    };

    const { text: qualityText } = GetQualityInfo(
        lampData === null ? '' : lampData.lampType
    );

    return (
        <div id={id}>
            <PannelContainer
                isDark={isDark}
                isLampHavingDecision={isLampHavingDecision}
                onMouseDown={startDragging}
                left={position.x}
                top={position.y}
            >
                <CloseIcon isDark={isDark} onClick={closePopup}></CloseIcon>
                <PopupTextLampName isDark={isDark}>
                    Lampadaire {lampData === null ? '' : lampData.name}
                </PopupTextLampName>
                <PopupSubTextLampName isDark={isDark} top="70px">
                    {lampData === null ? '' : lampData.address}
                </PopupSubTextLampName>

                <PopupTextInfoTitle isDark={isDark} top="120px">
                    Informations
                </PopupTextInfoTitle>
                <PopupTitle isDark={isDark} top="170px">
                    {t('lamptype')}
                </PopupTitle>
                <PopupText isDark={isDark} top="170px">
                    {lampData === null ? '' : lampData.lampType}
                </PopupText>
                <PopupTitle isDark={isDark} top="210px">
                    {t('foyertype')}
                </PopupTitle>
                <PopupText isDark={isDark} top="210px">
                    {lampData === null ? '' : lampData.foyerType}
                </PopupText>
                <PopupTitle isDark={isDark} top="250px">
                    {t('quality')}
                </PopupTitle>
                <PopupText isDark={isDark} top="250px" left="200px">
                    {qualityText}
                </PopupText>

                {isLampHavingDecision && (
                    <div>
                        <PopupTitle isDark={isDark} top="300px">
                            Hauteur
                        </PopupTitle>
                        <PopupText isDark={isDark} top="300px">
                            {optimisationTemplateData.height} m
                        </PopupText>
                    </div>
                )}
                <PopupTextInfoTitle isDark={isDark} top="350px">
                    Consommation
                </PopupTextInfoTitle>
                <img
                    src={images.flash}
                    alt="Flash"
                    draggable="false"
                    style={{
                        position: 'absolute',
                        top: '390px',
                        left: '50px',
                        width: '20px',
                        userSelect: 'none',
                    }}
                />
                <PopupText isDark={isDark} top="400px">
                    {lampData === null
                        ? null
                        : lampData.bulb === null ||
                            lampData.bulb?.consommation === undefined
                          ? t('unknownData')
                          : lampData.bulb.consommation + ' kW/h'}
                </PopupText>
                <img
                    src={images.leaf}
                    alt="Leaf"
                    draggable="false"
                    style={{
                        position: 'absolute',
                        top: '440px',
                        left: '50px',
                        width: '20px',
                        userSelect: 'none',
                    }}
                />
                <PopupText isDark={isDark} top="440px">
                    {lampData === null
                        ? null
                        : lampData.bulb === null ||
                            lampData.bulb?.consommation === undefined
                          ? 'Donnée inconnue'
                          : lampData.bulb.consommation * 50 + 'g de CO²'}
                </PopupText>
                <MissingLampPopup isDark={isDark} />
                {isLampHavingDecision && (
                    <div>
                        <ListDetailContainer isDark={isDark}>
                            <PopupTextActionsTitle isDark={isDark} top="10px">
                                Action possible
                            </PopupTextActionsTitle>
                            <PopupTextActions isDark={isDark} top="50px">
                                {optimisationTemplateData.solution}
                            </PopupTextActions>
                            <img
                                src={images.switch_off}
                                alt="Switch Off"
                                draggable="false"
                                style={{
                                    position: 'absolute',
                                    top: '50px',
                                    left: '32px',
                                    width: '40px',
                                    userSelect: 'none',
                                }}
                            />

                            <PopupTextActionsTitle isDark={isDark} top="110px">
                                Conséquences
                            </PopupTextActionsTitle>
                            <img
                                src={images.descending_icon}
                                alt="Descending Icon"
                                draggable="false"
                                style={{
                                    position: 'absolute',
                                    top: '150px',
                                    left: '30px',
                                    width: '50px',
                                    userSelect: 'none',
                                }}
                            />
                            <PopupTextActions isDark={isDark} top="160px">
                                250 kW/j
                            </PopupTextActions>
                            <PopupTextActions isDark={isDark} top="180px">
                                100g de CO2/j
                            </PopupTextActions>
                        </ListDetailContainer>
                    </div>
                )}
            </PannelContainer>
        </div>
    );
};

export default LampInfosPopup;
