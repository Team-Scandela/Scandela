import { useState } from 'react';

let myBoolean = false;

export const useGlobalChangeBoolean = () => {
  const [isChangeGlobal, setIsChangeGlobal] = useState(myBoolean);

  const setGlobalBoolean = (value: boolean) => {
    myBoolean = value;
    setIsChangeGlobal(value);
  };

  return [isChangeGlobal, setGlobalBoolean] as const;
};