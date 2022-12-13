//Option de la carte
let mapOptions = {
    center:[47.237054, -1.565895],
    zoom:16,
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

//Gestion du texte des popups
function replaceToAcronym(str) {
    let value;
    switch (str) {
        case "DIC": value = String("Diodes Infrarouges");               break;
        case "FC" : value = String("Fluorescentes Compactes");          break;
        case "HAL": value = String("Halogènes");                        break;
        case "IC" : value = String("Infrarouges");                      break;
        case "IM" : value = String("Infrarouges à Mélange");            break;
        case "IMC": value = String("Infrarouges à Mélange Compactes");  break;
        case "LED": value = String("Diodes Electroluminescentes");      break;
        case "MBP": value = String("Mercure Basse Pression");           break;
        case "SHP": value = String("Sodium Haute Pression");            break;
        case "SBP": value = String("Sodium Basse Pression");            break;
        case "TF" : value = String("Tungstène Fluorescentes");          break;
        case "TL" : value = String("Tungstène à Lames");                break;
        default   : value = String("Donnée non disponible");            break;
    }
    return (value);
}

function generatePopupText(json, i) {
    let type = String("<h1 style='text-align:center'> Lampadaire " + json[i]['fields']['numero'] + "</h1>");
    type += String("<h3 style='text-align:center'> " + json[i]['fields']['nom_voie'] + ", " + json[i]['fields']['lib_com'] + "<br/></h3>");
    type += String("<h1 style='color: #FAC710;text-align:center'>Consommation<br/></h1>");
    type += String('<div class="container"><div class="image"><img src="assets/popupLogos/flash.png" height="48px" width="48"></div><div class="text"><h3>50 kW/h</h3></div></div>');
    type += String('<div class="container"><div class="image"><img src="assets/popupLogos/leaf.png" height="48px" width="48"></div><div class="text"><h3>20 g de CO2/h</h3></div></div>');
    type += String("<div class='yellowSquareClass';>");
    type += String("<h1 style='text-align:center;color:#2A2B2A'>Action Possible<br/></h1>");
    type += String('<div class="container"><div class="image"><img src="assets/popupLogos/power.png" height="48px" width="48"></div><div class="text"><h3>Éteindre de 00h00 à 5h00</h3></div></div>');
    type += String("<h1 style='text-align:center;color:#2A2B2A'>Conséquences</h1>");
    type += String('<div class="container"><div class="image"><img src="assets/popupLogos/down-arrow.png" height="48px" width="48"></div><div class="text"><h3>250 kW/j<br/>100 g de CO2/j<br/></h3></div></div>');
    type += String("</div>");

    return (type);
}

function parseData(json, map, layerGroupArray, markerArray) {
    //Création des clusters et de leurs icones
    let clusters = L.markerClusterGroup({
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
        'className' : 'custom',
    }

    //Iterate through the JSON array.
    for (let i = 0; i < json.length; i++) {
        let lat = json[i]['fields']['geo_point_2d'][0];
        let lng = json[i]['fields']['geo_point_2d'][1];
        let ville = json[i]['fields']['lib_com'];
        map = createMarker(map, lat, lng, ville, layerGroupArray, markerArray);

        // Information sur les Lampadaires
        type = generatePopupText(json, i);

        let marker = new L.Marker([lat, lng], {icon: myIcon}).bindPopup(type, customOptions);
        clusters.addLayer(marker);
    }
    //Ajout des cluster dans la carte
    map.addLayer(clusters);
    filterArray = getAndApplyFilter(json); // a faire ne marche pas encore
    return map;
}

//Gestion de l'icone des markers -- A FAIRE
var myIcon = L.icon({
    iconUrl: 'assets/LampadAIR.svg',
    // shadowUrl: 'assets/leaf-shadow.png',
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    popupAnchor: [11, 8],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62]
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
