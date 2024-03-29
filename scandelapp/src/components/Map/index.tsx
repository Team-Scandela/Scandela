import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Filters } from '../../pages/main';
import { Yellow } from '../../colors';
import LampInfosPopup from '../LampInfosPopup';
import Lasso from '../Lasso';
import { LassoOverlay } from './elements';
import loadMap from './loadMap';
//import TimePicker from '../TimePicker';
import React from 'react';

// Load geographical data of Nantes from a local JSON file
let nantesData = require('../../assets/nantesData.json');

function getRandomColor() {
    const colors = ['#00FF00', '#FFA500', '#FF0000'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

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
    selectedFilter: string;
    searchFilter: string;
}

// Map component
const Map: React.FC<MapProps> = ({
    id,
    filter,
    isDark,
    lat,
    lng,
    zoom,
    selectedFilter,
    searchFilter,
}) => {
    // Reference to the map container element
    const mapContainer = useRef<HTMLDivElement | null>(null);

    // Reference to the Mapbox map object
    const map = useRef<mapboxgl.Map | null>(null);

    // Reference to the Supercluster object
    const cluster = useRef<Supercluster | null>(null);

    // Pour suivre l'ID du lampadaire sélectionné
    const [selectedLampId, setSelectedLampId] = useState<string | null>(null);

    const [cursorStyle, setCursorStyle] = useState('auto');

    const [clickedPoints, setClickedPoints] = useState<mapboxgl.LngLat[]>([]);

    const [selectedLampFeature, setSelectedLampFeature] =
        useState<mapboxgl.MapboxGeoJSONFeature | null>(null);

    const [isLassoActive, setIsLassoActive] = useState(false);

    const [lassoSelectedLamps, setLassoSelectedLamps] = useState([]);

    interface geojson {
        type: string;
        features: feature[];
    }

    interface feature {
        type: string;
        geometry: {
            type: string;
            coordinates: number[];
        };
        properties: {
            id: string;
            name: string;
            lamp: string;
            hat: string;
        };
    }

    const handleLassoActivation = (isActive: boolean) => {
        if (!isActive && lassoSelectedLamps[0]) {
            if (map.current) {
                map.current.setPaintProperty('lamp', 'circle-color', [
                    'match',
                    ['get', 'name'],
                    lassoSelectedLamps,
                    '#FAC710',
                    '#FAC710',
                ]);
            }
        }
        setLassoSelectedLamps([]);
        setIsLassoActive(isActive);
    };

    // Crée les données géoJSON à partir des données de Nantes
    const geojsonData = useMemo(() => {
        let geoJSON = {
            type: 'FeatureCollection',
            features: [] as any[],
        };
        nantesData.forEach((obj: any) => {
            const feature: any = {
                type: 'Feature',
                geometry: {
                    type: obj.geometry.type,
                    coordinates: [
                        obj.geometry.coordinates[0],
                        obj.geometry.coordinates[1],
                    ],
                },
                properties: {
                    id: obj.recordid,
                    name: obj.fields.numero,
                    lamp: obj.fields.type_lampe,
                    hat: obj.fields.type_foyer,
                },
            };
            geoJSON.features.push(feature);
        });
        return geoJSON;
    }, []);

    // Function to handle filter changes
    const handleFilterChange = () => {
        if (map.current) {
            if (filter === 'pin') {
                setLayoutVisibility('visible');
                setLayoutVisibilityFilter('visible');
            }
            if (filter === 'zone') {
                setLayoutVisibility('none');
                setLayoutVisibilityFilter('none');
                setLayoutVisibilityHeat('visible');
            }
            if (filter === 'filter') {
                setLayoutVisibilityHeat('none');
                setLayoutVisibilityFilters('visible');
            }
            if (filter === 'pinColor') {
                setLayoutVisibilityFilters('none');
                setLayoutVisibilityPinColor('visible');
            }
            if (filter === 'traffic') {
                setLayoutVisibilityPinColor('none');
                setLayoutVisibilityTraffic('visible');
            }
            if (filter === 'cabinet') {
                setLayoutVisibilityTraffic('none');
                setLayoutVisibilityCabinet('visible');
            }
        }
    };

    const setLayoutVisibility = (visibility: string) => {
        map.current.setLayoutProperty('cluster-text', 'visibility', visibility);
        map.current.setLayoutProperty('clusters', 'visibility', visibility);
        map.current.setLayoutProperty(
            'cluster-markers',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty(
            'cluster-border',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty('lamp', 'visibility', visibility);
    };

    const setLayoutVisibilityHeat = (visibility: string) => {
        map.current.setLayoutProperty('zone', 'visibility', visibility);
    };

    const setLayoutVisibilityCabinet = (visibility: string) => {
        map.current.setLayoutProperty('cabinet', 'visibility', visibility);
    };

    const setLayoutVisibilityTraffic = (visibility: string) => {
        map.current.setLayoutProperty('traffic', 'visibility', visibility);
    };

    const setLayoutVisibilityPinColor = (visibility: string) => {
        map.current.setLayoutProperty('pinColor', 'visibility', visibility);
    };

    const setLayoutVisibilityFilters = (visibility: string) => {
        map.current.setLayoutProperty('filter', 'visibility', visibility);
    }

    const setLayoutVisibilityFilter = (visibility: string) => {
        map.current.setLayoutProperty(
            'cluster-textFilter',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty(
            'clustersFilter',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty(
            'cluster-markers',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty(
            'cluster-borderFilter',
            'visibility',
            visibility
        );
        map.current.setLayoutProperty('lampFilter', 'visibility', visibility);
    };

    // Initialise la carte
    const initializeMap = (data: any) => {
        console.log('initializeMap before');
        if (!map.current) {
            console.log('initializeMap after');
            cluster.current = new Supercluster({
                radius: 100,
                maxZoom: 17,
            });
            cluster.current.load(data.features);

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: isDark
                    ? 'mapbox://styles/titouantd/cljwv2coy025k01pk785839a1'
                    : 'mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5',
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
        }

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
                    data: data as GeoJSON.FeatureCollection,
                    cluster: true,
                    clusterRadius: 100,
                    clusterMaxZoom: 16,
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

                map.current.setLayoutProperty('clusters', 'visibility', 'none');
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

                // Heatmap Layer toujours optimisable
            map.current.addLayer(
                {
                    id: 'zone',
                    type: 'heatmap',
                    source: 'points',
                    layout: {
                        visibility: 'none',
                    },
                    maxzoom: 23,
                    paint: {
                        'heatmap-weight': {
                            property: 'dbh',
                            type: 'exponential',
                            stops: [
                                [1, 0],
                                [62, 1],
                            ],
                        },
                        'heatmap-intensity': {
                            stops: [
                                [11, 1],
                                [15, 3],
                            ],
                        },
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(236,222,239,0)',
                            0.2,
                            'rgb(3,2,230)',
                            0.4,
                            'rgb(3,230,2)',
                            0.6,
                            'rgb(178,123,130)',
                            0.8,
                            'rgb(234,1,3)',
                        ],
                        'heatmap-radius': {
                            stops: [
                                [11, 15],
                                [15, 20],
                            ],
                        },
                        'heatmap-opacity': {
                            default: 0.6,
                            stops: [
                                [14, 0.2],
                                [15, 0.2],
                            ],
                        },
                    },
                },
                'waterway-label'
            );
            
            //ColoredPin filter
            map.current.addLayer({
                id: 'pinColor',
                type: 'circle',
                source: 'points',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'circle-radius': 6,
                    'circle-color': getRandomColor(),
                    'circle-stroke-color': '#FFFFFF',
                    'circle-stroke-width': 2,
                },
            });
            
            // // Filtre pour les points avec des halos de lumière sur les pins
            map.current.addLayer({
                id: 'filter',
                type: 'circle',
                source: 'points',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'circle-radius': [
                        'case',
                        ['<=', ['get', 'hauteur_support'], 1], 8,
                        ['<=', ['get', 'hauteur_support'], 2], 9,
                        ['<=', ['get', 'hauteur_support'], 3], 10,
                        ['<=', ['get', 'hauteur_support'], 4], 12,
                        14
                    ],
                    'circle-color': '#FAC710',
                    'circle-opacity': [
                        'case',
                        ['<=', ['get', 'hauteur_support'], 1], 0.1,
                        ['<=', ['get', 'hauteur_support'], 2], 0.2,
                        ['<=', ['get', 'hauteur_support'], 3], 0.4,
                        ['<=', ['get', 'hauteur_support'], 4], 0.5,
                        0.55
                    ],
                    'circle-stroke-color': '#FAC710',
                    'circle-stroke-width': 0,
                },
            });
            map.current.loadImage(
                'https://img.icons8.com/?size=256&id=UnYwluJUelEQ&format=png',
                (error, image) => {
                    if (error) throw error;
                    
                    // image de l'éclair
                    map.current.addImage('lightning', image);            
                });
    
                map.current.loadImage(
                    'https://icones.pro/wp-content/uploads/2022/07/symbole-d-eclair-bleu.png',
                    (error, image) => {
                        if (error) throw error;
                        
                        map.current.addImage('lightning2', image);            
                    });
    
                map.current.addLayer({
                    id: 'cabinet',
                    type: 'symbol',
                    source: 'points',
                    layout: {
                        'icon-image': 'lightning',
                        'icon-size': 0.1, // Ajustement de la taille de l'image
                        'visibility': 'none',
                    },
                    paint: {
                        'icon-color': '#FFFF00',
                    },
                });
    
                map.current.on('mouseenter', 'cabinet', () => {
                    map.current.getCanvas().style.cursor = 'pointer';
                });
                
                map.current.on('mouseleave', 'cabinet', () => {
                    map.current.getCanvas().style.cursor = '';
                });
                
                const lightningState: Record<string, boolean> = {};
    
                map.current.on('click', 'cabinet', (event) => {
                    const features = map.current.queryRenderedFeatures(event.point, {
                        layers: ['cabinet'],
                    });
                
                    if (features.length > 0) {
                        const clickedFeature = features[0];
                        const clickedLightningID = clickedFeature.properties.id;
                
                        // Inversement l'état de l'éclair cliqué
                        lightningState[clickedLightningID] = !lightningState[clickedLightningID];
                
                        // Changement de la couleur de l'icône de l'éclair cliqué en bleu ou jaune selon l'état
                        map.current.setPaintProperty('cabinet', 'icon-color', [
                            'case',
                            ['==', ['get', 'id'], clickedLightningID],
                            lightningState[clickedLightningID] ? '#0000FF' : '#FFFF00', // Bleu ou Jaune
                            '#FFFF00', // Jaune (pour les autres éclairs)
                        ]);
                
                        map.current.setLayoutProperty('cabinet', 'icon-image', [
                            'case',
                            ['==', ['get', 'id'], clickedLightningID],
                            lightningState[clickedLightningID] ? 'lightning2' : 'lightning', 
                            'lightning',
                        ]);
    
                        map.current.setLayoutProperty('cabinet', 'icon-size', [
                            'case',
                            ['==', ['get', 'id'], clickedLightningID],
                            lightningState[clickedLightningID] ? 0.05 : 0.1, // Taille différente pour l'éclair sélectionné
                            0.1, // Taille par défaut pour les autres éclairs
                        ]);
    
                        const visibilityState = Object.keys(lightningState).reduce((acc, id) => {
                            acc[id] = lightningState[id] ? 'visible' : 'none';
                            return acc;
                        }, {} as Record<string, string>);
    
                        map.current.setFilter('cabinet', ['in', ['get', 'id'], ...Object.keys(visibilityState)]);
                    }
                });
            }

            if (!map.current?.getSource('mapbox-traffic')) {
                map.current.addSource('mapbox-traffic', {
                    type: 'vector',
                    url: 'mapbox://mapbox.mapbox-traffic-v1',
                });
                map.current.addLayer({
                    id: 'traffic',
                    type: 'line',
                    source: 'mapbox-traffic',
                    'source-layer': 'traffic',
                    layout: {
                        visibility: 'none',
                    },
                    paint: {
                        'line-width': 2,
                        'line-color': [
                            'case',
                            ['==', 'low', ['get', 'congestion']], '#3054A4',
                            ['==', 'moderate', ['get', 'congestion']], '#5474E8',
                            ['==', 'heavy', ['get', 'congestion']], '#C16C9B',
                            ['==', 'severe', ['get', 'congestion']], '#A3577D',
                            '#000000',
                        ],
                    },
                    minzoom: 0,
                });
            }
        });
    };

    const initializeMapFilter = (data: any) => {
        cluster.current = new Supercluster({
            radius: 100,
            maxZoom: 17,
        });
        cluster.current.load(data.features);

        map.current.on('click', 'lampFilter', (e) => {
            const features = map.current?.queryRenderedFeatures(e.point, {
                layers: ['lampFilter'],
            });

            if (features && features.length > 0) {
                const selectedFeature = features[0];
                console.log(selectedFeature);
                setSelectedLampId(selectedFeature.properties.id);

                // Mettre à jour la couleur du lampadaire sélectionné en utilisant un filtre
                map.current?.setPaintProperty('lampFilter', 'circle-color', [
                    'case',
                    ['==', ['get', 'id'], selectedFeature.properties.id],
                    '#000000',
                    '#FAC710',
                ]);
                map.current?.setPaintProperty(
                    'lampFilter',
                    'circle-stroke-color',
                    [
                        'case',
                        ['==', ['get', 'id'], selectedFeature.properties.id],
                        '#FAC710',
                        '#F9F9F9',
                    ]
                );

                // Conserver une référence au lampadaire sélectionné
                setSelectedLampFeature(selectedFeature);
            }
        });

        console.log('load');
        map.current.on('mouseenter', 'lampFilter', () => {
            if (map.current) {
                map.current.getCanvas().style.cursor = 'pointer';
            }
        });

        map.current.on('mouseleave', 'lampFilter', () => {
            if (map.current) {
                map.current.getCanvas().style.cursor = '';
            }
        });

        if (!map.current?.getSource('pointsFilter')) {
            console.log('add source');
            map.current.addSource('pointsFilter', {
                type: 'geojson',
                data: data as GeoJSON.FeatureCollection,
                cluster: true,
                clusterRadius: 100,
                clusterMaxZoom: 16,
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
                id: 'clustersFilter',
                type: 'circle',
                source: 'pointsFilter',
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
                id: 'cluster-borderFilter',
                type: 'circle',
                source: 'pointsFilter',
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
                id: 'lampFilter',
                type: 'circle',
                source: 'pointsFilter',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#FAC710',
                    'circle-stroke-color': '#F9F9F9',
                    'circle-stroke-width': 2,
                },
            });

            map.current.addLayer({
                id: 'cluster-textFilter',
                type: 'symbol',
                source: 'pointsFilter',
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
        }

        setLayoutVisibilityFilter('visible');
    };

    // Initialize the map on the first render
    useEffect(() => {
        initializeMap(geojsonData);
    }, [isDark, lng, lat, zoom]);

    // update the map with the filter filter
    useEffect(() => {
        if (searchFilter == '') {
            return;
        }
        let sortedData: geojson = {
            type: 'FeatureCollection',
            features: [],
        };
        if (selectedFilter === 'Lamp') {
            sortedData.features = geojsonData.features.filter(
                (feature: any) => feature.properties.lamp === searchFilter
            );
        } else if (selectedFilter === 'Hat') {
            sortedData.features = geojsonData.features.filter(
                (feature: any) => feature.properties.hat === searchFilter
            );
        }
        console.log(sortedData);
        if (searchFilter != '') {
            console.log('new data');
            initializeMapFilter(sortedData);
        }
    }, [selectedFilter, searchFilter]);

    const handleLassoValidation = () => {
        const queryString = clickedPoints
            .map(
                (point) =>
                    `coordinate=${point.lat.toFixed(5)},${point.lng.toFixed(5)}`
            )
            .join('&');
        const url = `https://serverdela.onrender.com/lamps/coordinates?${queryString}`;

        const encodedCredentials = btoa('tester:T&st');

        const headers = new Headers({
            Authorization: `Basic ${encodedCredentials}`,
        });

        fetch(url, { method: 'GET', headers: headers })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const lampIds = data.map((lamp: any) => lamp.name);
                setLassoSelectedLamps(lampIds);
                if (map.current) {
                    map.current.setPaintProperty('lamp', 'circle-color', [
                        'match',
                        ['get', 'name'],
                        lampIds,
                        '#48187b',
                        '#FAC710',
                    ]);
                }
            })
            .catch((error) => {
                console.error(
                    'There has been a problem with your fetch operation:',
                    error
                );
            });
    };

    useEffect(() => {
        if (map.current) {
            if (isLassoActive) {
                // Bloquer le zoom et le déplacement
                map.current.scrollZoom.disable();
                map.current.dragPan.disable();
                setCursorStyle('crosshair');

                // Ajouter un gestionnaire de clic sur la carte
                map.current.on('click', (e) => {
                    // Vérifier si le point est à l'intérieur de la carte
                    const isInsideMap = map.current
                        .getBounds()
                        .contains(e.lngLat);

                    if (isInsideMap) {
                        // Ajouter le point aux coordonnées cliquées
                        setClickedPoints((prevPoints) => [
                            ...prevPoints,
                            e.lngLat,
                        ]);
                    }
                });
            } else {
                // Activer le zoom et le déplacement
                map.current.scrollZoom.enable();
                map.current.dragPan.enable();
                setCursorStyle('auto');

                // Effacer les points et le calque quand le lasso n'est pas actif
                if (map.current.getSource('clickedPoints')) {
                    map.current.removeLayer('clickedPointsLayer');
                    if (map.current.getLayer('clickedPolygonLayer'))
                        map.current.removeLayer('clickedPolygonLayer');
                    map.current.removeSource('clickedPolygon');
                    map.current.removeSource('clickedPoints');
                    setClickedPoints([]);
                }
            }
        }
    }, [isLassoActive]);

    useEffect(() => {
        if (map.current) {
            if (isLassoActive) {
                // Supprime les sources et layers si ils existent
                if (map.current.getLayer('clickedPointsLayer'))
                    map.current.removeLayer('clickedPointsLayer');
                if (map.current.getLayer('clickedPolygonLayer'))
                    map.current.removeLayer('clickedPolygonLayer');
                if (map.current.getSource('clickedPolygon'))
                    map.current.removeSource('clickedPolygon');
                if (map.current.getSource('clickedPoints'))
                    map.current.removeSource('clickedPoints');

                // Ajouter le point à la carte
                map.current.addSource('clickedPoints', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: clickedPoints.map((point) => ({
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [point.lng, point.lat],
                            },
                        })),
                    },
                });

                // Créer un polygone à partir des points
                const coordinates = clickedPoints.map((point) => [
                    point.lng,
                    point.lat,
                ]);

                map.current.addSource('clickedPolygon', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Polygon',
                                    coordinates: [coordinates],
                                },
                            },
                        ],
                    },
                });
                if (clickedPoints.length >= 3) {
                    map.current.addLayer({
                        id: 'clickedPolygonLayer',
                        type: 'fill',
                        source: 'clickedPolygon',
                        paint: {
                            'fill-color': '#334dcd',
                            'fill-opacity': 0.3,
                        },
                    });
                }
                map.current.addLayer({
                    id: 'clickedPointsLayer',
                    type: 'circle',
                    source: 'clickedPoints',
                    paint: {
                        'circle-radius': 6,
                        'circle-color': '#151fac',
                        'circle-stroke-color': '#F9F9F9',
                        'circle-stroke-width': 2,
                    },
                });
            }
        }
    }, [clickedPoints, isLassoActive]);

    // Effect to monitor filter changes
    useEffect(() => {
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
                isDark
                    ? 'mapbox://styles/titouantd/cljwv2coy025k01pk785839a1'
                    : 'mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5'
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
                style: isDark
                    ? 'mapbox://styles/titouantd/cljwv2coy025k01pk785839a1'
                    : 'mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5',
                center: [lng, lat],
                zoom: zoom,
            });
        }
    }, [isDark, lng, lat, zoom, geojsonData]);

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
            <Lasso
                id={'LassoComponentId'}
                isDark={isDark}
                onLassoActivation={handleLassoActivation}
                onLassoValidation={handleLassoValidation}
            />
            <LassoOverlay isLassoActive={isLassoActive} />
            <div
                style={{ ...styleMap, cursor: cursorStyle }}
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