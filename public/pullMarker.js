function pullCoordinates() {
    pullLong();
    var value = document.getElementById('lat');
    var dbRef = firebase.database().ref().child('Buildings').child('Boyd').child('Latitude');
    dbRef.on('value', snap => value.innerText = snap.val());
}

function pullLong() {
    var value = document.getElementById('long'); // optional
    // pass this in to the write function. This var contains the coordinate.
    var dbRef = firebase.database().ref().child('Buildings').child('Boyd').child('Longitude');
    dbRef.on('value', snap => value.innerText = snap.val());
}