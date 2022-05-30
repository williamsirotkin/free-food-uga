/* Javascript file to allow functionality of map and markers on map */

// Array Of All The Data In Database
let markers = [];
let longitudes = []
let latitudes = [];
let creators = [];
let foods = [];
let likes = [];
let buildings = [];
let durations = [];
let creationTimes = [];
let events = [];
let additionals = [];
let pictures = [];
var map;

// Handles When User Doesn't Have Location Allowed
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

/*
  Initializes the Map With All Data Of Markers From Database
*/
function initMap() {
    longitudes = [];
    latitudes = [];
    creators = [];
    buildings = [];
    foods = [];
    likes = [];
    durations = [];
    creationTimes = [];
    events = [];
    additionals = [];
    pictures = [];
    readFromDatabase()

    const ugaLocation = { lat: 33.9480, lng: -83.3773}; // The location of UGA Centered 
    
    // The map, centered at ugaLocation
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: ugaLocation,
    }); 

    // If User Has Location On, put their coordinates on map and center map there 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
                //Temporary: Coordinates Are UGA Centered until everyone is back in athens in august
                lat: 33.9480,
                lng: -83.3773
                //lat: position.coords.latitude,
                //lng: position.coords.longitude,
            };
            let infowindow = new google.maps.InfoWindow({
                content: "Your Location"
            });
            let marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: "Images/user.png"
            });
            map.setCenter(pos);
            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            });
          },
          () => {
            handleLocationError(true, infoWindow, pos);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, pos);
      }


    // Looping to do the actual initialization of each marker. Data is retrieved from arrays and displayed 
    for (let i = 0; i < latitudes.length; i++) {
        console.log(isDurationOver(durations[i], creationTimes[i]));
        //if (isDurationOver(durations[i], creationTimes[i])) continue;
        if (!events[i]) events[i] = "";
        if (!additionals[i]) additionals[i] = "";
        let myLatLng = new google.maps.LatLng(latitudes[i], longitudes[i]); 
        var infoWindowContent = "<center><b>Free</b> " + formatFood(foods[i]).bold() + " <b>at</b> " + nameBuilding(buildings[i]).bold() + "<b>!<br><br></b></center>";
        var temp = "<style> img { height = 140px; width: 115px; float: right; padding: 2px;}p {width: 75%;float: left;}</style>"
        temp += "<img src=" + pictures[i] + ">";
        infoWindowContent += temp;
        infoWindowContent += "Event: <br>" + events[i].bold() + "<br><br>";
        infoWindowContent += "Time: <br>" + getStartTimeFromCreationTime(creationTimes[i]).bold() + "<b>-<br></b>" + getEndTimeFromDuration(durations[i], creationTimes[i]).bold() + "<br>";
        infoWindowContent += "<br>Details: ";
        infoWindowContent += "<br>" + additionals[i].bold() + "<br>";
        infoWindowContent += "<br><a href=https://www.google.com/maps/dir/?api=1&destination=" + latitudes[i] + '%2C' + longitudes[i] + "&travelmode=walking" + "><br>Directions</a>";
        infoWindowContent += " &nbsp&nbsp<a href=https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=" + latitudes[i] + "%2C" + longitudes[i] + "&heading=-45&pitch=38&fov=80" + ">Street View</a>";
        var inputStr = buildings[i] + ', ' + foods[i] + ', ' + events[i] + ', ' + additionals[i] + ', ' + latitudes[i] + ', ' + longitudes[i] + ', ' + pictures[i] + ', ' + creators[i] + ', ' + likes[i] + ', ' + durations[i] + ', ' + creationTimes[i];
        infoWindowContent += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          //     "<button onclick = f(" + 'hello' + ") type='button'> <img style = 'width: 10px' src = 'Images/like.png'></button> " + 12;
        let infowindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: "Images/" + foods[i] + ".png"
        });

        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }
    closeNav();
    if (count == 0) {
        writeMarker(null);
    }
}

// Delete a Marker from the database
function deleteFromDatabase() {
    firebase.database().ref('Marker').remove();
}

function readFromDatabase() {
    database = firebase.database();
    var ref = database.ref('Marker');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    var stuff = data.val()
    var keys = Object.keys(stuff);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        latitudes.push(stuff[k].Latitude);
        longitudes.push(stuff[k].Longitude);
        creators.push(stuff[k].Creator);
        pictures.push(stuff[k].Picture);
        buildings.push(stuff[k].Building);
        durations.push(stuff[k].Duration);
        creationTimes.push(stuff[k].Creation);
        events.push(stuff[k].Event);
        likes.push(stuff[k].Likes);
        additionals.push(stuff[k].Additional);
        foods.push(stuff[k].Food);
    }
}

