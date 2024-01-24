import { useState } from 'react';
import {
    SearchBarContainer,
    InputWrapper,
    LogoContainer,
    SearchIcon,
    SpinnerContainer,
} from './elements';
import logoDark from '../../assets/logo-128x128-yellow.png';
import logoLight from '../../assets/logo-128x128.png';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner';

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface SearchBarProps {
    id: string;
    isDark: boolean;
    onSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ id, isDark, onSubmit }) => {
    const [testIsLoading, setTestIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const { t } = useTranslation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestIsLoading(true);
        setSearchValue(e.target.value);

        setTimeout(() => {
            setTestIsLoading(false);
        }, 3000);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit(searchValue);
        }
    };

    return (
        <div id={id}>
            <SearchBarContainer id="searchbar-container" isdark={isDark}>
                <LogoContainer src={isDark ? logoDark : logoLight} />
                <InputWrapper
                    isdark={isDark}
                    placeholder={t('searchBarMessage')} //"Rechercher dans Scandela"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                {testIsLoading ? (
                    <SpinnerContainer>
                        <LoadingSpinner />
                    </SpinnerContainer>
                ) : (
                    <SearchIcon
                        isdark={isDark}
                        onClick={() => onSubmit(searchValue)}
                    />
                )}
            </SearchBarContainer>
        </div>
    );
};

export default SearchBar;
