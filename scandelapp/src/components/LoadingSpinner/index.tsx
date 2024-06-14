import React from 'react';
import { SpinnerContainer } from './element';

const logoPath = require('../../assets/logo-128x128-yellow.png');

interface LoadingSpinnerProps {
    width?: number | string;
    height?: number | string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    width = 100,
    height = 'auto',
}) => {
    return (
        <SpinnerContainer>
            <img src={logoPath} alt="Logo" width={width} height={height} />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
