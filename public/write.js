function writeMarker() {
    var index = markers.length;
    var string = "Markers/" + index
    var firebaseRef = firebase.database().ref(string);
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    select = document.getElementById('foodType');
    var food = select.options[select.selectedIndex].value;
    select = document.getElementById('duration');
    var duration = select.options[select.selectedIndex].value;
    var eventType = document.getElementById('eventType').value;
    var additional = document.getElementById('additionalType').value;

    firebaseRef = firebase.database().ref(string + "/Location");
    firebaseRef.push(building);
    firebaseRef = firebase.database().ref(string + "/Food");
    firebaseRef.push(food);
    firebaseRef = firebase.database().ref(string + "/Duration");
    firebaseRef.push(duration);
    firebaseRef = firebase.database().ref(string + "/Event");
    firebaseRef.push(eventType);
    firebaseRef = firebase.database().ref(string + "/Additional");
    firebaseRef.push(additional);
    var dbRef1 = firebase.database().ref().child('Buildings').child(building).child('Latitude');
    dbRef1.on('value', snap => {
        firebaseRef = firebase.database().ref(string + "/Latitude");
        firebaseRef.push(snap.val());
    });
    firebaseRef = firebase.database().ref(string + "/Longitude");
    var dbRef2 = firebase.database().ref().child('Buildings').child(building).child('Longitude');
    dbRef2.on('value', snap => {
        firebaseRef = firebase.database().ref(string + "/Longitude");
        firebaseRef.push(snap.val());
    });
}