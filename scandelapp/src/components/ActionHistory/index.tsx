import { useState } from "react";
import { ActionsHistoryButton, ActionHistoryButtonIcon, ActionsHistoryPannel, ActionsTitle, ActionContainer, ActionTemplateContainer, DescriptionText, TimeText } from "./elements";

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
            description: "User has been created",
            time: "18/03 12:00"
        },
    ]);
    const [actionHistoryExtended, setActionHistoryExtended] = useState(false);

    const handleActionHistoryPannelButtonClicked = () => {
        setActionHistoryExtended(!actionHistoryExtended);
    };

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
                        >
                            <DescriptionText isDark={isDark}>
                                {item.description}
                            </DescriptionText>
                            <TimeText isDark={isDark}>{item.time}</TimeText>
                        </ActionTemplateContainer>
                    ))}
                </ActionContainer>
            </ActionsHistoryPannel>

        </div>
    );
};

export default ActionHistory;