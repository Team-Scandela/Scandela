import styled from "styled-components";
import { White, Black, Grey, Yellow, DarkGrey } from "../../colors";

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${White};
    border-radius: 10px;
    height: 100px;
    text-align: center;
    padding-top: 50px;
`;

export const TitleText = styled.h1`
    font-size: 54px;
    color: ${Black};
`;