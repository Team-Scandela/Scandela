import styled from 'styled-components';
import { Grey, Green, Yellow, Red, White } from '../../colors';

export const TreeMapContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: ${Grey};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const getConsumptionColor = (size) => {
  if (size < 5000) return Green; // Vert pour faible consommation
  if (size < 20000) return Yellow; // Jaune pour consommation moyenne
  return Red; // Rouge pour forte consommation
};

export const TreemapLabel = styled.text`
  font-size: 14px;
  fill: ${White};
  text-anchor: middle;
`;

export const TreemapIndex = styled.text`
  font-size: 16px;
  fill: ${White};
  fill-opacity: 0.9;
`;
