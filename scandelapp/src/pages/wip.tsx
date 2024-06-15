import { useRef } from 'react';
import Mapback from "../components/HomePage/Mapback";
import MarketBtn from "../components/HomePage/Markerbtn";

interface WIPPageProps {}

/** Landing page of the app */
const WIPPage: React.FC<WIPPageProps> = ({}) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const handleButtonClick = () => {
        console.log('Button clicked');

        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [4.35, 51.99],
                zoom: 15,
                essential: true
            });
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Mapback mapRef={mapRef} />
            {/* <MarketBtn onClick={handleButtonClick} /> */}
        </div>
    );
};

export default WIPPage;
