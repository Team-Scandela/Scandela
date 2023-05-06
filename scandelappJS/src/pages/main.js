import React, { useState } from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'

/** Main page of the app */
const Main = () => {

    const [filter, setFilter] = useState('none');
    const [isDark, setIsDark] = useState(true);

    return (
        <div>
            <Map filter={filter} isDark={isDark}/>
            <SearchBar isDark={isDark}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
        </div>
    )
}

export default Main
