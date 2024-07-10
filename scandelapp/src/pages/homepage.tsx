import { useRef, useState } from 'react';
import Mapback from '../components/HomePage/Mapback';
import '../components/HomePage/homepage.css';
import { CSSTransition } from 'react-transition-group';
import Title from '../components/HomePage/Title';
import ToMainApp from '../components/HomePage/ToMainApp';
import logo from '../assets/logo-128x128.png';
import faq from '../assets/homepage/faq.png';
import profil from '../assets/homepage/profil.png';
import premium from '../assets/homepage/premium.png';
import stats from '../assets/homepage/stats.png';
import tickets from '../assets/homepage/tickets.png';
import Tickets from '../components/HomePage/Tickets';
import Profil from '../components/HomePage/Profil';
import Premium from '../components/HomePage/Premium';
import FAQ from '../components/HomePage/FAQ';


export interface MarkerData {
    id: string;
    lng: number;
    lat: number;
    icon: string;
    title: string;
    small: boolean;
}

const dataMarker: MarkerData[] = [
    {
        id : "scandela",
        lng: 4.37,
        lat: 51.99,
        icon: logo,
        title: "Dashboard",
        small: false,
    },
    {
        id : "tickets",
        lng: 4.149,
        lat: 52.018,
        icon: tickets,
        title: "Tickets",
        small: true,
    },
    {
        id : "premium",
        lng: 4.519,
        lat: 52.045,
        icon: premium,
        title: "Premium",
        small: true,
    },
    {
        id : "profil",
        lng: 4.324,
        lat: 52.068,
        icon: profil,
        title: "Profil",
        small: true,
    },
    {
        id : "faq",
        lng: 4.167,
        lat: 51.902,
        icon: faq,
        title: "FAQ",
        small: true,
    },
    {
        id : "stats",
        lng: 4.430,
        lat: 51.900,
        icon: stats,
        title: "Statistiques",
        small: true,
    },
];

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
    const [onSubMenu, setOnSubMenu] = useState(false);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [toRender, setToRender] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("Scandela");

    const handleBackClick = () => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [4.335, 51.985],
                zoom: 10.5,
                essential: true,
                easing: (t) => t,
            });
        }

        setOnSubMenu(false);
        setToRender(null);
    };

    const whatToRender = (id: string) :  React.ReactNode | null => {
        switch (id) {
            case "scandela":
                return <ToMainApp closeToMainApp={handleBackClick} />;
            case "tickets":
                return <Tickets closeToMainApp={handleBackClick} />;
            case "premium":
                return <Premium closeToMainApp={handleBackClick} />;
            case "profil":
                return <Profil closeToMainApp={handleBackClick} />;
            case "faq":
                return <FAQ closeToMainApp={handleBackClick} />;
            case "stats":
                return <ToMainApp closeToMainApp={handleBackClick} />;
            default:
                return null;
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <Mapback mapRef={mapRef} data={dataMarker} setOnSubMenu={setOnSubMenu} setToRender={setToRender} />
            <Title title={title} />
            <CSSTransition
                in={onSubMenu}
                timeout={2000}
                classNames="fade"
                unmountOnExit
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {whatToRender(toRender)}
                </div>
            </CSSTransition>
        </div>
    );
};

export default HomePage;
