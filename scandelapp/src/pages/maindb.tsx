import { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import ToastHistory from '../components/ToastHistory';
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
    const [isDark, setIsDark] = useState<boolean>(true);
    const [isLassoActive, setIsLassoActive] = useState(false);
    const [filter, setFilter] = useState<Filters>(Filters.none);
    const [lat, setLat] = useState<number>(47.218371);
    const [lng, setLng] = useState<number>(-1.553621);
    const [zoom, setZoom] = useState(12);
    const [isButtonEditInPdfClicked, setIsButtonEditInPdfClicked] =
        useState<boolean>(false);
    /** If the decision panel is open or closed */
    const [decisionPanelExtended, setDecisionPanelExtended] =
        useState<boolean>(false);
    /** If the action list panel is open or closed */
    const [actionsListExtended, setActionsListExtended] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(
        'Choisissez une action'
    );
    const [optimisationTemplateData, setOptimisationTemplateData] = useState([
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
    const [toastHistoryData, setToastHistoryData] = useState([]);
    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', false],
        ['lightDarkModeUpdate', false],
        ['languageUpdate', false],
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

    const addNotificationToList = (description: string) => {
        const date = new Date();

        const hour = date.getHours();
        const min = date.getMinutes();
        const time = `${hour}:${min}`;
        const updatedList = [...toastHistoryData, { time, description }];

        setToastHistoryData(updatedList);
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
                isLassoActive={isLassoActive}
            />
            <LogoutButton id={'logoutButtonId'} isDark={isDark} />
            <CityButton id={'cityButtonId'} isDark={isDark} />
            {isPremiumActivated && (
                <>
                    <ToastHistory
                        id={'toastHistoryId'}
                        isDark={isDark}
                        toastHistoryData={toastHistoryData}
                    />
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
                        decisionPanelExtended={decisionPanelExtended}
                        notificationsPreference={notificationsPreference}
                        setNotificationsPreference={setNotificationsPreference}
                        addNotificationToList={addNotificationToList}
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
                        addNotificationToList={addNotificationToList}
                        notificationsPreference={notificationsPreference}
                    />
                    <EditInPdfPannel
                        id={'editinPdfPannelComponentId'}
                        isDark={isDark}
                        isButtonEditInPdfClicked={isButtonEditInPdfClicked}
                        decisionPanelExtended={decisionPanelExtended}
                        handleButtonEditInPdfClick={handleButtonEditInPdfClick}
                    />
                    <Gauges
                        id={'gaugesComponentId'}
                        isDark={isDark}
                        decisionPanelExtended={decisionPanelExtended}
                        actionsListExtended={actionsListExtended}
                    />
                    <AbsencePannel
                        id={'absencePannelComponentId'}
                        isDark={isDark}
                    />
                    {/* <SmallLampInfosPopup isDark={isDark} /> */}
                    <Toastr id={'toastrComponentId'} isDark={isDark} />
                </>
            )}
        </div>
    );
};

export default MainDB;
