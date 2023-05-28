import * as React from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'
import LightDark from '../components/LightDark'
import SearchBar from '../components/SearchBar'

/** Main page of the app */
const Main: React.FC = () => {
    const [isDark, setIsDark] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>('none');
    const [lat, setLat] = React.useState<number>(47.21);
    const [lng, setLng] = React.useState<number>(-1.553621);

    const handleSearch = (value: string) => {
        console.log(value);
        if (value !== "") {
            setLat(-47.21);
            setLng(1.553621);
        }
    }

    return (
        <div>
            <Map filter={filter} isDark={isDark} lat={lat} lng={lng} />
            <SearchBar isDark={isDark} onSubmit={handleSearch} />
            <LightDark isDark={isDark} setIsDark={setIsDark} />
            <FilterMenu filter={filter} setFilter={setFilter} isDark={isDark} />
        </div>
    )
}

export default Main
