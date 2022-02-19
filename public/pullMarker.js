function pullLat() {
    var value = document.getElementById('lat');
    var dbRef = firebase.database().ref().child('Buildings').child('Boyd').child('Latitude');
    dbRef.on('value', snap => value.innerText = snap.val());
}