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

import MissingLampPopup from '../MissingLampPopup/';

import * as images from './ficheImports';

interface LampInfosPopupProps {
    isDark: boolean;
    id: string;
    selectedLampId: string | null;
    optimisationTemplateData: any;
    selectedLampData: any;
    onClosePopup: () => void;
}

const LampInfosPopup: React.FC<LampInfosPopupProps> = ({
    id,
    isDark,
    selectedLampId,
    optimisationTemplateData,
    selectedLampData,
    onClosePopup,
}) => {
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
                    {/* Lampadaire {selectedLampData.name} */}
                    Lampadaire {selectedLampData.fields.numero}
                </PopupTextLampName>
                <PopupSubTextLampName isDark={isDark} top="70px">
                    {' '}
                    {/* {selectedLampData.address} */}
                    {selectedLampData.fields.nom_voie}
                </PopupSubTextLampName>

                <PopupTextInfoTitle isDark={isDark} top="120px">
                    {' '}
                    Informations
                </PopupTextInfoTitle>
                <PopupTitle isDark={isDark} top="170px">
                    {' '}
                    Type Lampe{' '}
                </PopupTitle>
                <PopupText isDark={isDark} top="170px">
                    {/* {selectedLampData.lampType} */}
                    {selectedLampData.fields.type_lampe}
                </PopupText>
                <PopupTitle isDark={isDark} top="210px">
                    {' '}
                    Type Foyer{' '}
                </PopupTitle>
                <PopupText isDark={isDark} top="210px">
                    {/* {selectedLampData.foyerType} */}
                    {selectedLampData.fields.type_foyer}
                </PopupText>
                {isLampHavingDecision && (
                    <div>
                        <PopupTitle isDark={isDark} top="250px">
                            {' '}
                            Hauteur{' '}
                        </PopupTitle>
                        <PopupText isDark={isDark} top="250px">
                            {optimisationTemplateData.height} m
                        </PopupText>
                    </div>
                )}
                <PopupTextInfoTitle isDark={isDark} top="300px">
                    {' '}
                    Consommation
                </PopupTextInfoTitle>
                <img
                    src={images.flash}
                    alt="Flash"
                    draggable="false"
                    style={{
                        position: 'absolute',
                        top: '340px',
                        left: '50px',
                        width: '20px',
                        userSelect: 'none',
                    }}
                />
                <PopupText isDark={isDark} top="350px">
                    {' '}
                    50 kW/h{' '}
                </PopupText>
                <img
                    src={images.leaf}
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
                <PopupText isDark={isDark} top="390px">
                    {' '}
                    20g de CO/h{' '}
                </PopupText>
                <MissingLampPopup isDark={isDark} />
                {isLampHavingDecision && (
                    <div>
                        <ListDetailContainer isDark={isDark}>
                            <PopupTextActionsTitle isDark={isDark} top="10px">
                                {' '}
                                Action possible
                            </PopupTextActionsTitle>
                            <PopupTextActions isDark={isDark} top="50px">
                                {' '}
                                {optimisationTemplateData.solution}
                            </PopupTextActions>
                            <img
                                src={images.switch_off}
                                alt="Flash"
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
                                {' '}
                                Conséquences
                            </PopupTextActionsTitle>
                            <img
                                src={images.descending_icon}
                                alt="Flash"
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
                                {' '}
                                250 kW/j{' '}
                            </PopupTextActions>
                            <PopupTextActions isDark={isDark} top="180px">
                                {' '}
                                100g de CO2/j{' '}
                            </PopupTextActions>
                        </ListDetailContainer>
                    </div>
                )}
            </PannelContainer>
        </div>
    );
};

export default LampInfosPopup;
