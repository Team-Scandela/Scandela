import styled from 'styled-components';
import { Black, Grey, Yellow, Green, Red, LightDarkGrey } from '../../colors';

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
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.isDark ? Yellow : Black)};
    }
`;

export const SelectionIndicator = styled.div`
    display: flex;
    position: absolute;
    width: 6px;
    height: 85px;
    top: 5px;
    left: 5px;
    user-select: none;
    background-color: ${(props) =>
        props.isDark && props.checked
            ? Green + 'FF'
            : props.isDark && !props.checked
              ? Red + 'FF'
              : !props.isDark && props.checked
                ? Green + 'FF'
                : Red + 'FF'};
    border-radius: 10px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 17px;
    padding-top: 6px;
    gap: 3px;
    max-width: 320px;
`;

/** Style for the optimisation type text */
export const TypeText = styled.p`
    font-size: 15px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
`;

/** Style for the optimisation location text */
export const LocationText = styled.p`
    font-size: 11px;
    user-select: none;
    color: ${(props) => (props.isDark ? Grey : Grey)};
    font-weight: 500;
    overflow-wrap: break-word;
    font-family: 'SyneRegular';
`;

/** Style for the optimisation description text */
export const DescriptionText = styled.p`
    font-size: 12px;
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
    right: 6px;
    background-color: rgb(42, 43, 42);
    border-radius: 10px;
`;

/** Style for the optimisation solution text */
export const SolutionText = styled.p`
    position: relative;
    font-size: 11px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
`;

// Création de l'élément coûtText
export const CoûtText = styled.p`
    position: absolute;
    font-size: 12px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
    top: 60px;
    right: 50px;
`;