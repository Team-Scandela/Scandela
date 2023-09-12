import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'
import { handleSearchUtils } from '../utils/searchUtils';
import DecisionMenu from '../components/DecisionMenu'
import EditInPdfPannel from '../components/EditInPdfPannel';
import Gauges from '../components/Gauges';
import ActionsList from '../components/ActionsList'

/** Main page of the app */
const Main: React.FC = () => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>('none');
    const [lat, setLat] = React.useState<number>(47.218371);
    const [lng, setLng] = React.useState<number>(-1.553621);
    const [zoom, setZoom] = React.useState(12);
    const [isButtonEditInPdfClicked, setIsButtonEditInPdfClicked] = React.useState<boolean>(false);
    const [currentSelected, setCurrentSelected] = React.useState('Choisissez une action');
    const [optimisationTemplateData, setOptimisationTemplateData] = React.useState([{id: 0, saved: false, selected: false, type: "Éteindre lampadaire"},
                                                                                    {id: 1, saved: false, selected: false, type: "Éteindre lampadaire"},
                                                                                    {id: 2, saved: false, selected: false, type: "Allumer lampadaire"},
                                                                                    {id: 3, saved: false, selected: false, type: "Augmenter intensité lampadaire"},
                                                                                    {id: 4, saved: false, selected: false, type: "Réduire intensité lampadaire"},
                                                                                    {id: 5, saved: false, selected: false, type: "Changer ampoule lampadaire"},
                                                                                    {id: 6, saved: false, selected: false, type: "Ajouter lampadaire"},
                                                                                    {id: 7, saved: false, selected: false, type: "Retirer lampadaire"}]);

    const handleSearch = (value: string) => {
        handleSearchUtils(value, lat, setLat, lng, setLng, zoom, setZoom);
    };
    const handleButtonEditInPdfClick = () => {
        setIsButtonEditInPdfClicked(prevState => !prevState);
    };

    const handleOptimisationTemplateDataChange = (data: any) => {
        setOptimisationTemplateData(data);
    };

    const handleButtonSelectAllClick = () => {
        const updatedData = [...optimisationTemplateData];
        updatedData.forEach((item: any) => {
            if (item.type == currentSelected || currentSelected == "Toutes les optimisations")
                item.selected = !item.selected;
        });
        setOptimisationTemplateData(updatedData);
    };

    const handleCurrentSelectedChange = (data: string) => {
        setCurrentSelected(data);
    };

    return (
        <div>
            <Map filter={filter} isDark={isDark} lat={lat} lng={lng} zoom={zoom}/>
            <SearchBar isDark={isDark} onSubmit={handleSearch}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
            <ActionsList isDark={isDark} optimisationTemplateData={optimisationTemplateData}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
            <DecisionMenu isDark={isDark} handleButtonEditInPdfClick={handleButtonEditInPdfClick} isButtonEditInPdfClicked={isButtonEditInPdfClicked} 
            handleOptimisationTemplateDataChange={handleOptimisationTemplateDataChange} optimisationTemplateData={optimisationTemplateData} handleButtonSelectAllClick={handleButtonSelectAllClick}
            currentSelected={currentSelected} handleCurrentSelectedChange={handleCurrentSelectedChange}/>
            <EditInPdfPannel isDark={isDark} isButtonEditInPdfClicked={isButtonEditInPdfClicked} />
            <Gauges isDark={isDark}/>
        </div>
    )
}

export default Main;
