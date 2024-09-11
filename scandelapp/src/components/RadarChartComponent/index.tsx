import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from 'recharts';
import { RadarChartContainer } from './element';

const data = [
    { subject: 'Environmental Impact', A: 120, fullMark: 150 },
    { subject: 'Consumption Score', A: 98, fullMark: 150 },
    { subject: 'Lighting Score', A: 86, fullMark: 150 },
    { subject: 'Law Score', A: 99, fullMark: 150 },
    { subject: 'MeanScore', A: 34, fullMark: 150 },
    { subject: 'Score', A: 5, fullMark: 150 },
    { subject: 'Mean', A: 71, fullMark: 150 },
];

const RadarChartComponent = () => {
    return (
        <RadarChartContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" width={500} height={400} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Legend />
                <Radar name="City Performance" dataKey="A" stroke="#D5B60A" fill="#FAC710" fillOpacity={0.6} />
            </RadarChart>
        </RadarChartContainer>
    );
};

export default RadarChartComponent;
