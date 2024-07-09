import styled from 'styled-components';

export const ChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  margin: 10px;
  flex: 1 1 calc(50% - 20px);
  display: flex;
  align-items: center;
  min-width: 240px;
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const CardIcon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: left;
`;

export const CardValue = styled.p`
  margin: 0;
  font-size: 18px;
  color: #007bff;
  text-align: left;
  font-weight: bold;
`;

export const ChartBanner = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StatisticsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh;
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
`;

export const CardsAndRadarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;
