import { useEffect, useState } from 'react';
import {
    AbsencePannelButtonContainer,
    PannelContainer,
    PannelText,
    CloseIcon,
    ListDetailContainer,
    EventContainer,
    EventDate,
    EventDescription,
    EventTitle,
    EventLocation,
} from './elements';
import { PersonnalizedGauge } from '../Gauges';
import { GoInfo } from 'react-icons/go';

interface AbsencePannelProps {
    id: string;
    isDark: boolean;
}

const AbsencePannel: React.FC<AbsencePannelProps> = ({ id, isDark }) => {
    const [isAbsencePannelOpen, setIsAbsencePannelOpen] = useState(true);
    const [dataReceived, setDataReceived] = useState(false);
    const [absenceData, setAbsenceData] = useState([]);

    const handleToggleAbsencePannel = () => {
        setIsAbsencePannelOpen(!isAbsencePannelOpen);
    };

    function arrayToISOString(array: number[]): string {
        const year = array[0];
        const month = array[1] - 1;
        const day = array[2];
        const hours = array[3];
        const minutes = array[4];

        const date = new Date(Date.UTC(year, month, day, hours, minutes));

        return (
            date.toLocaleDateString('fr-FR') +
            ' ' +
            date.toLocaleTimeString('fr-FR')
        );
    }

    function arrayTotimestamp(array: number[]): number {
        const year = array[0];
        const month = array[1] - 1;
        const day = array[2];
        const hours = array[3];
        const minutes = array[4];

        const date = new Date(Date.UTC(year, month, day, hours, minutes));
        return date.getTime();
    }

    const stringToArray = (string: string): number[] => {
        return string.split(',').map((value) => parseInt(value));
    };

    useEffect(() => {
        if (!dataReceived) getLastActions();
    }, []);

    const getLastActions = async () => {
        setDataReceived(true);
        // getDecisions();
    };

    const filterDecisions = (decisions: any) => {
        const lastConnexion = localStorage.getItem('previousLastConnexion');
        const validateDecisions = decisions.filter((decision: any) => {
            return decision.validate !== null;
        });
        const happenSinceLastConnexionDecision = validateDecisions.filter(
            (decision: any) => {
                return (
                    arrayTotimestamp(decision.validate) >
                    arrayTotimestamp(stringToArray(lastConnexion))
                );
            }
        );
        setAbsenceData(happenSinceLastConnexionDecision);
    };

    const getDecisions = async () => {
        const username = process.env.REACT_APP_REQUEST_USER;
        const password = process.env.REACT_APP_REQUEST_PASSWORD;
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + 'decisions?pageNumber=0';

        try {
            const response = await fetch(urlRequest, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });
            const data = await response.json();
            filterDecisions(data);
        } catch (error) {
            console.log('ERROR GET DECISIONS = ' + error);
        }
    };

    return (
        <div>
            <AbsencePannelButtonContainer
                isDark={isDark}
                isOn={isAbsencePannelOpen}
                onClick={handleToggleAbsencePannel}
            >
                <GoInfo size={35} />
            </AbsencePannelButtonContainer>
            {isAbsencePannelOpen && (
                <PannelContainer isDark={isDark}>
                    <PannelText isDark={isDark}>
                        Pendant votre absence
                    </PannelText>
                    <ListDetailContainer isDark={isDark}>
                        {absenceData.map((item: any, i: number) => (
                            <EventContainer isDark={isDark} key={i}>
                                <EventDate>
                                    {arrayToISOString(item.validate)}
                                </EventDate>
                                <EventTitle>{item.solution}</EventTitle>
                                <EventDescription>
                                    {item.description}
                                </EventDescription>
                                <EventLocation>{item.location}</EventLocation>
                            </EventContainer>
                        ))}
                    </ListDetailContainer>

                    <PersonnalizedGauge
                        id={'ElecGaugesComponentId'}
                        isDark={isDark}
                        isElec={true}
                        isBio={false}
                        isLumi={false}
                        level={70}
                        oldLevel={50}
                        top={30}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={75}
                        oldLevel={85}
                        top={44}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={30}
                        oldLevel={20}
                        top={58}
                        left={63.5}
                    />
                    <CloseIcon
                        isDark={isDark}
                        onClick={handleToggleAbsencePannel}
                    />
                </PannelContainer>
            )}
        </div>
    );
};

export default AbsencePannel;
