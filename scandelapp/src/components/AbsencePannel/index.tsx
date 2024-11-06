import { useEffect, useState } from 'react';
import {
    AbsencePannelButtonContainer,
    PannelContainer,
    PannelText,
    CloseIcon,
    ListDetailContainer,
    EventContainer,
    TextContainer,
    EventDate,
    EventDescription,
    EventTitle,
    EventLocation,
    TimeIcon,
    NoEventText,
} from './elements';
import { PersonnalizedGauge } from '../Gauges';
import { GoInfo } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { Black } from '../../colors';

interface AbsencePannelProps {
    id: string;
    isDark: boolean;
    tooltipPreference: boolean;
}

const AbsencePannel: React.FC<AbsencePannelProps> = ({
    id,
    isDark,
    tooltipPreference,
}) => {
    const [isAbsencePannelOpen, setIsAbsencePannelOpen] = useState(false);
    const [dataReceived, setDataReceived] = useState(false);
    const [absenceData, setAbsenceData] = useState([]);

    const { t } = useTranslation();

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
                } else {
                    allScoresDefined = false;
                }
            } else {
                allScoresDefined = false;
            }

            if (lightScore) {
                const parsedScore = parseFloatSafe(lightScore);
                if (!isNaN(parsedScore)) {
                    setLevelLumi(parsedScore);
                } else {
                    allScoresDefined = false;
                }
            } else {
                allScoresDefined = false;
            }

            if (consumptionScore) {
                const parsedScore = parseFloatSafe(consumptionScore);
                if (!isNaN(parsedScore)) {
                    setLevelElec(parsedScore);
                } else {
                    allScoresDefined = false;
                }
            } else {
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
        if (absenceData.length !== 0) handleToggleAbsencePannel();
    };

    const getDecisions = async () => {
        const data = localStorage.getItem('optimisationTemplateData');
        if (data === null) return;
        setDataReceived(true);
        filterDecisions(JSON.parse(data));
    };

    return (
        <div>
            {tooltipPreference && (
                <Tooltip
                    id="absencePannel"
                    style={{
                        backgroundColor: Black,
                        borderRadius: '5px',
                        userSelect: 'none',
                    }}
                />
            )}
            <AbsencePannelButtonContainer
                isDark={isDark}
                isOn={isAbsencePannelOpen}
                onClick={handleToggleAbsencePannel}
                data-tooltip-id="absencePannel"
                data-tooltip-content={t('duringAbsence')}
            >
                <GoInfo size={35} />
            </AbsencePannelButtonContainer>
            {isAbsencePannelOpen && (
                <PannelContainer isDark={isDark}>
                    <PannelText isDark={isDark}>
                        {t('WhileYouWereAway')}
                    </PannelText>
                    <ListDetailContainer isDark={isDark}>
                        {absenceData.length === 0 && (
                            <div>
                                <TimeIcon isDark={isDark} size={200} />
                                <NoEventText isDark={isDark}>
                                    {t('noEvent')}
                                </NoEventText>
                            </div>
                        )}
                        {absenceData.map((item: any, i: number) => (
                            <EventContainer key={i} isDark={isDark} y={155 * i}>
                                <TextContainer>
                                    <EventTitle>{item.solution}</EventTitle>
                                    <EventLocation>
                                        {item.location}
                                    </EventLocation>
                                    <EventDescription>
                                        {item.description}
                                    </EventDescription>
                                    <EventDate>
                                        {arrayToISOString(item.validate)}
                                    </EventDate>
                                </TextContainer>
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
                        oldLevel={levelElec - absenceData.length * 0.2}
                        top={23}
                        left={87}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={levelBio}
                        oldLevel={levelBio - absenceData.length * 0.2}
                        top={45}
                        left={87}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={levelLumi}
                        oldLevel={levelLumi - absenceData.length * 0.2}
                        top={68}
                        left={87}
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
