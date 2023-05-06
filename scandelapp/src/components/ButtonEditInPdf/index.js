import React from 'react'
import { ButtonEditContainer, ExportIcon } from './elements'

/** Button EditInPDf of the Decison Help Menu
 * This Button allow the user to summarize all the infos that Scandela 
 * will give him about how to decrease his consumption in electricity
 * @param {boolean} isDark - If the mode is dark or not
**/
const ButtonEditInPdf = ( { isDark } ) => {
    return (
        <ButtonEditContainer isDark={isDark}>
            <ExportIcon isDark={isDark} />
        </ButtonEditContainer>

    )
}

export default ButtonEditInPdf