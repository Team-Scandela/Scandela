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

    const RandomNumberLine: React.FC<{ isDark: boolean; label: string; min: number; max: number }> = ({ isDark, label, min, max }) => {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
        return (
            <div style={{ color: isDark ? '#FAC710' : '#FAC710', fontSize: '0.8em', marginTop: '50px', marginLeft: '5px', textAlign: 'left'}}>
                {label} {randomNumber}
            </div>
        );
    };

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
                    <TotalTitleText isDark={isDark} style={{ fontSize: '0.9em', marginBottom: '10px'}}>
                        {t('economicImpact')}
                    </TotalTitleText>
                    {/* Utiliser le composant pour les coûts des actions */}
                    <RandomNumberLine isDark={isDark} label="Coûts des actions (en euro):" min={1000} max={5000} />
                    {/* Utiliser le composant pour le nombre économisé d'ici 1 an */}
                    <RandomNumberLine isDark={isDark} label="économisé d'ici 1 an (en euro):" min={50000} max={200000} />
                    {/* Ajouter les boutons */}
                    <div style={{ display: 'flex', marginTop: '5px', alignContent: 'center', marginBottom: '2px'}}>
                        <button style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#FAC710', color: '#2A2B2A', border: 'none', borderRadius: '10px', marginLeft: '60px'}}>
                            Exécuter
                        </button>
                        <button style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#FAC710', color: '#2A2B2A', border: 'none', borderRadius: '10px', marginLeft: '80px' }}>
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
