import React, { useState } from 'react'
import { LightDarkButton } from './elements'
import { FiSun, FiMoon } from 'react-icons/fi'

/** Ligth / Dark mode button
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
*/
const LightDark = ( {isDark, setIsDark} ) => {

  /** Handle the click on the button and switch to the other mode */
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
