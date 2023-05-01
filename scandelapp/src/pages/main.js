import React, { useState } from 'react'
import FilterMenu from '../components/FilterMenu'

const Main = () => {

  const [filter, setFilter] = useState('none');

  return (
    <div>
      <FilterMenu filter={filter} setFilter={setFilter}/>
      <h1>{filter}</h1>
    </div>
  )
}

export default Main
