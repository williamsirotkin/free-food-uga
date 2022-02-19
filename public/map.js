let markers = [];
function initMap() {
    readFromDatabase()
    // The location of UGA
    const uga = { lat: 33.9480, lng: -83.3773};
    // The map, centered at UGA
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uga,
    });
    for (let i = 0; i < markers.length; i++) {

    }
}

function readFromDatabase() {
    database = firebase.database();

    var ref = database.ref('Marker');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    var stuff = data.val()
    var keys = Object.keys(stuff);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var latitude = stuff[k].Latitude;
        var longitude = stuff[k].Longitude;
        var additional = stuff[k].Additional;
        var building = stuff[k].Building;
        var duration = stuff[k].Duration;
        var event = stuff[k].Event;
        var food = stuff[k].Food;
        var myLatLng = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: myLatLng
        });
        const infowindow = new google.maps.InfoWindow({
            content: building
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }
}

function errData(err) {
    console.log(error);
}

