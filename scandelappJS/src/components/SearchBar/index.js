import React from 'react'
import {SearchBarContainer, InputWrapper, LogoContainer, SearchIcon} from './elements'
import logoDark from '../../assets/logo-128x128-yellow.png'
import logoLight from '../../assets/logo-128x128.png'

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
**/
const SearchBar = ( { isDark } ) => {
    return (
        <SearchBarContainer isDark={isDark} >
            <LogoContainer src={isDark ? logoDark : logoLight} />
            <InputWrapper isDark={isDark} placeholder="Rechercher dans Scandela" />
            <SearchIcon isDark={isDark} />
        </SearchBarContainer>
    )
}

export default SearchBar