import { useEffect } from 'react';
import {
    ActionsListContainer,
    ActionsListButton,
    ActionsListPanel,
    ScrollableOptimisationsContainer,
    OptimisationTemplateContainer,
    TypeText,
    CoûtText,
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
                                <CoûtText isDark={isDark}>{item.coût}</CoûtText>
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
                    {/* Utiliser le composant pour les coûts des actions */}
                    <div style={{ fontSize: '0.5em', color: isDark ? '#FAC710' : '#FAC710', marginLeft: '10px', textAlign: 'left', marginTop: '14px' }}>
                        Coûts des actions (en euro):{' '}
                        {Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000}
                    </div>
                    {/* Utiliser le composant pour le nombre économisé d'ici 1 an */}
                    <div style={{ fontSize: '0.5em', color: isDark ? '#FAC710' : '#FAC710', marginLeft: '10px', textAlign: 'left', marginTop: '12px' }}>
                        économisé d'ici 1 an (en euro):{' '}
                        {Math.floor(Math.random() * (200000 - 50000 + 1)) + 50000}
                    </div>
                    {/* Ajouter les boutons */}
                    <div style={{ display: 'flex', marginTop: '10px', alignContent: 'center', marginBottom: '1px'}}>
                        <button style={{ padding: '5px', cursor: 'pointer', backgroundColor: '#FAC710', color: '#2A2B2A', border: 'none', borderRadius: '10px', marginLeft: '98px', marginBottom: '2px'}}>
                            Exécuter
                        </button>
                        <button style={{ padding: '5px', cursor: 'pointer', backgroundColor: '#FAC710', color: '#2A2B2A', border: 'none', borderRadius: '10px', marginLeft: '100px', marginBottom: '2px'}}>
                            Annuler
                        </button>
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
                        level={80}
                        oldLevel={50}
                        top={51}
                        left={74}
                    />
                    <PersonnalizedGauge
                        id={'BioGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={true}
                        isLumi={false}
                        level={65}
                        oldLevel={85}
                        top={51}
                        left={80}
                    />
                    <PersonnalizedGauge
                        id={'LumiGaugesComponentId'}
                        isDark={isDark}
                        isElec={false}
                        isBio={false}
                        isLumi={true}
                        level={40}
                        oldLevel={20}
                        top={51}
                        left={86}
                    />
                </GaugesContainer>
            </ActionsListPanel>
        </ActionsListContainer>
    );
};

export default ActionsList;
