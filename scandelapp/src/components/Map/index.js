import mapboxgl from 'mapbox-gl';
import React, { useRef, useState, useEffect } from 'react'

mapboxgl.accessToken = "pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ"

/** Map of the city
 * @param {boolean} isDark - If the map is in dark mode or not
*/
const Map = ( { isDark } ) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.553621);
  const [lat, setLat] = useState(47.21);
  const [zoom, setZoom] = useState(13);

  /** Setup the map and change the style of the map wether is light or dark mode */
  useEffect(() => {
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
        contributonControl: false
      });
    }
  }, [isDark]);

  /** Set the map to take the entire screen */
  const styleMap = {
    height: "100vh",
    width: "100vw",
  }

  return (
    <div style={{overflow: "hidden"}}>
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
  )
}

export default Map
