import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import React, { useState, useEffect } from 'react';
import { Filters } from '../../pages/main';
import loadMap from './loadMap';
import { Yellow } from '../../colors';
import LampInfosPopup from '../LampInfosPopup';

// Load geographical data of Nantes from a local JSON file
let nantesData = require('../../assets/nantesData.json');

// Set Mapbox access token
Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
    'pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ'
);

interface MapProps {
    id: string;
    filter: Filters;
    isDark: boolean;
    lat: number;
    lng: number;
    zoom: number;
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
    const [selectedLampId, setSelectedLampId] = React.useState<string | null>(
        null
    );

    const [circleRadius, setCircleRadius] = useState<number>(0);
    const [circleLayerVisible, setCircleLayerVisible] =
        useState<boolean>(false);

    const [selectedLampFeature, setSelectedLampFeature] =
        React.useState<mapboxgl.MapboxGeoJSONFeature | null>(null);

    const [fetchAsked, setFetchAsked] = React.useState<boolean>(false);

    const [dataLoaded, setDataLoaded] = React.useState<boolean>(false);

    const getLightsData = async () => {
        console.log("asked")
        try {
            const response = await fetch('http://localhost:3001/lamp', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    React.useEffect(() => {
        if (!fetchAsked) {
            const fetchData = async () => {
                try {
                    let geoJSON = {
                        "type": "FeatureCollection",
                        "features": [] as any[]
                    };
                    const jsonData = await getLightsData();
                    console.log(jsonData);
                    jsonData.forEach((obj: any) => {
                        const feature = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [obj.lat, obj.lng]
                            },
                            "properties": {
                                "id": obj.name,
                                "name": obj.foyertype,
                            }
                        };
                        geoJSON.features.push(feature);
                    });
                    initializeMap(geoJSON);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            setFetchAsked(true);
            fetchData();
        }
    }, []);

    const updateCircleRadius = () => {
        if (map.current) {
            let newRadius;
            if (map.current.getZoom() !== 12) {
                switch (map.current.getZoom()) {
                    case 18: // address
                        newRadius = 1;
                        break;
                    case 17: // route
                        newRadius = 250;
                        break;
                    case 14: // nightborhood
                        newRadius = 250;
                        break;
                    default:
                        newRadius = 0;
                }
                setCircleRadius(newRadius);
                setCircleLayerVisible(true);
            } else {
                setCircleLayerVisible(false);
            }
        }
    };

    // Function to handle filter changes
    const handleFilterChange = () => {
        if (map.current) {
            if (filter === 'pin') {
                // Show layers when the filter is "pin"
                map.current.setLayoutProperty(
                    'cluster-text',
                    'visibility',
                    'visible'
                );
                map.current.setLayoutProperty(
                    'clusters',
                    'visibility',
                    'visible'
                );
                map.current.setLayoutProperty(
                    'cluster-markers',
                    'visibility',
                    'visible'
                );
                map.current.setLayoutProperty(
                    'cluster-border',
                    'visibility',
                    'visible'
                );
                map.current.setLayoutProperty('lamp', 'visibility', 'visible');
            } else {
                // Hide layers when the filter is not "pin"
                map.current.setLayoutProperty(
                    'cluster-text',
                    'visibility',
                    'none'
                );
                map.current.setLayoutProperty('clusters', 'visibility', 'none');
                map.current.setLayoutProperty(
                    'cluster-markers',
                    'visibility',
                    'none'
                );
                map.current.setLayoutProperty(
                    'cluster-border',
                    'visibility',
                    'none'
                );
                map.current.setLayoutProperty('lamp', 'visibility', 'none');
            }
        }
    };

    // Initialise la carte
    const initializeMap = (geoJSON : any) => {
        console.log("Tiem to work")
        if (!map.current) {
            cluster.current = new Supercluster({
                radius: 100,
                maxZoom: 17,
            });
            cluster.current.load(geoJSON.features);

            setCircleLayerVisible(false);

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: isDark
                    ? 'mapbox://styles/titouantd/cljwv2coy025k01pk785839a1'
                    : 'mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5',
                center: [lng, lat],
                zoom: zoom,
            });

            map.current.on('move', () => {
                setCircleLayerVisible(false);
            });

            map.current.on('moveend', () => {
                setCircleLayerVisible(true);
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
                    map.current?.setPaintProperty(
                        'lamp',
                        'circle-stroke-color',
                        [
                            'case',
                            [
                                '==',
                                ['get', 'id'],
                                selectedFeature.properties.id,
                            ],
                            '#FAC710',
                            '#F9F9F9',
                        ]
                    );

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
                        data: geoJSON as GeoJSON.FeatureCollection,
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
                        id: 'clusters',
                        type: 'circle',
                        source: 'points',
                        filter: ['has', 'point_count'],
                        paint: {
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
                        id: 'cluster-border',
                        type: 'circle',
                        source: 'points',
                        filter: ['has', 'point_count'],
                        paint: {
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
                        id: 'lamp',
                        type: 'circle',
                        source: 'points',
                        filter: ['!', ['has', 'point_count']],
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#FAC710',
                            'circle-stroke-color': '#F9F9F9',
                            'circle-stroke-width': 2,
                        },
                    });

                    map.current.addLayer({
                        id: 'cluster-text',
                        type: 'symbol',
                        source: 'points',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': '{point_count}',
                            'text-font': ['Open Sans Regular'],
                            'text-size': 13,
                        },
                        paint: {
                            'text-color': '#000000',
                        },
                    });

                    map.current.setLayoutProperty(
                        'clusters',
                        'visibility',
                        'none'
                    );
                    map.current.setLayoutProperty(
                        'cluster-markers',
                        'visibility',
                        'none'
                    );
                    map.current.setLayoutProperty(
                        'cluster-text',
                        'visibility',
                        'none'
                    );
                    map.current.setLayoutProperty(
                        'cluster-border',
                        'visibility',
                        'none'
                    );
                    map.current.setLayoutProperty('lamp', 'visibility', 'none');
                    map.current?.on('zoom', updateCircleRadius);
                }
            });
            setDataLoaded(true);
        }
    };

    // Effect to monitor filter changes
    React.useEffect(() => {
        if (dataLoaded) {
            if (map.current.isStyleLoaded()) {
                handleFilterChange(); // Call the function to handle layer visibility
            } else {
                map.current.on('style.load', () => {
                    handleFilterChange(); // Call the function once the style is loaded
                });
            }
        }
    }, [filter]);

    // Function to filter data based on the filter type
    useEffect(() => {
        if (dataLoaded) {
            if (map.current) {
                map.current.setStyle(
                    isDark
                        ? 'mapbox://styles/mapbox/dark-v11'
                        : 'mapbox://styles/mapbox/light-v11'
                );
                map.current.flyTo({
                    center: [lng, lat],
                    zoom: zoom,
                    speed: 1.2,
                    curve: 1.42,
                });
                setCircleLayerVisible(true);
            } else {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: isDark
                        ? 'mapbox://styles/mapbox/dark-v11'
                        : 'mapbox://styles/mapbox/light-v11',
                    center: [lng, lat],
                    zoom: zoom,
                });
                loadMap(map.current);
            }
        }
    }, [isDark, lng, lat, zoom]);

    const styleMap = {
        height: '100vh',
        width: '100vw',
    };

    // Trouver l'objet correspondant au selectedLampId dans nantesData
    const selectedLampData = nantesData.find(
        (lamp: any) => lamp.fields.numero === selectedLampId
    );

    // Extraire les informations à afficher
    const address = selectedLampData ? selectedLampData.fields.nom_voie : '';
    const typeLampe = selectedLampData
        ? selectedLampData.fields.designation
        : '';
    const typeFoyer = selectedLampData
        ? selectedLampData.fields.type_foyer
        : '';
    const hauteur = selectedLampData
        ? selectedLampData.fields.hauteur_support
        : '';

    // Render the map component
    return (
        <div id={id} style={{ overflow: 'hidden' }}>
            <div
                style={styleMap}
                ref={mapContainer}
                className="map-container"
            />
            <style>
                {`.mapboxgl-ctrl-logo {
                    display: none;
                }
                .mapboxgl-ctrl-attrib-inner {
                display: none;
                }`}
            </style>
            {circleLayerVisible && circleRadius > 0 && (
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
            {selectedLampId && (
                <LampInfosPopup
                    id={'LampInfosPopupComponentId'}
                    isDark={isDark}
                    selectedLampId={selectedLampId}
                    address={address}
                    typeLampe={typeLampe}
                    typeFoyer={typeFoyer}
                    hauteur={hauteur}
                    onClosePopup={() => {
                        setSelectedLampId(null);

                        // Rétablir la couleur du lampadaire précédemment sélectionné
                        if (selectedLampFeature) {
                            map.current?.setPaintProperty(
                                'lamp',
                                'circle-color',
                                '#FAC710'
                            );
                            map.current?.setPaintProperty(
                                'lamp',
                                'circle-stroke-color',
                                '#F9F9F9'
                            );
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