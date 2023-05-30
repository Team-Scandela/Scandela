import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'
import ButtonEditInPdf from '../components/ButtonEditInPdf'
import DecisionMenu from '../components/DecisionMenu'

/** Main page of the app */
const Main: React.FC = () => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>('none');

    return (
        <div>
            <Map filter={filter} isDark={isDark}/>
            <SearchBar isDark={isDark}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
            <ButtonEditInPdf isDark={isDark} />
            <DecisionMenu isDark={isDark}/>
        </div>
    )
}

export default Main
