import { useRef, useState, ReactNode } from 'react';
import Mapback from '../components/HomePage/Mapback';
import MarketBtn from '../components/HomePage/Markerbtn';
import Backbtn from '../components/HomePage/Backbtn';
import logo from '../assets/logo-128x128.png';
import '../components/HomePage/homepage.css';
import { CSSTransition } from 'react-transition-group';
import TrafficTime from '../components/TrafficTime';
import Title from '../components/HomePage/Title';

interface WIPPageProps {}

/** Landing page of the app */
const WIPPage: React.FC<WIPPageProps> = ({}) => {
    const [onSubMenu, setOnSubMenu] = useState(false);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [toRender, setToRender] = useState<ReactNode | null>(null);

    const handleButtonClick = (lng: number, lat: number, object: any) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: 13,
                essential: true,
                easing: (t) => t,
            });
        }
        setOnSubMenu(true);
        setToRender(object);
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
        setToRender(null);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Mapback mapRef={mapRef} />
            <Title />
            <CSSTransition
                in={!onSubMenu}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <div>
                    {/* <MarketBtn onClick={() => handleButtonClick(4.35, 51.99, <TrafficTime id="trafficTime" isDark={false} trafficTime='00:00' setTrafficTime={handleBackClick}  />)} icon={logo} top={50} left={50} /> */}
                    <MarketBtn
                        onClick={() =>
                            handleButtonClick(
                                4.35,
                                51.99,
                                <TrafficTime
                                    id="trafficTime"
                                    isDark={false}
                                    trafficTime="00:00"
                                    setTrafficTime={handleBackClick}
                                />
                            )
                        }
                        icon={logo}
                        top={50}
                        left={50}
                        title="Scandela"
                        small={false}
                    />
                </div>
            </CSSTransition>
            <CSSTransition
                in={onSubMenu}
                timeout={500}
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
