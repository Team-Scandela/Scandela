//Création de la carte
let mapOptions = {
    center:[47.237054, -1.565895],
    zoom:12
}
var map = new L.map('map' , mapOptions);

//Ajout des couches
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var dark_layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
map.addLayer(dark_layer);

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
var layerGroupArray = [];
let markerArray = [];
let filterArray = [];
var markers = L.markerClusterGroup();

function parseData(json, map, layerGroupArray, markerArray) {
    var customOptions =
    {
        'maxWidth': '500',
        'className' : 'custom'
    }

    for (let i = 0; i < json.length; i++) {
        let lat = json[i]['fields']['geo_point_2d'][0];
        let lng = json[i]['fields']['geo_point_2d'][1];
        let ville = json[i]['fields']['lib_com'];
        map = createMarker(map, lat, lng, ville, layerGroupArray, markerArray);


        const compare = String(json[i]['fields']['type_lampe']).localeCompare('SHP');

        let type = String("<h1> Éclairage n° " + json[i]['fields']['numero'] + "</h1>");
        type += String("<h2> <u>Adresse:</u> <br/>" + json[i]['fields']['nom_voie'] + ", <br/>" + json[i]['fields']['lib_com'] + "</h2> <h2> <u>Type d'éclairage:</u> <br/>");
        if (compare == 0) type += String("Lampe a Sodium</h2>");
        else type += String(json[i]['fields']['type_lampe'] + "</h2>");
        type += String("<h2> <u>État:</u> <br/>" + "Pas encore possible" + "</h2>");
        type += String("<h2><u>Conso:</u><br/> 34 kW/h</h2>");
        type += String("<h2><u>Émission (CO2):</u><br/> 14 gr de CO2</h2>");


        let marker = new L.Marker([lat, lng]).bindPopup(type, customOptions);
        
        markers.addLayer(marker);
    }
    map.addLayer(markers);
    return map;
}

var x = "";

function getFilters(layerGroupArray, map, markers) {
    if (x != "") {
        console.log(x)
        map.removeLayer(layerGroupArray[String(x)]);
    }
    x = document.getElementById('filters').value;

    console.log(x);
    map.removeLayer(markers);
    layerGroupArray[String(x)].addTo(map);
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
        layerGroupArray[layerGroup] = new L.markerClusterGroup();
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

