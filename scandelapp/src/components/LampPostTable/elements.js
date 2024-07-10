import styled from 'styled-components';
import { Grey } from '../../colors';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  background-color: ${Grey};
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;
