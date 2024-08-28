import styled from 'styled-components';
import {
    DarkYellow,
    Black,
    White,
    DarkGrey,
    Red,
    Green,
} from '../../../colors';

export const ContentContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 96%;
    height: 94%;
    background-color: ${(props) => (props.isDark ? Black : White)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 3%;
    right: 2%;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
    overflow: hidden;
`;

export const ElectricityPriceDisplay = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 180px;
    border-radius: 7px;
    overflow: hidden;
    font-weight: 600;
    font-family: 'SyneRegular';
`;

/** Input for price limit */
export const PriceLimitInput = styled.input`
    display: flex;
    position: absolute;
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 40%;
    border-radius: 10px;
    top: 250px;
    left: 20%;
    font-family: 'SyneRegular';
`;

export const PriceLimitCreationButton = styled.button`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;
    margin: 8px 0;
    width: 40%;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 250px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? DarkYellow : White)};
        cursor: pointer;
    }
`;

export const PriceLimitContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;
    margin: 8px 0;
    height: 50px;
    width: 40%;
    background-color: ${(props) => (props.isDark ? Green : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 250px;
    left: 20%;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? Green : White)};
        cursor: pointer;
    }
`;

export const PriceLimitValidationButton = styled.button`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;
    margin: 8px 0;
    width: 40%;
    width: 100px;
    height: 40px;
    background-color: ${(props) => (props.isDark ? DarkYellow : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 250px;
    left: 65%;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? DarkYellow : White)};
        cursor: pointer;
    }
`;

export const PriceLimitDeleteButton = styled.button`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100px;
    height: 50px;
    background-color: ${(props) => (props.isDark ? Red : White)};
    color: ${(props) => (props.isDark ? Black : Black)};
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    top: 250px;
    left: 65%;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    font-family: 'SyneRegular';

    &:hover {
        background-color: ${(props) => (props.isDark ? DarkGrey : Black)};
        color: ${(props) => (props.isDark ? Red : White)};
        cursor: pointer;
    }
`;

export const DescriptionText = styled.div`
    display: flex;
    position: absolute;
    top: 65%;
    left: 10%;
    font-size: 16px;
    user-select: none;
    color: ${(props) => (props.isDark ? Black : DarkYellow)};
    font-weight: 700;
    margin-left: 10px;
    margin-right: 40px;
    font-family: 'SyneRegular';
`;
