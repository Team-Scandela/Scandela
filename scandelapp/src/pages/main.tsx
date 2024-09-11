import { useEffect, useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import ToastHistory from '../components/ToastHistory';
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu';
import Toastr from '../components/Toastr';
import { Gauges } from '../components/Gauges';
import AbsencePannel from '../components/AbsencePannel';
// import MapDB from '../components/MapDB';
import FilterSearch from '../components/FilterSearch';
import TrafficTime from '../components/TrafficTime';
import ActionHistory from '../components/ActionHistory';
import LogoutButton from '../components/LogoutButton';
import Tutoriel from '../components/Tutoriel';
import { getNotifications } from '../utils/notificationUtils';

export enum Filters {
    pin = 'pin',
    zone = 'zone',
    pinColor = 'pinColor',
    filter = 'filter',
    traffic = 'traffic',
    cabinet = 'cabinet',
    none = 'none',
}

export enum Tabs {
    Scandela = 1,
    ActionsList,
    LampList,
    ElectricityPrice,
    Options,
}

interface MainProps {
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
}

/** Main page of the app */
const Main: React.FC<MainProps> = ({
    optimisationTemplateData,
    setOptimisationTemplateData,
}) => {
    const [isDark, setIsDark] = useState(() => {
        const savedIsDark = localStorage.getItem('isDark');
        return JSON.parse(savedIsDark);
    });
    const [filter, setFilter] = useState<Filters>(Filters.none);
    const [lat, setLat] = useState<number>(47.218371);
    const [lng, setLng] = useState<number>(-1.553621);
    const [zoom, setZoom] = useState(12);

    /** If the decision panel is open or closed */
    const [decisionPanelExtended, setDecisionPanelExtended] =
        useState<boolean>(false);
    /** If the action list panel is open or closed */
    const [currentSelected, setCurrentSelected] = useState(
        'Choisissez une action'
    );
    const [currentTab, setCurrentTab] = useState(Tabs.Scandela);
    /** Variables for the search for the filter filter */
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string>('Lamp');

    const [trafficTimeValue, setTrafficTimeValue] = useState<string>('00:00');

    const [toastHistoryData, setToastHistoryData] = useState([]);

    useEffect(() => {
        const getNotificationsAsync = async () => {
            const userId = localStorage.getItem('userId');
            const notifications = await getNotifications(userId);
            setToastHistoryData(notifications);
        };
        try {
            getNotificationsAsync();
        } catch (error) {
            console.log(
                'ERROR GET NOTIFICATIONS = ' + error
            );
        }
    }, [])

    const [toastHistoryExtended, setToastHistoryExtended] = useState(false);
    const handleToastHistoryPannelButtonClicked = () => {
        if (actionHistoryExtended)
            setActionHistoryExtended(!actionHistoryExtended);
        setToastHistoryExtended(!toastHistoryExtended);
    };

    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', true],
        ['lightDarkModeUpdate', true],
        ['languageUpdate', true],
        ['exportPdfUpdate', true],
    ]);

    const addNotificationToList = (description: string) => {
        const date = new Date();

        const year = date.getFullYear();
        const jour = date.getDate();
        const mois = date.getMonth() + 1;
        const hour = date.getHours();
        const min = date.getMinutes();

        const time = `${jour.toString().padStart(2, '0')}/${mois
            .toString()
            .padStart(2, '0')}/${year} ${hour}:${min}`;
        const updatedList = [{ time, description }, ...toastHistoryData];
        const limitedList = updatedList.slice(0, 10);

        setToastHistoryData(limitedList);
    };

    /** If the map filter container is on or out */
    const [filterPanelExtended, setFilterPanelExtended] =
        useState<boolean>(false);

    const [tooltipPreference, setTooltipPreference] = useState(true);
    const [showTutoriel, setShowTutoriel] = useState(false);

    const [actionHistoryExtended, setActionHistoryExtended] = useState(false);

    const handleActionHistoryPannelButtonClicked = () => {
        if (toastHistoryExtended)
            setToastHistoryExtended(!toastHistoryExtended);
        setActionHistoryExtended(!actionHistoryExtended);
    };

    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };

    const handleToggleDecisionPanelExtend = () => {
        setDecisionPanelExtended((prevState) => !prevState);
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
        console.log(updatedData);
        setOptimisationTemplateData(updatedData);
    };

    const handleButtonDeselectAllClick = () => {
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (
                item.type === currentSelected ||
                currentSelected === 'Toutes les optimisations'
            ) {
                if (item.selected) item.selected = !item.selected;
            }
        });
        setOptimisationTemplateData(updatedData);
    };

    const handleCurrentSelectedChange = (data: string) => {
        setCurrentSelected(data);
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
                optimisationTemplateData={optimisationTemplateData}
            />
            <SearchBar
                id={'searchBarComponentId'}
                isDark={isDark}
                onSubmit={handleSearch}
                tooltipPreference={tooltipPreference}
            />
            <FilterMenu
                id={'filterMenuComponentId'}
                filterPanelExtended={filterPanelExtended}
                setFilterPanelExtended={setFilterPanelExtended}
                filter={filter}
                setFilter={setFilter}
                isDark={isDark}
                tooltipPreference={tooltipPreference}
            />
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
            {localStorage.getItem('premium') === 'false' && (
                <LogoutButton id={'logoutButton'} isDark={isDark} />
            )}
            {localStorage.getItem('premium') === 'true' && (
                <>
                    {showTutoriel && (
                        <Tutoriel
                            id={'tutorielId'}
                            isDark={isDark}
                            setShowTutoriel={setShowTutoriel}
                            setDecisionPanelExtended={setDecisionPanelExtended}
                            setCurrentTab={setCurrentTab}
                            setFilterPanelExtended={setFilterPanelExtended}
                        />
                    )}
                    <ToastHistory
                        id={'toastHistoryId'}
                        isDark={isDark}
                        toastHistoryData={toastHistoryData}
                        toastHistoryExtended={toastHistoryExtended}
                        handleToastHistoryPannelButtonClicked={
                            handleToastHistoryPannelButtonClicked
                        }
                        tooltipPreference={tooltipPreference}
                    />
                    <ActionHistory
                        id={'actionHistoryComponentId'}
                        isDark={isDark}
                        actionHistoryExtended={actionHistoryExtended}
                        handleActionHistoryPannelButtonClicked={
                            handleActionHistoryPannelButtonClicked
                        }
                        tooltipPreference={tooltipPreference}
                    />
                    <DecisionMenu
                        id={'decisionMenuComponentId'}
                        isDark={isDark}
                        setIsDark={setIsDark}
                        handleToggleDecisionPanelExtend={
                            handleToggleDecisionPanelExtend
                        }
                        decisionPanelExtended={decisionPanelExtended}
                        optimisationTemplateData={optimisationTemplateData}
                        setOptimisationTemplateData={
                            setOptimisationTemplateData
                        }
                        handleButtonSelectAllClick={handleButtonSelectAllClick}
                        handleButtonDeselectAllClick={
                            handleButtonDeselectAllClick
                        }
                        currentSelected={currentSelected}
                        handleCurrentSelectedChange={
                            handleCurrentSelectedChange
                        }
                        addNotificationToList={addNotificationToList}
                        notificationsPreference={notificationsPreference}
                        setNotificationsPreference={setNotificationsPreference}
                        tooltipPreference={tooltipPreference}
                        setTooltipPreference={setTooltipPreference}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        setShowTutoriel={setShowTutoriel}
                    />
                    <Gauges
                        id={'gaugesComponentId'}
                        isDark={isDark}
                        decisionPanelExtended={decisionPanelExtended}
                        currentTab={currentTab}
                    />
                    <AbsencePannel
                        id={'absencePannelComponentId'}
                        isDark={isDark}
                        tooltipPreference={tooltipPreference}
                    />
                    <Toastr id={'toastrComponentId'} isDark={isDark} />
                </>
            )}
        </div>
    );
};

export default Main;
