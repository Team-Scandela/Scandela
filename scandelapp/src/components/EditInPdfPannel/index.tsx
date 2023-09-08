import * as React from 'react';
import { PannelContainer, ExportButton, PannelText, ExportText, ExportIcon } from './elements';
import { saveAs } from 'file-saver';
import { generatePDFDocument } from './pdfGenerator';

interface EditInPdfPannellProps {
  id : string,
  isDark: boolean;
  isButtonEditInPdfClicked: boolean;
}

const EditInPdfPannel: React.FC<EditInPdfPannellProps> = ({ id, isDark, isButtonEditInPdfClicked }) => {
  const handleButtonClick = async () => {
    try {
      const pdfBytes = await generatePDFDocument();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'rapport_scandela.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div id={id}>
      <PannelContainer isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked}>
        <PannelText isDark={isDark}>Exporter les actions Sélectionnées</PannelText>
        <ExportButton isDark={isDark}>
          <ExportText isDark={isDark}>Télécharger le fichier PDF</ExportText>
          {isButtonEditInPdfClicked && <ExportIcon isDark={isDark} onClick={handleButtonClick} />}
        </ExportButton>
      </PannelContainer>
    </div>
  );
};

export default EditInPdfPannel;
