let markers = [];
let realMarkers = [];
function initMap() {
    for (let i = 0; i < realMarkers.length; i++) {
        realMarkers[i].setMap(null);
    }
    realMarkers = [];
    addMarkers();
    // The location of UGA
    const uga = { lat: 33.9480, lng: -83.3773};
    // The map, centered at UGA
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uga,
    });
    for (let i = 0; i < realMarkers.length; i++) {
        realMarkers[i].setMap(map);
    }
}

function addMarkers() {
    let latitudes = [];
    let longitudes = [];
    let buildings = [];
    let foods = [];
    let events = [];
    let additionals = [];
    let durations = []
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Latitude");
        databaseReference.on('value', snap => {
            var data = snap.val();
            var keys = Object.keys(data);
            console.log(keys);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var latitude = data[k].Latitude;
                console.log(latitude);
            }
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Longitude");
        databaseReference.on('value', snap => {
            console.log(snap.val().Longitude);
            longitudes.push(snap.val());
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Location");
        databaseReference.on('value', snap => {
            var scores = snap.val();
            var keys = Object.keys(scores);
            console.log(keys);
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Food");
        databaseReference.on('value', snap => {
            foods.push(snap.val());
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Event");
        databaseReference.on('value', snap => {
            events.push(snap.val());
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Additional");
        databaseReference.on('value', snap => {
            additionals.push(snap.val());
        });
    }
    for (let i = 0; i < markers.length; i++) {
        var path = "Markers/" + markers[i];
        var databaseReference = firebase.database().ref(path).child("Duration");
        databaseReference.on('value', snap => {
            durations.push(snap.val());
        });
    }

    for (let i = 0; i < markers.length; i++) {
        let myLatLng = new google.maps.LatLng(latitudes[i]. longitudes[i]);
        let marker = new google.maps.Marker({
            position: myLatLng,
            location: buildings[i],
            title: foods[i],
            optimized: true
        });
        let infowindow = new google.maps.InfoWindow({
            content: "<b>Location:</b> " + buildings[i] + "<br>" + "<b>Food: </b>" + foods[i] + "<br>" + "<b>Duration: </b>" +
            duration[i] + "<br>" + "<b>Event: </b>" + events[i] + "<br>" + "<b>Info: </b>" + additionals[i] + "<br>"
        });

        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                should: false,
            });
        });

        realMarkers.push(marker);
    }
}

function filterMarkers() {
    var location = document.getElementById("location").value;
    var food = document.getElementById("food").value;

    initMap();

    for (let i = 0; i < markers.length; i++) {
        if (food != markers[i].title && food != "any")
            markers[i].setMap(null);
    }

    for (let i = 0; i < markers.length; i++) {
        if (markers[i].location != location && location != "any")
            markers[i].setMap(null);
    }

} // filterMarkers

function getLocation(lat, lng) {
    if(Math.abs(lat + lng + 49.42487) < 0.001)
        return "mlc";
    else if(Math.abs(lat + lng + 49.42899) < 0.001) 
        return "boyd";
    else if(Math.abs(lat + lng + 49.41835) < 0.001) 
        return "main library";
    else if(Math.abs(lat + lng + 49.43391) < 0.001) 
        return "slc";
}

  function reset() {
      for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
          markers[i].pop();
      }
  }
  
  function resetAtMidnight() {
    var now = new Date();
    var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    var msToMidnight = night.getTime() - now.getTime();
    setTimeout(function() {
        reset();         
        resetAtMidnight();  
    }, msToMidnight);
  }
  