import LandingPageComponent from '../components/LandingPageComponent';

interface LandingPageProps {
    userInfo: any;
    updateUserInfo: (newInfo: any) => void;
}

/** Landing page of the app */
const LandingPage: React.FC<LandingPageProps> = ({
    userInfo,
    updateUserInfo,
}) => {
    return (
        <div
            id={'landingPage'}
            style={{ backgroundColor: '#2A2B2A', height: '100vh' }}
        >
            <LandingPageComponent
                userInfo={userInfo}
                updateUserInfo={updateUserInfo}
            />
        </div>
    );
};

export default LandingPage;
