import { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import ToastHistory from '../components/ToastHistory';
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu';
import EditInPdfPannel from '../components/EditInPdfPannel';
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

    getUser();

    const [toastHistoryData, setToastHistoryData] = useState([]);
    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', false],
        ['lightDarkModeUpdate', false],
        ['languageUpdate', false],
    ]);

    const handleSearch = (
        value: string,
        valueLng: number,
        valueLat: number
    ) => {
        console.log('value =' + value);
        if (value === 'ZOOM ON LAMP') zoomOnLampByCoord(valueLat, valueLng);
        else handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };

    const zoomOnLampByCoord = (valueLat: number, valueLng: number) => {
        console.log('ZOOM on coord = ' + valueLat + ' / ' + valueLng);
        setLat(valueLat);
        setLng(valueLng);
        setZoom(13);
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
                    <ActionHistory id={'actionHistoryId'} isDark={isDark} />
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