function errData(err) {
    console.log(error);
}

// Function capitalizes the first letter and makes it plural when needed
function formatFood(food) {
    if (food.valueOf() == "burger" || food.valueOf() == "taco" || food.valueOf() == "hotdog" || food.valueOf() == "snack") food += "s";
    if (food.valueOf() == "sandwich") food += "es";
    food = food.charAt(0).toUpperCase() + food.slice(1); // capitalizes letter
    return food;
} // formatFood

// Gets the ending time based on the creation time and duration
function getEndTimeFromDuration(duration, date) {
    var hours = parseInt(date.substring(0, 2));
    var minutes = parseInt(date.substring(3, 5));
    console.log("Hello: " + duration.charAt(0));
    if (duration.charAt(0) != '0' && parseInt(duration) >= 1) hours += parseInt(duration);
    else if (minutes < 30) minutes += 30;
    else { hours += 1; minutes -= 30; }
    
    if (minutes > 45) { minutes = 0; hours = hours + 1;}
    else if (minutes > 30) minutes = 45;
    else if (minutes > 15) minutes = 30;
    else if (minutes > 0) minutes = 15;
    if (hours > 23) hours -= 24;
    if (hours == 0) hours = 12;
    if (hours > 12) hours -= 12;
    var endTimeStr = "";
    endTimeStr += hours;
    endTimeStr += ":";
    if (minutes < 10) endTimeStr += "0";
    endTimeStr += minutes;
    var dur; 
    if (duration.charAt(0) == '0') dur = 0.5;
    else dur = parseInt(duration);
    if (timeHash(parseInt(date.substring(0, 2)), parseInt(date.substring(3, 5)), parseInt(duration)) < 720 || timeHash(parseInt(date.substring(0, 2)), parseInt(date.substring(3, 5)), dur) > 1440) endTimeStr += " AM";
    //console.log(timeHash(parseInt(date.substring(0, 2)), parseInt(date.substring(3, 5)), parseInt(duration)));
    else endTimeStr += " PM";
    //console.log(endTimeStr);
    return endTimeStr;
} // getEndTimeFromDuration

function isDurationOver(duration, creationTime) {
    var date = new Date();
    var dur; 
    if (duration.charAt(0) == '0') dur = 0.5;
    else dur = parseInt(duration);
    var hours = parseInt(creationTime.substring(0, 2));
    var minutes = parseInt(creationTime.substring(3, 5));
    
    if (timeHash(date.getHours(), date.getMinutes(), 0) > timeHash(hours, minutes, dur)) return true;
    return false;
} // isDurationOver

function timeHash(hours, minutes, duration) {
    return (hours + duration) * 60 + minutes;
}

function getStartTimeFromCreationTime(time) {
    var hours = parseInt(time.substring(0, 2));
    var minutes = parseInt(time.substring(3, 5));
    var amOrPm = "";
    if (minutes > 45) { minutes = 0; hours = hours + 1; }
    else if (minutes > 30) minutes = 45;
    else if (minutes > 15) minutes = 30;
    else if (minutes > 0) minutes = 15;

    if (hours == 24) hours = 0;
    
    if (hours >= 12) { amOrPm = " PM"; hours -= 12; }
    else amOrPm = " AM";
    if (minutes == 0) return hours + ":" + "00" + amOrPm;
    return hours + ":" + minutes + amOrPm;
} 

function nameBuilding(b) {
    if (strcmp(b, "Amos") == 0 || strcmp(b, "Baldwin") == 0 || strcmp(b, "Barrow") == 0 || 
    strcmp(b, "Benson") == 0 || strcmp(b, "Brooks") == 0 || strcmp(b, "Brown") == 0 ||
    strcmp(b, "Dawson") == 0 || strcmp(b, "Caldwell") == 0 || strcmp(b, "Chandler") == 0 || 
    strcmp(b, "Conner") == 0 || strcmp(b, "Correll") == 0 || strcmp(b, "Denmark") == 0 || 
    strcmp(b, "Busbee") == 0 || strcmp(b, "Gilbert") == 0 || strcmp(b, "Hardman") == 0 || 
    strcmp(b, "Hardman") == 0)
    return b + " Hall";
    return b;

}

