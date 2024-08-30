import React, { useState, useEffect } from 'react';
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
import FilterLegend from '../components/FilterLegend';
import LegendHeatmap from '../components/Legends/LegendHeatmap';
import EcoPannel from '../components/EcoPannel';

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

    const [decisionPanelExtended, setDecisionPanelExtended] =
        useState<boolean>(false);
    const [actionsListExtended, setActionsListExtended] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(
        'Choisissez une action'
    );
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string>('Lamp');

    const [trafficTimeValue, setTrafficTimeValue] = useState<string>('00:00');

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
        const limitedList = updatedList.slice(0, 7);

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
                    <EcoPannel
                    />
                </>
            )}
        </div>
    );
};

export default Main;
