import * as mapboxgl from 'mapbox-gl';
import * as React from 'react'
import { Filters } from '../../pages/main'
import loadMap from './loadMap';

let data = require('../../assets/nantesData.json');

Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ");

interface MapProps {
  filter: Filters,
  isDark: boolean
}

const Map: React.FC<MapProps> = ({ filter, isDark }) => {

  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const lng = -1.553621;
  const lat = 47.21;
  const zoom = 13;

  // Conversion des JSON en geoJSON
  const geojsonData = React.useMemo(() => {
    let geoJSON = {
      "type": "FeatureCollection",
      "features": [] as any[]
  };
    data.forEach((obj: any) => {
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
  },[])

  // Fonction qui permet de filtrer les données en fonction du type de filtre
  React.useEffect(() => {
    if (map.current) {
      map.current.setStyle(
        isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"
      );
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

  React.useEffect(() => {
    for (const value in Filters) {
      if (map.current.getLayer(value)) {
        map.current.setLayoutProperty(value, 'visibility', 'none');
      }
    }
    if (map.current.getLayer(filter)) {
      map.current.setLayoutProperty(filter, 'visibility', 'visible');
    }
    console.log(filter);
  }, [filter]);

  return (
    <div style={{overflow: "hidden"}}>
      <div style={{ height: "100vh", width: "100vw" }} ref={mapContainer} className="map-container" />
      <style>
        {`.mapboxgl-ctrl-logo {
            display: none;
          }
          .mapboxgl-ctrl-attrib-inner {
            display: none;
          }`}
      </style>
    </div>
  )
}

export default Map       