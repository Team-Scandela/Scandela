import React from 'react';
import {
    PannelContainer,
    PannelText,
    CloseIcon,
    ListDetailContainer,
    WarningIcon,
    EventContainer,
    ArrowIcon,
    EventText,
    EventTextContainer,
    IndicatorsImage,
} from './elements';

class MainPanel extends React.Component {

    redirectToMain = () => {
        // ouvre un nouvel onglet avec l'adresse de l'application "app.scandela.fr/"
        window.open("https://app.scandela.fr/", "_blank");
    }

    render() {
        return (
            <div>
                <PannelContainer show={true} isDark={true}>

                    <PannelText isDark={true}>Scandextension</PannelText>

                    <ListDetailContainer isDark={true}>
                        {/* Individual event container */}
                        <EventContainer>
                            <WarningIcon />

                            <EventTextContainer>
                                <EventText isDark={true}>
                                    Dérèglement du lampadaire 86 Rue Henri IV
                                </EventText>
                            </EventTextContainer>

                            <ArrowIcon isDark={true} onClick={() => this.redirectToMain()} />
                        </EventContainer>

                    </ListDetailContainer>
                </PannelContainer>
            </div>
        );
    }
}

export default MainPanel;
