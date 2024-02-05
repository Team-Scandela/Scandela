import { useState } from 'react';
import {
    FilterSearchContainer,
    FilterSearchDropdown,
    FilterSearchDropdownItem,
    FilterSearchSelected,
    FilterSearchInput,
} from './elements';

interface FilterSearchProps {
    id: string;
    isDark: boolean;
    selected: string;
    setSelected: (item: string) => void;
    search: string;
    setSearch: (item: string) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
    id,
    isDark,
    selected,
    setSelected,
    search,
    setSearch,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const setSelectedItem = (item: string) => {
        setSelected(item);
        setDropdownOpen(false);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearch(e.currentTarget.value);
        }
    };

    return (
        <FilterSearchContainer isDark={isDark}>
            {dropdownOpen && (
                <FilterSearchDropdown>
                    <FilterSearchDropdownItem
                        onClick={() => setSelectedItem('Lamp')}
                        isDark={isDark}
                        index={0}
                    >
                        Lamp
                    </FilterSearchDropdownItem>
                    <FilterSearchDropdownItem
                        onClick={() => setSelectedItem('Hat')}
                        isDark={isDark}
                        index={1}
                    >
                        Hat
                    </FilterSearchDropdownItem>
                    <FilterSearchDropdownItem
                        onClick={() => setSelectedItem('Cabinet')}
                        isDark={isDark}
                        index={2}
                    >
                        Cabinet
                    </FilterSearchDropdownItem>
                </FilterSearchDropdown>
            )}
            {!dropdownOpen && (
                <FilterSearchSelected onClick={() => setDropdownOpen(true)}>
                    <span>{selected}</span>
                    <span>▼</span>
                </FilterSearchSelected>
            )}
            <FilterSearchInput
                isDark={isDark}
                type="text"
                placeholder="Search"
                onKeyDown={handleInputKeyDown}
            />
        </FilterSearchContainer>
    );
};

export default FilterSearch;
