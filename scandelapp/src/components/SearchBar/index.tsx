import * as React from 'react';
import { SearchBarContainer, InputWrapper, LogoContainer, SearchIcon } from './elements';
import logoDark from '../../assets/logo-128x128-yellow.png';
import logoLight from '../../assets/logo-128x128.png';

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
**/

interface SearchBarProps {
    isDark: boolean;
    onSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isDark, onSubmit }) => {
    const [searchValue, setSearchValue] = React.useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit(searchValue);
        }
    };


    return (
        <div>
            <SearchBarContainer id="searchbar-container" isdark={isDark}>
                <LogoContainer src={isDark ? logoDark : logoLight} />
                <InputWrapper
                    isdark={isDark}
                    placeholder="Rechercher dans Scandela"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                <SearchIcon isdark={isDark} onClick={() => onSubmit(searchValue)} />
            </SearchBarContainer>
        </div>
    )
}

export default SearchBar