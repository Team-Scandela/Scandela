import * as mapboxgl from 'mapbox-gl';
import * as React from 'react'

let nantesData = require('../../assets/nantesData.json');

Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

/** Map of the city
 * @param {boolean} isDark - If the map is in dark mode or not
*/

interface MapProps {
    filter : string,
    isDark: boolean,
    lat: number,
    lng: number,
    zoom: number,
}

const Map: React.FC<MapProps> = ({ filter, isDark, lat, lng, zoom }) => {

    const mapContainer = React.useRef<HTMLDivElement | null>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    //* Transform the data (format json) to geojson */
    const geojsonData = React.useMemo(() => {
        let geoJSON = {
            "type": "FeatureCollection",
            "features": [] as any[]
        };
        nantesData.forEach((obj: any) => {
            const feature = {
                "type": "Feature",
                "geometry": {
                    "type": obj.geometry.type,
                    "coordinates": [obj.geometry.coordinates[0], obj.geometry.coordinates[1]]
                },
                "properties": {
                    "id": obj.fields.numero,
                    "name": obj.fields.type_foyer,
                }
            };
            geoJSON.features.push(feature);
        });
        return geoJSON;
    },[]);


    /** Setup the map and change the style of the map wether is light or dark mode */
    React.useEffect(() => {
        if (map.current) {
            map.current.setStyle(
                isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"
            );
            map.current.flyTo({
                center: [lng, lat],
                zoom: zoom,
                speed: 1.2, // Speed of the animation
                curve: 1.42, // How the zooming is animated (curve factor)
            });

            //* Add the markers through colored pins */
            map.current.on('load', () => {
                map.current.addSource('points', {
                    type: 'geojson',
                    data: geojsonData as GeoJSON.FeatureCollection,
                });
                    map.current.addLayer({
                        'id': 'coloredPin',
                        'type': 'circle',
                        'source': 'points',
                        'layout': {},
                        'paint': {
                            'circle-radius': 6,
                            'circle-color': '#FAC710',
                            'circle-stroke-color': "#F9F9F9",
                            'circle-stroke-width': 2
                        }
                    });
            });

        } else {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
                center: [lng, lat],
                zoom: zoom,
            });
        }
    }, [isDark, lng, lat, zoom]);

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
