let markers = [];
let realMarkers = [];
function initMap() {
    alert("this worked");
    for (let i = 0; i < realMarkers.length; i++) {
        realMarkers[i].setMap(null);
    }
    realMarkers = [];
    addMarkers();
    alert(markers.length);
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
    let durations = [];
    let foods = [];
    let events = []
    let additional = [];

    for (let i = 0; i < markers.length; i++) {

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
  