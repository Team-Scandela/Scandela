import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu'
import EditInPdfPannel from '../components/EditInPdfPannel';
import Gauges from '../components/Gauges';

/** Main page of the app */
const Main: React.FC = () => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>('none');
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
            <Map filter={filter} isDark={isDark} lat={lat} lng={lng} zoom={zoom}/>
            <SearchBar isDark={isDark} onSubmit={handleSearch}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
            <DecisionMenu isDark={isDark} handleButtonEditInPdfClick={handleButtonEditInPdfClick} isButtonEditInPdfClicked={isButtonEditInPdfClicked}/>
            <EditInPdfPannel isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked} />
            <Gauges isDark={isDark}/>
        </div>
    )
}

export default Main;
