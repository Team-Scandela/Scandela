//Création de la carte
let mapOptions = {
    center:[47.2, -1.5],
    zoom:10
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

//Gestion des positions des coordonnées
function createMarkerArray(json) {
    let markers = [];
    for (let i = 0; i < 1000; i++) {
        let marker = L.marker(json[i]['geometry']['coordinates']);
        markers.push(marker);
    }
    return markers;
}

function createLayerGroup(markers) {
    let layerGroup = L.layerGroup(markers);
    return layerGroup;
}

function addLayerGroupToMap(layerGroup) {
    layerGroup.addTo(map);
}

function readData() {
    fetch("nantesData.json")
        .then(response => response.json())
        .then(json => addLayerGroupToMap(createLayerGroup(createMarkerArray(json))))
        .catch(err => console.log(err));
}

readData();