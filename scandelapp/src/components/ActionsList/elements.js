import styled from 'styled-components';
import { Yellow, Black, White, Grey } from '../../colors';
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
    left: 1190px;
    user-select: none;
    opacity: 0.9;
    background-color: ${(props) =>
        props.isDark ? Black + 'CC' : White + 'CC'};
    color: ${(props) => (props.isDark ? Yellow : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

/** Container of the decision pannel  */
export const ActionsListPanel = styled.div`
    display: flex;
    flex-wrap: wrap; /* Ensure items wrap to the next line if there's not enough space */
    width: 1250px;
    height: 210px; /* Limit height to prevent overflowing */
    border-radius: 10px;
    font-size: 25px;

    background-color: ${(props) => (props.isDark ? Yellow : Yellow)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0);

    position: absolute;
    top: ${(props) => (props.show ? '85%' : '150%')};
    right: 28%;

    transition: all 0.5s ease-in-out;

    transform: translate(0%, -50%);
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

/** Container of the scrollable optimisation container */
export const ScrollableOptimisationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 5px;
    top: 5px;
    width: 800px;
    height: 200px;
    overflow-y: auto;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Yellow + 'FF'};

        /* Personnalisez le style de la barre de défilement */
        ::-webkit-scrollbar {
            width: 10px; 
            size: 5px;
            background-color: ${Black}; 
            margin-right: 5px; 
            border-radius: 5px; 
        }
    
        ::-webkit-scrollbar-thumb {
            background-color: ${Grey}; 
            border-radius: 5px; 
            margin-top: 20px; 
        }
    
        ::-webkit-scrollbar-track {
            width: 10px; 
            background-color: ${Black};
            border-radius: 5px; 
            margin-right: 5px; 
            margin-top: 5px; 
            margin-bottom: 5px;
        }
`;

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 98%;
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

export const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 825px;
    top: 5px;
    width: 420px;
    max-height: 100px; /* Définissez une hauteur maximale de 100 pixels */
    overflow-y: auto; /* Activez le défilement vertical si le contenu dépasse la hauteur maximale */
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Black + 'FF'};
`;

/** Style of the total title text */
export const TotalTitleText = styled.p`
    position: relative;
    align-items: center;
    top: 5px;
    left: 145px; /* Ajustez la marge par rapport au bord gauche */
    font-size: 15px;
    text-decoration: underline;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
`;

/** Container of the gauges container */
export const GaugesContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 825px;
    top: 110px;
    width: 420px;
    height: 95px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDark ? Black + 'FF' : Black + 'FF'};
`;
