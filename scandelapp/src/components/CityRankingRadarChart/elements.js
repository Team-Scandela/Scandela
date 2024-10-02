import styled from 'styled-components';
import { Grey, Yellow, DarkYellow, Black, White } from '../../colors';

export const RankingRadarContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    background-color: ${Grey};
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
`;

export const ToggleButton = styled.button`
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: ${Yellow};
    color: ${Black};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: ${DarkYellow};
    }
`;
