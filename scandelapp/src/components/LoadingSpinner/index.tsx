import React from 'react';
import { SpinnerContainer } from './element';

const logoPath = require('../../assets/logo-128x128-yellow.png');

const LoadingSpinner: React.FC = () => {
    return (
        <SpinnerContainer>
            <img src={logoPath} alt="Logo" width="100" height="auto" />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
