import * as React from 'react'
import { DecisionMenuContainer, DecisionMenuButton, DecisionPanel, DecisionPanelTitle, DecisionPanelContentContainer, LogoContainer } from './elements'
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md'
import logoDark from '../../assets/logo-128x128-yellow.png'

/** Menu of the decision pannel
 * @param {boolean} isDark - If the map is in dark mode or not
*/
interface DecisionMenuProps {
    isDark: boolean;
}

const DecisionMenu : React.FC<DecisionMenuProps> = ({ isDark }) => {
    /** If the decision pannel is open or closed */
    const [on, setOn] = React.useState(false);

    return (
        <div>
            <DecisionMenuContainer>
                <DecisionMenuButton onClick={() => setOn(!on)} isDark={isDark} show={on}>
                    {on ? <DecisionIconRight size={50}/> : <DecisionIconLeft size={50}/>}
                </DecisionMenuButton>
                <DecisionPanel isDark={isDark} show={on}>
                    <DecisionPanelTitle>Scandela</DecisionPanelTitle>
                    <DecisionPanelContentContainer>
                        <LogoContainer src={logoDark} />
                    </DecisionPanelContentContainer>
                </DecisionPanel>
            </DecisionMenuContainer>
        </div>
    )
}

export default DecisionMenu
