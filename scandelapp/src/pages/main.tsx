import React, { useState, useEffect } from 'react';
import FilterMenu from '../components/FilterMenu';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import ToastHistory from '../components/ToastHistory';
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu';
import Toastr from '../components/Toastr';
import { Gauges } from '../components/Gauges';
import AbsencePannel from '../components/AbsencePannel';
import FilterSearch from '../components/FilterSearch';
import TrafficTime from '../components/TrafficTime';
import ActionHistory from '../components/ActionHistory';
import FilterLegend from '../components/FilterLegend';
import LegendHeatmap from '../components/Legends/LegendHeatmap';
import EcoPannel from '../components/EcoPannel';
import LogoutButton from '../components/LogoutButton';
import Tutoriel from '../components/Tutoriel';

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
    ModifEntity,
    AddEntity,
    ElectricityPrice,
    Options,
    LampList,
}

interface MainProps {
    optimisationTemplateData: any;
    setOptimisationTemplateData: (data: any) => void;
}

const Main: React.FC<MainProps> = ({
}) => {
    const [isDark, setIsDark] = useState(() => {
        const savedIsDark = localStorage.getItem('isDark');
        return JSON.parse(savedIsDark);
    });
    const [filter, setFilter] = useState<Filters>(Filters.none);
    const [lat, setLat] = useState<number>(47.218371);
    const [lng, setLng] = useState<number>(-1.553621);
    const [zoom, setZoom] = useState(12);

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

    const [optimisationTemplateData, setOptimisationTemplateData] = useState([
        {
            id: 0,
            saved: false,
            selected: false,
            type: 'Éteindre lampadaire',
            location: '13 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 0.40€', 
        },
        {
            id: 1,
            saved: false,
            selected: false,
            type: 'Éteindre lampadaire',
            location: '14 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : +0.40€',
        },
        {
            id: 2,
            saved: false,
            selected: false,
            type: 'Allumer lampadaire',
            location: '15 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 1.00€',
        },
        {
            id: 3,
            saved: false,
            selected: false,
            type: 'Augmenter intensité',
            location: '16 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 0.40€',
        },
        {
            id: 4,
            saved: false,
            selected: false,
            type: 'Réduire intensité',
            location: '17 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : +0.20€',
        },
        {
            id: 5,
            saved: false,
            selected: false,
            type: 'Changer ampoule',
            location: '18 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 50.0€',
        },
        {
            id: 6,
            saved: false,
            selected: false,
            type: 'Ajouter lampadaire',
            location: '19 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 1000€',
        },
        {
            id: 7,
            saved: false,
            selected: false,
            type: 'Retirer lampadaire',
            location: '20 Rue Pierrick Guyard',
            description: 'Passage peu fréquent',
            solution: 'Off: 18h-10h',
            coût: 'coût : 200€',
        },
    ]);
    const [toastHistoryData, setToastHistoryData] = useState([]);
    const [notificationsPreference, setNotificationsPreference] = useState([
        ['actionListUpdate', true],
        ['lightDarkModeUpdate', true],
        ['languageUpdate', true],
    ]);

    // État pour gérer l'affichage de la légende temporaire
    const [showFilterLegend, setShowFilterLegend] = useState(false);
    const [legendText, setLegendText] = useState('');

    // État pour gérer l'affichage temporaire du texte
    const [tempText, setTempText] = useState<string>('');
    /** If the map filter container is on or out */
    const [filterPanelExtended, setFilterPanelExtended] = useState<boolean>(false);

    const [tooltipPreference, setTooltipPreference] = useState(true);
    const [showTutoriel, setShowTutoriel] = useState(false);

    const [toastHistoryExtended, setToastHistoryExtended] = useState(false);

    const handleToastHistoryPannelButtonClicked = () => {
        if (actionHistoryExtended)
            setActionHistoryExtended(!actionHistoryExtended);
        setToastHistoryExtended(!toastHistoryExtended);
    };

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
        const limitedList = updatedList.slice(0, 10);

        setToastHistoryData(limitedList);
    };

    // Effet pour afficher temporairement un texte lorsque le filtre est sélectionné
    useEffect(() => {
        if (filter === Filters.traffic || filter === Filters.filter || filter === Filters.pinColor || filter === Filters.zone || filter === Filters.cabinet || filter === Filters.pin) {
            setTempText('vous avez sélectionné le filtre ' + filter);
            setTimeout(() => {
                setTempText('');
            }, 3000); // Réinitialiser après 3 secondes
        }
    }, [filter]);

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
                {tempText && (
                    <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                        {tempText}
                    </div>
                )}
                {showFilterLegend && (
                    <FilterLegend
                        text={legendText}
                        onClose={() => setShowFilterLegend(false)}
                    />
                )}
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
                    {tempText && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                            {tempText}
                        </div>
                    )}
                    {showFilterLegend && (
                        <FilterLegend
                            text={legendText}
                            onClose={() => setShowFilterLegend(false)}
                        />
                    )}
                </>
            )}
            {filter === Filters.pinColor && (
                <>
                    {tempText && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                            {tempText}
                        </div>
                    )}
                    {showFilterLegend && (
                        <FilterLegend
                            text={legendText}
                            onClose={() => setShowFilterLegend(false)}
                        />
                    )}
                    <LegendHeatmap
                        imageSrc="/home/mverain/delivery/SCANDELA/real_scand/Scandela/scandelapp/src/assets/logo-128x128-yellow.png"
                        caption="Filtre Pin Color"
                        modalContent={<div>Contenu supplémentaire sur le filtre</div>}
                    />
                </>
            )}
            {filter === Filters.zone && (
                <>
                    {tempText && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                            {tempText}
                        </div>
                    )}
                    {showFilterLegend && (
                        <FilterLegend
                            text={legendText}
                            onClose={() => setShowFilterLegend(false)}
                        />
                    )}
                </>
            )}
            {filter === Filters.cabinet && (
                <>
                    {tempText && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                            {tempText}
                        </div>
                    )}
                    {showFilterLegend && (
                        <FilterLegend
                            text={legendText}
                            onClose={() => setShowFilterLegend(false)}
                        />
                    )}
                </>
            )}
            {filter === Filters.pin && (
                <>
                    {tempText && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                            {tempText}
                        </div>
                    )}
                    {showFilterLegend && (
                        <FilterLegend
                            text={legendText}
                            onClose={() => setShowFilterLegend(false)}
                        />
                    )}
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
                            setDecisionPanelExtended={
                                setDecisionPanelExtended
                            }
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
                    <EcoPannel
                    />
                </>
            )}
        </div>
    );
};

export default Main;
