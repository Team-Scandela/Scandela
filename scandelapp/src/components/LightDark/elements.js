import styled from 'styled-components'

export const LightDarkButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    background-color: ${props => props.isDark ? '#2A2B2A' : '#F9F9F9'};
    color : ${props => props.isDark ? '#FAC710' : '#2A2B2A'};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    top: 30px;
    left: 330px;
`;