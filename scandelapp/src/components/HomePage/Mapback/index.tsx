import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MarkerData } from '../../../pages/wip';
import './marker.css'

interface MapbackProps {
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
    data : MarkerData[];
    setOnSubMenu : (value: boolean) => void;
    setToRender : (value: React.ReactNode | null) => void;
}

/** Landing page of the app */
const Mapback: React.FC<MapbackProps> = ({ mapRef, data, setOnSubMenu, setToRender }) => {
    const styleUrl = 'mapbox://styles/titouantd/clxemflo1002f01qq5rrk3206';
    const accessToken =
        'pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ';
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

            const flyToMarker = (lat : number, lng : number, object : React.ReactNode) => {
                setOnSubMenu(true);
                setToRender(object);
                map.flyTo({
                    center: [lng + 0.03, lat],
                    zoom: 14,
                    essential: true,
                    easing: (t) => t,
                });
            };


            data.forEach((marker, index) => {
                const markerElement = document.createElement('div');
                markerElement.className = 'marker';
                markerElement.dataset.markerIndex = index.toString();
                markerElement.addEventListener('click', () => flyToMarker(marker.lat, marker.lng, marker.object));

                new mapboxgl.Marker({ element: markerElement })
                    .setLngLat([marker.lng, marker.lat])
                    .addTo(map);
            });

            mapRef.current = map;

            return () => {
                map.remove();
                mapRef.current = null;
            };
        }
    }, [mapRef, data]);

    return (
        <div
            ref={mapContainerRef}
            id="map"
            style={{ width: '100%', height: '100vh', zIndex: 0}}
        >
            <style>
                {`.mapboxgl-ctrl-logo {
                    display: none !important;
                }
                .mapboxgl-ctrl-attrib-inner {
                display: none;
                }
                .mapboxgl-canvas {
                    cursor: default !important;
                }`}
            </style>
        </div>
    );
};

export default Mapback;
