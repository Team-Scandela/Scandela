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

    const [levelElec, setLevelElec] = useState<number>(0);
    const [levelBio, setLevelBio] = useState<number>(0);
    const [levelLumi, setLevelLumi] = useState<number>(0);

    const [oldLevelElec, setOldLevelElec] = useState<number>(0);
    const [oldLevelBio, setOldLevelBio] = useState<number>(0);
    const [oldLevelLumi, setOldLevelLumi] = useState<number>(0);

    function parseFloatSafe(input: string): number {
        const trimmedInput = input.trim();
    
        const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(trimmedInput);
        if (!isValidNumber) {
            console.log("Error: input contains invalid characters.");
            return NaN;
        }

        return parseFloat(trimmedInput);
    }

    useEffect(() => {
        const checkScore = () => {
            const vegetalScore = localStorage.getItem('vegetalScore');
            const lightScore = localStorage.getItem('lightScore');
            const consumptionScore = localStorage.getItem('consumptionScore');

            let allScoresDefined = true;

            if (vegetalScore) {
                const parsedScore = parseFloatSafe(vegetalScore);
                if (!isNaN(parsedScore)) {
                    setLevelBio(parsedScore);
                    console.log("vegetalScore: " + vegetalScore);
                    console.log("levelBio (after update): " + parsedScore);
                } else {
                    console.log("Error: vegetalScore could not be parsed to a float.");
                    allScoresDefined = false;
                }
            } else {
                console.log("vegetalScore is not defined.");
                allScoresDefined = false;
            }

            if (lightScore) {
                const parsedScore = parseFloatSafe(lightScore);
                if (!isNaN(parsedScore)) {
                    setLevelLumi(parsedScore);
                    console.log("lightScore: " + lightScore);
                    console.log("levelLumi (after update): " + parsedScore);
                } else {
                    console.log("Error: lightScore could not be parsed to a float.");
                    allScoresDefined = false;
                }
            } else {
                console.log("lightScore is not defined.");
                allScoresDefined = false;
            }

            if (consumptionScore) {
                const parsedScore = parseFloatSafe(consumptionScore);
                if (!isNaN(parsedScore)) {
                    setLevelElec(parsedScore);
                    console.log("consumptionScore: " + consumptionScore);
                    console.log("levelElec (after update): " + parsedScore);
                } else {
                    console.log("Error: consumptionScore could not be parsed to a float.");
                    allScoresDefined = false;
                }
            } else {
                console.log("consumptionScore is not defined.");
                allScoresDefined = false;
            }

            return allScoresDefined;
        };

        const intervalId = setInterval(() => {
            if (checkScore()) {
                clearInterval(intervalId);
            }
        }, 1000); // Vérifiez les scores toutes les secondes

        return () => clearInterval(intervalId);
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
