import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../../colors';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiOutlineSend } from 'react-icons/ai';
import { PiListChecksDuotone } from 'react-icons/pi';

/** Container of the decision pannel and the button */
export const ActionsListContainer = styled.div``;

/** Container for the actions list button **/
export const ActionsListButton = styled(PiListChecksDuotone)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    right: 415px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Yellow
                : Black
            : props.isDark
              ? Black + 'CC'
              : White + 'CC'};
    color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Black
                : White
            : props.isDark
              ? Yellow
              : Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

/** Container of the decision pannel  */
export const ActionsListPanel = styled.div`
    display: flex;
    width: 800px;
    height: 450px;
    border-radius: 10px 10px 10px 10px;
    overflow: hidden;
    font-size: 25px;

    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0);

    position: absolute;
    top: ${(props) => (props.show ? '70%' : '150%')};
    right: 25%;

    transition: all 0.5s ease-in-out;

    transform: translate(0%, -50%);
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

/** Container of the scrollable optimisation container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 1%;
    top: 2%;
    width: 400px;
    height: 380px;
    overflow-y: scroll;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};
`;

/** Container of the scrollable optimisation template */
export const OptimisationTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 370px;
    height: 95px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
    margin: 6px;
    border: 2px solid ${Black};
`;

/** Style of the scrollableoptimisation type text */
export const TypeText = styled.p`
    position: relative;
    top: 8px;
    left: 10px;
    font-size: 18px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
`;

/** Style for the scrollable optimisation location text */
export const LocationText = styled.p`
    position: absolute;
    top: 30px;
    left: 10px;
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
    max-width: 195px;
    overflow-wrap: break-word;
`;

/** Style for the scrollable optimisation description text */
export const DescriptionText = styled.p`
    position: absolute;
    top: 50px;
    left: 10px;
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
    font-style: italic;
    max-width: 195px;
    overflow-wrap: break-word;
`;

/** Container for the solution text **/
export const SolutionTextContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 84px;
    top: 4px;
    right: 45px;
    background-color: rgb(42, 43, 42);
    border-radius: 10px;
`;

/** Style for the scrollable optimisation solution text */
export const SolutionText = styled.p`
    position: relative;
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
    padding: 8px;
    overflow-wrap: break-word;
`;

/** Style of the optimisation type text */
export const CoûtText = styled.p`
    position: absolute;
    top: 30px;
    left: 10px;
    font-size: 18px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
`;

/**  Trash Icon**/
export const TrashIcon = styled(BsFillTrash3Fill)`
    display: flex;
    position: absolute;
    right: 7px;
    top: 6px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

/**  GoTo Icon**/
export const GoToIcon = styled(AiOutlineSend)`
    display: flex;
    position: absolute;
    right: 7px;
    top: 50px;
    color: ${(props) => (props.isDark ? Black : Yellow)};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

/**  Time Icon**/
export const TimeIcon = styled(GiSandsOfTime)`
    display: flex;
    position: relative;
    align-items: center;
    left: 30%;
    top: 30%;
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
`;

/** Container of the total container */
export const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 425px;
    top: 2%;
    width: 350px;
    height: 260px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Black + 'FF'};
`;

/** Style of the total title text */
export const TotalTitleText = styled.p`
    position: relative;
    top: 10px;
    left: 20%;
    font-size: 21px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
`;

/** Container of the gauges container */
export const GaugesContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 425px;
    top: 290px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Black + 'FF'};
`;

export const ValidateButton = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    left: 10%;
    top: 88.5%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.7;
    }
`;

export const PDFButton = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    left: 30%;
    top: 88.5%;
    user-select: none;
    background-color: ${(props) => (props.isDark ? Black : Black)};
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.7;
    }
`;
