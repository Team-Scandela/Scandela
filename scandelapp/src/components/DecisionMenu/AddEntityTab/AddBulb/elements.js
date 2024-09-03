import styled from 'styled-components';
import { Yellow, Black } from '../../../../colors';

export const ReferenceInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 20%;
    left: 15%;
    font-family: 'SyneRegular';

    border-radius: 6px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const IntensityInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 29%;
    left: 15%;
    font-family: 'SyneRegular';

    border-radius: 6px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const ConsommationInputContainer = styled.input`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 25px;
    top: 38%;
    left: 15%;
    font-family: 'SyneRegular';

    border-radius: 6px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const ValidateButtonContainer = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    left: 38%;
    top: 85.5%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Yellow : Black)};
    color: ${(props) => (props.isDark ? Black : Yellow)};
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        opacity: 0.7;
    }
`;
