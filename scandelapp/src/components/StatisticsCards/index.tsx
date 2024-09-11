import React from 'react';
import { FaLightbulb, FaTools, FaCity, FaTree, FaBatteryFull, FaTemperatureHigh, FaWater, FaWind, FaSolarPanel, FaBolt, FaLeaf} from 'react-icons/fa';
import { Card, CardTitle, CardValue, CardsContainer, CardIcon, CardContent } from './elements';

type Stats = {
  defectiveLamps: number;
  totalLamps: number;
  totalCities: number;
  environmentalImpact: number;
  batteryStatus: number;
  temperature: number;
  waterUsage: number;
  windSpeed: number;
  solarPower: number;
  electricityUsage: number;
  greenEnergy: number;
};

const StatisticsCards = ({ stats }: { stats: Stats }) => {
  return (
    <CardsContainer>
      <Card>
        <CardContent>
          <CardIcon>
            <FaLightbulb size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Defective Lamps</CardTitle>
            <CardValue>{stats.defectiveLamps}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaTools size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Total Lamps</CardTitle>
            <CardValue>{stats.totalLamps}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaCity size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Total Cities</CardTitle>
            <CardValue>{stats.totalCities}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaTree size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Environmental Impact</CardTitle>
            <CardValue>{stats.environmentalImpact}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaBatteryFull size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Battery Status</CardTitle>
            <CardValue>{stats.batteryStatus}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaTemperatureHigh size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Temperature</CardTitle>
            <CardValue>{stats.temperature}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaWater size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Water Usage</CardTitle>
            <CardValue>{stats.waterUsage}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaWind size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Wind Speed</CardTitle>
            <CardValue>{stats.windSpeed}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaSolarPanel size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Solar Power</CardTitle>
            <CardValue>{stats.solarPower}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaBolt size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Electricity Usage</CardTitle>
            <CardValue>{stats.electricityUsage}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaLeaf size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Green Energy</CardTitle>
            <CardValue>{stats.greenEnergy}</CardValue>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardIcon>
            <FaBolt size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Electricity Usage</CardTitle>
            <CardValue>{stats.electricityUsage}</CardValue>
          </div>
        </CardContent>
      </Card>
    </CardsContainer>
  );
};

export default StatisticsCards;
