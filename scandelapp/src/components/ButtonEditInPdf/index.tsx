import * as React from 'react';
import { ButtonEditContainer, ExportIcon } from './elements';

interface ButtonEditInPdfProps {
  isDark: boolean;
  isClicked: boolean;
  handleClick: () => void;
}

const ButtonEditInPdf: React.FC<ButtonEditInPdfProps> = ({ isDark, isClicked, handleClick }) => {
  return (
    <div>
      <ButtonEditContainer isDark={isDark} onClick={handleClick} isClicked={isClicked}>
        <ExportIcon isDark={isDark} isClicked={isClicked} />
      </ButtonEditContainer>
    </div>
  );
};

export default ButtonEditInPdf;
