import { useRef, useState } from 'react';
import Mapback from "../components/HomePage/Mapback";
import MarketBtn from "../components/HomePage/Markerbtn";
import Backbtn from '../components/HomePage/Backbtn';
import logo from "../assets/logo-128x128.png";
import "../components/HomePage/homepage.css"
import { CSSTransition } from 'react-transition-group';

interface WIPPageProps {}

/** Landing page of the app */
const WIPPage: React.FC<WIPPageProps> = ({}) => {

    const [onSubMenu, setOnSubMenu] = useState(false);

    const mapRef = useRef<mapboxgl.Map | null>(null);

    const handleButtonClick = (lng : number, lat : number) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: 14,
                essential: true,
                easing: (t) => t,
            });
        }
        setOnSubMenu(true);
    };

    const handleBackClick = () => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [4.335, 51.985],
                zoom: 10,
                essential: true,
                easing: (t) => t,
            });
        }
        setOnSubMenu(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Mapback mapRef={mapRef} />
            <CSSTransition
                in={!onSubMenu}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <MarketBtn onClick={() => handleButtonClick(4.35, 51.99)} icon={logo} top={50} left={50} />
            </CSSTransition>
            <CSSTransition
                in={onSubMenu}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <Backbtn onClick={handleBackClick} />
            </CSSTransition>
        </div>
    );
};


export default WIPPage;
