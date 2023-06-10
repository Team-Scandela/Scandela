import * as React from 'react'
import { DecisionMenuButton, DecisionPanel, DecisionMenuContainer, ScandelaText } from './elements'
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md'
import ButtonEditInPdf from '../ButtonEditInPdf'
import ButtonSelectAll from '../ButtonSelectAll'


/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
*/
interface DecisionMenuProps {
    isDark: boolean;
    isButtonEditInPdfClicked: boolean;
    handleButtonEditInPdfClick: () => void;
}

const DecisionMenu: React.FC<DecisionMenuProps> = ({ isDark, handleButtonEditInPdfClick, isButtonEditInPdfClicked }) => {
    /** If the decision pannel is open or closed */
    const [on, setOn] = React.useState(false);

    return (
        <div>
            <DecisionMenuContainer>
                <DecisionMenuButton onClick={() => setOn(!on)} isDark={isDark} show={on}>
                    {on ? <DecisionIconRight size={50} /> : <DecisionIconLeft size={50} />}
                </DecisionMenuButton>
                <DecisionPanel isDark={isDark} show={on}>
                    <ScandelaText isDark={isDark}> Scandela </ScandelaText>
                    <ButtonEditInPdf isDark={isDark} handleClick={handleButtonEditInPdfClick} isClicked={isButtonEditInPdfClicked}/>
                    <ButtonSelectAll isDark={isDark} />
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    )
}

export default DecisionMenu
