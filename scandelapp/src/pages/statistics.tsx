import React, { useState, useEffect } from 'react';
import PerformanceChart from '../components/PerformanceChart';
import { StatisticsPageContainer, ScrollableContainer, ChartBanner, CardsAndRadarContainer } from '../components/PerformanceChart/elements';
import StatisticsCards from '../components/StatisticsCards';
import RadarChartComponent from '../components/RadarChartComponent';
import InfoSection from '../components/InfoSection';
import LampPostTable from '../components/LampPostTable';
import TreeMapComponent from '../components/TreeMapComponent';
import CityRankingRadarChart from '../components/CityRankingRadarChart';
import StyledTitle from '../components/StyledTitle';


const StatisticsPage = () => {
  const [efficiencyData, setEfficiencyData] = useState<{ date: string; value: number; }[]>([]);
  const [costData, setCostData] = useState<{ date: string; value: number; }[]>([]);
  const [impactData, setImpactData] = useState<{ date: string; value: number; }[]>([]);
  const [maintenanceData, setMaintenanceData] = useState<{ date: string; value: number; }[]>([]);
  const [stats, setStats] = useState({ defectiveLamps: 0, totalLamps: 0, totalCities: 0, environmentalImpact: 0 });
  const [lampPosts, setLampPosts] = useState<{ id: number; type: string; status: string; lastMaintenance: string; maintenanceCost: number; }[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const efficiencySampleData = [
        { date: '2023-01-01', value: 7 },
        { date: '2023-02-01', value: 5 },
        { date: '2023-03-01', value: 11 },
        { date: '2023-04-01', value: 9 },
        { date: '2023-05-01', value: 12 },
      ];

      const costSampleData = [
        { date: '2023-01-01', value: 3 },
        { date: '2023-02-01', value: 6 },
        { date: '2023-03-01', value: 8 },
        { date: '2023-04-01', value: 5 },
        { date: '2023-05-01', value: 7 },
      ];

      const impactSampleData = [
        { date: '2023-01-01', value: 2 },
        { date: '2023-02-01', value: 3 },
        { date: '2023-03-01', value: 5 },
        { date: '2023-04-01', value: 4 },
        { date: '2023-05-01', value: 6 },
      ];

      const maintenanceSampleData = [
        { date: '2023-01-01', value: 1 },
        { date: '2023-02-01', value: 4 },
        { date: '2023-03-01', value: 6 },
        { date: '2023-04-01', value: 3 },
        { date: '2023-05-01', value: 5 },
      ];

      const lampPosts = [
        { id: 1, type: 'LED', status: 'Active', lastMaintenance: '2023-06-01', maintenanceCost: 50 },
        { id: 2, type: 'Halogen', status: 'Defective', lastMaintenance: '2023-05-15', maintenanceCost: 70 },
        { id: 3, type: 'Fluorescent', status: 'Active', lastMaintenance: '2023-04-10', maintenanceCost: 60 },
        { id: 4, type: 'LED', status: 'Inactive', lastMaintenance: '2023-07-01', maintenanceCost: 40 },
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
        environmentalImpact: 5
      };

      setStats(statsSampleData);
    };

    fetchData();
  }, []);

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
          <PerformanceChart data={efficiencyData} title="Efficiency" />
          <PerformanceChart data={costData} title="Cost" />
        </ChartBanner>
        <ChartBanner>
          <PerformanceChart data={impactData} title="Environmental Impact" />
          <PerformanceChart data={maintenanceData} title="Maintenance Cost" />
        </ChartBanner>
        <LampPostTable lampPosts={lampPosts} />
        <TreeMapComponent />
        <CityRankingRadarChart />
      </ScrollableContainer>
    </StatisticsPageContainer>
  );
};

export default StatisticsPage;
