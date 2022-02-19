var latitude = 50;
var longitude = 50;
function writeMarker() {
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    getLat(building);
}

async function getLat(building) {
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
            console.log(data);
            var firebaseRef = firebase.database().ref('Marker');
            firebaseRef.push(data);
            initMap();
        })
    });
}

async function getLong(building) {
    var dbRef2 = firebase.database().ref().child('Buildings').child(building).child('Longitude');
    var long = dbRef2.on('value', snap => {
        longitude = snap.val();
    });
}