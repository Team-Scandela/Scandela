import styled from 'styled-components';
import { Yellow, Black } from '../../../colors';

export const ReferenceInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 170px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const SendReferenceButtonContainer = styled.div`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 170px;
    left: 1000px;
`;

export const IntensityInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 200px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const ConsommationInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 230px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const ValidateButtonContainer = styled.div`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 400px;
    left: 650px;
`;
