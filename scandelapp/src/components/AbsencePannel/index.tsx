import React, { useState } from 'react';
import { PannelContainer, PannelText, CloseIcon, ListDetailContainer, WarningIcon, EventContainer, ArrowIcon, EventText, EventTextContainer, IndicatorsImage} from './elements';
import ToggleBButtonAbscencePannelButton from '../ButtonAbscencePannel';
import { PersonnalizedGauge } from '../Gauges';

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
        <PersonnalizedGauge id={"ElecGaugesComponentId"} isDark={isDark} isElec={true} isBio={false} isLumi={false} level={70} oldLevel={50} top={130} left={770} />
        <PersonnalizedGauge id={"BioGaugesComponentId"} isDark={isDark} isElec={false} isBio={true} isLumi={false} level={75} oldLevel={85} top={240} left={770} />
        <PersonnalizedGauge id={"LumiGaugesComponentId"} isDark={isDark} isElec={false} isBio={false} isLumi={true} level={30} oldLevel={20} top={350} left={770} />

      </PannelContainer>
    </div>
  );
};

export default AbsencePannel;