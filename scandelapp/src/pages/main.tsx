import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu'
import EditInPdfPannel from '../components/EditInPdfPannel';
import {Gauges, PersonnalizedGauge} from '../components/Gauges';

export enum Filters {
    pin = "pin",
    zone = "zone",
    pinColor = "pinColor",
    filter = "filter",
    traffic = "traffic",
    cabinet = "cabinet",
    none = "none"
}

/** Main page of the app */
const Main: React.FC = () => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<Filters>(Filters.none);
    const [lat, setLat] = React.useState<number>(47.218371);
    const [lng, setLng] = React.useState<number>(-1.553621);
    const [zoom, setZoom] = React.useState(12);
    const [isButtonEditInPdfClicked, setIsButtonEditInPdfClicked] = React.useState<boolean>(false);


    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };
    const handleButtonEditInPdfClick = () => {
        setIsButtonEditInPdfClicked(prevState => !prevState);
    };

    return (
        <div>
            <Map id={"mapComponentId"} filter={filter} isDark={isDark} lat={lat} lng={lng} zoom={zoom} />
            <SearchBar id={"searchBarComponentId"} isDark={isDark} onSubmit={handleSearch} />
            <LightDark id={"lightDarkComponentId"} isDark={isDark} setIsDark={setIsDark} />
            <FilterMenu id={"filterMenuComponentId"} filter={filter} setFilter={setFilter} isDark={isDark} />
            <DecisionMenu id={"decisionMenuComponentId"} isDark={isDark} handleButtonEditInPdfClick={handleButtonEditInPdfClick} isButtonEditInPdfClicked={isButtonEditInPdfClicked} />
            <EditInPdfPannel id={"editinPdfPannelComponentId"} isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked} />
            <Gauges id={"gaugesComponentId"} isDark={isDark} />
        </div>
    )
}

export default Main;
