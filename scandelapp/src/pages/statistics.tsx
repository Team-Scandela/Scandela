import React, { useState, useEffect } from 'react';
import PerformanceChart from '../components/PerformanceChart';
import {
    StatisticsPageContainer,
    ScrollableContainer,
    ChartBanner,
    CardsAndRadarContainer,
    RedirectButton
} from '../components/PerformanceChart/elements';
import StatisticsCards from '../components/StatisticsCards';
import RadarChartComponent from '../components/RadarChartComponent';
import InfoSection from '../components/InfoSection';
import LampPostTable from '../components/LampPostTable';
import TreeMapComponent from '../components/TreeMapComponent';
import CityRankingRadarChart from '../components/CityRankingRadarChart';
import StyledTitle from '../components/StyledTitle';
import BlockPremium from '../components/BlockPremium';
import { useNavigate } from 'react-router-dom';

const StatisticsPage = () => {
    const [efficiencyData, setEfficiencyData] = useState<
        { date: string; value: number }[]
    >([]);
    const [costData, setCostData] = useState<{ date: string; value: number }[]>(
        []
    );
    const [impactData, setImpactData] = useState<
        { date: string; value: number }[]
    >([]);
    const [maintenanceData, setMaintenanceData] = useState<
        { date: string; value: number }[]
    >([]);
    const [stats, setStats] = useState({
        defectiveLamps: 0,
        totalLamps: 0,
        totalCities: 0,
        environmentalImpact: 0,
        batteryStatus: 0,
        temperature: 0,
        waterUsage: 0,
        windSpeed: 0,
        solarPower: 0,
        greenEnergy: 0,
        electricityUsage: 0,
    });
    const [lampPosts, setLampPosts] = useState<
        {
            id: number;
            type: string;
            status: string;
            lastMaintenance: string;
            maintenanceCost: number;
        }[]
    >([]);

    useEffect(() => {
        const fetchData = () => {
            const efficiencySampleData = [
                { date: '2024-01-01', value: 7 },
                { date: '2024-02-01', value: 5 },
                { date: '2024-03-01', value: 11 },
                { date: '2024-04-01', value: 9 },
                { date: '2024-05-01', value: 12 },
                { date: '2024-06-01', value: 7 },
                { date: '2024-07-01', value: 5 },
                { date: '2024-08-01', value: 11 },
                { date: '2024-09-01', value: 9 },
                { date: '2024-09-02', value: 7 },
                { date: '2024-09-03', value: 4 },
                { date: '2024-09-04', value: 9 },
                { date: '2024-09-05', value: 10 },
                { date: '2024-09-06', value: 12 },
                { date: '2024-09-07', value: 9 },
                { date: '2024-09-08', value: 6 },
                { date: '2024-09-09', value: 2 },
                { date: '2024-09-10', value: 1 },
                { date: '2024-09-11', value: 9 },
                { date: '2024-10-01', value: 12 },
                { date: '2024-11-01', value: 8 },
                { date: '2024-12-01', value: 5 },
                { date: '2024-12-02', value: 6 },
                { date: '2024-12-03', value: 1 },
                { date: '2024-12-04', value: 2 },
                { date: '2024-12-05', value: 3 },
                { date: '2024-12-06', value: 8 },
                { date: '2024-12-07', value: 10 },
                { date: '2024-12-08', value: 11 },
                { date: '2024-12-09', value: 9 },
                { date: '2024-12-10', value: 10 },
                { date: '2024-12-11', value: 5 },
                { date: '2024-12-12', value: 10 },
                { date: '2024-12-13', value: 8 },
                { date: '2024-12-14', value: 9 },
                { date: '2024-12-15', value: 12 },
            ];

            const costSampleData = [
                { date: '2023-01-01', value: 45 },
                { date: '2023-02-01', value: 67 },
                { date: '2023-03-01', value: 80 },
                { date: '2023-04-01', value: 55 },
                { date: '2023-05-01', value: 73 },
                { date: '2023-06-01', value: 32 },
                { date: '2023-07-01', value: 58 },
                { date: '2023-08-01', value: 64 },
                { date: '2023-09-01', value: 79 },
                { date: '2023-10-01', value: 88 },
                { date: '2023-11-01', value: 91 },
                { date: '2023-12-01', value: 65 },
                { date: '2024-01-01', value: 70 },
                { date: '2024-02-01', value: 60 },
                { date: '2024-03-01', value: 75 },
                { date: '2024-04-01', value: 40 },
                { date: '2024-05-01', value: 50 },
                { date: '2024-06-01', value: 30 },
                { date: '2024-07-01', value: 55 },
                { date: '2024-08-01', value: 68 },
                { date: '2024-09-01', value: 82 },
                { date: '2024-09-02', value: 77 },
                { date: '2024-09-03', value: 84 },
                { date: '2024-09-04', value: 91 },
                { date: '2024-09-05', value: 88 },
                { date: '2024-09-06', value: 95 },
            ];

            const impactSampleData = [
                { date: '2023-01-01', value: 10 },
                { date: '2023-02-01', value: 20 },
                { date: '2023-03-01', value: 45 },
                { date: '2023-04-01', value: 34 },
                { date: '2023-05-01', value: 50 },
                { date: '2023-06-01', value: 28 },
                { date: '2023-07-01', value: 40 },
                { date: '2023-08-01', value: 53 },
                { date: '2023-09-01', value: 60 },
                { date: '2023-10-01', value: 70 },
                { date: '2023-11-01', value: 85 },
                { date: '2023-12-01', value: 67 },
                { date: '2024-01-01', value: 40 },
                { date: '2024-02-01', value: 55 },
                { date: '2024-03-01', value: 68 },
                { date: '2024-04-01', value: 45 },
                { date: '2024-05-01', value: 78 },
                { date: '2024-06-01', value: 88 },
                { date: '2024-07-01', value: 92 },
                { date: '2024-08-01', value: 80 },
                { date: '2024-09-01', value: 90 },
                { date: '2024-09-02', value: 75 },
                { date: '2024-09-03', value: 82 },
                { date: '2024-09-04', value: 94 },
                { date: '2024-09-05', value: 67 },
                { date: '2024-09-06', value: 72 },
            ];

            const maintenanceSampleData = [
                { date: '2023-01-01', value: 15 },
                { date: '2023-02-01', value: 34 },
                { date: '2023-03-01', value: 60 },
                { date: '2023-04-01', value: 28 },
                { date: '2023-05-01', value: 50 },
                { date: '2023-06-01', value: 42 },
                { date: '2023-07-01', value: 68 },
                { date: '2023-08-01', value: 74 },
                { date: '2023-09-01', value: 88 },
                { date: '2023-10-01', value: 93 },
                { date: '2023-11-01', value: 55 },
                { date: '2023-12-01', value: 49 },
                { date: '2024-01-01', value: 30 },
                { date: '2024-02-01', value: 65 },
                { date: '2024-03-01', value: 70 },
                { date: '2024-04-01', value: 25 },
                { date: '2024-05-01', value: 78 },
                { date: '2024-06-01', value: 81 },
                { date: '2024-07-01', value: 85 },
                { date: '2024-08-01', value: 90 },
                { date: '2024-09-01', value: 95 },
                { date: '2024-09-02', value: 70 },
                { date: '2024-09-03', value: 82 },
                { date: '2024-09-04', value: 92 },
                { date: '2024-09-05', value: 80 },
                { date: '2024-09-06', value: 88 },
            ];

            const lampPosts = [
                {
                    id: 1,
                    type: 'LED',
                    status: 'Active',
                    lastMaintenance: '2023-06-01',
                    maintenanceCost: 50,
                },
                {
                    id: 2,
                    type: 'Halogen',
                    status: 'Defective',
                    lastMaintenance: '2023-05-15',
                    maintenanceCost: 70,
                },
                {
                    id: 3,
                    type: 'Fluorescent',
                    status: 'Active',
                    lastMaintenance: '2023-04-10',
                    maintenanceCost: 60,
                },
                {
                    id: 4,
                    type: 'LED',
                    status: 'Inactive',
                    lastMaintenance: '2023-07-01',
                    maintenanceCost: 40,
                },
            ];

            setEfficiencyData(efficiencySampleData);
            setCostData(costSampleData);
            setImpactData(impactSampleData);
            setMaintenanceData(maintenanceSampleData);
            setLampPosts(lampPosts);

            const statsSampleData = {
                defectiveLamps: 15,
                totalLamps: 200,
                totalCities: 10,
                environmentalImpact: 50,
                batteryStatus: 70,
                temperature: 25,
                waterUsage: 30,
                windSpeed: 15,
                solarPower: 20,
                electricityUsage: 40,
                greenEnergy: 50,
            };

            setStats(statsSampleData);
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const redirectToHomepage = () => {
        navigate('/homepage');
    };

    const isPremium = localStorage.getItem('premium') === 'true';
    const isAdmin = localStorage.getItem('token') === 'true';

    if (!isPremium && !isAdmin) {
        return (
            <StatisticsPageContainer>
                <ScrollableContainer>
                    <BlockPremium />
                </ScrollableContainer>
            </StatisticsPageContainer>
        );
    }

    return (
        <StatisticsPageContainer>
            <ScrollableContainer>
                <StyledTitle>Statistiques/Classement</StyledTitle>
                <InfoSection />
                <CardsAndRadarContainer>
                    <StatisticsCards stats={stats} />
                    <RadarChartComponent />
                </CardsAndRadarContainer>
                <ChartBanner>
                    <PerformanceChart
                        data={efficiencyData}
                        title="Efficiency"
                    />
                    <PerformanceChart data={costData} title="Cost" />
                </ChartBanner>
                <ChartBanner>
                    <PerformanceChart
                        data={impactData}
                        title="Environmental Impact"
                    />
                    <PerformanceChart
                        data={maintenanceData}
                        title="Maintenance Cost"
                    />
                </ChartBanner>
                <LampPostTable lampPosts={lampPosts} />
                <TreeMapComponent />
                <CityRankingRadarChart />
                <RedirectButton style={{ marginTop: '1rem' }} onClick={redirectToHomepage}>
                    Retourner à la page d'accueil
                </RedirectButton>
            </ScrollableContainer>
        </StatisticsPageContainer>
    );
};

export default StatisticsPage;
