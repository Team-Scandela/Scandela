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

interface ActionHistoryProps {
    id: string;
    isDark: boolean;
}

const ActionHistory: React.FC<ActionHistoryProps> = ({ id, isDark }) => {
    const [dataReceived, setDataReceived] = useState(false);

    const [actionHistoryData, setActionHistoryData] = useState([
        {
            title: "Changer l'ampoule \"SHP\" en ampoule \"LED\".",
            time: '18/03 12:00',
            description: "Ampoule LED moins consommatrice à à Rue de Solay",
        },
        {
            title: "Éteindre le lampadaire EPNA156026",
            time: '18/03 12:00',
            description: "Lever du soleil à 08:42 à Rue Dos d'Ane",
        },
        {
            title: "Allumer le lampadaire EPNA090113",
            time: '18/03 12:00',
            description: "Coucher du soleil à 17:56 à Rue Urbain Le Verrier",
        },
        {
            title: "Changer l'ampoule \"IM\" en ampoule \"LED\".",
            time: '18/03 12:00',
            description: "Ampoule LED moins consommatrice à à Rue de Bignon",
        },
        {
            title: "Éteindre le lampadaire EPSH192055",
            time: '18/03 12:00',
            description: "Lever du soleil à 08:42 à Rue Edith Piaf",
        },
        {
            title: "Éteindre le lampadaire EPBR003001",
            time: '18/03 12:00',
            description: "Lever du soleil à 08:42 à CR 7",
        },        {
            title: "Changer l'ampoule \"SHP\" en ampoule \"LED\".",
            time: '18/03 12:00',
            description: "Ampoule LED moins consommatrice à à Rue de la Chaussée",
        }
    ]);

    const getDecision = async () => {
        const username = 'tester';
        const password = 'T&st';
        const response = await fetch(
            'https://serverdela.onrender.com/decisions',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            }
        );
        const decisions = await response.json();
        console.log(decisions);
        setDataReceived(true);
        parseDecisions(decisions);
    };

    const parseDecisions = (decisions: any) => {
        const actionHistoryData: any = [];
        if (decisions === null) return;
        if (Array.isArray(decisions)) {
            console.log(decisions);
            decisions.forEach((decision: any) => {
                if (decision.done === true) {
                    const action = {
                        title: decision.solution,
                        time: '18/03 12:00',
                        description: decision.description,
                    };
                    actionHistoryData.push(action);
                }
            });
            setActionHistoryData(actionHistoryData);
            return;
        }
    };

    useEffect(() => {
        if (!dataReceived) getDecision();
    }, []);

    const [actionHistoryExtended, setActionHistoryExtended] = useState(false);

    const handleActionHistoryPannelButtonClicked = () => {
        setActionHistoryExtended(!actionHistoryExtended);
    };

    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedAction, setSelectedAction] = useState({} as any);

    return (
        <div>
            <ActionsHistoryButton
                onClick={() => handleActionHistoryPannelButtonClicked()}
                isDark={isDark}
                show={actionHistoryExtended}
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
