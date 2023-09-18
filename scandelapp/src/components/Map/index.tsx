import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import React, { useState, useEffect } from 'react';
import { Filters } from '../../pages/main'
import loadMap from './loadMap';
import LampInfosPopup from '../LampInfosPopup';


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

    // Pour suivre l'ID du lampadaire sélectionné
    const [selectedLampId, setSelectedLampId] = React.useState<string | null>(null);

    const [selectedLampFeature, setSelectedLampFeature] = React.useState<mapboxgl.MapboxGeoJSONFeature | null>(null);

    // Crée les données géoJSON à partir des données de Nantes
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

    // Function to handle filter changes
    const handleFilterChange = () => {
        if (map.current) {
            if (filter === 'pin') {
                // Show layers when the filter is "pin"
                map.current.setLayoutProperty('cluster-text', 'visibility', 'visible');
                map.current.setLayoutProperty('clusters', 'visibility', 'visible');
                map.current.setLayoutProperty('cluster-markers', 'visibility', 'visible');
                map.current.setLayoutProperty('cluster-border', 'visibility', 'visible');
                map.current.setLayoutProperty('lamp', 'visibility', 'visible');
            } else {
                // Hide layers when the filter is not "pin"
                map.current.setLayoutProperty('cluster-text', 'visibility', 'none');
                map.current.setLayoutProperty('clusters', 'visibility', 'none');
                map.current.setLayoutProperty('cluster-markers', 'visibility', 'none');
                map.current.setLayoutProperty('cluster-border', 'visibility', 'none');
                map.current.setLayoutProperty('lamp', 'visibility', 'none');
            }
        }
    };


// Initialise la carte
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

        map.current.on('click', 'lamp', (e) => {
            const features = map.current?.queryRenderedFeatures(e.point, {
                layers: ['lamp'],
            });
        
            if (features && features.length > 0) {
                const selectedFeature = features[0];
                setSelectedLampId(selectedFeature.properties.id);
        
                // Mettre à jour la couleur du lampadaire sélectionné en utilisant un filtre
                map.current?.setPaintProperty('lamp', 'circle-color', [
                    'case',
                    ['==', ['get', 'id'], selectedFeature.properties.id],
                    '#000000',
                    '#FAC710',
                ]);
                map.current?.setPaintProperty('lamp', 'circle-stroke-color', [
                    'case',
                    ['==', ['get', 'id'], selectedFeature.properties.id],
                    '#FAC710',
                    '#F9F9F9',
                ]);
        
                // Conserver une référence au lampadaire sélectionné
                setSelectedLampFeature(selectedFeature);
            }
        });                       

        map.current.on('load', () => {
            map.current.on('mouseenter', 'lamp', () => {
            if (map.current) {
                map.current.getCanvas().style.cursor = 'pointer';
            }
            });
            
            map.current.on('mouseleave', 'lamp', () => {
            if (map.current) {
                map.current.getCanvas().style.cursor = '';
            }
            });

            if (!map.current?.getSource('points')) {
                map.current.addSource('points', {
                    type: 'geojson',
                    data: geojsonData as GeoJSON.FeatureCollection,
                    cluster: true,
                    clusterRadius: 100,
                    clusterMaxZoom: 17,
                });

                // Définit les couleurs en format RGBA avec une opacité de 0.6
                const greenRGBA = 'rgba(0, 128, 0, 0.6)';
                const yellowRGBA = 'rgba(255, 255, 0, 0.6)';
                const orangeRGBA = 'rgba(255, 165, 0, 0.6)';

                // Définit les couleurs de la bordure en format RGBA avec une opacité de 0.3
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
                            greenRGBA, // Couleur verte
                            19,
                            yellowRGBA, // Couleur jaune
                            100,
                            orangeRGBA, // Couleur orange
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
                            greenBorderRGBA, // Couleur de bordure verte
                            19,
                            yellowBorderRGBA, // Couleur de bordure jaune
                            100,
                            orangeBorderRGBA, // Couleur de bordure orange
                        ],
                    },
                });

                map.current.addLayer({
                    'id': 'lamp',
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
                map.current.setLayoutProperty('lamp', 'visibility', 'none');
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
        console.log("filter = " + filter);
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
            {selectedLampId && (
                <LampInfosPopup
                id={"LampInfosPopupComponentId"}
                isDark={isDark}
                selectedLampId={selectedLampId}
                onClosePopup={() => {
                    setSelectedLampId(null);
                    
                    // Rétablir la couleur du lampadaire précédemment sélectionné
                    if (selectedLampFeature) {
                        map.current?.setPaintProperty('lamp', 'circle-color', '#FAC710');
                        map.current?.setPaintProperty('lamp', 'circle-stroke-color', '#F9F9F9');
                        setSelectedLampFeature(null);
                    }
                }}
                selectedLampFeature={selectedLampFeature} // Passer l'état du lampadaire sélectionné
              />
            )}
        </div>
    );
};

export default Map;
