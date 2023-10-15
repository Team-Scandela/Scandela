import * as React from 'react';
import { useState } from 'react';
import {
    PannelContainer,
    PopupText,
    PopupTitle,
    PopupSubTextLampName,
    PopupTextLampName,
    CloseIcon,
    TempButton,
} from './elements';

interface SmallLampInfosPopupProps {
    isDark: boolean;
    // id: string;
    // selectedLampId: string | null;
    // address: string;
    // typeLampe: string;
    // typeFoyer: string;
    // hauteur: string;
    // onClosePopup: () => void;
    // selectedLampFeature: mapboxgl.MapboxGeoJSONFeature | null;
}

const SmallLampInfosPopup: React.FC<SmallLampInfosPopupProps> = ({
    isDark,
    // id,
    // selectedLampId,
    // address,
    // typeFoyer,
    // typeLampe,
    // hauteur,
    // onClosePopup,
}) => {
    // State to track whether the popup is open or closed
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Function to close the panel
    const closePopup = () => {
        setPopupOpen(false);
    };

    // Function to toggle the panel's visibility
    const togglePanel = () => {
        setPopupOpen(!isPopupOpen);
    };
    // Fonction pour fermer le popup
    // const closePopup = () => {
    //     onClosePopup();
    // };

    // Si selectedLampId n'est pas défini, n'affichez rien
    // if (!selectedLampId) {
    //     return null;
    // }

    return (
        <div>
            <TempButton onClick={togglePanel}>
                Temp : Small lamp info
            </TempButton>

            <PannelContainer show={isPopupOpen} isDark={isDark}>
                <CloseIcon isDark={isDark} onClick={closePopup}></CloseIcon>
                <PopupTextLampName isDark={isDark}>
                    Lampadaire J23 - 8392
                </PopupTextLampName>
                <PopupSubTextLampName isDark={isDark} top="80px">
                    {' '}
                    9 Rue d'Alger
                </PopupSubTextLampName>

                <PopupTitle isDark={isDark} top="130px">
                    {' '}
                    Type Lampe : SHP
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="170px">
                    {typeLampe}
                </PopupText> */}
                <PopupTitle isDark={isDark} top="170px">
                    {' '}
                    Type Foyer : ALURA
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="210px">
                    {typeFoyer}
                </PopupText> */}
                <PopupTitle isDark={isDark} top="210px">
                    {' '}
                    Hauteur : 3.7 m
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="250px">
                    {hauteur} m
                </PopupText> */}
            </PannelContainer>
        </div>
    );
};

export default SmallLampInfosPopup;
