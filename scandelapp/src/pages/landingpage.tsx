import * as React from 'react';
import LandingPageComponent from '../components/LandingPageComponent';

/** Landing page of the app */
const LandingPage: React.FC = () => {
    return (
        <div
            id={'landingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LandingPageComponent />
        </div>
    );
};

export default LandingPage;
