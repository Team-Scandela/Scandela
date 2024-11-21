import { useState, useEffect } from 'react';
import {
    ActionsHistoryButton,
    ActionHistoryButtonIcon,
    ActionsHistoryPannel,
    ActionsTitle,
    ActionContainer,
    ActionTemplateContainer,
    DescriptionText,
    TimeText,
    PopUpContainer,
    PopUpClose,
    PopUpTitle,
    PopUpSubtitle,
    PopUpDescriptionContainer,
    PopUpDescriptionText,
    PopUpIcon,
    PopUpSolutionContainer,
    PopUpTime,
    PopUpUnvalideButton,
    PopUpToLampButton,
    NoEventText
} from './elements';
import { Tooltip } from 'react-tooltip';
import { Black } from '../../colors';
import { useTranslation } from 'react-i18next';
import { GoLightBulb as Bulb } from 'react-icons/go';
import { LuLampCeiling as Lamp } from 'react-icons/lu';
import { TbArrowBackUpDouble } from 'react-icons/tb';
import { RiMapPin2Line } from 'react-icons/ri';

interface ActionHistoryProps {
    id: string;
    isDark: boolean;
    actionHistoryExtended: boolean;
    handleActionHistoryPannelButtonClicked: () => void;
    tooltipPreference: boolean;
}

const ActionHistory: React.FC<ActionHistoryProps> = ({
    id,
    isDark,
    actionHistoryExtended,
    handleActionHistoryPannelButtonClicked,
    tooltipPreference,
}) => {
    const [dataReceived, setDataReceived] = useState(false);

    const [actionHistoryData, setActionHistoryData] = useState([]);

    const { t } = useTranslation();

    const getDecisions = async () => {
        const data = localStorage.getItem('optimisationTemplateData');
        if (data === null) return;
        setDataReceived(true);
        parseDecisions(JSON.parse(data));
    };

    const parseDecisions = (decisions: any) => {
        const actionHistoryData: any = [];
        if (decisions === null || decisions.length === 0) {
            return;
        }
        if (Array.isArray(decisions)) {
            decisions.forEach((decision: any) => {
                if (decision.validate !== null) {
                    const action = {
                        solution: decision.solution,
                        time: arrayToISOString(decision.validate),
                        description: decision.description,
                        location: decision.location,
                        name: decision.name,
                        type: decision.type,
                        lamptype: decision.lampType,
                        foyertype: decision.foyerType,
                        uuid: decision.uuid,
                    };
                    actionHistoryData.push(action);
                }
            });
            setActionHistoryData(actionHistoryData);
            return;
        }
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
            ' à ' +
            date.toLocaleTimeString('fr-FR')
        );
    }

    useEffect(() => {
        if (!dataReceived) getDecisions();
    }, []);

    const updateValidateData = async (dataDecision: any) => {
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
                    validate: null,
                    description: dataDecision.description,
                    location: dataDecision.location,
                    solution: dataDecision.solution,
                }),
            });

            if (response.status === 200) {
                console.log('MODIFICATION applied');
            }

            const data = response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur', error);
        }
    };

    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedAction, setSelectedAction] = useState({} as any);

    return (
        <div>
            {tooltipPreference && (
                <Tooltip
                    id="actionHistory"
                    style={{
                        backgroundColor: Black,
                        borderRadius: '5px',
                        userSelect: 'none',
                    }}
                />
            )}
            <ActionsHistoryButton
                onClick={() => handleActionHistoryPannelButtonClicked()}
                isDark={isDark}
                show={actionHistoryExtended}
                data-tooltip-id="actionHistory"
                data-tooltip-content={t('actionsHistory')}
            >
                <ActionHistoryButtonIcon size={30} />
            </ActionsHistoryButton>
            <ActionsHistoryPannel isDark={isDark} show={actionHistoryExtended}>
                <ActionsTitle isDark={isDark}>Actions</ActionsTitle>
                <ActionContainer isDark={isDark}>
                    {actionHistoryData.length === 0 ? (
                        <NoEventText isDark={isDark}>
                            {t('noActionAdded')}
                        </NoEventText>
                    ) : (
                        actionHistoryData.map((item: any, i: number) => (
                            <ActionTemplateContainer
                                key={i}
                                isDark={isDark}
                                y={73 * i}
                                onClick={() => {
                                    setShowPopUp(true);
                                    setSelectedAction(item);
                                }}
                            >
                                <DescriptionText isDark={isDark}>
                                    {item.name + ' - ' + item.type}
                                </DescriptionText>
                                <TimeText isDark={isDark}>{item.time}</TimeText>
                            </ActionTemplateContainer>
                        ))
                    )}
                </ActionContainer>
            </ActionsHistoryPannel>

            {showPopUp && (
                <PopUpContainer isDark={isDark}>
                    <PopUpIcon isDark={isDark}>
                        {' '}
                        {selectedAction.type === 'Ajouter lampadaire' ? (
                            <Lamp size={50} />
                        ) : (
                            <Bulb size={50} />
                        )}
                    </PopUpIcon>
                    <PopUpClose
                        isDark={isDark}
                        onClick={() => {
                            console.log(selectedAction);
                            setShowPopUp(false);
                            setSelectedAction({} as any);
                        }}
                    />
                    <PopUpTitle isDark={isDark}>
                        {selectedAction.type}
                    </PopUpTitle>
                    <PopUpSubtitle isDark={isDark}>
                        {selectedAction.name + ' à ' + selectedAction.location}
                    </PopUpSubtitle>
                    <PopUpTime isDark={isDark}>
                        {'Validé le ' + selectedAction.time}
                    </PopUpTime>
                    <PopUpDescriptionContainer>
                        <PopUpDescriptionText isDark={isDark}>
                            {selectedAction.description}
                        </PopUpDescriptionText>
                    </PopUpDescriptionContainer>
                    <PopUpSolutionContainer>
                        <PopUpDescriptionText isDark={isDark}>
                            {selectedAction.solution}
                        </PopUpDescriptionText>
                    </PopUpSolutionContainer>
                    {tooltipPreference && (
                        <Tooltip
                            id="unvalidate"
                            style={{
                                backgroundColor: Black,
                                borderRadius: '5px',
                                userSelect: 'none',
                            }}
                        />
                    )}
                    <PopUpUnvalideButton
                        isDark={isDark}
                        onClick={() => {
                            updateValidateData(selectedAction);
                            setShowPopUp(false);
                            setSelectedAction({} as any);
                        }}
                        data-tooltip-id="unvalidate"
                        data-tooltip-content={'Invalider la décision'}
                    >
                        {' '}
                        <TbArrowBackUpDouble size={40} />
                    </PopUpUnvalideButton>
                    <PopUpToLampButton>
                        <RiMapPin2Line size={45} />
                    </PopUpToLampButton>
                </PopUpContainer>
            )}
        </div>
    );
};

export default ActionHistory;
