import { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import ToastHistory from '../components/ToastHistory';
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu';
import TopRightButtonsPannel from '../components/TopRightButtonsPannel';
import Toastr from '../components/Toastr';
import { Gauges } from '../components/Gauges';
import AbsencePannel from '../components/AbsencePannel';
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
    const [actionsListExtended, setActionsListExtended] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(
        'Choisissez une action'
    );
    /** Variables for the search for the filter filter */
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string>('Lamp');

    const [trafficTimeValue, setTrafficTimeValue] = useState<string>('00:00');

    const [toastHistoryData, setToastHistoryData] = useState([]);
    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', true],
        ['lightDarkModeUpdate', true],
        ['languageUpdate', true],
    ]);

    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
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
                optimisationTemplateData={optimisationTemplateData}
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
            <TopRightButtonsPannel
                id={'topRightButtonsPannelId'}
                isDark={isDark}
                setIsDark={setIsDark}
                actionsListExtended={actionsListExtended}
                setActionsListExtended={setActionsListExtended}
                decisionPanelExtended={decisionPanelExtended}
                optimisationTemplateData={optimisationTemplateData}
                setOptimisationTemplateData={setOptimisationTemplateData}
                notificationsPreference={notificationsPreference}
                setNotificationsPreference={setNotificationsPreference}
                addNotificationToList={addNotificationToList}
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

            {localStorage.getItem('premium') === 'true' && (
                <>
                    <ToastHistory
                        id={'toastHistoryId'}
                        isDark={isDark}
                        toastHistoryData={toastHistoryData}
                    />
                    <ActionHistory
                        id={'actionHistoryComponentId'}
                        isDark={isDark}
                    />
                    <DecisionMenu
                        id={'decisionMenuComponentId'}
                        isDark={isDark}
                        handleToggleDecisionPanelExtend={
                            handleToggleDecisionPanelExtend
                        }
                        decisionPanelExtended={decisionPanelExtended}
                        optimisationTemplateData={optimisationTemplateData}
                        setOptimisationTemplateData={setOptimisationTemplateData}
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
                    <Toastr id={'toastrComponentId'} isDark={isDark} />
                </>
            )}
        </div>
    );
};

export default Main;
