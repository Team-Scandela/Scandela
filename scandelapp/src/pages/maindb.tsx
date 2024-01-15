import * as React from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import LightDark from '../components/LightDark';
import SearchBar from '../components/SearchBar';
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu';
import EditInPdfPannel from '../components/EditInPdfPannel';
import ActionsList from '../components/ActionsList';
import SettingsButton from '../components/SettingsButton';
import LogoutButton from '../components/LogoutButton';
import Toastr from '../components/Toastr';
import AbsencePannel from '../components/AbsencePannel';
import { Gauges } from '../components/Gauges';
import Lasso from '../components/Lasso';
import CityButton from '../components/CityButton';
import SmallLampInfosPopup from '../components/SmallLampInfosPopup';
import MapDB from '../components/MapDB';

export enum Filters {
    pin = 'pin',
    zone = 'zone',
    pinColor = 'pinColor',
    filter = 'filter',
    traffic = 'traffic',
    cabinet = 'cabinet',
    none = 'none',
}

interface MainProps {
    isPremiumActivated: boolean;
}

/** Main page of the app */
const MainDB: React.FC<MainProps> = ({ isPremiumActivated }) => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [isLassoActive, setIsLassoActive] = React.useState(false);
    const [filter, setFilter] = React.useState<Filters>(Filters.none);
    const [lat, setLat] = React.useState<number>(47.218371);
    const [lng, setLng] = React.useState<number>(-1.553621);
    const [zoom, setZoom] = React.useState(12);
    const [isButtonEditInPdfClicked, setIsButtonEditInPdfClicked] =
        React.useState<boolean>(false);
    /** If the decision panel is open or closed */
    const [decisionPanelExtended, setDecisionPanelExtended] =
        React.useState<boolean>(false);
    /** If the action list panel is open or closed */
    const [actionsListExtended, setActionsListExtended] = React.useState(false);
    const [currentSelected, setCurrentSelected] = React.useState(
        'Choisissez une action'
    );
    const [optimisationTemplateData, setOptimisationTemplateData] =
        React.useState([
            {
                id: 0,
                saved: false,
                selected: false,
                type: 'Éteindre lampadaire',
                location: '13 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 1,
                saved: false,
                selected: false,
                type: 'Éteindre lampadaire',
                location: '14 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 2,
                saved: false,
                selected: false,
                type: 'Allumer lampadaire',
                location: '15 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 3,
                saved: false,
                selected: false,
                type: 'Augmenter intensité',
                location: '16 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 4,
                saved: false,
                selected: false,
                type: 'Réduire intensité',
                location: '17 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 5,
                saved: false,
                selected: false,
                type: 'Changer ampoule',
                location: '18 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 6,
                saved: false,
                selected: false,
                type: 'Ajouter lampadaire',
                location: '19 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
            {
                id: 7,
                saved: false,
                selected: false,
                type: 'Retirer lampadaire',
                location: '20 Rue Pierrick Guyard',
                description: 'Passage peu fréquent',
                solution: 'Off: 18h-10h',
            },
        ]);

    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };

    const handleButtonEditInPdfClick = () => {
        setIsButtonEditInPdfClicked((prevState) => !prevState);
    };

    const handleToggleDecisionPanelExtend = () => {
        setDecisionPanelExtended((prevState) => !prevState);
    };

    const handleOptimisationTemplateDataChange = (data: any) => {
        setOptimisationTemplateData(data);
    };

    const handleButtonSelectAllClick = () => {
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (
                item.type === currentSelected ||
                currentSelected === 'Toutes les optimisations'
            ) {
                if (!item.selected) item.selected = !item.selected;
            }
        });
        setOptimisationTemplateData(updatedData);
    };

    const handleCurrentSelectedChange = (data: string) => {
        setCurrentSelected(data);
    };

    const handleLassoActivation = (isActive: boolean) => {
        setIsLassoActive(isActive);
    };

    return (
        <div>
            <MapDB
                id={'mapComponentId'}
                filter={filter}
                isDark={isDark}
                lat={lat}
                lng={lng}
                zoom={zoom}
                isLassoActive={isLassoActive}
            />
            <SearchBar
                id={'searchBarComponentId'}
                isDark={isDark}
                onSubmit={handleSearch}
            />
            <FilterMenu
                id={'filterMenuComponentId'}
                filter={filter}
                setFilter={setFilter}
                isDark={isDark}
            />
            <LogoutButton id={'logoutButtonId'} isDark={isDark} />
            <CityButton id={'cityButtonId'} isDark={isDark} />
            {isPremiumActivated && (
                <>
                    <ActionsList
                        id={'actionsListComponentId'}
                        isDark={isDark}
                        actionsListExtended={actionsListExtended}
                        setActionsListExtended={setActionsListExtended}
                        decisionPanelExtended={decisionPanelExtended}
                        optimisationTemplateData={optimisationTemplateData}
                        setOptimisationTemplateData={
                            setOptimisationTemplateData
                        }
                    />
                    <SettingsButton
                        id={'settingsButtonId'}
                        isDark={isDark}
                        setIsDark={setIsDark}
                    />
                    <Lasso
                        id={'LassoComponentId'}
                        isDark={isDark}
                        onLassoActivation={handleLassoActivation}
                    />
                    <DecisionMenu
                        id={'decisionMenuComponentId'}
                        isDark={isDark}
                        handleButtonEditInPdfClick={handleButtonEditInPdfClick}
                        isButtonEditInPdfClicked={isButtonEditInPdfClicked}
                        handleToggleDecisionPanelExtend={
                            handleToggleDecisionPanelExtend
                        }
                        decisionPanelExtended={decisionPanelExtended}
                        handleOptimisationTemplateDataChange={
                            handleOptimisationTemplateDataChange
                        }
                        optimisationTemplateData={optimisationTemplateData}
                        handleButtonSelectAllClick={handleButtonSelectAllClick}
                        currentSelected={currentSelected}
                        handleCurrentSelectedChange={
                            handleCurrentSelectedChange
                        }
                    />
                    <EditInPdfPannel
                        id={'editinPdfPannelComponentId'}
                        isDark={isDark}
                        isButtonEditInPdfClicked={isButtonEditInPdfClicked}
                    />
                    <Gauges
                        id={'gaugesComponentId'}
                        isDark={isDark}
                        decisionPanelExtended={decisionPanelExtended}
                        actionsListExtended={actionsListExtended}
                    />
                    <AbsencePannel
                        id={'DuringPannelComponentId'}
                        isDark={isDark}
                    />
                    <SmallLampInfosPopup isDark={isDark} />
                    <Toastr id={'toastrComponentId'} isDark={isDark} />
                </>
            )}
        </div>
    );
};

export default MainDB;
