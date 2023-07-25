import * as React from 'react';
import { PannelContainer, PopupText, PopupSubTextLampName, PopupTextActionsTitle, PopupTextInfoTitle, PopupTextLampName, CloseIcon, ListDetailContainer} from './elements';

interface LampInfosPopupProps {
  isDark: boolean;
  id : string,
}

const LampInfosPopup: React.FC<LampInfosPopupProps> = ({ id, isDark }) => {
  
  return (
    <div id={id}>
      <PannelContainer isDark={isDark} >
        <CloseIcon isDark={isDark}> </CloseIcon>
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
        <ListDetailContainer isDark={isDark} >
        </ListDetailContainer>
      </PannelContainer>
    </div>
  );
};

export default LampInfosPopup;  