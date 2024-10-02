import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import {
    TreeMapContainer,
    getConsumptionColor,
    TreemapLabel,
    TreemapIndex,
} from './elements';

const lampTypesData = [
    { name: 'Sodium Haute pression', size: 47535 },
    { name: 'Diode Electroluminescente', size: 32149 },
    { name: 'Ampoules à incandescence', size: 11007 },
    { name: 'Iodures métalliques', size: 3032 },
    { name: 'Lampe à valeur de mercure', size: 995 },
    { name: 'Fluorescents', size: 343 },
    { name: 'Tubes luminescent', size: 40 },
    { name: 'Fluorescent Circulaire', size: 23 },
    { name: 'Sodium basse pression', size: 19 },
    { name: 'Double Iodures métalliques', size: 19 },
    { name: 'Halogènes', size: 18 },
];

const props = {
    depth: 1,
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    index: 0,
    name: 'Sodium Haute pression',
    size: 47535,
};

const CustomizedTreeMapContent = (props: {
    depth: any;
    x: any;
    y: any;
    width: any;
    height: any;
    index: any;
    name: any;
    size: any;
}) => {
    const { depth, x, y, width, height, index, name, size } = props;
    const color = getConsumptionColor(size);
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: color,
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {depth === 1 ? (
                <>
                    {size >= 10000 && (
                        <>
                            <TreemapLabel
                                x={x + width / 2}
                                y={y + height / 2 + 7}
                            >
                                {name}
                            </TreemapLabel>
                        </>
                    )}
                    <TreemapIndex x={x + 4} y={y + 18}>
                        {index + 1}
                    </TreemapIndex>
                </>
            ) : null}
        </g>
    );
};

const TreeMapComponent = () => (
    <TreeMapContainer>
        <ResponsiveContainer width="100%" height={400}>
            <Treemap
                width={400}
                height={200}
                data={lampTypesData}
                dataKey="size"
                stroke="#fff"
                content={<CustomizedTreeMapContent {...props} />}
            />
        </ResponsiveContainer>
    </TreeMapContainer>
);

export default TreeMapComponent;
