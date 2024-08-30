// src/components/FilterLegend.tsx
import React, { useEffect } from 'react';
import './elements.js'; // Importation du fichier de style CSS

interface FilterLegendProps {
    text: string;
    onClose: () => void;
}

const FilterLegend: React.FC<FilterLegendProps> = ({ text, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Fermer après 3 secondes

        return () => clearTimeout(timer);
    }, [onClose]);

    return <div className="legend-container">{text}</div>;
};

export default FilterLegend;
