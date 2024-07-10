import React, { useState } from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { RankingRadarContainer, ToggleButton } from './elements';

const cityScores = [
    {
        city: 'Nantes', envImpact: 85, energyConsumption: 90, lightingQuality: 95, lawCompliance: 80, maintenanceCost: 70,
    },
    {
        city: 'Machecoul (ville nul)', envImpact: 7, energyConsumption: 28, lightingQuality: 45, lawCompliance: 5, maintenanceCost: 6,
    },
    {
        city: 'Orvault', envImpact: 95, energyConsumption: 85, lightingQuality: 90, lawCompliance: 95, maintenanceCost: 85,
    },
    // Ajoutez plus de villes et de scores si nécessaire
];

const indicatorScores = [
    { indicator: 'Environnement Impact', VilleA: 85, VilleB: 7, VilleC: 95 },
    { indicator: 'Consommation', VilleA: 90, VilleB: 80, VilleC: 85 },
    { indicator: 'Qualité d\'éclairage', VilleA: 95, VilleB: 85, VilleC: 90 },
    { indicator: 'Conformité légale', VilleA: 80, VilleB: 75, VilleC: 95 },
    { indicator: 'Coût de maintenance', VilleA: 70, VilleB: 60, VilleC: 85 },
];

const CityRankingRadarChart = () => {
    const [viewMode, setViewMode] = useState('cities'); // 'cities' or 'indicators'

    const toggleViewMode = () => {
        setViewMode(viewMode === 'cities' ? 'indicators' : 'cities');
    };

    return (
        <RankingRadarContainer>
            <ToggleButton onClick={toggleViewMode}>
                {viewMode === 'cities' ? 'Afficher par indicateurs' : 'Afficher par villes'}
            </ToggleButton>
            <ResponsiveContainer width="100%" height={400}>
                {viewMode === 'cities' ? (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cityScores}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="city" />
                        <PolarRadiusAxis />
                        <Radar name="Environnement Impact" dataKey="envImpact" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Consommation" dataKey="energyConsumption" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Radar name="Qualité d'éclairage" dataKey="lightingQuality" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                        <Radar name="Conformité légale" dataKey="lawCompliance" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                        <Radar name="Coût de maintenance" dataKey="maintenanceCost" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                ) : (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={indicatorScores}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="indicator" />
                        <PolarRadiusAxis />
                        <Radar name="Nantes" dataKey="VilleA" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Machecoul (ville nul)" dataKey="VilleB" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Radar name="Orvault" dataKey="VilleC" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                )}
            </ResponsiveContainer>
        </RankingRadarContainer>
    );
};

export default CityRankingRadarChart;
