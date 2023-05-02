import React, { useState, useEffect} from 'react'
import { FilterMenuButton, FilterMenuContainer } from './elements'
import { MdOutlineFilterNone as FilterIcon } from 'react-icons/md'
import { MdOutlinePlace, MdDataUsage, MdPlace, MdFilterList, MdDirectionsCar, MdElectricMeter } from 'react-icons/md'


const FilterMenu = ( { filter, setFilter } ) => {

  const [on, setOn] = useState(false);

  const handleIconClick = (newFilter) => {
    if (newFilter === filter) {
      newFilter = "none";
    }
    setFilter(newFilter);
  };


  const chooseStyle = (iconFilter) => {
    let style = { cursor: "pointer" };
    console.log(filter);
    console.log(iconFilter)
    if (filter !== iconFilter && filter !== "none") {
      style.opacity = "0.5";
    } else {
      style.opacity = "1";
    }
    return style;
  }

  return (
    <div>
      <FilterMenuButton onClick={() => setOn(!on)}>
        <FilterIcon />
      </FilterMenuButton>
      <FilterMenuContainer show={on}>
        <MdOutlinePlace style={chooseStyle("pin")} onClick={() => handleIconClick("pin")} />
        <MdDataUsage style={chooseStyle("zone")} onClick={() => handleIconClick("zone")} />
        <MdPlace style={chooseStyle("pinColor")} onClick={() => handleIconClick("pinColor")} />
        <MdFilterList style={chooseStyle("filter")} onClick={() => handleIconClick("filter")} />
        <MdDirectionsCar style={chooseStyle("traffic")} onClick={() => handleIconClick("traffic")} />
        <MdElectricMeter style={chooseStyle("cabinet")} onClick={() => handleIconClick("cabinet")} />
      </FilterMenuContainer>
    </div>
  )
}

export default FilterMenu
