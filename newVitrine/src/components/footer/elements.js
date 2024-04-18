import styled from 'styled-components'
import { Yellow, Black, White } from '../../colors';

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    padding: 0 10px;
    background-color: ${Black};
    color: ${White};
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    left: 0;
    right: 0;
`;
