import React, { useState } from 'react'
import FilterMenu from '../components/FilterMenu'
import Map from '../components/Map'

const Main = () => {

  const [filter, setFilter] = useState('none');

  return (
    <div>
      <Map filter={filter}/>
      <FilterMenu filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default Main
