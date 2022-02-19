let markers = [];
let latitudes = [];
let longitudes = [];
function initMap() {
    for (let i = 0; i < markers.length; i++) {
        let marker = markers[i];
        marker.setMap(null);
    }
    markers = [];
    readFromDatabase()
    // The location of UGA
    const uga = { lat: 33.9480, lng: -83.3773};
    // The map, centered at UGA
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uga,
    });
    
}

function addMarker(latitude, longitude) {
    const myLatLng = new google.maps.LatLng(latitude, longitude)
    let marker = new google.maps.Marker({
        position: myLatLng,
        title: "This is a test"
    });
    console.log(marker);
    markers.push(marker);
}

function readFromDatabase() {
    database = firebase.database();

    var ref = database.ref('Marker');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    var stuff = data.val()
    var keys = Object.keys(stuff);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var latitude = stuff[k].Latitude;
        var longitude = stuff[k].Longitude;
        latitudes.push(latitude);
        longitudes.push(longitudes);
    }
}

function errData(err) {
    console.log(error);
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
  