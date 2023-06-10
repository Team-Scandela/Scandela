import * as React from 'react'
import { ButtonEditContainer, ExportIcon } from './elements'

/** Button EditInPDf of the Decison Help Menu
 * This Button allow the user to summarize all the infos that Scandela 
 * will give him about how to decrease his consumption in electricity
 * @param {boolean} isDark - If the mode is dark or not
 * 
**/

interface ButtonEditInPdfProps {
    isDark: boolean;
}

const ButtonEditInPdf: React.FC<ButtonEditInPdfProps> = ({ isDark }) => {
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = () => {
      setIsClicked(prevState => !prevState);
    };

    return (
        <div>
          <ButtonEditContainer isDark={isDark} onClick={handleClick} isClicked={isClicked}>
            <ExportIcon isDark={isDark} isClicked={isClicked}/>
          </ButtonEditContainer>
        </div>
      );
}

export default ButtonEditInPdf