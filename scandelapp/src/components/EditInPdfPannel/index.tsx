import * as React from 'react'
import { PannelContainer, ExportButton, PannelText, ExportText, ExportIcon} from './elements'

/** Button EditInPDf of the Decison Help Menu
 * This Button allow the user to summarize all the infos that Scandela 
 * will give him about how to decrease his consumption in electricity
 * @param {boolean} isDark - If the mode is dark or not
**/

interface EditInPdfPannellProps {
    isDark: boolean;
}

const EditInPdfPannel: React.FC<EditInPdfPannellProps> = ({ isDark }) => {
    return (
        <div>
            <PannelContainer isDark={isDark}> 
              <PannelText isDark={isDark}> Exporter les actions Sélectionnées </PannelText>
              <ExportButton isDark={isDark}> 
                <ExportText isDark={isDark}> Selectionner le dossier de téléchargement </ExportText>
                <ExportIcon isDark={isDark}/>
              </ExportButton>
            </PannelContainer>
        </div>
    )
}

export default EditInPdfPannel