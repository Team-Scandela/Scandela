import { useState } from "react";
import { ActionsHistoryButton, ActionHistoryButtonIcon, ActionsHistoryPannel, ActionsTitle, 
    ActionContainer, ActionTemplateContainer, DescriptionText, TimeText, PopUpContainer, PopUpClose, PopUpTitle, PopUpTime, PopUpDescriptionContainer, PopUpDescriptionText } from "./elements";

interface ActionHistoryProps {
    id: string;
    isDark: boolean;
}

const ActionHistory: React.FC<ActionHistoryProps> = ({
    id,
    isDark
}) => {

    const [actionHistoryData, setActionHistoryData] = useState([
        {
            title: "User has been created",
            time: "18/03 12:00",
            description : "A new user has been created through the admin panel",
        },
    ]);
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
                <ActionsTitle isDark={isDark}>
                    Actions
                </ActionsTitle>
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
                <PopUpContainer
                    isDark={isDark}
                >
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
                    <PopUpTime isDark={isDark}>
                        {selectedAction.time}
                    </PopUpTime>
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