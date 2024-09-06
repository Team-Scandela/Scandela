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
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
import { PiListChecksDuotone } from 'react-icons/pi';

/** Container of the decision panel and the button */
export const ActionsListContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
`;

/** Container for the actions list button **/
export const ActionsListButton = styled(PiListChecksDuotone)`
    display: flex;
    position: absolute;
    width: 50px;
    height: 40px;
    top: 25px;
    right: 10px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isOn
            ? props.isDark
                ? Yellow
                : Black
            : props.isDark
            ? `${Black}CC`
            : `${White}CC`};
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

/** Container of the decision panel  */
export const ActionsListPanel = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1250px;
    height: 260px;
    border-radius: 10px;
    font-size: 25px;
    background-color: ${Yellow};
    color: ${Black};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0);

    position: absolute;
    top: ${(props) => (props.show ? '85%' : '150%')};
    right: 28%;

    transition: all 0.5s ease-in-out;

    transform: translate(0%, -50%);
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;
=======
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js

/** Container of the scrollable optimisations container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 200px;
=======
    position: absolute;
    left: 3%;
    top: 2%;
    width: 94%;
    height: 50%;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${Yellow}FF`};

<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    /* Custom scrollbar style */
    ::-webkit-scrollbar {
        width: 10px;
        background-color: ${Black};
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${Grey};
        border-radius: 5px;
=======
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
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    }

    ::-webkit-scrollbar-track {
        background-color: ${Black};
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
=======
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 2px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    }
`;

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
    display: flex;
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    position: relative;
    width: 100%;
    max-width: 770px;
    height: 120px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Grey}FF` : `${Grey}FF`};
=======
    position: absolute;
    width: 510px;
    height: 100px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) =>
        props.isDark ? LightDarkGrey + 'FF' : LightDarkGrey + 'FF'};
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    margin: 6px;
    border: 2px solid ${Black};
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    justify-content: space-evenly;
    width: 100%;
=======
    padding-left: 17px;
    gap: 3px;
    max-width: 280px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
`;

/** Style of the scrollable optimisation type text */
export const TypeText = styled.p`
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    font-size: 15px;
    line-height: normal;
    padding: 0;
    margin: 0;
    font-weight: bold;
    color: ${Black};
=======
    font-size: 14px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
`;

/** Style for the scrollable optimisation location text */
export const LocationText = styled.p`
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    font-size: 14px;
    line-height: normal;
    padding: 0;
    margin: 0;
    font-weight: 600;
    color: ${Black};
=======
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
`;

/** Style for the scrollable optimisation description text */
export const DescriptionText = styled.p`
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    font-size: 14px;
    line-height: normal;
    padding: 0;
    margin: 0;
    font-style: italic;
    font-weight: 600;
    color: ${Black};
`;

/** Style for the price text */
export const PriceText = styled.p`
    font-size: 14px;
    line-height: normal;
    padding: 0;
    margin: 0;
    font-weight: 600;
    color: ${Black};
=======
    font-size: 13px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    font-style: italic;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
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
    color: ${Black};
    font-weight: bold;
    padding: 8px;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
`;

/**  Trash Icon**/
export const TrashIcon = styled(BsFillTrash3Fill)`
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
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    position: absolute;
    left: 30%;
    top: 30%;
=======
    display: flex;
    position: relative;
    align-items: center;
    left: 34%;
    top: 27%;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    color: ${(props) => (props.isDark ? Yellow : Yellow)};
`;

export const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    left: 825px;
    top: 5px;
    width: 420px;
    height: 100px;
    max-height: 110px;
    overflow-y: auto;
=======
    left: 3%;
    bottom: 2%;
    width: 280px;
    height: 275px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? `${Black}FF` : `${Black}FF`};
`;

/** Style of the total title text */
export const TotalTitleText = styled.p`
    position: relative;
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    align-items: center;
    top: 5px;
    left: 145px;
    font-size: 15px;
    text-decoration: underline;
=======
    top: 10px;
    left: 15%;
    font-size: 21px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
    user-select: none;
    color: ${Black};
    font-weight: bold;
    font-family: 'SyneRegular';
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
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    background-color: ${Black};
    color: ${Yellow};
    border-radius: 10px;
=======
    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    border-radius: 5px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
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
<<<<<<< HEAD:scandelapp/src/components/TopRightButtonsPannel/ActionsList/elements.js
    background-color: ${Black};
    color: ${Yellow};
    border-radius: 10px;
=======
    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    border-radius: 5px;
>>>>>>> master:scandelapp/src/components/DecisionMenu/ActionsListTab/elements.js
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
