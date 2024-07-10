import React, { useState, useEffect } from 'react';
import {
    LampsPanelButtonContainer,
    LampsPanelContainer,
    ButtonsMenuContainer,
    ContentContainer,
    LampListContainer,  
    SearchBar,
    TitleText,
} from './elements';

import LampsTemplate from './LampsTemplate';
import { useTranslation } from 'react-i18next';
import { MdFilterAlt } from 'react-icons/md';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { Yellow, Black, White, DarkYellow, DarkGrey } from '../../../colors';

interface AddEntityButtonProps {
    isDark: boolean;
    isLampsPanelOpen: boolean;
    handleLampsPanelButtonClick: () => void;
    decisionPanelExtended: boolean;
}

interface Lamp {
    id: number;
    name: string;
    location: string;
    selected: boolean;
    price?: number;
    bulbType: string;
    intensity: number;
    consumption: number;
}

const LampsPanelButton: React.FC<AddEntityButtonProps> = ({
    isDark,
    isLampsPanelOpen,
    handleLampsPanelButtonClick,
    decisionPanelExtended,
}) => {
    const { t } = useTranslation();

    // Exemple de données de lampadaires
    const lamps: Lamp[] = [
        { id: 1, name: 'Lampadaire 1', location: 'Rue de la Paix', selected: false, bulbType: 'LED', intensity: 100, consumption: 200.00},
        { id: 2, name: 'Lampadaire 2', location: 'Avenue des Champs-Élysées', selected: false, bulbType: 'LED', intensity: 100, consumption: 2009.00},
        { id: 3, name: 'Lampadaire 3', location: 'machecoul', selected: false,bulbType: 'SHP', intensity: 3, consumption: 20.00},
        { id: 4, name: 'Lampadaire 4', location: 'nantes', selected: false,bulbType: 'LED', intensity: 100, consumption: 230.00},
        { id: 5, name: 'Lampadaire 5', location: 'Rue des aveneaux', selected: false,bulbType: 'LED', intensity: 109, consumption: 200.00},
        { id: 6, name: 'Lampadaire 6', location: 'Place royal', selected: false,bulbType: 'SHP', intensity: 11, consumption: 280.00 },
        { id: 7, name: 'Lampadaire 7', location: 'Avenue des Champs-Élysées', selected: false,bulbType: 'LED', intensity: 1030, consumption: 1200.00 },
        { id: 8, name: 'Lampadaire 8', location: 'Avenue des Champs-Élysées', selected: false, bulbType: 'LED', intensity: 100, consumption: 30.00 },
    ];

    const [lampList, setLampList] = useState<Lamp[]>(lamps);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handleChildCheckboxChange = (id: number, isChecked: boolean) => {
        const updatedData = [...lampList];
        updatedData[id - 1].selected = isChecked;
        setLampList(updatedData);
    };

    const handleItemDelete = (id: number) => {
        const updatedLampList = lampList.filter(lamp => lamp.id !== id);
        setLampList(updatedLampList);
        console.log("SUPPRESSION");
    };

    useEffect(() => {
        if (decisionPanelExtended && isLampsPanelOpen)
            handleLampsPanelButtonClick();
    }, [decisionPanelExtended, isLampsPanelOpen, handleLampsPanelButtonClick]);

    const filteredLamps = lampList.filter(lamp =>
        lamp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lamp.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sortedLamps = filteredLamps.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return (
        <div>
            <LampsPanelButtonContainer
                isDark={isDark}
                isOn={isLampsPanelOpen}
                onClick={handleLampsPanelButtonClick}
            />
            {isLampsPanelOpen && (
                <LampsPanelContainer isDark={isDark}>
                    <ButtonsMenuContainer isDark={isDark} />
                    <ContentContainer isDark={isDark}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SearchBar
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Rechercher un lampadaire..."
                                isDark={isDark} // Assurez-vous que SearchBar prend en charge isDark
                            />
                            {sortDirection === 'asc' ? (
                                <AiOutlineSortAscending
                                    onClick={handleSortChange}
                                    style={{ cursor: 'pointer', marginLeft: '5px', color:Yellow}}
                                />
                            ) : (
                                <AiOutlineSortDescending
                                    onClick={handleSortChange}
                                    style={{ cursor: 'pointer', marginLeft: '5px', color:Yellow}}
                                />
                            )}
                        </div>
                        <LampListContainer isDark={isDark}>
                            {sortedLamps.map((lamp, index) => (
                                <LampsTemplate
                                    key={lamp.id}
                                    isDark={isDark}
                                    y={125 * index} // Ajustez comme nécessaire
                                    optimisationTemplateData={lamp}
                                    onTemplateClick={(isChecked) =>
                                        handleChildCheckboxChange(lamp.id, isChecked)
                                    }
                                    price={lamp.price || 5}
                                    onItemDelete={() => handleItemDelete(lamp.id)}
                                />
                            ))}
                        </LampListContainer>
                    </ContentContainer>
                </LampsPanelContainer>
            )}
        </div>
    );
};

export default LampsPanelButton;
