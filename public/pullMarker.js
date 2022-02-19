
async function pullLat(building) {
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    var value = document.getElementById('lat');
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Latitude');
    var latitude = await dbRef.on('value', snap => {
        return snap.val();
    });
    return latitude;
}

async function pullLong(building) {
    var long;
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    var value = document.getElementById('long'); // optional
    // pass this in to the write function. This var contains the coordinate.
    var dbRef = firebase.database().ref().child('Buildings').child(building).child('Longitude');
    var longitude = await dbRef.on('value', snap => {
        return snap.val();
    });
    return longitude;
}