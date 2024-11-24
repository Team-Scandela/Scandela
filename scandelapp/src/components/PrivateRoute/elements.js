import styled, { keyframes, css } from 'styled-components';

document.body.style = 'background: #444444;';

const fly = keyframes`
    0% { transform: translate(-300px, 0) rotate(90deg); opacity: 1; }
    10% { transform: translate(100px, -25px) rotate(100deg); opacity: 0.7; }
    25% { transform: translate(300px, -50px) rotate(110deg); opacity: 0.8; }
    35% { transform: translate(550px, -75px) rotate(90deg); opacity: 0.7; }
    50% { transform: translate(700px, -100px) rotate(75deg); opacity: 0.6; }
    65% { transform: translate(850px, -25px) rotate(90deg); opacity: 0.5; }
    75% { transform: translate(1000px, 10px) rotate(100deg); opacity: 0.4; }
    100% { transform: translate(1650px, 0) rotate(90deg); opacity: 0.2; }
`;

export const ErrorContainer = styled.div`
    display: flex;
    position: absolute;
    width: 1750px;
    height: 850px;
    top: 5%;
    left: 5%;
    background-color: #666666;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const Title = styled.h1`
    display: flex;
    position: absolute;
    color: yellow;
    left: 50%;
    top: 40%;
    font-size: 64px;
`;

export const Description = styled.p`
    display: flex;
    position: absolute;
    color: yellow;
    left: 50%;
    top: 50%;
    font-size: 16px;
`;

export const Logo = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
    height: 100px;
    width: 100px;
    animation: ${fly} 5s ease-in-out infinite;

    img {
        width: 100%;
        height: auto;
    }
`;

export const LampPost = styled.div`
    margin-left: -60px;
    transform: translateY(15%);
    cursor: pointer;

    img {
        left: 50%;
        width: 110%;
        height: 110%;
        margin-bottom: 0px;
    }

    ${({ isLampOn }) =>
        isLampOn &&
        css`
            animation: 1.5s infinite alternate;
        `}
`;

export const ReturnButton = styled.button`
    margin-top: 470px;
    margin-left: 260px;
    padding: 50px 128px;
    background-color: rgba(255, 255, 100, 0.5);
    color: black;
    font-size: 26px;
    font-style: bold;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    top: 120px;
    left: 50%;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

    /* Ajout de l'effet aplati en perspective */
    transform: translateX(-50%) perspective(600px) rotateX(60deg) scale(1.2);
    transform-origin: center;

    /* Optionnel : léger ombrage pour un effet posé au sol */
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
`;

export const LightBeamFunnel = styled.div`
    position: absolute;
    pointer-events: none;
    top: ${({ top }) => top || '50%'};
    left: ${({ left }) => left || '50%'};
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 300px 800px 300px;
    border-color: transparent transparent rgba(255, 255, 102, 0.5) transparent;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    animation: 1.5s infinite alternate;
    transform: rotate(-16deg);
`;
