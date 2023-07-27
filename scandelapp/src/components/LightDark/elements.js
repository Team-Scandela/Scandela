import styled from "styled-components";
import { Yellow, Black, White } from "../../colors";

/** Button who allows to switch between dark and light mode */
export const LightDarkButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${(props) =>
        props.isDark ? Black + "CC" : White + "CC"};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    position: fixed;
    top: 25px;
    left: 500px;
`;
