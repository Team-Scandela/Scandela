import * as React from 'react';
import { useState } from 'react';
import { PannelContainer, PopupText, PopupTitle, PopupTextActions, PopupSubTextLampName, PopupTextActionsTitle, PopupTextInfoTitle, PopupTextLampName, CloseIcon, ListDetailContainer} from './elements';
import * as images from './ficheImports'

interface LampInfosPopupProps {
  isDark: boolean;
  id : string,
  selectedLampId: string | null;
  onClosePopup: () => void;
  selectedLampFeature: mapboxgl.MapboxGeoJSONFeature | null;

}

const LampInfosPopup: React.FC<LampInfosPopupProps> = ({ id, isDark, selectedLampId, onClosePopup, selectedLampFeature }) => {

  // Fonction pour fermer le popup
  const closePopup = () => {
    onClosePopup();
  };

   // Si selectedLampId n'est pas défini, n'affichez rien
   if (!selectedLampId) {
    return null;
  }

  return (
    <div id={id}>
        <PannelContainer isDark={isDark}>
          <CloseIcon isDark={isDark} onClick={closePopup}></CloseIcon>
          <PopupTextLampName isdark={isDark}> Lampadaire EPNA342002</PopupTextLampName>
          <PopupSubTextLampName isdark={isDark} top="70px"> Chemin de la Censive du Tertre</PopupSubTextLampName>
          
          <PopupTextInfoTitle isdark={isDark} top="120px"> Informations</PopupTextInfoTitle>
          <PopupTitle isDark={isDark} top="170px"> Type Lampe </PopupTitle>
          <PopupText isDark={isDark} top="170px"> SHP T 70 E27 2000 220 - </PopupText>
          <PopupTitle isDark={isDark} top="210px"> Type Foyer </PopupTitle>
          <PopupText isDark={isDark} top="210px"> ALURA DIRECT </PopupText>
          <PopupTitle isDark={isDark} top="250px"> Hauteur </PopupTitle>
          <PopupText isDark={isDark} top="250px"> 3,7m </PopupText>
  
          <PopupTextInfoTitle isdark={isDark} top="300px"> Consommation</PopupTextInfoTitle>
          <img src={images.flash} alt="Flash" style={{ position: 'absolute', top: '340px', left: '50px', width: '20px' }} />
          <PopupText isDark={isDark} top="350px"> 50 kW/h </PopupText>
          <img src={images.leaf} alt="Flash" style={{ position: 'absolute', top: '390px', left: '50px', width: '20px' }} />
          <PopupText isDark={isDark} top="390px"> 20g de CO/h </PopupText>
          <ListDetailContainer isDark={isDark}>
            <PopupTextActionsTitle isdark={isDark} top="10px"> Action possible</PopupTextActionsTitle>
            <PopupTextActions isDark={isDark} top="60px"> Eteindre de 0h00 à 5h00 </PopupTextActions>
            <img src={images.switch_off} alt="Flash" style={{ position: 'absolute', top: '50px', left: '32px', width: '40px' }} />
  
            <PopupTextActionsTitle isdark={isDark} top="110px"> Conséquences</PopupTextActionsTitle>
            <img src={images.descending_icon} alt="Flash" style={{ position: 'absolute', top: '150px', left: '30px', width: '50px' }} />
            <PopupTextActions isDark={isDark} top="160px"> 250 kW/j </PopupTextActions>
            <PopupTextActions isDark={isDark} top="180px"> 100g de CO2/j </PopupTextActions>
          </ListDetailContainer>
        </PannelContainer>
    </div>
  )
}

export default LampInfosPopup;