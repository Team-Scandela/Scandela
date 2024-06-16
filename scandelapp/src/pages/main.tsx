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
import FilterSearch from '../components/FilterSearch';
import TrafficTime from '../components/TrafficTime';
import ActionHistory from '../components/ActionHistory';

/**
 * Enum for filter types.
 * @enum {string}
 */
export enum Filters {
    pin = 'pin',
    zone = 'zone',
    pinColor = 'pinColor',
    filter = 'filter',
    traffic = 'traffic',
    cabinet = 'cabinet',
    none = 'none',
}

/**
 * Props for the Main component.
 * @interface MainProps
 */
interface MainProps {
    /** Optimisation template data. */
    optimisationTemplateData: any;
    /** Function to set optimisation template data. */
    setOptimisationTemplateData: (data: any) => void;
}

/**
 * Main page component of the application.
 * 
 * @component
 * @param {MainProps} props - Props for Main component.
 * @returns {JSX.Element} The Main component.
 */
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

    /** State for the decision panel being extended or not */
    const [decisionPanelExtended, setDecisionPanelExtended] =
        useState<boolean>(false);
    /** State for the actions list panel being extended or not */
    const [actionsListExtended, setActionsListExtended] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(
        'Choisissez une action'
    );
    /** State for search filter input */
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string>('Lamp');

    const [trafficTimeValue, setTrafficTimeValue] = useState<string>('00:00');

    const [toastHistoryData, setToastHistoryData] = useState([]);
    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', true],
        ['lightDarkModeUpdate', true],
        ['languageUpdate', true],
    ]);

    /**
     * Handles the search functionality.
     * @param {string} value - The search input value.
     */
    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };

    /**
     * Toggles the decision panel extension state.
     */
    const handleToggleDecisionPanelExtend = () => {
        setDecisionPanelExtended((prevState) => !prevState);
    };

    /**
     * Handles changes to the optimisation template data.
     * @param {any} data - The new optimisation template data.
     */
    const handleOptimisationTemplateDataChange = (data: any) => {
        setOptimisationTemplateData(data);
    };

    /**
     * Selects all items in the optimisation template.
     */
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

    /**
     * Deselects all items in the optimisation template.
     */
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

    /**
     * Handles changes to the currently selected optimisation type.
     * @param {string} data - The new selected optimisation type.
     */
    const handleCurrentSelectedChange = (data: string) => {
        setCurrentSelected(data);
    };

    /**
     * Adds a notification to the list.
     * @param {string} description - The notification description.
     */
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
                        handleOptimisationTemplateDataChange={
                            handleOptimisationTemplateDataChange
                        }
                        optimisationTemplateData={optimisationTemplateData}
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
