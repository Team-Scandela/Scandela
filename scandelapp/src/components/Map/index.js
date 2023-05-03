import mapboxgl from 'mapbox-gl';
import React, { useRef, useState, useEffect } from 'react'

mapboxgl.accessToken = "pk.eyJ1IjoidGl0b3VhbnRkIiwiYSI6ImNsaDYyeHUybDAyNTkzcHV5NHlzY3drbHIifQ._eEX5CRcWxVrl9C8z4u3fQ"


const Map = () => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
      contributonControl : false
    });
  });

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
