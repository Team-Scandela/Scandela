import * as React from 'react'
import { FilterMenuButton, FilterMenuContainer } from './elements'
import { MdOutlineFilterNone as FilterIcon } from 'react-icons/md'
import { MdOutlinePlace, MdDataUsage, MdPlace, MdFilterList, MdDirectionsCar, MdElectricMeter } from 'react-icons/md'

/** Menu of the map filter
 * @param {string} filter - The current filter
 * @param {function} setFilter - Function to set the filter
 * @param {boolean} isDark - If the map is in dark mode or not
*/
interface FilterMenuProps {
    id : string,
    filter: string;
    setFilter: (filter: string) => void;
    isDark: boolean;
}

const FilterMenu : React.FC<FilterMenuProps> = ({ id, filter, setFilter, isDark }) => {
    /** If the map filter container is on or out */
    const [on, setOn] = React.useState(false);

    /** Handle the click on a filter icon. Switch to the new icon and if the icon is already selected set the filter to none 
     * @param {string} newFilter - The filter selected
     */
    const handleIconClick = (newFilter : string ) => {
        if (newFilter === filter) {
        newFilter = "none";
        }
        setFilter(newFilter);
    };

    /** Choose the style of the filters icon in order to know if there are selected or not 
     * @param {string} iconFilter - The name of the filter
     */
    const chooseStyle = (iconFilter : string) => {
        let style: { cursor: string; opacity?: string } = { cursor: "pointer" };
        if (filter !== iconFilter && filter !== "none") {
        style.opacity = "0.5";
        } else {
        style.opacity = "1";
        }
        return style;
    }

    return (
        <div id={id}>
        <FilterMenuButton onClick={() => setOn(!on)} isDark={isDark}>
            <FilterIcon />
        </FilterMenuButton>
        <FilterMenuContainer show={on} isDark={isDark}>
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
