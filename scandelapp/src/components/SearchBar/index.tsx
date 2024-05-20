import { useState } from 'react';
import {
    SearchBarContainer,
    InputWrapper,
    LogoContainer,
    SearchIcon,
    SpinnerContainer,
    SwitchSearchIcon,
    SwitchSearchIconTwo,
} from './elements';
import logoDark from '../../assets/logo-128x128-yellow.png';
import logoLight from '../../assets/logo-128x128.png';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner';
import { handleSearchUtils } from '../../utils/searchUtils';

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface SearchBarProps {
    id: string;
    isDark: boolean;
    onSubmit: (value: string, valueLng: number, valueLat: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ id, isDark, onSubmit }) => {
    const [testIsLoading, setTestIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);
    const [isLamp, setIsLamp] = useState<Boolean>(true);
    const [isStreetSearch, setIsStreetSearch] = useState<boolean>(true);
    const { t } = useTranslation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestIsLoading(true);
        setSearchValue(e.target.value);
        setIsLamp(true);
        setTimeout(() => {
            setTestIsLoading(false);
        }, 3000);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchBarAction();
        }
    };

    const handleSearchBarAction = () => {
        if (isStreetSearch === true) {
            onSubmit(searchValue, 0, 0);
        } else {
            getLamp();
        }
    };

    const getLamp = async () => {
        const username = process.env.REACT_APP_REQUEST_USER;
        const password = process.env.REACT_APP_REQUEST_PASSWORD;
        const urlLamp = process.env.REACT_APP_BACKEND_URL + 'lamps?name=' + searchValue;
        try {
            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            const lampData = await response.json();
            if (response.status === 200) {
                
                setLat(lampData[0].latitude);
                setLong(lampData[0].longitude);
                onSubmit("ZOOM ON LAMP",lampData[0].longitude, lampData[0].latitude);  
                
            } else {
                console.log('GET LAMP FAILED, status = ' + response.status);
                setIsLamp(false);
            }
        } catch (error) {
            console.log('ERROR GET LAMP = ' + error);
            setIsLamp(false);
        }
    };

    const handleSwitchSearch = () => {
        setIsStreetSearch(!isStreetSearch);
        setLat(0);
        setLong(0);
    };

    return (
        <div id={id}>
            <SearchBarContainer id="searchbar-container" isdark={isDark}>
                <LogoContainer src={isDark ? logoDark : logoLight} />
                {isStreetSearch ? (
                    <SwitchSearchIcon
                        isdark={isDark}
                        onClick={handleSwitchSearch}
                    />
                ) : (
                    <SwitchSearchIconTwo
                        isdark={isDark}
                        onClick={handleSwitchSearch}
                    />
                )}
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
                        onClick={handleSearchBarAction}
                    />
                )}
            </SearchBarContainer>
        </div>
    );
};

export default SearchBar;
