let markers = [];
let longitudes = []
let latitudes = [];
let additionals = [];
let buildings = [];
let durations = [];
let events = [];
let foods = [];
var map;
function initMap() {
    markers = [];
    longitudes = [];
    latitudes = [];
    additionals = [];
    buildings = [];
    durations = [];
    events = [];
    foods = [];
    readFromDatabase()
    // The location of UGA
    const uga = { lat: 33.9480, lng: -83.3773};
    // The map, centered at UGA
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uga,
    }); 

    console.log(latitudes[0]);
    for (let i = 0; i < latitudes.length; i++) {

        let myLatLng = new google.maps.LatLng(latitudes[i], longitudes[i]);
        var string = "<b>Building:</b> " + buildings[i] + "<br>";
        string += "<b>Food:</b> " + foods[i] + "<br>";
        string += "<b>Event:</b> " + events[i] + "<br>";
        string += "<b>Duration:</b> " + durations[i] + "<br>";
        string += "<b>Additional Comments:</b> " + additionals[i];
        var infowindow = new google.maps.InfoWindow({
            content: string
        });
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: "Images/" + foods[i] + ".png"
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }
    closeNav();
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
        latitudes.push(stuff[k].Latitude);
        console.log(stuff[k].Latitude);
        longitudes.push(stuff[k].Longitude);
        buildings.push(stuff[k].Building);
        durations.push(stuff[k].Durations);
        events.push(stuff[k].Events);
        additionals.push(stuff[k].Additional);
        foods.push(stuff[k].Food);
    }
}

function errData(err) {
    console.log(error);
}

