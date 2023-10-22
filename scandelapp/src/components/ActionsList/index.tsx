import * as React from 'react';
import { useEffect } from 'react';
import {
    ActionsListContainer,
    ActionsListButton,
    ActionsListPanel,
    ScrollableOptimisationsContainer,
    OptimisationTemplateContainer,
    TypeText,
    TrashIcon,
    GoToIcon,
    TimeIcon,
    TotalContainer,
    TotalTitleText,
    GaugesContainer,
} from './elements';
import { PersonnalizedGauge } from '../Gauges';

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} actionsListExtended - Boolean to check if the actions list is extended or not
 * @param {function} setActionsListExtended - Setter function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Setter function
 */
interface ActionsListProps {
    id: string;
    isDark: boolean;
    actionsListExtended: boolean;
    setActionsListExtended: (data: any) => void;
    decisionPanelExtended: boolean;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
}

const ActionsList: React.FC<ActionsListProps> = ({
    id,
    isDark,
    actionsListExtended,
    setActionsListExtended,
    decisionPanelExtended,
    optimisationTemplateData,
    setOptimisationTemplateData,
}) => {
    useEffect(() => {
        if (decisionPanelExtended && actionsListExtended)
            handleToggleActionsListExpend();
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

    return (
        <ActionsListContainer>
            <ActionsListButton
                isDark={isDark}
                onClick={() => handleToggleActionsListExpend()}
            ></ActionsListButton>
            <ActionsListPanel isDark={isDark} show={actionsListExtended}>
                <ScrollableOptimisationsContainer isDark={isDark}>
                    <TimeIcon isDark={isDark} size={150}></TimeIcon>
                    {optimisationTemplateData
                        .filter((item: any) => item.saved)
                        .map((item: any, i: number) => (
                            <OptimisationTemplateContainer
                                key={i}
                                isDark={isDark}
                                y={100 * i}
                            >
                                <TypeText isDark={isDark}>{item.type}</TypeText>
                                <TrashIcon
                                    isDark={isDark}
                                    size={30}
                                    onClick={() =>
                                        handleTrashIconClick(item.id)
                                    }
                                ></TrashIcon>
                                <GoToIcon isDark={isDark} size={30}></GoToIcon>
                            </OptimisationTemplateContainer>
                        ))}
                </ScrollableOptimisationsContainer>
                <TotalContainer isDark={isDark}>
                    <TotalTitleText isDark={isDark}>
                        Impact économique
                    </TotalTitleText>
                </TotalContainer>
                {/* Render personalized gauge components */}
                <GaugesContainer>
                    <PersonnalizedGauge
                        id={'ElecGaugesComponentId'}
                        isDark={isDark}
                        isElec={true}
                        isBio={false}
                        isLumi={false}
                        level={80}
                        oldLevel={50}
                        top={315}
                        left={470}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={65}
                        oldLevel={85}
                        top={315}
                        left={570}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={40}
                        oldLevel={20}
                        top={315}
                        left={670}
                    />
                </GaugesContainer>
            </ActionsListPanel>
        </ActionsListContainer>
    );
};

export default ActionsList;
