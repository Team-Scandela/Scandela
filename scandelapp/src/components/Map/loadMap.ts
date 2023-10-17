// fonction qui prend une couleur random entre vert orange rouge, pour l'affichage des coloredPin
// Todo : changer la couleur des pins en fonction de la qualité de l'éclairage
function getRandomColor() {
    const colors = ['#00FF00', '#FFA500', '#FF0000'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export default function loadMap(map: mapboxgl.Map | undefined) {
    if (!map) return;
    map.on('load', () => {
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
        map.addLayer({
            id: 'pin',
            type: 'circle',
            source: 'zone',
            layout: {
                visibility: 'none',
            },
            paint: {
                'circle-radius': 6,
                'circle-color': '#FFD700',
                'circle-stroke-color': '#FFFFFF',
                'circle-stroke-width': 2,
            },
        });
        // pas encore bon
        // map.on('click', 'circle-layer', (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        //     const coordinates = event.features![0].geometry.coordinates.slice();
        //     const properties = event.features![0].properties as {
        //     color: string;
        //     quality: number;
        //     passage: number;
        //     danger: number;
        //     };

        // const popupContent = `
        // <h3>Informations</h3>
        // <h4 style="color: ${properties.color};">Indice de Sécurité</h4>
        // <p>Qualité: ${properties.quality}%</p>
        // <p>Passage: ${properties.passage}%</p>
        // <p>Danger: ${properties.danger}%</p>
        // `;

        // new mapboxgl.Popup()
        // .setLngLat([47.21 ,-1.553621])
        // .setHTML(popupContent)
        // .addTo(map!);
        // });
    });
}
