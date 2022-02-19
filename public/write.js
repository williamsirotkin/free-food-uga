function writeMarker() {
    var index = markers.length;
    var string = "Markers/" + index
    var firebaseRef = firebase.database().ref(string);
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    var x = pullLat(building);
    var y = pullLong(building);
    select = document.getElementById('foodType');
    var food = select.options[select.selectedIndex].value;
    select = document.getElementById('duration');
    var duration = select.options[select.selectedIndex].value;
    var eventType = document.getElementById('eventType').value;
    var additional = document.getElementById('additionalType');

    firebaseRef = firebase.database().ref(string + "/Location");
    firebaseRef.push(building);
    firebaseRef = firebase.database().ref(string + "/Latitude");
    firebaseRef.push(x);
    firebaseRef = firebase.database().ref(string + "/Longitude");
    firebaseRef.push(y);
    firebaseRef = firebase.database().ref(string + "/Food");
    firebaseRef.push(food);
    firebaseRef = firebase.database().ref(string + "/Duration");
    firebaseRef.push(duration);
    firebaseRef = firebase.database().ref(string + "/Event");
    firebaseRef.push(eventType);
    firebaseRef = firebase.database().ref(string + "/Additional");
    firebaseRef.push(additional);
}