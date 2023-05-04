import React, { useState } from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'

/** Main page of the app */
const Main = () => {

    const [filter, setFilter] = useState('none');
    const [isDark, setIsDark] = useState(true);

    return (
        <div>
            <Map filter={filter} isDark={isDark}/>
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark}/>
            <LightDark isDark={isDark} setIsDark={setIsDark}/>
        </div>
    )
}

export default Main
