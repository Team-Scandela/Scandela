import { useRef, useState, useEffect } from 'react';
import Mapback from '../components/HomePage/Mapback';
import Backbtn from '../components/HomePage/Backbtn';
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


export interface MarkerData {
    lng: number;
    lat: number;
    object: React.ReactNode;
    icon: string;
    title: string;
    small: boolean;
}

const dataMarker: MarkerData[] = [
    {
        lng: 4.37,
        lat: 51.99,
        object: <ToMainApp />,
        icon: logo,
        title: "Scandela",
        small: false,
    },
    {
        lng: 4.149,
        lat: 52.018,
        object: <ToMainApp />,
        icon: tickets,
        title: "Tickets",
        small: true,
    },
    {
        lng: 4.519,
        lat: 52.045,
        object: <ToMainApp />,
        icon: premium,
        title: "Premium",
        small: true,
    },
    {
        lng: 4.324,
        lat: 52.068,
        object: <ToMainApp />,
        icon: profil,
        title: "Profil",
        small: true,
    },
    {
        lng: 4.167,
        lat: 51.902,
        object: <ToMainApp />,
        icon: faq,
        title: "FAQ",
        small: true,
    },
    {
        lng: 4.430,
        lat: 51.890,
        object: <ToMainApp />,
        icon: stats,
        title: "Statistiques",
        small: true,
    },
];

interface WIPPageProps {}

const WIPPage: React.FC<WIPPageProps> = () => {
    const [onSubMenu, setOnSubMenu] = useState(false);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [toRender, setToRender] = useState<React.ReactNode | null>(null);
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
        setTitle("Scandela");
    };

    return (
        <div style={{ position: 'relative' }}>
            <Mapback mapRef={mapRef} data={dataMarker} setOnSubMenu={setOnSubMenu} setToRender={setToRender} setTitle={setTitle} />
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
                    <Backbtn onClick={handleBackClick} />
                    {toRender}
                </div>
            </CSSTransition>
        </div>
    );
};

export default WIPPage;
