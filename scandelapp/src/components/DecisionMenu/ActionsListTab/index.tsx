import { useEffect, useState } from 'react';
import {
    ScrollableOptimisationsContainer,
    OptimisationTemplateContainer,
    TextContainer,
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
    ToDoButton,
    PUpToDoContainer,
    PUpToDo,
    PUpToDoClose,
    PUpToDoTitle,
    PUpToDoLinkIcon,
    PUpToDoOpen,
    PUpToDoLinkSubtitle,
    PUpToDoOpenSubtitle,
} from './elements';
import { PersonnalizedGauge } from '../../Gauges';
import { useTranslation } from 'react-i18next';
import { getAllScores } from '../../../utils/gaugesUtils';
import { generatePDFDocument } from './pdfGenerator';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../Toastr';
import { createNotification } from '../../../utils/notificationUtils';
import { getLampPrice } from '../../../utils/actionsPriceUtils';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Setter function
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 * @param {any} notificationsPreference - Notifications preference data
 */
interface ActionsListTabProps {
    isDark: boolean;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
    addNotificationToList: (description: string) => void;
    notificationsPreference: any;
}

const ActionsListTab: React.FC<ActionsListTabProps> = ({
    isDark,
    optimisationTemplateData,
    setOptimisationTemplateData,
    addNotificationToList,
    notificationsPreference,
}) => {
    const [levelElec, setLevelElec] = useState<number>(0);
    const [levelBio, setLevelBio] = useState<number>(0);
    const [levelLumi, setLevelLumi] = useState<number>(0);
    const [totalActionCost, setTotalActionCost] = useState<number>(0);
    const [totalSavings, setTotalSavings] = useState<number>(0);
    const [displayPUpToDo, setDisplayPUpToDo] = useState<boolean>(false);
    const navigate = useNavigate();

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

    const handleTrashIconClick = (id: any) => {
        const updatedItems = optimisationTemplateData.map((item: any) =>
            item.id === id ? { ...item, saved: false } : item
        );

        setOptimisationTemplateData(updatedItems);
    };

    const handleValidateButtonClick = () => {
        if (
            optimisationTemplateData.filter((item: any) => item.selected)
                .length === 0
        ) {
            alert('Nothing in the action list');
            return;
        }
        const timestamp = getTimestamp();
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i], timestamp);
                optimisationTemplateData[i].saved = false;
            }
        }
        setOptimisationTemplateData(optimisationTemplateData);
    };

    const handlePDFButtonClick = async () => {
        if (
            optimisationTemplateData.filter((item: any) => item.selected)
                .length === 0
        ) {
            alert('Nothing in the action list');
            return;
        }
        const timestamp = getTimestamp();
        const validateData = optimisationTemplateData.filter(
            (item: any) => item.selected
        );
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i], timestamp);
                optimisationTemplateData[i].saved = false;
            }
        }
        generatePDFDocument(validateData, 'Auteur', 'Nantes');
        setOptimisationTemplateData(optimisationTemplateData);
        if (
            notificationsPreference.find(
                (item: any) => item[0] === 'exportPdfUpdate'
            )[1]
        ) {
            showToast(
                'success',
                t('actionsListSuccessfullyExported'),
                'top-left',
                5000,
                false,
                true,
                false,
                true
            );

            const userId = localStorage.getItem('userId');
            if (userId) {
                await createNotification({
                    user: { id: userId },
                    title: t('actionsListExportedUpdates'),
                    description: t('actionsListSuccessfullyExported'),
                    triggered: true,
                });
            }
            addNotificationToList(t('actionsListSuccessfullyExported'));
        }
    };

    const handleToDoButtonClick = () => {
        if (
            optimisationTemplateData.filter((item: any) => item.selected)
                .length === 0
        ) {
            alert('Nothing in the action list');
            return;
        }
        setDisplayPUpToDo(true);
    };

    useEffect(() => {
        // function that add all item.saved price to get the totalActionCost
        const totalActionCost = optimisationTemplateData
            .filter(
                (item: any) =>
                    item.saved &&
                    (item.solution.includes('Changer') ||
                        item.solution.includes('Retirer') ||
                        item.solution.includes('Ajouter'))
            )
            .reduce((acc: number, item: any) => {
                const price = parseFloat(item.price);
                if (isNaN(price)) {
                    return acc;
                }
                return acc + price; // ici le prix des actions total sur le moment, juste une addition de chaque coûts d'actions
            }, 0);

        localStorage.setItem('totalActionCost', totalActionCost.toString());
        setTotalActionCost(totalActionCost);

        let dynamicSavings = optimisationTemplateData
            .filter(
                (item: any) =>
                    item.saved &&
                    (item.solution.includes('Allumer') ||
                        item.solution.includes('Éteindre') ||
                        item.solution.includes('Augmenter') ||
                        item.solution.includes('Réduire'))
            )
            .reduce((acc: number, item: any) => {
                const price = parseFloat(item.price);
                if (isNaN(price)) {
                    return acc;
                }
                return acc + price; // le calcul renvoie les économies réaliser sur l'année dû à des action sur du long terme (plage horaire) - le coût total des actions
            }, 0);

        dynamicSavings = dynamicSavings * 365.25 - totalActionCost;
        dynamicSavings = Math.abs(Math.round(dynamicSavings * 100) / 100);

        localStorage.setItem('totalSavings', dynamicSavings.toString());
        setTotalSavings(dynamicSavings);
    }, [optimisationTemplateData]);

    const handleToDoButtonCopyClick = () => {
        const timestamp = getTimestamp();
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i], timestamp);
                optimisationTemplateData[i].saved = false;
            }
        }
        setOptimisationTemplateData(optimisationTemplateData);
        navigator.clipboard.writeText(
            'https:/app.scandela.com/todo/' + timestamp
        );
    };

    const handleToDoButtonOpenClick = () => {
        const timestamp = getTimestamp();
        for (let i = 0; i < optimisationTemplateData.length; i++) {
            if (optimisationTemplateData[i].selected) {
                updateValidateData(optimisationTemplateData[i], timestamp);
                optimisationTemplateData[i].saved = false;
            }
        }
        setOptimisationTemplateData(optimisationTemplateData);
        navigate('/todo/' + timestamp);
    };

    const getTimestamp = () => {
        const timestamp = new Date().toISOString();
        return timestamp;
    };

    const updateValidateData = async (dataDecision: any, timestamp: string) => {
        const encodedCredentials = btoa(
            `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
        );
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        });

        const urlRequest =
            process.env.REACT_APP_BACKEND_URL +
            'decisions/' +
            dataDecision.uuid;

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

            const data = response.json();
            return timestamp;
        } catch (error) {
            console.error('Erreur', error);
        }
    };

    return (
        <div>
            <ScrollableOptimisationsContainer isDark={isDark}>
                <TimeIcon isDark={isDark} size={150} />
                {optimisationTemplateData
                    .filter((item: any) => item.saved)
                    .map((item: any, i: number) => (
                        <OptimisationTemplateContainer
                            key={i}
                            isDark={isDark}
                            y={105 * i}
                        >
                            <TextContainer>
                                <TypeText isDark={isDark}>{item.type}</TypeText>
                                <LocationText isDark={isDark}>
                                    {item.location}
                                </LocationText>
                                <DescriptionText isDark={isDark}>
                                    {item.description}
                                </DescriptionText>
                            </TextContainer>
                            <SolutionTextContainer isDark={isDark}>
                                <SolutionText isDark={isDark}>
                                    {item.solution}
                                </SolutionText>
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
                <TotalTitleText isDark={isDark}>
                    {t('economicImpact')}
                </TotalTitleText>
                {/* ajouter des images en rapport avec les gains et les coûts ici et remplacer les div */}
                <div
                    style={{
                        fontSize: '0.7em',
                        color: isDark ? '#FAC710' : '#000',
                        marginLeft: '10px',
                        textAlign: 'left',
                        marginTop: '25px',
                    }}
                >
                    Coûts des actions (en euro):
                    <div
                        style={{
                            backgroundColor: '#696969', // gris DA
                            padding: '20px',
                            marginTop: '5px',
                            marginRight: '10px',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '1.5em',
                        }}
                    >
                        {totalActionCost ? `${totalActionCost} €` : 'N/A'}
                    </div>
                </div>
                <div
                    style={{
                        fontSize: '0.7em',
                        color: isDark ? '#FAC710' : '#000',
                        marginLeft: '10px',
                        textAlign: 'left',
                        marginTop: '20px',
                    }}
                >
                    Économisé d'ici 1 an (en euro):
                    <div
                        style={{
                            backgroundColor: '#696969', // gris DA
                            padding: '20px',
                            marginTop: '5px',
                            marginRight: '10px',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '1.5em',
                        }}
                    >
                        {totalSavings ? `${totalSavings} €` : 'N/A'}
                    </div>
                </div>
            </TotalContainer>
            {/* Render personalized gauge components */}
            <GaugesContainer>
                <PersonnalizedGauge
                    id={'ElecGaugesComponentId'}
                    isDark={isDark}
                    isElec={true}
                    isBio={false}
                    isLumi={false}
                    level={
                        parseFloat(levelElec.toString().replace(',', '.')) +
                        optimisationTemplateData.filter(
                            (item: any) => item.saved
                        ).length /
                            10
                    }
                    oldLevel={levelElec}
                    top={12}
                    left={6}
                />
                <PersonnalizedGauge
                    id={'BioGaugesComponentId'}
                    isDark={isDark}
                    isElec={false}
                    isBio={true}
                    isLumi={false}
                    level={
                        parseFloat(levelBio.toString().replace(',', '.')) +
                        optimisationTemplateData.filter(
                            (item: any) => item.saved
                        ).length /
                            20
                    }
                    oldLevel={levelBio}
                    top={12}
                    left={36}
                />
                <PersonnalizedGauge
                    id={'LumiGaugesComponentId'}
                    isDark={isDark}
                    isElec={false}
                    isBio={false}
                    isLumi={true}
                    level={
                        parseFloat(levelLumi.toString().replace(',', '.')) +
                        optimisationTemplateData.filter(
                            (item: any) => item.saved
                        ).length /
                            20
                    }
                    oldLevel={levelLumi}
                    top={12}
                    left={66}
                />
            </GaugesContainer>
            <ValidateButton isDark={isDark} onClick={handleValidateButtonClick}>
                {t('Valider')}
            </ValidateButton>
            <PDFButton isDark={isDark} onClick={handlePDFButtonClick}>
                {t('PDF')}
            </PDFButton>
            <ToDoButton isDark={isDark} onClick={handleToDoButtonClick}>
                {t('toDo')}
            </ToDoButton>
            {displayPUpToDo && (
                <PUpToDoContainer>
                    <PUpToDo>
                        <PUpToDoClose
                            onClick={() => setDisplayPUpToDo(false)}
                        />
                        <PUpToDoTitle>{t('toDoReady')}</PUpToDoTitle>
                        <PUpToDoOpen onClick={handleToDoButtonOpenClick} />
                        <PUpToDoLinkIcon onClick={handleToDoButtonCopyClick} />
                        <PUpToDoLinkSubtitle>
                            {t('toDoLink')}
                        </PUpToDoLinkSubtitle>
                        <PUpToDoOpenSubtitle>
                            {t('toDoOpen')}
                        </PUpToDoOpenSubtitle>
                    </PUpToDo>
                </PUpToDoContainer>
            )}
        </div>
    );
};

export default ActionsListTab;
