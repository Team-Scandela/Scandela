import * as mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import * as React from 'react';

let nantesData = require('../../assets/nantesData.json');

Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

interface MapProps {
    id: string,
    filter: string,
    isDark: boolean,
    lat: number,
    lng: number,
    zoom: number,
}

const Map: React.FC<MapProps> = ({ id, filter, isDark, lat, lng, zoom }) => {
    const mapContainer = React.useRef<HTMLDivElement | null>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);
    const cluster = React.useRef<Supercluster | null>(null);

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

    const initializeMap = () => {
        if (map.current) {
            map.current.setStyle(
                isDark ? "mapbox://styles/titouantd/cljwv2coy025k01pk785839a1" : "mapbox://styles/titouantd/cljwui6ss00ij01pj1oin6oa5"
            );
            map.current.flyTo({
                center: [lng, lat],
                zoom: zoom,
                speed: 5,
                curve: 10,
            });

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
        } else if (!cluster.current) {
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
                map.current.addSource('points', {
                  type: 'geojson',
                  data: geojsonData as GeoJSON.FeatureCollection,
                  cluster: true,
                  clusterRadius: 100,
                  clusterMaxZoom: 17,
                });
              
                map.current.addLayer({
                  'id': 'clusters',
                  'type': 'circle',
                  'source': 'points',
                  'filter': ['has', 'point_count'],
                  'paint': {
                    'circle-radius': 19,
                    'circle-color': '#FAC710',
                  },
                });

                map.current.addLayer({
                    'id': 'cluster-border',
                    'type': 'circle',
                    'source': 'points',
                    'filter': ['has', 'point_count'],
                    'paint': {
                      'circle-radius': 24,  // Légèrement plus grand que la couche principale
                      'circle-color': 'rgba(250, 199, 16, 0.4)', // Jaune avec opacité réduite
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
                
              });              
        }
    };

    React.useEffect(() => {
        initializeMap();
    }, [isDark, lng, lat, zoom]);

    const styleMap = {
        height: "100vh",
        width: "100vw",
    };

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

export default Map;
