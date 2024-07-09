import React from 'react';
import { FaLightbulb, FaTools, FaCity, FaTree } from 'react-icons/fa';
import { Card, CardTitle, CardValue, CardsContainer, CardIcon, CardContent } from './elements';

type Stats = {
  defectiveLamps: number;
  totalLamps: number;
  totalCities: number;
  environmentalImpact: number;
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
            <FaLightbulb size={30} color="#007bff" />
          </CardIcon>
          <div>
            <CardTitle>Defective Lamps</CardTitle>
            <CardValue>{stats.defectiveLamps}</CardValue>
          </div>
        </CardContent>
      </Card>
    </CardsContainer>
  );
};

export default StatisticsCards;
