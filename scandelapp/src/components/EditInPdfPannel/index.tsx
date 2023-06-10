import * as React from 'react';
import { PannelContainer, ExportButton, PannelText, ExportText, ExportIcon } from './elements';
import { PDFDocument } from 'pdf-lib';

interface EditInPdfPannellProps {
  isDark: boolean;
  isButtonEditInPdfClicked: boolean;
}

const EditInPdfPannel: React.FC<EditInPdfPannellProps> = ({ isDark, isButtonEditInPdfClicked}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const pdfDoc = await PDFDocument.create();
      // Ajoutez ici le contenu au document PDF

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
    }
  };

  return (
    <div>
      <PannelContainer isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked}>
        <PannelText isDark={isDark}>Exporter les actions Sélectionnées</PannelText>
        <ExportButton isDark={isDark}>
          <ExportText isDark={isDark}>Ouvrir le gestionnaire de fichiers</ExportText>
          <ExportIcon isDark={isDark} onClick={handleButtonClick} />
        </ExportButton>
      </PannelContainer>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileSelection}
      />
    </div>
  );
};

export default EditInPdfPannel;
