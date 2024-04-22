import styled from "styled-components";
import { Black, Yellow, White } from "../../colors";

export const BackToTopButton = styled.button`
    display: fixed;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${Yellow};
    color: ${Black};
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    z-index: 100;
    &:hover {
        background-color: ${White};
    }
`;