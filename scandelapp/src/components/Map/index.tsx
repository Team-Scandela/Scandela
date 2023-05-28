import * as mapboxgl from 'mapbox-gl';
import * as React from 'react'

Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

/** Map of the city
 * @param {boolean} isDark - If the map is in dark mode or not
*/

interface MapProps {
    filter : string,
    isDark: boolean,
    lat: number,
    lng: number,
}

const Map: React.FC<MapProps> = ({ filter, isDark, lat, lng }) => {

    const mapContainer = React.useRef(null);
    const map = React.useRef(null);
    const [zoom, setZoom] = React.useState(13);

    /** Setup the map and change the style of the map wether is light or dark mode */
    React.useEffect(() => {
        if (map.current) {
            map.current.setStyle(
                isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"
        );
        } else {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
                center: [lng, lat],
                zoom: zoom,
            });
        }
    }, [isDark]);

    /** Set the map to take the entire screen */
    const styleMap = {
        height: "100vh",
        width: "100vw",
    }

    return (
        <div style={{overflow: "hidden"}}>
            <div style={styleMap} ref={mapContainer} className="map-container" />
            <style>
                {`.mapboxgl-ctrl-logo {
                    display: none;
                }
                .mapboxgl-ctrl-attrib-inner {
                display: none;
                }`}
            </style>
        </div>
    )
}

export default Map
