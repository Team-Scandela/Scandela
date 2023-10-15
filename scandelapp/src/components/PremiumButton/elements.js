import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';


/** Container for the background of the searchbar **/
export const PremiumButtonStyle = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 40px;
    top: 25px;
    left: 1040px;
    user-select: none;
    opacity: 0.8;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;