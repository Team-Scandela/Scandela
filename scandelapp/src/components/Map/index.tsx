import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import React, { useState, useEffect } from 'react';
import { Filters } from '../../pages/main'
import loadMap from './loadMap';
import { Yellow } from '../../colors';

// Load geographical data of Nantes from a local JSON file
let nantesData = require('../../assets/nantesData.json');

// Set Mapbox access token
Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

interface MapProps {
    id : string,
    filter : Filters,
    isDark: boolean,
    lat: number,
    lng: number,
    zoom: number,
}

// Map component
const Map: React.FC<MapProps> = ({ id, filter, isDark, lat, lng, zoom }) => {
    // Reference to the map container element
    const mapContainer = React.useRef<HTMLDivElement | null>(null);

    // Reference to the Mapbox map object
    const map = React.useRef<mapboxgl.Map | null>(null);

    // Reference to the Supercluster object
    const cluster = React.useRef<Supercluster | null>(null);

    // Create GeoJSON data from Nantes data
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
    }, []);

    const [circleRadius, setCircleRadius] = useState<number>(280);

    const updateCircleRadius = () => {
        if (map.current) {
            let newRadius;

            switch (map.current.getZoom()) {
                case 17:
                    newRadius = 2;
                    break;
                case 14:
                    newRadius = 150;
                    break;
                case 12:
                    newRadius = 280;
                    break;
                case 5:
                    newRadius = 280;
                    break;
                default:
                    newRadius = 0;
            }
    
            setCircleRadius(newRadius);
        }
    };

    // Function to handle filter changes
    const handleFilterChange = () => {
        if (map.current) {
            if (filter === 'pin') {
                // Show layers when the filter is "pin"
                map.current.setLayoutProperty('cluster-text', 'visibility', 'visible');
                map.current.setLayoutProperty('clusters', 'visibility', 'visible');
                map.current.setLayoutProperty('cluster-markers', 'visibility', 'visible');
                map.current.setLayoutProperty('cluster-border', 'visibility', 'visible');
            } else {
                // Hide layers when the filter is not "pin"
                map.current.setLayoutProperty('cluster-text', 'visibility', 'none');
                map.current.setLayoutProperty('clusters', 'visibility', 'none');
                map.current.setLayoutProperty('cluster-markers', 'visibility', 'none');
                map.current.setLayoutProperty('cluster-border', 'visibility', 'none');
            }
        }
    };

    // Initialize the map
    const initializeMap = () => {
        if (!map.current) {
            cluster.current = new Supercluster({
                radius: 100,
                maxZoom: 17,
            });
            cluster.current.load(geojsonData.features);

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: isDark ? "mapbox://styles/titouantd/cljwv2coy025k01pk785839a1" : "mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5",
                center: [lng, lat],
                zoom: zoom,
            });

            map.current.on('load', () => {
                if (!map.current?.getSource('points')) {
                    map.current.addSource('points', {
                        type: 'geojson',
                        data: geojsonData as GeoJSON.FeatureCollection,
                        cluster: true,
                        clusterRadius: 100,
                        clusterMaxZoom: 17,
                    });

                    // Define colors in RGBA format with 0.6 opacity
                    const greenRGBA = 'rgba(0, 128, 0, 0.6)';
                    const yellowRGBA = 'rgba(255, 255, 0, 0.6)';
                    const orangeRGBA = 'rgba(255, 165, 0, 0.6)';

                    // Define border colors in RGBA format with 0.3 opacity
                    const greenBorderRGBA = 'rgba(0, 128, 0, 0.3)';
                    const yellowBorderRGBA = 'rgba(255, 255, 0, 0.3)';
                    const orangeBorderRGBA = 'rgba(255, 165, 0, 0.3)';

                    map.current.addLayer({
                        'id': 'clusters',
                        'type': 'circle',
                        'source': 'points',
                        'filter': ['has', 'point_count'],
                        'paint': {
                            'circle-radius': 19,
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                greenRGBA, // Green color
                                19,
                                yellowRGBA, // Yellow color
                                100,
                                orangeRGBA, // Orange color
                            ],
                        },
                    });

                    map.current.addLayer({
                        'id': 'cluster-border',
                        'type': 'circle',
                        'source': 'points',
                        'filter': ['has', 'point_count'],
                        'paint': {
                            'circle-radius': 24,
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                greenBorderRGBA, // Green border color
                                19,
                                yellowBorderRGBA, // Yellow border color
                                100,
                                orangeBorderRGBA, // Orange border color
                            ],
                        },
                    });

                    map.current.addLayer({
                        'id': 'cluster-markers',
                        'type': 'circle',
                        'source': 'points',
                        'filter': ['!', ['has', 'point_count']],
                        'paint': {
                            'circle-radius': 6,
                            'circle-color': '#FAC710',
                            'circle-stroke-color': "#F9F9F9",
                            'circle-stroke-width': 2,
                        },
                    });

                    map.current.addLayer({
                        'id': 'cluster-text',
                        'type': 'symbol',
                        'source': 'points',
                        'filter': ['has', 'point_count'],
                        'layout': {
                            'text-field': '{point_count}',
                            'text-font': ['Open Sans Regular'],
                            'text-size': 13,
                        },
                        'paint': {
                            'text-color': '#000000',
                        },
                    });

                    map.current.setLayoutProperty('clusters', 'visibility', 'none');
                    map.current.setLayoutProperty('cluster-markers', 'visibility', 'none');
                    map.current.setLayoutProperty('cluster-text', 'visibility', 'none');
                    map.current.setLayoutProperty('cluster-border', 'visibility', 'none');

                    map.current?.on('zoom', updateCircleRadius);
                }
            });
        }
    };

    // Initialize the map on the first render
    React.useEffect(() => {
        initializeMap();
    }, [isDark, lng, lat, zoom]);

    // Effect to monitor filter changes
    React.useEffect(() => {
        if (map.current.isStyleLoaded()) {
            handleFilterChange(); // Call the function to handle layer visibility
        } else {
            map.current.on('style.load', () => {
                handleFilterChange(); // Call the function once the style is loaded
            });
        }
    }, [filter]);

    // Function to filter data based on the filter type
    useEffect(() => {
        if (map.current) {
            map.current.setStyle(
                isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"
            );
            map.current.flyTo({
                center: [lng, lat],
                zoom: zoom,
                speed: 1.2,
                curve: 1.42,
            });
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

    const styleMap = {
        height: "100vh",
        width: "100vw",
    };

    // Render the map component
    return (
        <div id={id} style={{ overflow: "hidden" }}>
            <div style={styleMap} ref={mapContainer} className="map-container" />
            <style>
                {`.mapboxgl-ctrl-logo {
                    display: none;
                }
                .mapboxgl-ctrl-attrib-inner {
                display: none;
                }`}
            </style>
            {lat && lng && (
            <div
                className="red-circle"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: circleRadius * 2,
                    height: circleRadius * 2,
                    borderRadius: '50%',
                    border: `1px dashed ${Yellow}`,
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
        )}
        </div>
    );
};

export default Map;
