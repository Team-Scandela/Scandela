import React, { useState } from 'react'
import { LightDarkButton } from './elements'
import { FiSun, FiMoon } from 'react-icons/fi'

const LightDark = () => {

  const [isDark, setIsDark] = useState(true);

  const handleIconClick = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <LightDarkButton onClick={handleIconClick}>
        {isDark ? <FiSun /> : <FiMoon />}
      </LightDarkButton>
    </div>
  )
}

export default LightDark
