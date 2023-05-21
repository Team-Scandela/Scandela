import * as React from 'react'
import { DecisionMenuButton, DecisionPannelContainer} from './elements'
import { MdKeyboardDoubleArrowLeft as DecisionIconLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight as DecisionIconRight } from 'react-icons/md'

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
            <DecisionMenuButton onClick={() => setOn(!on)} isDark={isDark} isOn={on}>
                {on ? <DecisionIconRight size={50}/> : <DecisionIconLeft size={50}/>} 
            </DecisionMenuButton>
            {on &&
                <DecisionPannelContainer isDark={isDark}>
                    <h1>Scandela</h1>
                </DecisionPannelContainer>}
        </div>
    )
}

export default DecisionMenu
