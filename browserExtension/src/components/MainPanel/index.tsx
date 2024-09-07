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
} from './elements';
import PersonnalizedGauge from '../Gauges';

class MainPanel extends React.Component {
    redirectToMain = () => {
        // ouvre un nouvel onglet avec l'adresse de l'application "app.scandela.com/"
        window.open('https://app.scandela.com/', '_blank');
    };

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

                            <ArrowIcon
                                isDark={true}
                                onClick={() => this.redirectToMain()}
                            />
                        </EventContainer>
                    </ListDetailContainer>

                    <PersonnalizedGauge
                        id={'ElecGaugesComponentId'}
                        isDark={true}
                        isElec={true}
                        isBio={false}
                        isLumi={false}
                        level={70}
                        oldLevel={50}
                        top={130}
                        left={720}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={true}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={75}
                        oldLevel={85}
                        top={240}
                        left={720}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={true}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={30}
                        oldLevel={20}
                        top={350}
                        left={720}
                    />
                </PannelContainer>
            </div>
        );
    }
}

export default MainPanel;
