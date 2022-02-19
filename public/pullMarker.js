
function pullLat(building) {
    var lat;
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    var value = document.getElementById('lat');
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Latitude');
    dbRef.on('value', snap => lat = snap.val());
    return lat;
}

function pullLong(building) {
    var long;
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    var value = document.getElementById('long'); // optional
    // pass this in to the write function. This var contains the coordinate.
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Longitude');
    dbRef.on('value', snap => long = snap.val());
    return long;
}