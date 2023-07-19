import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'
import DecisionMenu from '../components/DecisionMenu'

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

    return (
        <div>
            <Map filter={filter} isDark={isDark}/>
            <SearchBar isDark={isDark}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
            <DecisionMenu isDark={isDark}/>
        </div>
    )
}

export default Main
