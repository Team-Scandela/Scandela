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
import { getAllScores } from '../../utils/gaugesUtils'

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

    const [levelElec, setLevelElec] = useState<number>(0);
    const [levelBio, setLevelBio] = useState<number>(0);
    const [levelLumi, setLevelLumi] = useState<number>(0);

    const [oldLevelElec, setOldLevelElec] = useState<number>(0);
    const [oldLevelBio, setOldLevelBio] = useState<number>(0);
    const [oldLevelLumi, setOldLevelLumi] = useState<number>(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const AllScores = await getAllScores();
            if (AllScores) {
                // Formatez les scores avec deux chiffres après la virgule
                const vegetalScore = AllScores.vegetalScore.toFixed(2);
                const consumptionScore = AllScores.consumptionScore.toFixed(2);
                const lightScore = AllScores.lightScore.toFixed(2);

                setLevelBio(vegetalScore)
                setLevelElec(consumptionScore)
                setLevelLumi(lightScore)
            }
        };
    
        fetchUserData();
    }, []);

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
        getDecisions();
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
        const data = localStorage.getItem('optimisationTemplateData');
        if (data === null) return;
        setDataReceived(true);
        filterDecisions(JSON.parse(data));
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
                        level={levelElec}
                        oldLevel={levelElec}
                        top={30}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={levelBio}
                        oldLevel={levelBio}
                        top={44}
                        left={63.5}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={levelLumi}
                        oldLevel={levelLumi}
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
