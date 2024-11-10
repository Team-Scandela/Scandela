import { useState } from 'react';
import {
    ErrorContainer,
    Title,
    Description,
    Logo,
    LampPost,
    ReturnButton,
    LightBeamFunnel,
} from './elements';

const logoPath = require('../../assets/logo-128x128-yellow.png');
const lampPostImage = require('../../assets/errorPage/lamp.png');

const ErrorPage: React.FC = () => {
    const [isLampOn, setIsLampOn] = useState(false);

    const toggleLamp = () => {
        setIsLampOn(!isLampOn);
    };

    return (
        <ErrorContainer>
            <Title>404 - Page Not Found</Title>
            <Description>
                The page you are looking for does not exist.
            </Description>
            <Logo>
                <img src={logoPath} alt="Logo" />
            </Logo>
            <LampPost onClick={toggleLamp} isLampOn={isLampOn}>
                <img src={lampPostImage} alt="Lamp Post" />
                <ReturnButton
                    isVisible={isLampOn}
                    onClick={() => (window.location.href = '/')}
                >
                    Acceuil
                </ReturnButton>
            </LampPost>
            {isLampOn && <LightBeamFunnel top="30%" left="18%" />}
        </ErrorContainer>
    );
};

export default ErrorPage;
