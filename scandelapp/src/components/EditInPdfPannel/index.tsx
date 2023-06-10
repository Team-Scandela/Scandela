import * as React from 'react';
import { PannelContainer, ExportButton, PannelText, ExportText, ExportIcon } from './elements';
import { saveAs } from 'file-saver';
import { generatePDFDocument } from './pdfGenerator';

interface EditInPdfPannellProps {
  isDark: boolean;
  isButtonEditInPdfClicked: boolean;
}

const EditInPdfPannel: React.FC<EditInPdfPannellProps> = ({ isDark, isButtonEditInPdfClicked }) => {
  const handleButtonClick = async () => {
    try {
      const pdfBytes = await generatePDFDocument();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'optimisation_scandela.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <PannelContainer isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked}>
        <PannelText isDark={isDark}>Exporter les actions Sélectionnées</PannelText>
        <ExportButton isDark={isDark}>
          <ExportText isDark={isDark}>Télécharger le fichier PDF</ExportText>
          <ExportIcon isDark={isDark} onClick={handleButtonClick} />
        </ExportButton>
      </PannelContainer>
    </div>
  );
};

export default EditInPdfPannel;
