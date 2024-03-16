import LandingPageComponent from '../components/LandingPageComponent';

interface LandingPageProps {
}

/** Landing page of the app */
const LandingPage: React.FC<LandingPageProps> = ({
}) => {
    return (
        <div
            id={'landingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LandingPageComponent
            />
        </div>
    );
};

export default LandingPage;
