import React, { useState } from 'react'
import { LightDarkButton } from './elements'
import { FiSun, FiMoon } from 'react-icons/fi'

const LightDark = ( {isDark, setIsDark} ) => {

  const handleIconClick = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <LightDarkButton onClick={handleIconClick} isDark={isDark}>
        {isDark ? <FiSun /> : <FiMoon />}
      </LightDarkButton>
    </div>
  )
}

export default LightDark
