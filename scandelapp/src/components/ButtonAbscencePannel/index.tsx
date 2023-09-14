import React from 'react';
import { ButtonTemp } from './elements'; // Importez ButtonTemp avec la première lettre en majuscule

interface ButtonAbscencePannelProps {
  onClick: () => void;
}

const ToggleButtonAbscencePannelButton: React.FC<ButtonAbscencePannelProps> = ({ onClick }) => {
  return (
    <ButtonTemp>
      <button onClick={onClick}>Temp : Durant Absence</button>
    </ButtonTemp>
  );
};

export default ToggleButtonAbscencePannelButton;
