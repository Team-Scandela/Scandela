import * as React from 'react';
import { PannelContainer, PannelText, CloseIcon, ListDetailContainer, WarningIcon, EventContainer, ArrowIcon, EventText, EventTextContainer} from './elements';

interface DuringYourAbsencePannelProps {
  isDark: boolean;
}

const DuringYourAbsencePannel: React.FC<DuringYourAbsencePannelProps> = ({ isDark }) => {

  return (
    <div>
      <PannelContainer isDark={isDark} >
        <PannelText isDark={isDark}>Pendant votre absence</PannelText>
        <CloseIcon isDark={isDark} />
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
              <EventText isDark={isDark}>Dérèglement du lampadaire 86 Rue Henri IV</EventText>
            </EventTextContainer>
            <ArrowIcon isDark={isDark} />
          </EventContainer>
          <EventContainer isDark={isDark}  top="70%">
            <WarningIcon />
            <EventTextContainer isDark={isDark} >
              <EventText isDark={isDark}>Dérèglement du lampadaire 86 Rue Henri IV</EventText>
            </EventTextContainer>
            <ArrowIcon isDark={isDark} />
          </EventContainer>
        </ListDetailContainer>
      </PannelContainer>
    </div>
  );
};

export default DuringYourAbsencePannel;
