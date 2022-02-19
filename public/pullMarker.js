function getBuildingID() {
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    pullCoordinates(building);
}
function pullCoordinates(building) {
    pullLong(building);
    var value = document.getElementById('lat');
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Latitude');
    dbRef.on('value', snap => value.innerText = snap.val());
}

function pullLong(building) {
    var value = document.getElementById('long'); // optional
    // pass this in to the write function. This var contains the coordinate.
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Longitude');
    dbRef.on('value', snap => value.innerText = snap.val());
}