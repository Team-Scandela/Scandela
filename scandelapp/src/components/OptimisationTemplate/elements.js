import styled from 'styled-components';
import { Black, Grey, Yellow, Green, Red } from '../../colors';

/** Container of the optimisation template */
export const OptimisationTemplateContainer = styled.div`
    display: flex;
    position: absolute;
    width: 370px;
    min-height: 95px;
    height: 123px;
    left: 0px;
    top: ${(props) => props.y}px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) => (props.isDark ? Grey + 'FF' : Grey + 'FF')};
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
    height: 108px;
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
    justify-content: space-evenly;
    max-width: 200px;
    padding-left: 17px;
    width: 100%; // Utilisez toute la largeur disponible
    height: auto;
`;

/** Style for the optimisation type text */
export const TypeText = styled.p`
    font-size: 15px;
    user-select: none;
    margin: 0px;
    padding: 0px;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: bold;
`;

/** Style for the optimisation location text */
export const LocationText = styled.p`
    font-size: 11px;
    user-select: none;
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
`;

/** Style for the optimisation description text */
export const DescriptionText = styled.p`
    font-size: 12px;
    user-select: none;
    margin: 0px;
    padding: 0px;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
    font-style: italic;
`;

/** Style for the price text */
export const PriceText = styled.p`
    font-size: 13px;
    user-select: none;
    margin: 0px;
    padding: 0px;
    color: ${(props) => (props.isDark ? Black : Black)};
    font-weight: 500;
`;

/** Container for the solution text **/
export const SolutionTextContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 155px;
    height: 110px;
    top: 4px;
    right: 6px;
    background-color: rgb(42, 43, 42);
    border-radius: 10px;
`;

/** Style for the optimisation solution text */
export const SolutionText = styled.p`
    position: relative;
    font-size: 12px;
    user-select: none;
    color: ${(props) => (props.isDark ? Yellow : Black)};
    font-weight: bold;
    padding: 8px;
`;
