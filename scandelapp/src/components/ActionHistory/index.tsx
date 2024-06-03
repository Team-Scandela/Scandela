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
    PopUpTime,
    PopUpDescriptionContainer,
    PopUpDescriptionText,
} from './elements';
import { Tooltip } from 'react-tooltip'
import { Black } from '../../colors';
import { useTranslation } from 'react-i18next';


interface ActionHistoryProps {
    id: string;
    isDark: boolean;
}

const ActionHistory: React.FC<ActionHistoryProps> = ({ id, isDark }) => {
    const [dataReceived, setDataReceived] = useState(false);

    const [actionHistoryData, setActionHistoryData] = useState([]);

    const { t } = useTranslation();

    const getDecisions = async () => {
        // const username = process.env.REACT_APP_REQUEST_USER;
        // const password = process.env.REACT_APP_REQUEST_PASSWORD;
        // const urlRequest =
        //     process.env.REACT_APP_BACKEND_URL + 'decisions?pageNumber=0';

        // try {
        //     const response = await fetch(urlRequest, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        //         },
        //     });
        //     const data = await response.json();
        //     setDataReceived(true);
        //     parseDecisions(data);
        // } catch (error) {
        //     console.log('ERROR GET DECISIONS = ' + error);
        // }
        const data = localStorage.getItem('optimisationTemplateData');
        if (data === null) return;
        setDataReceived(true);
        parseDecisions(JSON.parse(data));
    };

    const parseDecisions = (decisions: any) => {
        const actionHistoryData: any = [];
        if (decisions === null) return;
        if (Array.isArray(decisions)) {
            decisions.forEach((decision: any) => {
                if (decision.validate !== null) {
                    const action = {
                        title: decision.solution,
                        time: arrayToISOString(decision.validate),
                        description: decision.description,
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
            ' ' +
            date.toLocaleTimeString('fr-FR')
        );
    }

    useEffect(() => {
        if (!dataReceived) getDecisions();
    }, []);

    const [actionHistoryExtended, setActionHistoryExtended] = useState(false);

    const handleActionHistoryPannelButtonClicked = () => {
        setActionHistoryExtended(!actionHistoryExtended);
    };

    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedAction, setSelectedAction] = useState({} as any);

    return (
        <div>
            <Tooltip id="actionHistory" style={{ backgroundColor: Black, borderRadius: '5px' }} />
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
                    {actionHistoryData.map((item: any, i: number) => (
                        <ActionTemplateContainer
                            isDark={isDark}
                            y={53 * i}
                            onClick={() => {
                                setShowPopUp(true);
                                setSelectedAction(item);
                            }}
                        >
                            <DescriptionText isDark={isDark}>
                                {item.title}
                            </DescriptionText>
                            <TimeText isDark={isDark}>{item.time}</TimeText>
                        </ActionTemplateContainer>
                    ))}
                </ActionContainer>
            </ActionsHistoryPannel>

            {showPopUp && (
                <PopUpContainer isDark={isDark}>
                    <PopUpClose
                        isDark={isDark}
                        onClick={() => {
                            setShowPopUp(false);
                            setSelectedAction({} as any);
                        }}
                    />
                    <PopUpTitle isDark={isDark}>
                        {selectedAction.title}
                    </PopUpTitle>
                    <PopUpTime isDark={isDark}>{selectedAction.time}</PopUpTime>
                    <PopUpDescriptionContainer>
                        <PopUpDescriptionText isDark={isDark}>
                            {selectedAction.description}
                        </PopUpDescriptionText>
                    </PopUpDescriptionContainer>
                </PopUpContainer>
            )}
        </div>
    );
};

export default ActionHistory;
