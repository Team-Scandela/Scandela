import * as React from 'react'
import { DecisionMenuContainer, DecisionMenuButton, DecisionPanel, DecisionPanelContentContainer,
LogoContainer, ScandelaText, DropdownContainer, DropdownRoundButton, DropdownMenu, DropdownItem,
ScrollableOptimisationsContainer, AddToActionsListButton } from './elements'
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md'
import { MdKeyboardArrowDown as DropdownButtonIconOpen } from 'react-icons/md'
import { MdKeyboardArrowUp as DropdownButtonIconClose } from 'react-icons/md'
import ButtonEditInPdf from '../ButtonEditInPdf'
import ButtonSelectAll from '../ButtonSelectAll'
import logoDark from '../../assets/logo-128x128-yellow.png'
import OptimisationTemplate from '../OptimisationTemplate'
import { showToast } from '../Toastr';

/** Props of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {function} handleButtonEditInPdfClick - Callback function
 * @param {boolean} isButtonEditInPdfClicked - Boolean to check if the pdf button is clicked
 * @param {function} handleToggleDecisionPanelExtend - Callback function
 * @param {boolean} decisionPanelExtended - Boolean to check if the decision panel is extended or not
 * @param {function} handleOptimisationTemplateDataChange - Callback function
 * @param {any} optimisationTemplateData - List of list about optimsiations template datas
 * @param {function} handleButtonSelectAllClick - Callback function
 * @param {function} handleCurrentSelectedChange - Callback function
 * @param {string} currentSelected - Current selected optimisation type
*/
interface DecisionMenuProps {
    isDark: boolean;
    handleButtonEditInPdfClick: () => void;
    isButtonEditInPdfClicked: boolean;
    handleToggleDecisionPanelExtend: () => void;
    decisionPanelExtended: any;
    handleOptimisationTemplateDataChange: (data: any) => void;
    optimisationTemplateData: any;
    handleButtonSelectAllClick: () => void;
    handleCurrentSelectedChange: (data: string) => void;
    currentSelected: string;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({ isDark, handleButtonEditInPdfClick, isButtonEditInPdfClicked, 
                                                             handleToggleDecisionPanelExtend, decisionPanelExtended,
                                                             handleOptimisationTemplateDataChange, optimisationTemplateData, 
                                                             handleButtonSelectAllClick, 
                                                             handleCurrentSelectedChange, currentSelected }) => {
    const [dropdownExpended, setDropdownExpended] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [isOnCooldown, setIsOnCooldown] = React.useState(false);

    const handleChildCheckboxChange = (id: number, isChecked: boolean) => {
        console.log(id);
        const updatedData = [...optimisationTemplateData];
        updatedData[id].selected = isChecked;
        handleOptimisationTemplateDataChange(updatedData);
    };

    const handleDecisionPanelButtonClick = () => {
        handleToggleDecisionPanelExtend();
        if (dropdownExpended)
            handleToggleDropdownExpend();
    };

    // Fill the items array with one of each types from the optimisationTemplateData
    const handleToggleDropdownExpend = () => {
        const uniqueTypes = optimisationTemplateData.reduce((types: any, item: any) => {
            if (!types.has(item.type)) {
              types.add(item.type);
            }
            return types;
          }, new Set());
        const uniqueArray = Array.from(uniqueTypes);
        uniqueArray.unshift("Toutes les optimisations");
        setItems(uniqueArray);
        setDropdownExpended(!dropdownExpended);
    };

    const handleItemClick = (item: string) => {
        handleCurrentSelectedChange(item);
        handleToggleDropdownExpend();
    };

    const handleActionsListButtonClick = () => {
        let itemsUpdated = 0;
        if (isOnCooldown)
            return;
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (item.selected) {
                if (!item.saved)
                    itemsUpdated++;
                item.saved = true;
            }
        });
        handleOptimisationTemplateDataChange(updatedData);
        if (itemsUpdated === 0)
            showToast("error", "Il n'y a rien à ajouter dans la liste d'action", "top-left", 5000, false, true, false, true);
        else if (itemsUpdated > 0)
            showToast("success", "La liste des actions a bien été mise à jour", "top-left", 5000, false, true, false, true);
        setIsOnCooldown(true);
        setTimeout(() => { setIsOnCooldown(false); }, 5000);
    };

    return (
        <div>
            <DecisionMenuContainer>
                <DecisionMenuButton onClick={() => handleDecisionPanelButtonClick()} isDark={isDark} show={decisionPanelExtended}>
                    {decisionPanelExtended ? <DecisionIconRight size={50}/> : <DecisionIconLeft size={50}/>}
                </DecisionMenuButton>
                <DecisionPanel isDark={isDark} show={decisionPanelExtended}>
                    <ScandelaText isDark={isDark}> Scandela </ScandelaText>
                    <ButtonEditInPdf isDark={isDark} handleClick={handleButtonEditInPdfClick} isClicked={isButtonEditInPdfClicked}/>
                    <ButtonSelectAll isDark={isDark} handleButtonSelectAllClick={handleButtonSelectAllClick}/>
                    <DecisionPanelContentContainer>
                        <DropdownContainer isDark={isDark}>
                            {currentSelected}
                            <DropdownRoundButton onClick={() => handleToggleDropdownExpend()} isDark={isDark}>
                                {dropdownExpended ? <DropdownButtonIconClose size={40}/> : <DropdownButtonIconOpen size={40}/>}
                            </DropdownRoundButton>
                        </DropdownContainer>
                        {dropdownExpended && (
                            <DropdownMenu isDark={isDark}>
                                {items.map((item: any) => (
                                    <DropdownItem key={item} isDark={isDark} onClick={() => handleItemClick(item) }>{item}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                        <LogoContainer src={logoDark} />
                        {currentSelected !== "Choisissez une action" && (
                            <ScrollableOptimisationsContainer isDark={isDark}>
                                {currentSelected === "Toutes les optimisations"
                                ? optimisationTemplateData.map((item: any, i: number) => (
                                    <OptimisationTemplate
                                        key={i}
                                        isDark={isDark}
                                        y={100 * i}
                                        optimisationTemplateData={item}
                                        onTemplateClick={isChecked =>
                                        handleChildCheckboxChange(item.id, isChecked)
                                        }
                                    />
                                    ))
                                : optimisationTemplateData
                                    .filter((item: any) => item.type === currentSelected)
                                    .map((item: any, i: number) => (
                                        <OptimisationTemplate
                                        key={i}
                                        isDark={isDark}
                                        y={100 * i}
                                        optimisationTemplateData={item}
                                        onTemplateClick={isChecked =>
                                            handleChildCheckboxChange(item.id, isChecked)
                                        }
                                        />
                                    ))}
                            </ScrollableOptimisationsContainer>
                            )}
                        <AddToActionsListButton isDark={isDark} onClick={() => handleActionsListButtonClick()} disabled={isOnCooldown}>Ajouter à la liste d'actions</AddToActionsListButton>
                    </DecisionPanelContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    )
}

export default DecisionMenu
