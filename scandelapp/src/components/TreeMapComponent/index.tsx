import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { TreeMapContainer } from './elements';

const lampTypesData = [
    { name: 'Sodium Haute pression', size: 47535 },
    { name: 'Ampoules à incandescence', size: 11007 },
    { name: 'Diode Electroluminescente', size: 32149 },
    { name: 'Fluorescents', size: 343 },
    { name: 'Iodures métalliques', size: 3032 },
    { name: 'Lampe à vapeur de mercure', size: 995 },
    { name: 'Fluorescent Circulaire', size: 23 },
    { name: 'Sodium basse pression', size: 19 },
    { name: 'Halogènes', size: 18 },
    { name: 'Tubes luminescent', size: 40 },
    { name: 'Double Iodures métalliques', size: 19 },
];

const TreeMapComponent = () => {
    return (
        <TreeMapContainer>
            <ResponsiveContainer width="100%" height={400}>
                <Treemap
                    data={lampTypesData}
                    dataKey="size"
                    nameKey="name"
                    stroke="#fff"
                    fill="#8884d8"
                    content={<Tooltip />}
                />
            </ResponsiveContainer>
        </TreeMapContainer>
    );
};

export default TreeMapComponent;
