import * as React from 'react';
import { useState } from 'react';
import { PannelContainer, PopupText, PopupTextActions, PopupSubTextLampName, PopupTextActionsTitle, PopupTextInfoTitle, PopupTextLampName, CloseIcon, ListDetailContainer} from './elements';

interface LampInfosPopupProps {
  isDark: boolean;
  id : string,
  selectedLampId: string | null;
  onClosePopup: () => void;

}

const LampInfosPopup: React.FC<LampInfosPopupProps> = ({ id, isDark, selectedLampId, onClosePopup }) => {

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
          <CloseIcon isDark={isDark} onClick={closePopup}>X</CloseIcon>
          <PopupTextLampName isdark={isDark}> Lampadaire EPNA342002</PopupTextLampName>
          <PopupSubTextLampName isdark={isDark} top="70px"> Chemin de la Censive du Tertre</PopupSubTextLampName>
          
          <PopupTextInfoTitle isdark={isDark} top="120px"> Informations</PopupTextInfoTitle>
          {/* logo bulbe/designation */}
          <PopupText isDark={isDark} top="170px"> SHP T 70 E27 2000 220 - </PopupText>
          {/* logo foyer */}
          <PopupText isDark={isDark} top="210px"> ALURA DIRECT </PopupText>
          {/* logo hauteur */}
          <PopupText isDark={isDark} top="250px"> 3,7m </PopupText>
  
          <PopupTextInfoTitle isdark={isDark} top="300px"> Consommation</PopupTextInfoTitle>
          {/* logo elec */}
          <PopupText isDark={isDark} top="350px"> 50 kW/h </PopupText>
          {/* logo CO2 */}
          <PopupText isDark={isDark} top="390px"> 20g de CO/h </PopupText>
          <ListDetailContainer isDark={isDark}>
            <PopupTextActionsTitle isdark={isDark} top="10px"> Action possible</PopupTextActionsTitle>
            {/* logo turn off */}
            <PopupTextActions isDark={isDark} top="60px"> Eteindre de 0h00 à 5h00 </PopupTextActions>
  
            <PopupTextActionsTitle isdark={isDark} top="110px"> Conséquences</PopupTextActionsTitle>
            {/* logo conséquences figma */}
            <PopupTextActions isDark={isDark} top="160px"> 250 kW/j </PopupTextActions>
            <PopupTextActions isDark={isDark} top="180px"> 100g de CO2/j </PopupTextActions>
          </ListDetailContainer>
        </PannelContainer>
    </div>
  )
}

export default LampInfosPopup;