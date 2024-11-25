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
import { Tooltip } from 'react-tooltip';
import { Black } from '../../colors';
import { handleSearchUtils } from '../../utils/searchUtils';
import { useAtom } from 'jotai';
import { lampsAtom, isLoadingAtom } from '../../atoms/lampsAtom';
import { errorHandler } from '../../atoms/errorHandlerAtom';

/** SearchBar of the main page Scandela
 * This SearchBar allow the user to search a precise street or city in the Scandel'App
 * @param {boolean} isDark - If the mode is dark or not
 **/

interface SearchBarProps {
    id: string;
    isDark: boolean;
    onSubmit: (value: string, valueLng: number, valueLat: number) => void;
    onSubmitCoord: (longitude: number, latitude: number) => void;
    tooltipPreference: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    id,
    isDark,
    onSubmit,
    onSubmitCoord,
    tooltipPreference,
}) => {
    const [testIsLoading, setTestIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isStreetSearch, setIsStreetSearch] = useState<boolean>(true);
    const { t } = useTranslation();

    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isError, setIsError] = useAtom(errorHandler);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestIsLoading(true);
        setSearchValue(e.target.value);
        if (isError)
            setIsError(false);
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

        const lamp = lamps.find(
            (lamp) => lamp.name &&
            lamp.name.toLowerCase() === searchValue.toLowerCase()
        );

        if (lamp) {
            console.log("LAMP FIND = ", lamp);
            if (lamp.latitude && lamp.longitude)
                onSubmitCoord(lamp.longitude, lamp.latitude);
        } else {
            console.log("LAMP not find = ", searchValue);
            onSubmit(searchValue, 0, 0);
        }
    };

    return (
        <div id={id}>
            {tooltipPreference && (
                <div>
                    <Tooltip
                        id="searchPlace"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="searchLamp"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                </div>
            )}
            <SearchBarContainer id="searchbar-container" isdark={isDark} isError={isError}>
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
                        onClick={handleSearchBarAction}
                    />
                )}
            </SearchBarContainer>
        </div>
    );
};

export default SearchBar;
