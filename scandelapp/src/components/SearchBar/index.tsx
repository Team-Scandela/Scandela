import * as React from 'react'
import { SearchBarContainer, InputWrapper, LogoContainer, SearchIcon } from './elements'
import logoDark from '../../assets/logo-128x128-yellow.png'
import logoLight from '../../assets/logo-128x128.png'

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
**/

interface SearchBarProps {
    isDark: boolean
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isDark, onSearch }) => {
    const [searchValue, setSearchValue] = React.useState<string>("");
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
      };
  
    return (
      <SearchBarContainer isDark={isDark}>
        <LogoContainer src={isDark ? logoDark : logoLight} />
        <InputWrapper
          isDark={isDark}
          placeholder="Rechercher dans Scandela"
          value={searchValue}
          onChange={handleInputChange}
          onSearch={onSearch}
        />
        <SearchIcon isDark={isDark} />
      </SearchBarContainer>
    )
  }

export default SearchBar