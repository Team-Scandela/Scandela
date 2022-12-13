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
map.addLayer(darkLayer);


//Bouton de switch dark/normal mode
let darkModeElem = document.getElementById('darkMode');

darkScampoule.onclick = onDarkModeClick;

function onDarkModeClick() {
    let textDarkMode = document.getElementById('darkModeText');
    if (map.hasLayer(baseLayer)) {
        map.removeLayer(baseLayer);
        map.addLayer(darkLayer);
        textDarkMode.style.color = "yellow"
    } else {
        map.removeLayer(darkLayer);
        map.addLayer(baseLayer);
        textDarkMode.style.color = "black"
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
var layerGroupArray = [];
var markerArray = [];
var markers = L.markerClusterGroup();

//Gestion du texte des popups
function replaceToAcronym(str) {
    let value;
    switch (str) {
        case "DIC": value = String("Diodes Infrarouges (DIC)");              break;
        case "FC" : value = String("Fluorescentes Compactes (FC)");          break;
        case "HAL": value = String("Halogènes (HAL)");                       break;
        case "IC" : value = String("Infrarouges (IC)");                      break;
        case "IM" : value = String("Infrarouges à Mélange (IM)");            break;
        case "IMC": value = String("Infrarouges à Mélange Compactes (IMC)"); break;
        case "LED": value = String("Diodes Electroluminescentes (LED)");     break;
        case "MBP": value = String("Mercure Basse Pression (MBP)");          break;
        case "SHP": value = String("Sodium Haute Pression (SHP)");           break;
        case "SBP": value = String("Sodium Basse Pression (SBP)");           break;
        case "TF" : value = String("Tungstène Fluorescentes (TF)");          break;
        case "TL" : value = String("Tungstène à Lames (TL)");                break;
        default   : value = String("Donnée non disponible");                 break;
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

var clusters = L.markerClusterGroup({
    //Modifie l'icone des clusters
    // iconCreateFunction: function(cluster) {
    //     return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
    // },
    singleMarkerMode: false, //Affiche uniquement des clusters
    spiderfyOnMaxZoom: false, //Désactive le spiderfy --> je sais plus c'est quoi mais c'est cool, vas de paire avec disableClusteringAtZoom donc à laisser
    disableClusteringAtZoom: 20 //Désactive le clustering à partir du zoom
});

var x = "";

function parseData(json, map, layerGroupArray, markerArray) {
    //Création des clusters et de leurs icones

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
    return map;
}

function getFilters(layerGroupArray, map, clusters) {
    let ville = ['Nantes', 'Rezé', 'Basse-Goulaine', 'Vertou', 'Thouaré-sur-Loire', 'Ste-Luce-sur-Loire', 'St-Sébastien-sur-Loire',
            'St-Léger-les-Vignes', 'St-Jean-de-Boiseau', 'St-Herblain', 'St-Aignan-Grandlieu', 'Sautron', 'Orvault', 'Mauves-sur-Loire',
            'Les Sorinières', 'Le Pellerin', 'La Montagne', 'La Chapelle-sur-Erdre', 'Indre', 'Couëron', 'Carquefou', 'Brains', 'Bouguenais', 'Bouaye'];
    let check = 0;
    var customOptions = {
        'maxWidth': '500',
        'className' : 'custom'
    }
    if (x != "") {
        console.log(x)
        map.removeLayer(layerGroupArray[String(x)]);
    }
    x = document.getElementById('filters').value;
    let choosenCity = "";
    for (i = 0; i < ville.length; i++) {
        const compareCityAndFilter = String(x).localeCompare(ville[i]);
        if (compareCityAndFilter === 0) {
            check = 1;
        } else {
            for (i = 0; i < ville.length; i++) {
                let doesFilterStartWithCityName = ville[i].toLowerCase().startsWith(String(x).toLowerCase());
                if (doesFilterStartWithCityName == true) {
                    x.textContent = String(ville[i]);
                    x = String(ville[i]);
                    x.value = x.textContent; // test pour faire entrer une "autocomplétion"
                    choosenCity = ville[i];
                    console.log(choosenCity);
                    check = 0;
                } else {
                    let alert = "Nom de Ville incorrect!" // utiliser pour changer x.value
                }
            }
        }
    }
    if (x == "") {
        map.addLayer(clusters);
        return map;
    }
    console.log(x);
    map.removeLayer(clusters);

    for (i = 0; i < ville.length; i++) {
        const add = String(x).localeCompare(ville[i]);
        if (check == 0 && add === 0)
            layerGroupArray[choosenCity].addTo(map).bindPopup(type, customOptions);
    }
    map.flyTo([47.179011, -1.548557], 14); // changer les GeoPos pour avoir toute les pos "centrer" des villes
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

//Disable click propagation
L.DomEvent.disableClickPropagation(button);
L.DomEvent.disableClickPropagation(darkModeElem);

//Gestion du print du zoom
// map.on('zoomend', showZoomLevel);
// showZoomLevel();

// function showZoomLevel() {
//     document.getElementById('zoom').innerHTML = map.getZoom();
// }