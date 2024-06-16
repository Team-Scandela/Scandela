import LandingPageComponent from '../components/LandingPageComponent';

/**
 * Props for the LandingPage component.
 * @interface LandingPageProps
 */
interface LandingPageProps {}

/**
 * Landing page component of the application.
 * 
 * @component
 * @param {LandingPageProps} props - Props for LandingPage component.
 * @returns {JSX.Element} The LandingPage component.
 */
const LandingPage: React.FC<LandingPageProps> = ({}) => {
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
