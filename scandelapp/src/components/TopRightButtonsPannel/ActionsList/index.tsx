import { useEffect, useState } from 'react';
import {
    ActionsListContainer,
    ActionsListButton,
    ActionsListPanel,
    ScrollableOptimisationsContainer,
    OptimisationTemplateContainer,
    TypeText,
    LocationText,
    DescriptionText,
    SolutionTextContainer,
    SolutionText,
    TrashIcon,
    GoToIcon,
    TimeIcon,
    TotalContainer,
    TotalTitleText,
    GaugesContainer,
    ValidateButton,
    PDFButton,
} from './elements';
import { PersonnalizedGauge } from '../../Gauges';
import { useTranslation } from 'react-i18next';
import { getAllScores } from '../../../utils/gaugesUtils';
import { generatePDFDocument } from './pdfGenerator';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} actionsListExtended - Boolean to check if the actions list is extended or not
 * @param {function} setActionsListExtended - Setter function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Setter function
 */
interface ActionsListProps {
    isDark: boolean;
    actionsListExtended: boolean;
    setActionsListExtended: (data: any) => void;
    decisionPanelExtended: boolean;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
}

const ActionsList: React.FC<ActionsListProps> = ({
    isDark,
    actionsListExtended,
    setActionsListExtended,
    decisionPanelExtended,
    optimisationTemplateData,
    setOptimisationTemplateData,
}) => {
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
                const vegetalScore = AllScores.vegetalScore.toFixed(2);
                const consumptionScore = AllScores.consumptionScore.toFixed(2);
                const lightScore = AllScores.lightScore.toFixed(2);

                setLevelBio(vegetalScore);
                setLevelElec(consumptionScore);
                setLevelLumi(lightScore);
            }
        });

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

    const { t } = useTranslation();

    useEffect(() => {
        if (decisionPanelExtended && actionsListExtended) handleToggleActionsListExpend();
    });

    const handleToggleActionsListExpend = () => {
        setActionsListExtended(!actionsListExtended);
    };

    const handleTrashIconClick = (id: any) => {
        const updatedItems = optimisationTemplateData.map((item: any) =>
            item.id === id ? { ...item, saved: false } : item
        );

        setOptimisationTemplateData(updatedItems);
    };

    const handleValidateButtonClick = () => {
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i]);
                optimisationTemplateData[i].saved = false;
            }
        }
        setOptimisationTemplateData(optimisationTemplateData);
        handleToggleActionsListExpend();
    };

    const handlePDFButtonClick = () => {
        const validateData = optimisationTemplateData.filter((item: any) => item.selected);
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i]);
                optimisationTemplateData[i].saved = false;
            }
        }
        generatePDFDocument(validateData, 'author', 'place');
        setOptimisationTemplateData(optimisationTemplateData);
        handleToggleActionsListExpend();
    };

    const updateValidateData = async (dataDecision: any) => {
        const timestamp = new Date().toISOString();

        const encodedCredentials = btoa(
            `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
        );
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        });

        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'decisions/' + dataDecision.uuid;

        try {
            const response = await fetch(urlRequest, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    validate: timestamp,
                    description: dataDecision.description,
                    location: dataDecision.location,
                    solution: dataDecision.solution,
                }),
            });

            if (response.status === 200) {
                console.log('MODIFICATION applied');
            }

            const data = await response.json();
        } catch (error) {
            console.error('Erreur', error);
        }
    };

    console.log(
        parseFloat(levelElec.toString().replace(',', '.')) +
            optimisationTemplateData.filter((item: any) => item.saved).length / 10
    );
    // console.log(parseFloat(levelElec.toString().replace(",", ".")) + (optimisationTemplateData.filter((item: any) => item.saved).length / 10))

    return (
        <ActionsListContainer>
            <ActionsListButton
                isDark={isDark}
                isOn={actionsListExtended}
                onClick={() => handleToggleActionsListExpend()}
            ></ActionsListButton>
            <ActionsListPanel isDark={isDark} show={actionsListExtended}>
                <ScrollableOptimisationsContainer isDark={isDark}>
                    <TimeIcon isDark={isDark} size={150}></TimeIcon>
                    {optimisationTemplateData
                        .filter((item: any) => item.saved)
                        .map((item: any, i: number) => (
                            <OptimisationTemplateContainer key={i} isDark={isDark} y={100 * i}>
                                <TypeText isDark={isDark}>{item.type}</TypeText>
                                <LocationText isDark={isDark}>{item.location}</LocationText>
                                <DescriptionText isDark={isDark}>{item.description}</DescriptionText>
                                <SolutionTextContainer isDark={isDark}>
                                    <SolutionText isDark={isDark}>{item.solution}</SolutionText>
                                </SolutionTextContainer>
                                <TrashIcon
                                    isDark={isDark}
                                    size={30}
                                    onClick={() => handleTrashIconClick(item.id)}
                                ></TrashIcon>
                                <GoToIcon isDark={isDark} size={30}></GoToIcon>
                            </OptimisationTemplateContainer>
                        ))}
                </ScrollableOptimisationsContainer>
                <TotalContainer isDark={isDark}>
                    <TotalTitleText isDark={isDark}>{t('economicImpact')}</TotalTitleText>
                    <div
                        style={{
                            fontSize: '0.5em',
                            color: isDark ? '#FAC710' : '#FAC710',
                            marginLeft: '10px',
                            textAlign: 'left',
                            marginTop: '14px',
                        }}
                    >
                        Coûts des actions (en euro):{' '}
                        {Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000}
                    </div>
                    <div
                        style={{
                            fontSize: '0.5em',
                            color: isDark ? '#FAC710' : '#FAC710',
                            marginLeft: '10px',
                            textAlign: 'left',
                            marginTop: '12px',
                        }}
                    >
                        économisé d'ici 1 an (en euro):{' '}
                        {Math.floor(Math.random() * (200000 - 50000 + 1)) + 50000}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '10px',
                            alignContent: 'center',
                            marginBottom: '1px',
                        }}
                    >
                        <button
                            style={{
                                padding: '5px',
                                cursor: 'pointer',
                                backgroundColor: '#FAC710',
                                color: '#2A2B2A',
                                border: 'none',
                                borderRadius: '10px',
                                marginLeft: '98px',
                                marginBottom: '5px',
                            }}
                        >
                            Exécuter
                        </button>
                        <button
                            style={{
                                padding: '5px',
                                cursor: 'pointer',
                                backgroundColor: '#FAC710',
                                color: '#2A2B2A',
                                border: 'none',
                                borderRadius: '10px',
                                marginLeft: '100px',
                                marginBottom: '5px',
                            }}
                        >
                            Annuler
                        </button>
                    </div>
                </TotalContainer>
                <GaugesContainer>
                    <PersonnalizedGauge
                        id={'ElecGaugesComponentId'}
                        isDark={isDark}
                        isElec={true}
                        isBio={false}
                        isLumi={false}
                        level={
                            parseFloat(levelElec.toString().replace(',', '.')) +
                            optimisationTemplateData.filter((item: any) => item.saved).length / 10
                        }
                        oldLevel={levelElec}
                        top={52}
                        left={70}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={
                            parseFloat(levelBio.toString().replace(',', '.')) +
                            optimisationTemplateData.filter((item: any) => item.saved).length / 20
                        }
                        oldLevel={levelBio}
                        top={52}
                        left={80}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={
                            parseFloat(levelLumi.toString().replace(',', '.')) +
                            optimisationTemplateData.filter((item: any) => item.saved).length / 20
                        }
                        oldLevel={levelLumi}
                        top={52}
                        left={90}
                    />
                </GaugesContainer>
                <ValidateButton isDark={isDark} onClick={handleValidateButtonClick}>
                    {t('Valider')}
                </ValidateButton>
                <PDFButton isDark={isDark} onClick={handlePDFButtonClick}>
                    {t('PDF')}
                </PDFButton>
            </ActionsListPanel>
        </ActionsListContainer>
    );
};

export default ActionsList;
