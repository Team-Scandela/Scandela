import * as React from 'react';
import { PannelContainer, PannelText, CloseIcon, ListDetailContainer, WarningIcon, EventContainer, ArrowIcon, EventText, EventTextContainer, IndicatorsImage} from './elements';
import indicators from '../../assets/Indicators.png';

interface DuringYourAbsencePannelProps {
  isDark: boolean;
}

const DuringYourAbsencePannel: React.FC<DuringYourAbsencePannelProps> = ({ isDark }) => {

  const [on, setOn] = React.useState(true);

  const closePanel = () => {
    setOn(false);
  };
  
  return (
    <div>
      <PannelContainer show={on} isDark={isDark} >
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
        <IndicatorsImage src={indicators} alt="Indicators" />
      </PannelContainer>
    </div>
  );
};

export default DuringYourAbsencePannel;
