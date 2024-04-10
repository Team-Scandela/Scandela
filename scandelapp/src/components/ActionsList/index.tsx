import { useEffect } from 'react';
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
} from './elements';
import { PersonnalizedGauge } from '../Gauges';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
                                <LocationText isDark={isDark}>{item.location}</LocationText>
                                <DescriptionText isDark={isDark}>{item.description}</DescriptionText>
                                <SolutionTextContainer isDark={isDark}>
                                    <SolutionText isDark={isDark}>{item.solution}</SolutionText>
                                </SolutionTextContainer>
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
                        {t('economicImpact')}
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
                        top={70}
                        left={57}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={65}
                        oldLevel={85}
                        top={70}
                        left={71}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={40}
                        oldLevel={20}
                        top={70}
                        left={85}
                    />
                </GaugesContainer>
            </ActionsListPanel>
        </ActionsListContainer>
    );
};

export default ActionsList;
