let markers = []
function initMap() {
    // The location of UGA
    const uga = { lat: 33.9480, lng: -83.3773};
    // The map, centered at UGA
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uga,
    });
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

  function addMarker() {
     var location = document.getElementById("locationInput").value;
     if (location == "mlc")
        lat = 33.95179, lng = -83.37666;
    else if (location == "boyd")
        lat = 33.94587, lng = -83.37486;
    else if(location == "main library")
        lat = 33.95493, lng = -83.37328;
    else if (location == "slc")
        lat = 33.94249, lng = -83.37640;

    let myLatLng = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
        position: myLatLng,
        location: getLocation(lat, lng),
        title: "pizza",
        optimized: true,
        icon: "/Images/pizza.png"
    });
    
    let myLatLng2 = new google.maps.LatLng(lat, lng);
    let marker2 = new google.maps.Marker({
        position: myLatLng2,
        location: getLocation(lat, lng),
        title: "dessert",
        optimized: true,
        icon: "/Images/icecream.png"
    });
    
    let myLatLng3 = new google.maps.LatLng(lat, lng);
    let marker3 = new google.maps.Marker({
        position: myLatLng3,
        location: getLocation(lat, lng),
        title: "fruit",
        optimized: true,
        icon: "/Images/fruit.png"
    });
    let myLatLng4 = new google.maps.LatLng(lat, lng);
    let marker4 = new google.maps.Marker({
        position: myLatLng4,
        location: getLocation(lat, lng),
        title: "sandwich",
        optimized: true,
        icon: "/Images/sandwich.png"
    });
    let myLatLng5 = new google.maps.LatLng(lat, lng);
    let marker5 = new google.maps.Marker({
        position: myLatLng5,
        location: getLocation(lat, lng),
        title: "mystery",
        optimized: true,
        icon: "/Images/mystery.png"        
    });
    let myLatLng6 = new google.maps.LatLng(lat, lng);
    let marker6 = new google.maps.Marker({
        position: myLatLng6,
        location: getLocation(lat, lng),
        title: "snack",
        optimized: true,
        icon: "/Images/chips.png"        
    });
    
    let infowindow = new google.maps.InfoWindow({
        content: "<b>Location:</b> " + getLocation(lat, lng) + "<br>" + "<b>Food: </b>" + document.getElementById("foodType").value + "<br>" + "<b>Duration: </b>" +
        document.getElementById("duration").value + "<br>" + "<b>Event: </b>" + document.getElementById("eventType").value + "<br>" + "<b>Info: </b>" + document.getElementById("additionalType").value + "<br>" 
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldfocus: false,
        });
    });
    marker2.addListener("click", () => {
        infowindow.open({
            anchor: marker2,
            map,
            shouldfocus: false,
        });
    });
    marker3.addListener("click", () => {
        infowindow.open({
            anchor: marker3,
            map,
            shouldfocus: false,
        });
    });
    marker4.addListener("click", () => {
        infowindow.open({
            anchor: marker4,
            map,
            shouldfocus: false,
        });
    });
    marker5.addListener("click", () => {
        infowindow.open({
            anchor: marker5,
            map,
            shouldfocus: false,
        });
    });
    marker6.addListener("click", () => {
        infowindow.open({
            anchor: marker6,
            map,
            shouldfocus: false,
        });
    });

    var foodType = document.getElementById("foodType").value;
    if (foodType == "pizza")
        markers.push(marker);
    else if (foodType == "dessert")
        markers.push(marker2);
    else if(foodType == "fruit")
        markers.push(marker3);
    else if (foodType == "sandwich")
        markers.push(marker4);
    else if (foodType == "mystery") 
        markers.push(marker5);
    else if (foodType == "snack") 
        markers.push(marker6);

    // Calls InitMap Function To Initialize Markers On The Map
    initMap();
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
  