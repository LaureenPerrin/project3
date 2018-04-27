"use strict";
//__________________________________________________Déclaration des const utilisées dans le programme:
const mainWrapperElt = document.querySelector("main_wrapper");

const headerElt = document.querySelector("header");

const sliderElt = document.querySelector("slider_container");

const mapZoneElt = document.querySelector("map");

const footerElt = document.querySelector("footer");


ajaxGet("https://js/lyon.json",function (reponse) {
    var stationsTable = JSON.parse(reponse);
  console.log(stationsTable);
});

//__________________________________________________création et ajout google map :
function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 45.750000, lng: 4.850000}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
      var locations = ""


//________________________________________________________________Déclarations des class :

//----------------------------------------------------------------class User :
/*class User {
  constructor(lastName, firstName, signature) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.signature = signature;

}*/


//----------------------------------------------------------------class Station :
class Station {
  constructor (name, address, position, banking, status, availableBikes, availableBikeStands) {
    this.name = name;
    this.address = address,
    this.position = position;
    this.banking = banking;
    this.status = status;
    this.availableBikes = availableBikes;
    this.availableBikeStands = availableBikeStands;
  }

  displayPosition() {
    return this.position;
  }
}

    
 function displayStations(stations) {
 var stationsArray = stations.map(station => new Station(station.name, station.address, station.position)); 
 for (let i = 0; i < stationsArray.length; i++) {
 const locStation = stationsArray[i].position;
 console.log(locStation);
}
};






//_________________________________________________appel AJAX:
fetch('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
  // ligne 19 = function anonyme === function() {}
  .then(reponse => reponse.json())
  .then(data => displayStations(data))
  .catch(error => console.log(error));


