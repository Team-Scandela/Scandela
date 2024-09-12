import styled from 'styled-components';
import {
    Yellow,
    Black,
    Grey,
    White,
    LightDarkGrey,
} from '../../../colors';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiOutlineSend } from 'react-icons/ai';

/** Container of the scrollable optimisations container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    top: 2%;
    width: 94%;
    height: 50%;
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${Yellow}FF`};

    ::-webkit-scrollbar {
        width: 15px;
        background-color: ${Black};
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${White};
        border-radius: 7px;

        &:hover {
            background-color: ${Yellow};
        }
    }

    ::-webkit-scrollbar-track {
        background-color: ${Black};
        border-radius: 5px;
    }

    @media (max-width: 992px) {
        left: 2%;
        top: 3%;
        width: 90%;
        height: 45%;
    }

    @media (max-width: 768px) {
        left: 1%;
        top: 4%;
        width: 85%;
        height: 40%;
    }

    @media (max-width: 576px) {
        left: 0;
        top: 5%;
        width: 100%;
        height: 35%;
    }
`;

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 510px;
    height: 100px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) =>
        props.isDark ? LightDarkGrey + 'FF' : LightDarkGrey + 'FF'};
    margin: 6px;
    border: 2px solid ${Black};

    @media (max-width: 992px) {
        width: 450px;
        height: 90px;
    }

    @media (max-width: 768px) {
        width: 400px;
        height: 80px;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 70px;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 17px;
    gap: 3px;
    max-width: 280px;

    @media (max-width: 992px) {
        max-width: 240px;
    }

    @media (max-width: 768px) {
        max-width: 200px;
    }

    @media (max-width: 576px) {
        max-width: 90%;
    }
`;

/** Style of the scrollable optimisation type text */
export const TypeText = styled.p`
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 576px) {
        font-size: 10px;
    }
`;

/** Style for the scrollable optimisation location text */
export const LocationText = styled.p`
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 11px;
    }

    @media (max-width: 576px) {
        font-size: 9px;
    }
`;

/** Style for the scrollable optimisation description text */
export const DescriptionText = styled.p`
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    font-style: italic;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 11px;
    }

    @media (max-width: 576px) {
        font-size: 9px;
    }
`;

/** Container for the solution text **/
export const SolutionTextContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 175px;
    height: 89px;
    top: 4px;
    right: 45px;
    background-color: rgb(42, 43, 42);
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 150px;
        height: 75px;
        right: 35px;
        top: 3px;
    }

    @media (max-width: 576px) {
        width: 120px;
        height: 60px;
        right: 25px;
        top: 2px;
    }
`;

/** Style for the scrollable optimisation solution text */
export const SolutionText = styled.p`
    position: relative;
    font-size: 12px;
    user-select: none;
    color: ${Black};
    font-weight: bold;
    padding: 8px;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 6px;
    }

    @media (max-width: 576px) {
        font-size: 8px;
        padding: 4px;
    }
`;

/** Trash Icon **/
export const TrashIcon = styled(BsFillTrash3Fill)`
    position: absolute;
    right: 7px;
    top: 10px;
    color: ${(props) => (props.isDark ? Grey : Yellow)};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        right: 5px;
        top: 8px;
    }

    @media (max-width: 576px) {
        font-size: 18px;
        right: 3px;
        top: 6px;
    }
`;

/** GoTo Icon **/
export const GoToIcon = styled(AiOutlineSend)`
    position: absolute;
    right: 7px;
    bottom: 10px;
    color: ${(props) => (props.isDark ? Grey : Yellow)};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        right: 5px;
        bottom: 8px;
    }

    @media (max-width: 576px) {
        font-size: 18px;
        right: 3px;
        bottom: 6px;
    }
`;

/** Time Icon **/
export const TimeIcon = styled(GiSandsOfTime)`
    display: flex;
    position: relative;
    align-items: center;
    left: 34%;
    top: 27%;
    color: ${(props) => (props.isDark ? Yellow : Yellow)};

    @media (max-width: 768px) {
        font-size: 24px;
        left: 30%;
        top: 25%;
    }

    @media (max-width: 576px) {
        font-size: 20px;
        left: 25%;
        top: 20%;
    }
`;

export const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3%;
    bottom: 2%;
    width: 280px;
    height: 275px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${Black}FF`};

    @media (max-width: 992px) {
        width: 240px;
        height: 240px;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 200px;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 180px;
    }
`;

/** Style of the total title text */
export const TotalTitleText = styled.p`
    position: relative;
    top: 10px;
    left: 15%;
    font-size: 21px;
    user-select: none;
    color: ${Black};
    font-weight: bold;
    font-family: 'SyneRegular';

    @media (max-width: 768px) {
        font-size: 18px;
        left: 10%;
    }

    @media (max-width: 576px) {
        font-size: 16px;
        left: 5%;
    }
`;

/** Container of the gauges container */
export const GaugesContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 3%;
    bottom: 17.5%;
    width: 250px;
    height: 180px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${Black}FF`};

    @media (max-width: 768px) {
        width: 220px;
        height: 150px;
        right: 2%;
        bottom: 15%;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 120px;
        right: 0;
        bottom: 10%;
    }
`;

export const ValidateButton = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 42px;
    right: 3%;
    bottom: 9.75%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Black : Black)};
        color: ${(props) => (props.isDark ? Yellow : Yellow)};
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 40px;
        right: 2%;
        bottom: 8%;
        font-size: 14px;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 35px;
        right: 0;
        bottom: 6%;
        font-size: 12px;
    }
`;

export const PDFButton = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 42px;
    right: 3%;
    bottom: 2%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? Black : Black)};
        color: ${(props) => (props.isDark ? Yellow : Yellow)};
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 40px;
        right: 2%;
        bottom: 1%;
        font-size: 14px;
    }

    @media (max-width: 576px) {
        width: 90%;
        height: 35px;
        right: 0;
        bottom: 0;
        font-size: 12px;
    }
`;
