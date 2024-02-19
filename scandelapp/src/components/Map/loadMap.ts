import mapboxgl, { LngLatLike } from 'mapbox-gl';

// Fonction qui renvoie une couleur aléatoire entre vert, orange et rouge pour l'affichage des pins colorés
// Todo : changer la couleur des pins en fonction de la qualité de l'éclairage
function getRandomColor() {
    const colors = ['#00FF00', '#FFA500', '#FF0000'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Fonction qui récupère les données de magnitude des séismes et gère la taille des cercles en fonction de la magnitude
async function fetchEarthquakeData(): Promise<any> {
    try {
        const response = await fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson');

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        throw error;
    }
}

// Utilisation de la fonction pour récupérer les données
fetchEarthquakeData()
    .then((earthquakeData) => {
        earthquakeData.features.forEach((earthquake: any) => {
            const mag = earthquake.properties.mag;
        });
        // Log des données pour confirmer qu'elles sont correctes
        console.log(earthquakeData);
    })
    .catch((error) => {
        // Gestion de l'erreur
    });

type Coordinates = [number, number];

async function fetchRealTimeTrafficData(): Promise<any> {
    const accessToken = 'pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ';

    try {
        const response = await fetch(`https://api.mapbox.com/mapbox/driving-traffic/v1/mapbox/driving-traffic/v1/?access_token=${accessToken}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch real-time traffic data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching real-time traffic data:', error);
        throw error;
    }
}

function filterTrafficDataForFrance(trafficData: any): any {
    // Filtrer les données pour obtenir seulement celles qui sont en France (approximativement)
    const franceBounds = [
        [-5.559374, 41.333740], // Sud-ouest de la France
        [9.561567, 51.124214],  // Nord-est de la France
    ];

    const filteredFeatures = trafficData.features.filter((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        return (
            coordinates[0] >= franceBounds[0][0] &&
            coordinates[0] <= franceBounds[1][0] &&
            coordinates[1] >= franceBounds[0][1] &&
            coordinates[1] <= franceBounds[1][1]
        );
    });

    return {
        type: 'FeatureCollection',
        features: filteredFeatures,
        bbox: franceBounds.flat(),
    };
}

const lightningYellow = 'src/assets/eclairJaune.png';

async function fetchLightningData(): Promise<any> {
    try {
        const response = await fetch('../assets/armoireElec.json');

        if (!response.ok) {
            throw new Error(`Failed to fetch lightning data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching lightning data:', error);
        throw error;
    }
}

export default async function loadMap(map: mapboxgl.Map | undefined) {
    if (!map) return;

        map.on('load', async () => {
            map.addSource('zone', {
                type: 'geojson',
                data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            });

            // Heatmap Layer toujours optimisable
            map.addLayer(
                {
                    id: 'zone',
                    type: 'heatmap',
                    source: 'zone',
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
            
            // ColoredPin filter
            map.addLayer({
                id: 'pinColor',
                type: 'circle',
                source: 'zone',
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
            
            // Second layer - Security layer
            // map.addLayer({
            //     id: 'pin',
            //     type: 'circle',
            //     source: 'zone',
            //     layout: {
            //         visibility: 'none',
            //     },
            //     paint: {
            //         'circle-radius': 6,
            //         'circle-color': '#FFD700',
            //         'circle-stroke-color': '#FFFFFF',
            //         'circle-stroke-width': 2,
            //     },
            // });
            
            // Filtre pour les points avec des halos de lumière sur les pins
            map.addLayer({
                id: 'filter',
                type: 'circle',
                source: 'zone',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'circle-radius': [
                        'case',
                        ['<=', ['get', 'mag'], 1], 8,
                        ['<=', ['get', 'mag'], 2], 9,
                        ['<=', ['get', 'mag'], 3], 10,
                        ['<=', ['get', 'mag'], 4], 12,
                        14
                    ],
                    'circle-color': '#FAC710',
                    'circle-opacity': [
                        'case',
                        ['<=', ['get', 'mag'], 1], 0.1,
                        ['<=', ['get', 'mag'], 2], 0.2,
                        ['<=', ['get', 'mag'], 3], 0.4,
                        ['<=', ['get', 'mag'], 4], 0.5,
                        0.55
                    ],
                    'circle-stroke-color': '#FAC710',
                    'circle-stroke-width': 0,
                },
            });

            // Ajouter la source de trafic
            map.addSource('mapbox-traffic', {
                type: 'vector',
                url: 'mapbox://mapbox.mapbox-traffic-v1',
            });

            // Ajouter la couche de trafic
            map.addLayer({
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

            map.addSource('lightning', {
                type: 'geojson',
                data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            });    

            map.loadImage(
            'https://img.icons8.com/?size=256&id=UnYwluJUelEQ&format=png',
            (error, image) => {
                if (error) throw error;
                
                // image de l'éclair
                map.addImage('lightning', image);            
            });

            map.loadImage(
                'https://icones.pro/wp-content/uploads/2022/07/symbole-d-eclair-bleu.png',
                (error, image) => {
                    if (error) throw error;
                    
                    map.addImage('lightning2', image);            
                });

            map.addLayer({
                id: 'cabinet',
                type: 'symbol',
                source: 'lightning',
                layout: {
                    'icon-image': 'lightning',
                    'icon-size': 0.1, // Ajustement de la taille de l'image
                    'visibility': 'none',
                },
                paint: {
                    'icon-color': '#FFFF00',
                },
            });

            map.on('mouseenter', 'cabinet', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            
            map.on('mouseleave', 'cabinet', () => {
                map.getCanvas().style.cursor = '';
            });
            
            const lightningState: Record<string, boolean> = {};

            map.on('click', 'cabinet', (event) => {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: ['cabinet'],
                });
            
                if (features.length > 0) {
                    const clickedFeature = features[0];
                    const clickedLightningID = clickedFeature.properties.id;
            
                    // Inversement l'état de l'éclair cliqué
                    lightningState[clickedLightningID] = !lightningState[clickedLightningID];
            
                    // Changement de la couleur de l'icône de l'éclair cliqué en bleu ou jaune selon l'état
                    map.setPaintProperty('cabinet', 'icon-color', [
                        'case',
                        ['==', ['get', 'id'], clickedLightningID],
                        lightningState[clickedLightningID] ? '#0000FF' : '#FFFF00', // Bleu ou Jaune
                        '#FFFF00', // Jaune (pour les autres éclairs)
                    ]);
            
                    map.setLayoutProperty('cabinet', 'icon-image', [
                        'case',
                        ['==', ['get', 'id'], clickedLightningID],
                        lightningState[clickedLightningID] ? 'lightning2' : 'lightning', 
                        'lightning',
                    ]);
            
                    map.setLayoutProperty('cabinet', 'icon-size', [
                        'case',
                        ['==', ['get', 'id'], clickedLightningID],
                        lightningState[clickedLightningID] ? 0.05 : 0.1, // Taille différente pour l'éclair sélectionné
                        0.1, // Taille par défaut pour les autres éclairs
                    ]);
            
                    // const visibilityState = Object.keys(lightningState).reduce((acc, id) => {
                    //     acc[id] = lightningState[id] ? 'visible' : 'none';
                    //     return acc;
                    // }, {} as Record<string, string>);
            
                    // map.setFilter('cabinet', ['in', ['get', 'id'], ...Object.keys(visibilityState)]);
                }
            });
    });
}


// eclair svg (jaune): https://icones8.fr/icon/UnYwluJUelEQ/%C3%A9clair
// eclair svg (bleu): https://icones8.fr/icon/UnYwluJUelEQ/%C3%A9clair