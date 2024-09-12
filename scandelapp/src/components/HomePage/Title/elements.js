import styled from 'styled-components';

export const TitleContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1200px) {
        top: 15px;
        left: 15px;
    }

    @media (max-width: 768px) {
        top: 10px;
        left: 10px;
    }

    @media (max-width: 480px) {
        top: 5px;
        left: 5px;
    }
`;

export const TitleText = styled.div`
    font-size: 50px;
    color: white;
    font-weight: bold;
    text-align: center;
    font-family: 'SyneRegular';
    user-select: none;

    @media (max-width: 1200px) {
        font-size: 40px;
    }

    @media (max-width: 768px) {
        font-size: 30px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

export const TitleLogo = styled.img`
    width: 100px;
    height: 100px;
    margin: 30px;
    user-select: none;

    @media (max-width: 1200px) {
        width: 80px;
        height: 80px;
        margin: 20px;
    }

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        margin: 15px;
    }

    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        margin: 10px;
    }
`;
