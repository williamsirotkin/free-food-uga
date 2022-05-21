var firebaseConfig = {
    apiKey: "AIzaSyDOs0oemIBzgsVvsS-mzWSSQET6SuHU_Nc",
    authDomain: "free-food-uga-97846.firebaseapp.com",
    databaseURL: "https://free-food-uga-97846-default-rtdb.firebaseio.com",
    projectId: "free-food-uga-97846",
    storageBucket: "free-food-uga-97846.appspot.com",
    messagingSenderId: "538379971058",
    appId: "1:538379971058:web:d69e20fe412440efc9636b",
    measurementId: "G-6C4FBTMGM1"
};

firebase.initializeApp(firebaseConfig);  

// Default valuesfun
var count = 0;
var latitude = 50;
var longitude = 50;
//let emailSet = new Set();

function checkUser() {
    const user = firebase.auth().currentUser;
    writeMarker(true);
    return;
    if (user) {
        if (userHasNoMarkers(user)) { const userEmail = firebase.auth().currentUser.email; writeMarker(userEmail); }
        else console.log("You have already placed a marker");
    } else {
        signin_page();
    }
}

function userHasNoMarkers(user) {
    if (emailSet.has(user.email)) return false;
    return true;
} 

function writeMarker(clicked) {
    if (count == 0) {
        getLat("Nothing", null)
    } 
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    getLat(building, clicked);
}
/*
function writeMarker(userEmail) {
    if (count == 0) {
        getLat("Nothing", userEmail)
    } 
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    getLat(building, userEmail);
}
*/
function signin_page() {
    window.location.href = "signin2.html";
}

async function getLat(building, clicked) {
    if (count == 0 || building == "Nothing") {
        count++;
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
                select = document.getElementById('duration');
                var duration = select.options[select.selectedIndex].value;
                var eventType = document.getElementById('eventType').value;
                var additional = document.getElementById('additionalType').value;
                var dateCreated = new Date().toString();
                var likes = 1;
                var creator = "";
                /*
                creator = userEmail; 
                if (userEmail) emailSet.add(userEmail);
                    
                    var pic = document.createElement('image');
                    const picInput = document.getElementById('picture').files[0];
                    pic.src = URL.createObjectURL(picInput);
                    */
                    //var picture = pic.src;
                var picInput = "";
                var picture = "";
                if (document.getElementById('picture')) picInput = document.getElementById('picture').files[0];
                getBase64(picInput, function(base64Data){
                    console.log("1: " + picture);
                    picture = base64Data;
                    console.log("2 : " + picture);
                    console.log("3: " + picture);
                    
                console.log("eh: " + picture);
                var formattedDateCreated = dateCreated.substring(dateCreated.indexOf(":") - 2, dateCreated.indexOf(":") + 3);
                var data = {
                    Building : building,
                    Food : food,
                    Event : eventType,
                    Additional : additional,
                    Latitude : latitude,
                    Longitude: longitude,
                    Picture: picture,
                    Creator: creator,
                    Likes: likes,
                    Duration: duration,
                    Creation: formattedDateCreated
                }
                //console.log("eh2: " + picture);
                var firebaseRef = firebase.database().ref('Marker');

                //Checking which fields are missing so I can notify user
                console.log(building + ", " + food + ", " + duration + ", " + eventType + ", " + additional + ", " + picture);
                if (strcmp(building, "Select Building") != 0 && strcmp (food, "Select Food") != 0 && strcmp (duration, "Select Duration") != 0 &&
                    strcmp(eventType, "") != 0 && strcmp(additional, "") && strcmp (picture, "") != 0) {
                    markers.push(data);
                    firebaseRef.push(data);
                } else {
                    if (clicked) notifyUserMissingFields();
                }
                initMap();
                });
            })
        });
    }
}

function notifyUserMissingFields() {
    alert("Make sure you complete all the fields!");
} // notifyUserMissingFields

function getBase64 (file, callback) {
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    } else {
        callback();
    }
}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}

function f(data) {
    console.log(data);
    /*
    console.log(++data.Likes);
    var firebaseRef = firebase.database().ref('Marker');
    firebaseRef.push(data);
    */
} // f

