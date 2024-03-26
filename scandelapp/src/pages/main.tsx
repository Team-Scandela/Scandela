import { useState, useEffect } from 'react';
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
import { Gauges } from '../components/Gauges';
import CityButton from '../components/CityButton';
import AbsencePannel from '../components/AbsencePannel';
import SmallLampInfosPopup from '../components/SmallLampInfosPopup';
// import MapDB from '../components/MapDB';
import FilterSearch from '../components/FilterSearch';
import TrafficTime from '../components/TrafficTime';
import ActionHistory from '../components/ActionHistory';

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
    userInfo: any;
}

/** Main page of the app */
const Main: React.FC<MainProps> = ({ userInfo }) => {
    const [isDark, setIsDark] = useState<boolean>(true);
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
    /** Variables for the search for the filter filter */
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string>('Lamp');

    const [trafficTimeValue, setTrafficTimeValue] = useState<string>('00:00');

    const getUser = async () => {
        const username = 'tester';
        const password = 'T&st';
        try {
            const response = await fetch(
                'https://serverdela.onrender.com/users/183e5775-6d38-4d0b-95b4-6f4c7bbb0597',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${username}:${password}`
                        )}`,
                    },
                }
            );

            const user = await response.json();
            setIsDark(user.darkmode);
        } catch (error) {
            console.log('ERROR GET USER = ' + error);
        }
    };

    useEffect(() => {
        console.log('here!');
        getUser();
    }, []);

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

    const addNotificationToList = (description: string) => {
        const date = new Date();

        const jour = date.getDate();
        const mois = date.getMonth() + 1;
        const hour = date.getHours();
        const min = date.getMinutes();

        const time = `${jour.toString().padStart(2, '0')}/${mois
            .toString()
            .padStart(2, '0')} ${hour}:${min}`;
        const updatedList = [{ time, description }, ...toastHistoryData];
        const limitedList = updatedList.slice(0, 7);

        setToastHistoryData(limitedList);
    };

    return (
        <div>
            <Map
                id={'mapComponentId'}
                filter={filter}
                isDark={isDark}
                lat={lat}
                lng={lng}
                zoom={zoom}
                selectedFilter={selected}
                searchFilter={search}
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
            {filter === Filters.filter && (
                <>
                    <FilterSearch
                        id={'filterSearchComponentId'}
                        isDark={isDark}
                        selected={selected}
                        setSelected={setSelected}
                        search={search}
                        setSearch={setSearch}
                    />
                </>
            )}
            {filter === Filters.traffic && (
                <>
                    <TrafficTime
                        id={'trafficTimeComponentId'}
                        isDark={isDark}
                        trafficTime={trafficTimeValue}
                        setTrafficTime={setTrafficTimeValue}
                    />
                </>
            )}

            {userInfo.isPremiumActivated && (
                <>
                    <ToastHistory
                        id={'toastHistoryId'}
                        isDark={isDark}
                        toastHistoryData={toastHistoryData}
                    />
                    <ActionHistory id={'actionHistoryId'} isDark={isDark} />
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

export default Main;
