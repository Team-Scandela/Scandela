import { useState } from 'react';
import {FilterSearchContainer, FilterSearchDropdown, FilterSearchDropdownItem, FilterSearchSelected, FilterSearchInput} from './elements'

interface FilterSearchProps {
    id: string;
    isDark: boolean;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ id, isDark }) => {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('Lamp');

    const setSelectedItem = (item: string) => {
        setSelected(item);
        setDropdownOpen(false);
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(search);
        }
    };

    const [search, setSearch] = useState<string>('');

    return (
        <FilterSearchContainer isDark={isDark}>
            {dropdownOpen && (
                <FilterSearchDropdown>
                    <FilterSearchDropdownItem onClick={() => setSelectedItem('Lamp')} isDark={isDark} index={0}>Lamp</FilterSearchDropdownItem>
                    <FilterSearchDropdownItem onClick={() => setSelectedItem('Hat')} isDark={isDark} index={1}>Hat</FilterSearchDropdownItem>
                </FilterSearchDropdown>
            )}
            {!dropdownOpen && (
                <FilterSearchSelected onClick={() => setDropdownOpen(true)}>
                    <span>{selected}</span>
                    <span>▼</span>
                </FilterSearchSelected>
            )}
            <FilterSearchInput isDark={isDark} type="text" placeholder="Search"  value={search} onChange={(e  : any) => setSearch(e.target.value)} onKeyDown={handleInputKeyDown}
/>
        </FilterSearchContainer>
    );
};

export default FilterSearch;
