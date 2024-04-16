import styled from 'styled-components';
import { Yellow, Black } from '../../../colors';

export const NameInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 170px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const AddressInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 200px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const LatitudeInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 230px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const LongitudeInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 260px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const HeightInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 290px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const LamptypeInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 320px;
    left: 650px;

    color: ${(props) => (props.isdark ? Yellow : Black)};
    background-color: ${(props) => (props.isdark ? Black : Yellow)};
`;

export const FoyertypeInputContainer = styled.input`
    position: fixed;
    width: 300px;
    height: 25px;
    top: 350px;
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
