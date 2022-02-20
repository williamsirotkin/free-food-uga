
// Default valuesfun
var count = 0;
var latitude = 50;
var longitude = 50;

function writeMarker() {
    if (count == 0) {
        getLat("Nothing")
    } 
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    getLat(building);
}

function signin_page() {
    window.location.href = "signin2.html";
}

async function getLat(building) {
    console.log(count);
    if (count == 0 || building == "Nothing") {
        count++;
        var data = {
            Building: "Fake",
            Food: "Fake",
            Duration: "9",
            Event: "Funeral",
            Additional: "You are fake",
            Latitude: "60",
            Longitude: "60"
        }
        var firebaseRef = firebase.database().ref('Marker');
        initMap();
    } else {
        var dbRef1 = firebase.database().ref().child('Buildings').child(building).child('Latitude');
        dbRef1.on('value', snap => {
            latitude = snap.val();
            dbRef1 = firebase.database().ref().child('Buildings').child(building).child("Longitude");
            dbRef1.on('value', snap => {
                longitude = snap.val();
                var select = document.getElementById("foodType");
                var food = select.options[select.selectedIndex].value;
                select = document.getElementById("duration")
                var duration = select.options[select.selectedIndex].value;
                var eventType = document.getElementById('eventType').value;
                var additional = document.getElementById('additionalType').value;
                var data = {
                    Building : building,
                    Food : food,
                    Duration: duration,
                    Event : eventType,
                    Additional : additional,
                    Latitude : latitude,
                    Longitude: longitude
                }
                var firebaseRef = firebase.database().ref('Marker');
                if (building != "Aderhold") {
                    markers.push(data);
                    firebaseRef.push(data);
                }
                initMap();
            })
        });
    }
}
