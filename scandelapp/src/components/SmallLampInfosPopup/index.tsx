import * as React from 'react';
import { useState } from 'react';
import {
    PannelContainer,
    PopupText,
    PopupTitle,
    PopupSubTextLampName,
    PopupTextLampName,
    CloseIcon,
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
    // selectedLampFeature,
}) => {

    // State to track whether the panel is open or closed
    const [isPanelOpen, setPanelOpen] = useState(false);

    // Function to close the panel
    const closePanel = () => {
        setPanelOpen(false);
    };

    // Function to toggle the panel's visibility
    const togglePanel = () => {
        setPanelOpen(!isPanelOpen);
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
            <PannelContainer isDark={isDark}>
                <CloseIcon isDark={isDark} ></CloseIcon>
                <PopupTextLampName isDark={isDark}>
                    Lampadaire J23
                </PopupTextLampName>
                <PopupSubTextLampName isDark={isDark} top="80px">
                    {' '}
                    9 Rue d'Alger
                </PopupSubTextLampName>

                <PopupTitle isDark={isDark} top="130px">
                    {' '}
                    Type Lampe{' '} : SHP
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="170px">
                    {typeLampe}
                </PopupText> */}
                <PopupTitle isDark={isDark} top="180px">
                    {' '}
                    Type Foyer{' '} : ALURA
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="210px">
                    {typeFoyer}
                </PopupText> */}
                <PopupTitle isDark={isDark} top="220px">
                    {' '}
                    Hauteur{' '} : 3.7 m
                </PopupTitle>
                {/* <PopupText isDark={isDark} top="250px">
                    {hauteur} m
                </PopupText> */}
            </PannelContainer>
        </div>
    );
};

export default SmallLampInfosPopup;