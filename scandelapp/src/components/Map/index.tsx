import * as mapboxgl from 'mapbox-gl';
import * as React from 'react'
import { Filters } from '../../pages/main'
import loadMap from './loadMap';

let nantesData = require('../../assets/nantesData.json');

Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

interface MapProps {
    id : string,
    filter : Filters,
    isDark: boolean,
    lat: number,
    lng: number,
    zoom: number,
}

const Map: React.FC<MapProps> = ({ id, filter, isDark, lat, lng, zoom }) => {

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
                isDark ? "mapbox://styles/titouantd/cljwv2coy025k01pk785839a1" : "mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5"
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
                style: isDark ? "mapbox://styles/titouantd/cljwv2coy025k01pk785839a1" : "mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5",
                center: [lng, lat],
                zoom: zoom,
            });

        }
    },[isDark, lng, lat, zoom, geojsonData]);

  // Fonction qui permet de filtrer les données en fonction du type de filtre
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
        loadMap(map.current);
    }
    }, [isDark, lng, lat, zoom, geojsonData]);

    React.useEffect(() => {
        for (const value in Filters) {
            if (map.current.getLayer(value)) {
                map.current.setLayoutProperty(value, 'visibility', 'none');
        }
    }
        if (map.current.getLayer(filter)) {
            map.current.setLayoutProperty(filter, 'visibility', 'visible');
    }
    console.log(filter);
    }, [filter]);

    const styleMap = {
        height: "100vh",
        width: "100vw",
    }

    return (
        <div id={id} style={{overflow: "hidden"}}>
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