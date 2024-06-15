import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapbackProps {
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
}

/** Landing page of the app */
const Mapback: React.FC<MapbackProps> = ({ mapRef }) => {
    const styleUrl = 'mapbox://styles/titouantd/clxemflo1002f01qq5rrk3206';
    const accessToken = 'pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ';
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: styleUrl,
                center: [4.335, 51.985],
                zoom: 10,
                scrollZoom: false,
                dragPan: false,
                dragRotate: false,
                keyboard: false,
                doubleClickZoom: false,
            });

            mapRef.current = map; // Assign the map instance to the provided ref

            // Cleanup function
            return () => {
                map.remove();
                mapRef.current = null; // Clear the ref when component unmounts
            };
        }
    }, [mapRef]);

    return (
        <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '100vh', zIndex: 0 }}>
            <style>
                {`.mapboxgl-ctrl-logo {
                    display: none !important;
                }
                .mapboxgl-ctrl-attrib-inner {
                display: none;
                }`}
            </style>
        </div>
    );
};

export default Mapback;
