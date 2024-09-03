import { useState } from 'react';
import { FilterMenuButton, FilterMenuContainer } from './elements';
import { PiStackLight as FilterIcon } from 'react-icons/pi';
import {
    MdOutlinePlace,
    MdDataUsage,
    MdFilterList,
    MdDirectionsCar,
    MdElectricMeter,
} from 'react-icons/md';
import { FaLightbulb } from 'react-icons/fa';
import { Filters } from '../../pages/main';
import { Tooltip } from 'react-tooltip';
import { Black } from '../../colors';
import { useTranslation } from 'react-i18next';

/** Menu of the map filter
 * @param {boolean} filterPanelExtended - Boolean for the filter panel
 * @param {function} setFilterPanelExtended - Setter for the filter panel boolean
 * @param {string} filter - The current filter
 * @param {function} setFilter - Function to set the filter
 * @param {boolean} isDark - If the map is in dark mode or not
 * @param {boolean} tooltipPreference - Boolean to check the tooltips are displayed or not
 */
interface FilterMenuProps {
    id: string;
    filterPanelExtended: boolean;
    setFilterPanelExtended: (value: boolean) => void;
    filter: string;
    setFilter: (filter: Filters) => void;
    isDark: boolean;
    tooltipPreference: boolean;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
    id,
    filterPanelExtended,
    setFilterPanelExtended,
    filter,
    setFilter,
    isDark,
    tooltipPreference,
}) => {
    const { t } = useTranslation();

    /** Handle the click on a filter icon. Switch to the new icon and if the icon is already selected set the filter to none
     * @param {string} newFilter - The filter selected
     */
    const handleIconClick = (newFilter: Filters) => {
        if (newFilter === filter) {
            newFilter = Filters.none;
        }
        setFilter(newFilter);
    };

    /** Choose the style of the filters icon in order to know if there are selected or not
     * @param {string} iconFilter - The name of the filter
     */
    const chooseStyle = (iconFilter: string) => {
        let style: { cursor: string; opacity?: string } = { cursor: 'pointer' };
        if (filter !== iconFilter && filter !== 'none') {
            style.opacity = '0.5';
        } else {
            style.opacity = '1';
        }
        return style;
    };

    return (
        <div id={id}>
            {tooltipPreference && (
                <div>
                    <Tooltip
                        id="filters"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterPin"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterZone"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterBulbQuality"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterComponent"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterTraffic"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                    <Tooltip
                        id="filterCabinet"
                        style={{
                            backgroundColor: Black,
                            borderRadius: '5px',
                            userSelect: 'none',
                        }}
                    />
                </div>
            )}
            <FilterMenuButton
                isDark={isDark}
                onClick={() => setFilterPanelExtended(!filterPanelExtended)}
                data-tooltip-id="filters"
                data-tooltip-content={t('filters')}
            >
                <FilterIcon style={{ fontSize: '35px' }} />
            </FilterMenuButton>
            <FilterMenuContainer show={filterPanelExtended} isDark={isDark}>
                <MdOutlinePlace
                    style={chooseStyle(Filters.pin)}
                    onClick={() => handleIconClick(Filters.pin)}
                    data-tooltip-id="filterPin"
                    data-tooltip-content={t('filterPin')}
                />
                <MdDataUsage
                    style={chooseStyle(Filters.zone)}
                    onClick={() => handleIconClick(Filters.zone)}
                    data-tooltip-id="filterZone"
                    data-tooltip-content={t('filterZone')}
                />
                <FaLightbulb
                    style={chooseStyle(Filters.pinColor)}
                    onClick={() => handleIconClick(Filters.pinColor)}
                    size={25}
                    data-tooltip-id="filterBulbQuality"
                    data-tooltip-content={t('filterBulbQuality')}
                />
                <MdFilterList
                    style={chooseStyle(Filters.filter)}
                    onClick={() => handleIconClick(Filters.filter)}
                    data-tooltip-id="filterComponent"
                    data-tooltip-content={t('filterComponent')}
                />
                <MdDirectionsCar
                    style={chooseStyle(Filters.traffic)}
                    onClick={() => handleIconClick(Filters.traffic)}
                    data-tooltip-id="filterTraffic"
                    data-tooltip-content={t('filterTraffic')}
                />
                <MdElectricMeter
                    style={chooseStyle(Filters.cabinet)}
                    onClick={() => handleIconClick(Filters.cabinet)}
                    data-tooltip-id="filterCabinet"
                    data-tooltip-content={t('filterCabinet')}
                />
            </FilterMenuContainer>
        </div>
    );
};

export default FilterMenu;
