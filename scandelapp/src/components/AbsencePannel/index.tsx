import React, { useState } from 'react';
import { PannelContainer, PannelText, CloseIcon, ListDetailContainer, WarningIcon, EventContainer, ArrowIcon, EventText, EventTextContainer, IndicatorsImage } from './elements';
import ToggleBButtonAbscencePannelButton from '../ButtonAbscencePannel';
import { PersonnalizedGauge } from '../Gauges';

// Define the props for AbsencePannel component
interface AbsencePannelProps {
  id: string; // Unique identifier for the component
  isDark: boolean; // A flag to determine if it's in dark mode
}

// Create the AbsencePannel component using React.FC
const AbsencePannel: React.FC<AbsencePannelProps> = ({ id, isDark }) => {

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

  // Render the AbsencePannel component
  return (
    <div>
      {/* Button to toggle the panel */}
      <ToggleBButtonAbscencePannelButton onClick={togglePanel} />

      {/* Container for the panel */}
      <PannelContainer show={isPanelOpen} isDark={isDark} >
        {/* Panel text */}
        <PannelText isDark={isDark}>Pendant votre absence</PannelText>
        
        {/* Close icon to close the panel */}
        <CloseIcon onClick={closePanel} isDark={isDark} />

        {/* Container for the list of events */}
        <ListDetailContainer isDark={isDark} >
          {/* Individual event container */}
          <EventContainer isDark={isDark} top="10%" >
            {/* Warning icon for the event */}
            <WarningIcon />

            {/* Container for event text */}
            <EventTextContainer isDark={isDark} >
              {/* Event text */}
              <EventText isDark={isDark}>Dérèglement du lampadaire 86 Rue Henri IV</EventText>
            </EventTextContainer>

            {/* Arrow icon for the event */}
            <ArrowIcon isDark={isDark} />
          </EventContainer>
          
          {/* Repeat similar event containers for other events */}
          
        </ListDetailContainer>

        {/* Render personalized gauge components */}
        <PersonnalizedGauge id={"ElecGaugesComponentId"} isDark={isDark} isElec={true} isBio={false} isLumi={false} level={70} oldLevel={50} top={130} left={770} />
        <PersonnalizedGauge id={"BioGaugesComponentId"} isDark={isDark} isElec={false} isBio={true} isLumi={false} level={75} oldLevel={85} top={240} left={770} />
        <PersonnalizedGauge id={"LumiGaugesComponentId"} isDark={isDark} isElec={false} isBio={false} isLumi={true} level={30} oldLevel={20} top={350} left={770} />

      </PannelContainer>
    </div>
  );
};

// Export the AbsencePannel component as the default export
export default AbsencePannel;
