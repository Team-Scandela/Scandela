import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import { useState, useEffect, useRef, useMemo } from 'react';
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
    isLassoActive,
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
                // Show layers when the filter is "pin"
                setLayoutVisibility('visible');

                setLayoutVisibilityFilter('none');
            } else if (filter === ('filter' as Filters)) {
                setLayoutVisibility('none');
                // Show layers when the filter is "pin"
            } else {
                // Hide layers when the filter is not "pin"
                setLayoutVisibility('none');

                setLayoutVisibilityFilter('none');
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
