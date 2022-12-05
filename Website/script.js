let mapOptions = {
    center:[47.2, -1.5],
    zoom:10
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);


// Coordonnées avec clic
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

function addMarket(json) {
    for (var i = 0; i < json.length; i++) {
        var marker = L.marker(json[i]['geometry']['coordinates']).addTo(map);
        marker.bindPopup(json[i].fields.numero);
    }
}

fetch("nantesData.json")
  .then(response => response.json())
  .then(json => addMarket(json))
  .catch(err => console.log(err));

