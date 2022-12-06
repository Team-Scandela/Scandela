//Création de la carte
let mapOptions = {
    center:[47.237054, -1.565895],
    zoom:12
}
let map = new L.map('map' , mapOptions);

//Ajout des couches
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

//Gestion du clic sur la carte
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

//Gestion des positions des markers
let layerGroupArray = [];
let markerArray = [];

function parseData(json, map, layerGroupArray, markerArray) {
    var markers = L.markerClusterGroup();
    for (let i = 0; i < json.length; i++) {
        let lat = json[i]['fields']['geo_point_2d'][0];
        let lng = json[i]['fields']['geo_point_2d'][1];
        let ville = json[i]['fields']['lib_com'];
        map = createMarker(map, lat, lng, ville, layerGroupArray, markerArray);

        const compare = String(json[i]['fields']['type_lampe']).localeCompare('SHP');
        let type = "";
        if (compare == 0)
            type = String("<h1> LAMPADAIRE À SODIUM </h1>");
        else
            type = String("<h1> " + json[i]['fields']['type_lampe'] + "</h1>");
        let marker = new L.Marker([lat, lng]).bindPopup(type);
        markers.addLayer(marker);
    }
    map.addLayer(markers);
    return map;
}

//Gestion de l'icone des markers -- A FAIRE
var myIcon = L.icon({
    class : "circle",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

//Création des markers
function createMarker(map, lat, lng, ville, layerGroupArray, markerArray) {
    let marker = new L.Marker([lat, lng])
    .bindPopup(ville);
    markerArray.push(marker);
    map = addMarkerToLayerGroup(map, marker, ville, layerGroupArray);
    return map;
}

//Ajout des markers dans un layerGroup
function addMarkerToLayerGroup(map, marker, layerGroup, layerGroupArray) {
    if (layerGroupArray[layerGroup] == undefined) {
        layerGroupArray[layerGroup] = new L.LayerGroup();
    }
    layerGroupArray[layerGroup].addLayer(marker);
    return map;
}

//Read json
function readData(map) {
    fetch("nantesData.json")
        .then(response => response.json())
        .then(json => map = parseData(json, map, layerGroupArray, markerArray))
        .catch(err => console.log(err));
    return (map)
}

map = readData(map);