import React from 'react';
import { LoadingOverlay, LogoContainer } from './element';

const logoPath = require('../../assets/logo-128x128-yellow.png');

const LoadingPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <LoadingOverlay>
                    <LogoContainer>
                        <img
                            src={logoPath}
                            alt="Logo"
                            width="100"
                            height="100"
                        />
                    </LogoContainer>
                </LoadingOverlay>
            )}
        </>
    );
};

export default LoadingPage;
