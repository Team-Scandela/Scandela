import styled from 'styled-components';
import { Yellow, Black, Grey, White, LightDarkGrey } from '../../../colors';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiOutlineSend } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiExternalLinkLine } from 'react-icons/ri';
import { IoIosLink } from 'react-icons/io';

/** Container of the scrollable optimisation container */
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
        props.isDark ? Black + 'FF' : Yellow + 'FF'};

    ::-webkit-scrollbar {
        width: 15px;
        size: 5px;
        background-color: ${Black};
        margin-right: 0px;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${White};
        border-radius: 7px;
        margin-right: 20px;

        &:hover {
            background-color: ${Yellow};
        }
    }

    ::-webkit-scrollbar-track {
        width: 10px;
        background-color: ${Black};
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 2px;
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
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 17px;
    padding-top: 9px;
    gap: 3px;
    max-width: 280px;
`;

/** Style of the scrollableoptimisation type text */
export const TypeText = styled.p`
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
`;

/** Style for the scrollable optimisation location text */
export const LocationText = styled.p`
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
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
`;

/** Style for the scrollable optimisation solution text */
export const SolutionText = styled.p`
    position: relative;
    font-size: 12px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
    padding: 8px;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
`;

/**  Trash Icon**/
export const TrashIcon = styled(BsFillTrash3Fill)`
    display: flex;
    position: absolute;
    right: 7px;
    top: 10px;
    color: ${(props) => (props.isDark ? Grey : Yellow)};
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
    bottom: 10px;
    color: ${(props) => (props.isDark ? Grey : Yellow)};
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
    left: 34%;
    top: 27%;
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
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
        props.isDark ? Black + 'FF' : Black + 'FF'};
`;

/** Style of the total title text */
export const TotalTitleText = styled.p`
    position: relative;
    top: 10px;
    left: 15%;
    font-size: 21px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
    font-family: 'SyneRegular';
`;

/** Container of the gauges container */
export const GaugesContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 3%;
    bottom: 25.5%;
    width: 250px;
    height: 130px;
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
`;

export const ToDoButton = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 42px;
    right: 3%;
    bottom: 17.5%;
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
`;

export const PUpToDoContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: ${Black + 'CC'};
    z-index: 9999999999;
`;

export const PUpToDo = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 200px;
    background-color: ${Black};
    border-radius: 5px;
    border-color: ${Yellow};
    border-width: 2px;
    border-style: solid;
    transform: translate(-50%, -50%);
`;

export const PUpToDoClose = styled(AiFillCloseCircle)`
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    color: ${Yellow};
    cursor: pointer;
    font-size: 30px;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${Yellow + 'CC'};
    }
`;

export const PUpToDoTitle = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
    font-size: 20px;
    color: ${Yellow};
    font-weight: bold;
    font-family: 'SyneRegular';
    align-content: center;
    justify-content: center;
    text-align: center;
    width: 100%;
`;

export const PUpToDoLinkIcon = styled(IoIosLink)`
    display: flex;
    position: absolute;
    left: 100px;
    top: 90px;
    font-size: 50px;
    color: ${Black};
    cursor: pointer;
    background-color: ${Yellow};
    border-radius: 10%;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${Yellow + 'CC'};
    }
`;

export const PUpToDoLinkSubtitle = styled.div`
    display: flex;
    position: absolute;
    left: 125px;
    top: 150px;
    transform: translateX(-50%);
    font-size: 15px;
    color: ${Yellow};
    font-family: 'SyneRegular';
    align-content: center;
    justify-content: center;
    text-align: center;
`;

export const PUpToDoOpen = styled(RiExternalLinkLine)`
    display: flex;
    position: absolute;
    right: 100px;
    top: 90px;
    font-size: 50px;
    color: ${Black};
    cursor: pointer;
    background-color: ${Yellow};
    border-radius: 10%;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${Yellow + 'CC'};
    }
`;

export const PUpToDoOpenSubtitle = styled.div`
    display: flex;
    position: absolute;
    right: 125px;
    top: 150px;
    transform: translateX(50%);
    font-size: 15px;
    color: ${Yellow};
    font-family: 'SyneRegular';
    align-content: center;
    justify-content: center;
    text-align: center;
`;
