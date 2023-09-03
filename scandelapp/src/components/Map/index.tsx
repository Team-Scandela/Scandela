import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import * as React from 'react';

// Charge les données géographiques de Nantes depuis un fichier JSON local
let nantesData = require('../../assets/nantesData.json');

// Définit la clé d'accès Mapbox
Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

// Interface pour les propriétés de la carte
interface MapProps {
    id: string,
    filter: string,
    isDark: boolean,
    lat: number,
    lng: number,
    zoom: number,
}

// Composant de la carte
const Map: React.FC<MapProps> = ({ id, filter, isDark, lat, lng, zoom }) => {
    // Référence à l'élément de conteneur de la carte
    const mapContainer = React.useRef<HTMLDivElement | null>(null);
    
    // Référence à l'objet carte Mapbox
    const map = React.useRef<mapboxgl.Map | null>(null);
    
    // Référence à l'objet Supercluster
    const cluster = React.useRef<Supercluster | null>(null);

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

            map.current.on('load', () => {
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
                }
            });
        }
    };

    // Initialise la carte lors de la première rendu
    React.useEffect(() => {
        initializeMap();
    }, [isDark, lng, lat, zoom]);

    // Style de la carte
    const styleMap = {
        height: "100vh",
        width: "100vw",
    };

    // Rendu du composant de la carte
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
        </div>
    );
};

// Exporte le composant de la carte par défaut
export default Map;
