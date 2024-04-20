import styled from 'styled-components';
import { White, Black, Grey, Yellow, DarkGrey} from '../../colors';

export const OfferCardsContainer = styled.div`
    display: flex;
    flex-direction: line;
    align-items: center;
    justify-content: center;
    padding: 50px;
    border-radius: 10px;
    gap : 50px;
    background-color: ${White};
`;

export const OfferCard = styled.div`
    padding: 20px;
    background-color: ${props => (props.alt ? Black : White)};
    border-radius: 10px;
    transition: 0.3s;
    height: 660px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 500px;
    margin : 20px 0;
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

export const OfferTitle = styled.h3`
    font-size: 54px;
    color: ${props => (!props.alt ? Black : Yellow)};
`;

export const OfferSubtitle = styled.h4`
    font-size: 35px;
    color: ${props => (!props.alt ? Grey : Grey)};
`;

export const OfferText = styled.p`
    font-size: 20px;
    padding-top: 20px;
    color: ${props => (!props.alt ? DarkGrey : Grey)};
`;

export const OfferButton = styled.button`
    font-size: 20px;
    margin-top: 20px;
    color: ${Black};
    background-color: ${Yellow};
    border: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: ${White};
    }
`;

export const OfferItem = styled.div`
    display: flex;
    flex-direction: line;
    padding-top: 20px;
    border-radius: 10px;
    transition: 0.3s;
    width: 100%;
    text-align: center;
    gap : 10px;
    color: ${props => (!props.alt ? DarkGrey : Grey)};
    font-size: 18px;
`;