import React from 'react'
import { InputWrapper, LogoContainer, SearchBarBg, SearchIconContainer } from './SearchBarElements'
import logo from '../../assets/logo-128x128-yellow.png'
import { Icon } from '@iconify/react';
import { YellowScandela } from "../../colors";

/** SearchBar of the main page Scandela 
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * **/

const SearchBar = () => {
  return (
    <SearchBarBg>
      <LogoContainer>
        <img src={logo} alt="Logo" />
      </LogoContainer>
      <SearchIconContainer onClick={() => console.log("Search icon clicked")}>
        <Icon icon="material-symbols:search" style={{ color: YellowScandela, fontSize: '35px' }} />
      </SearchIconContainer>
      <InputWrapper>
        <input id="input" placeholder="Rechercher dans Scandela" style={{ color: YellowScandela }} ></input>
      </InputWrapper>
    </SearchBarBg>
  )
}

export default SearchBar