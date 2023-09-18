import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiOutlineSend } from 'react-icons/ai';

/** Container of the decision pannel and the button */
export const ActionsListContainer = styled.div``;

/** Container for the background of the searchbar **/
export const ActionsListButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    top: 25px;
    left: 1040px;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        font-size: 105%;
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
`;

/** Container of the scrollable optimisation container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 1%;
    top: 2%;
    width: 400px;
    height: 430px;
    overflow-y: scroll;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};
`;

/** Container of the optimisation template */
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

/** Style of the optimisation type text */
export const TypeText = styled.p`
    position: relative;
    top: 8px;
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
    right: 10px;
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
    right: 10px;
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
