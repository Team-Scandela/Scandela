import styled from 'styled-components';
import { Yellow, Black, White } from '../../colors';
import { TbLogout } from 'react-icons/tb';

/** Container for the logout button **/
export const LogoutButtonContainer = styled(TbLogout)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    left: 1320px;
    user-select: none;
    opacity: 0.9;
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
