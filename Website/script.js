//Option de la carte
let mapOptions = {
    center:[47.237054, -1.565895],
    zoom:12,
    zoomControl: false
}

// Option des layers
let layerOptions = {
    attribution: 'Scampoule !',
    maxNativeZoom: 18,
    maxZoom: 25
}

//Création de la carte
let map = new L.map('map' , mapOptions);


//Ajout des couches
let baseLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', layerOptions);
let darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', layerOptions);
map.addLayer(baseLayer);


//Bouton de switch dark/normal mode
let darkModeElem = document.getElementById('darkMode');

function onDarkModeClick() {
    let textDarkMode = document.getElementById('darkModeText');
    if (map.hasLayer(baseLayer)) {
        map.removeLayer(baseLayer);
        map.addLayer(darkLayer);
        textDarkMode.style.color = "yellow"
    } else {
        map.removeLayer(darkLayer);
        map.addLayer(baseLayer);
        textDarkMode.style.color = "white"
    }
}


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

// A Faire
let filterArray = [];

function parseData(json, map, layerGroupArray, markerArray) {
    //Création des clusters et de leurs icones
    var markers = L.markerClusterGroup({
        //Modifie l'icone des clusters
        // iconCreateFunction: function(cluster) {
        //     return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
        // },
        singleMarkerMode: false, //Affiche uniquement des clusters
        spiderfyOnMaxZoom: false, //Désactive le spiderfy --> je sais plus c'est quoi mais c'est cool, vas de paire avec disableClusteringAtZoom donc à laisser
        disableClusteringAtZoom: 20 //Désactive le clustering à partir du zoom
    });

    //Options css des popups
    var customOptions = {
        'maxWidth': '500',
        'className' : 'custom'
    }

    //Iterate through the JSON array.
    for (let i = 0; i < json.length; i++) {
        let lat = json[i]['fields']['geo_point_2d'][0];
        let lng = json[i]['fields']['geo_point_2d'][1];
        let ville = json[i]['fields']['lib_com'];
        map = createMarker(map, lat, lng, ville, layerGroupArray, markerArray);

        // Information sur les Lampadaires
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
    //Ajout des cluster dans la carte
    map.addLayer(markers);
    filterArray = getAndApplyFilter(json); // a faire ne marche pas encore
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

//Gestion du print du zoom
// map.on('zoomend', showZoomLevel);
// showZoomLevel();

// function showZoomLevel() {
//     document.getElementById('zoom').innerHTML = map.getZoom();
// }

// TEMPORAIRE / A FAIRE / A FIX

function getAndApplyFilter(json) {
    var filters = [];
    const cmp = [];
    let j = 0;
    let check = 0;
    for (let i = 0; i < json.length; i++) {
        for (j = 0; j < cmp.length; j++) {
            if (String(json[i]['fields']['lib_com'].localeCompare(String(cmp[j])) === 0)) {
                check = 1;
            }
        }
        if (check === 0)
            filters[i] = json[i]['fields']['lib_com'];
        check = 0;
    }
    return (filters);
}

function doSomethingKeonBouton() {
    let tmpButton;
    document.getElementById(boutonKeon) = tmpButton
}