import styled from 'styled-components'

export const FilterMenuButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #2A2B2A;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    color : #FAC710;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    bottom: 20px;
    left: 20px;
`;

export const FilterMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    justify-content: center;
    align-items: center;
    width: ${props => props.show ? '300px' : '0px'};
    height: ${props => props.show ? '40px' : '0px'};
    background-color: #2A2B2A;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    font-size: 25px;

    color : #FAC710;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    position: fixed;
    bottom: 20px;
    left: 80px;
`;


