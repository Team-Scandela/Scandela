import React, { useState, useEffect} from 'react'
import { FilterMenuButton, FilterMenuContainer } from './elements'
import { MdOutlineFilterNone as FilterIcon } from 'react-icons/md'
import { MdOutlineFilterNone, MdRowing, MdForklift } from 'react-icons/md'


const FilterMenu = () => {

  const [hover, setHover] = useState(false);

  return (
    <div>
      <FilterMenuButton onClick={() => setHover(!hover)}>
        <FilterIcon />
      </FilterMenuButton>
      <FilterMenuContainer show={hover}>
        <MdRowing style={{ cursor: 'pointer' }} onClick={() => setHover(!hover)}/>
        <MdForklift style={{ cursor: 'pointer' }} onClick={() => setHover(!hover)}/>
      </FilterMenuContainer>
    </div>
  )
}

export default FilterMenu
