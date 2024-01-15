import * as React from 'react';
import LandingPageComponent from '../components/LandingPageComponent';

interface LandingPageProps {
    isPremiumActivated: boolean;
    handleToggleIsPremiumActivated: () => void;
}

/** Landing page of the app */
const LandingPage: React.FC<LandingPageProps> = ({
    isPremiumActivated,
    handleToggleIsPremiumActivated,
}) => {
    return (
        <div
            id={'landingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LandingPageComponent
                isPremiumActivated={isPremiumActivated}
                handleToggleIsPremiumActivated={handleToggleIsPremiumActivated}
            />
        </div>
    );
};

export default LandingPage;
