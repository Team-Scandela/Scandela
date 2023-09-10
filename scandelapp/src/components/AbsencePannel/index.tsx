import React, { useState } from 'react';
import { PannelContainer, PannelText, CloseIcon, ListDetailContainer, WarningIcon, EventContainer, ArrowIcon, EventText, EventTextContainer, IndicatorsImage} from './elements';
import ToggleBButtonAbscencePannelButton from '../ButtonAbscencePannel';

interface AbsencePannelProps {
  id: string;
  isDark: boolean;
}

const AbsencePannel: React.FC<AbsencePannelProps> = ({id, isDark }) => {

  const [isPanelOpen, setPanelOpen] = useState(false);

  const closePanel = () => {
    setPanelOpen(false);
  };

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  return (
    <div>
      <ToggleBButtonAbscencePannelButton onClick={togglePanel} /> {/* Utilisez le composant de bouton correct */}
      <PannelContainer show={isPanelOpen} isDark={isDark} >
        <PannelText isDark={isDark}>Pendant votre absence</PannelText>
        <CloseIcon onClick={closePanel} isDark={isDark} />
        <ListDetailContainer isDark={isDark} >
          <EventContainer isDark={isDark} top="10%" >
            <WarningIcon />
            <EventTextContainer isDark={isDark} >
              <EventText isDark={isDark}>Dérèglement du lampadaire 86 Rue Henri IV</EventText>
            </EventTextContainer>
            <ArrowIcon isDark={isDark} />
          </EventContainer>
          <EventContainer isDark={isDark}  top="40%">
            <WarningIcon />
            <EventTextContainer isDark={isDark} >
              <EventText isDark={isDark}>Surtension de 5 lampadaires Rue Geoffrey</EventText>
            </EventTextContainer>
            <ArrowIcon isDark={isDark} />
          </EventContainer>
          <EventContainer isDark={isDark}  top="70%">
            <WarningIcon />
            <EventTextContainer isDark={isDark} >
              <EventText isDark={isDark}>lampadaire EPNA342002 cassé 11 Rue du Moulin</EventText>
            </EventTextContainer>
            <ArrowIcon isDark={isDark} />
          </EventContainer>
        </ListDetailContainer>
      </PannelContainer>
    </div>
  );
};

export default AbsencePannel;