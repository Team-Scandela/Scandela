import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import React, { useState, useEffect } from 'react';
import { Filters } from '../../pages/main';
import { Yellow } from '../../colors';
import LampInfosPopup from '../LampInfosPopup';
import { LassoOverlay } from './elements';

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
    isLassoActive: boolean;
}

// Map component
const Map: React.FC<MapProps> = ({
    id,
    filter,
    isDark,
    lat,
    lng,
    zoom,
    isLassoActive,
}) => {
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

    const [cursorStyle, setCursorStyle] = useState('auto');

    const [clickedPoints, setClickedPoints] = useState<mapboxgl.LngLat[]>([]);

    const [circleRadius, setCircleRadius] = useState<number>(0);
    const [circleLayerVisible, setCircleLayerVisible] =
        useState<boolean>(false);

    const [selectedLampFeature, setSelectedLampFeature] =
        React.useState<mapboxgl.MapboxGeoJSONFeature | null>(null);

    const [fetchAsked, setFetchAsked] = React.useState<boolean>(false);

    const [geojsonData, setGeojsonData] = React.useState<GeoJSON.FeatureCollection>({
        "type": "FeatureCollection",
        "features": [] as GeoJSON.Feature[]
    });

    let nantesData = require('../../assets/nantesData.json');

    const [dataLoaded, setDataLoaded] = React.useState<boolean>(false);

    const geojsonDataRaw = React.useMemo(() => {
        let geoJSON = {
            type: 'FeatureCollection',
            features: [] as any[],
        };
        nantesData.forEach((obj: any) => {
            const feature = {
                type: 'Feature',
                geometry: {
                    type: obj.geometry.type,
                    coordinates: [
                        obj.geometry.coordinates[0],
                        obj.geometry.coordinates[1],
                    ],
                },
                properties: {
                    id: obj.fields.numero,
                    name: obj.fields.type_foyer,
                },
            };
            geoJSON.features.push(feature);
        });
        return geoJSON;
    }, []);

    const getLightsData = async () => {
        console.log("asked")
        try {
            const response = await fetch('http://db.scandela.fr/lamp', {
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
                    let geoJSON : GeoJSON.FeatureCollection = {
                        "type": "FeatureCollection",
                        "features": [] as GeoJSON.Feature[]
                    };
                    const jsonData = await getLightsData();
                    console.log("data collect by the fetch ")
                    console.log(jsonData);
                    jsonData.forEach((obj: any) => {
                        const feature : GeoJSON.Feature = {
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
                    console.log("let geojson ");
                    console.log(geoJSON);
                    setGeojsonData(geoJSON);
                    console.log("geojsondata ")
                    console.log(geojsonData);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            setFetchAsked(true);
            fetchData();
        }
    }, []);

    React.useEffect(() => {
        console.log("geojsondata updated:", geojsonData);
        if (geojsonData.features.length > 0) {
            setDataLoaded(true);
            initializeMap();
        }
    }, [geojsonData]);

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
    const initializeMap = () => {
        console.log("init")
        console.log(geojsonData)
        if (!map.current) {
            cluster.current = new Supercluster({
                radius: 100,
                maxZoom: 17,
            });
            cluster.current.load(
                geojsonDataRaw.features.map((feature) => ({
                    type: 'Feature',
                    properties: feature.properties,
                    geometry: {
                        type: 'Point',
                        coordinates: (feature.geometry as any).coordinates,
                    },
                }))
            );

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
                console.log("load")
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
                        data: geojsonDataRaw as GeoJSON.FeatureCollection,
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
        }
    };

    // Initialize the map on the first render
    React.useEffect(() => {
        //initializeMap();
    }, [isDark, lng, lat, zoom]);

     // Use effect for the lasso
    React.useEffect(() => {
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

    // Use effect for the lasso
    React.useEffect(() => {
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
                        'circle-color': '#8CC63F',
                        'circle-stroke-color': '#F9F9F9',
                        'circle-stroke-width': 2,
                    },
                });
            }
        }
    }, [clickedPoints, isLassoActive]);

    // Use effect to monitor filter changes
    React.useEffect(() => {
        console.log("update for filter")
        if (map.current) {
            if (map.current.isStyleLoaded()) {
                handleFilterChange(); // Call the function to handle layer visibility
            } else {
                map.current.on('style.load', () => {
                    handleFilterChange(); // Call the function once the style is loaded
                });
            }
        }
    }, [filter]);

    // Use effect for black mode and search
    React.useEffect(() => {
        if (map.current) {
            console.log("update for black and search")
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
            setCircleLayerVisible(true);
        }// } else {
        //     map.current = new mapboxgl.Map({
        //         container: mapContainer.current,
        //         style: isDark
        //             ? 'mapbox://styles/titouantd/cljwv2coy025k01pk785839a1'
        //             : 'mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5',
        //         center: [lng, lat],
        //         zoom: zoom,
        //     });
        // }
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