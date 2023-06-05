import * as React from 'react';
import { PannelContainer, ExportButton, PannelText, ExportText, ExportIcon } from './elements';
import { PDFDocument } from 'pdf-lib';

interface EditInPdfPannellProps {
  isDark: boolean;
}

const EditInPdfPannel: React.FC<EditInPdfPannellProps> = ({ isDark }) => {
  const handleButtonClick = async () => {
    const pdfDoc = await PDFDocument.create();
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'optimisation_scandela.pdf';

    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PannelContainer isDark={isDark}>
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
