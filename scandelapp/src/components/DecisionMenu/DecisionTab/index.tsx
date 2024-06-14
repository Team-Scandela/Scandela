import { useState } from 'react';
import {
    LogoContainer,
    DropdownContainer,
    DropdownRoundButton,
    DropdownMenu,
    DropdownItem,
    ScrollableOptimisationsContainer,
    AddToActionsListButton,
} from './elements';
import { MdKeyboardArrowDown as DropdownButtonIconOpen } from 'react-icons/md';
import { MdKeyboardArrowUp as DropdownButtonIconClose } from 'react-icons/md';
import ButtonSelectAll from '../ButtonSelectAll';
import ButtonDeselectAll from '../ButtonDeselectAll';
import logoDark from '../../../assets/logo-128x128-yellow.png';
import OptimisationTemplate from '../../OptimisationTemplate';
import { showToast } from '../../Toastr';
import { useTranslation } from 'react-i18next';

/**
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} setOptimisationTemplateData - Callback function
 * @param {function} handleButtonSelectAllClick - Callback function
 * @param {function} handleButtonDeselectAllClick - Callback function
 * @param {function} handleCurrentSelectedChange - Callback function
 * @param {string} currentSelected - Current selected optimisation type
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 * @param {any} notificationsPreference - Notifications preference data
 * @param {any} dropdownExpended - Boolean to check if the dropdown is open or closed
 * @param {function} setDropdownExpended - Setter for the dropdownExtended boolean
 */
interface DecisionTabProps {
    isDark: boolean;
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
    handleButtonSelectAllClick: () => void;
    handleButtonDeselectAllClick: () => void;
    handleCurrentSelectedChange: (data: string) => void;
    currentSelected: string;
    addNotificationToList: (description: string) => void;
    notificationsPreference: any;
    dropdownExpended: boolean;
    setDropdownExpended: (value: boolean) => void;
}

const DecisionTab: React.FC<DecisionTabProps> = ({
    isDark,
    optimisationTemplateData,
    setOptimisationTemplateData,
    handleButtonSelectAllClick,
    handleButtonDeselectAllClick,
    handleCurrentSelectedChange,
    currentSelected,
    addNotificationToList,
    notificationsPreference,
    dropdownExpended,
    setDropdownExpended,
}) => {
    const [items, setItems] = useState([]);
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const { t } = useTranslation();

    const handleChildCheckboxChange = (id: number, isChecked: boolean) => {
        const updatedData = [...optimisationTemplateData];
        updatedData[id].selected = isChecked;
        setOptimisationTemplateData(updatedData);
    };

    // Fill the items array with one of each types from the optimisationTemplateData
    const handleToggleDropdownExpend = () => {
        const uniqueTypes = optimisationTemplateData.reduce(
            (types: any, item: any) => {
                if (!types.has(item.type)) {
                    types.add(item.type);
                }
                return types;
            },
            new Set()
        );
        const uniqueArray = Array.from(uniqueTypes);
        uniqueArray.unshift('Toutes les optimisations');
        setItems(uniqueArray);
        setDropdownExpended(!dropdownExpended);
    };

    const handleItemClick = (item: string) => {
        handleCurrentSelectedChange(item);
        handleToggleDropdownExpend();
    };

    const handleActionsListButtonClick = () => {
        let itemsUpdated = 0;
        if (isOnCooldown) return;
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (item.selected) {
                if (!item.saved) itemsUpdated++;
                item.saved = true;
            }
        });
        setOptimisationTemplateData(updatedData);
        if (itemsUpdated === 0) {
            if (
                notificationsPreference.find(
                    (item: any) => item[0] === 'actionListUpdate'
                )[1]
            ) {
                showToast(
                    'error',
                    "Il n'y a rien à ajouter dans la liste d'action",
                    'top-left',
                    5000,
                    false,
                    true,
                    false,
                    true
                );
            }
            addNotificationToList("Echec de modification de la liste d'action");
        } else if (itemsUpdated > 0) {
            if (
                notificationsPreference.find(
                    (item: any) => item[0] === 'actionListUpdate'
                )[1]
            ) {
                showToast(
                    'success',
                    'La liste des actions a bien été mise à jour',
                    'top-left',
                    5000,
                    false,
                    true,
                    false,
                    true
                );
            }
            addNotificationToList("Mise à jour de la liste d'action");
        }
        setIsOnCooldown(true);
        setTimeout(() => {
            setIsOnCooldown(false);
        }, 5000);
    };

    return (
        <div>
            <DropdownContainer isDark={isDark}>
                {currentSelected}
                <DropdownRoundButton
                    onClick={() => handleToggleDropdownExpend()}
                    isDark={isDark}
                >
                    {dropdownExpended ? (
                        <DropdownButtonIconClose size={40} />
                    ) : (
                        <DropdownButtonIconOpen size={40} />
                    )}
                </DropdownRoundButton>
            </DropdownContainer>
            {dropdownExpended && (
                <DropdownMenu isDark={isDark}>
                    {items.map((item: any) => (
                        <DropdownItem
                            key={item}
                            isDark={isDark}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
            <LogoContainer src={logoDark} />
            {currentSelected !== 'Choisissez une action' && (
                <ScrollableOptimisationsContainer isDark={isDark}>
                    {currentSelected === 'Toutes les optimisations'
                        ? optimisationTemplateData.map(
                                (item: any, i: number) => (
                                    <OptimisationTemplate
                                        key={i}
                                        isDark={isDark}
                                        y={105 * i}
                                        optimisationTemplateData={
                                            item
                                        }
                                        onTemplateClick={(
                                            isChecked
                                        ) =>
                                            handleChildCheckboxChange(
                                                item.id,
                                                isChecked
                                            )
                                        }
                                    />
                                )
                            )
                        : optimisationTemplateData
                                .filter(
                                    (item: any) =>
                                        item.type === currentSelected
                                )
                                .map((item: any, i: number) => (
                                    <OptimisationTemplate
                                        key={i}
                                        isDark={isDark}
                                        y={105 * i}
                                        optimisationTemplateData={
                                            item
                                        }
                                        onTemplateClick={(
                                            isChecked
                                        ) =>
                                            handleChildCheckboxChange(
                                                item.id,
                                                isChecked
                                            )
                                        }
                                    />
                                ))}
                </ScrollableOptimisationsContainer>
            )}
            <ButtonSelectAll
                isDark={isDark}
                handleButtonSelectAllClick={handleButtonSelectAllClick}
            />
            <AddToActionsListButton
                isDark={isDark}
                onClick={() => handleActionsListButtonClick()}
                disabled={isOnCooldown}
            >
                {t('addToActionList')}
            </AddToActionsListButton>
            <ButtonDeselectAll
                isDark={isDark}
                handleButtonDeselectAllClick={
                    handleButtonDeselectAllClick
                }
            />
        </div>
    );
};

export default DecisionTab;