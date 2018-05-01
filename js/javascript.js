"use strict"
//__________________________________________________Déclaration des const utilisées dans le programme:
const mainWrapperElt = document.querySelector("main_wrapper");

const headerElt = document.querySelector("header");

const sliderElt = document.querySelector("slider_container");

const mapZoneElt = document.querySelector("map");

const footerElt = document.querySelector("footer");


//__________________________________________________Déclaration google map :



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
  const stationsArray = stations.map(station => new Station(station.name, station.address, station.position)); 
  for (let i = 0; i < stationsArray.length; i++) {
    const locStation = stationsArray[i].displayPosition();
    console.log(locStation);
  }
  return stationsArray;
};

function initMap(data) {

        const googleMap = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 45.750000, lng: 4.850000}
        });
         createMarker(data);
        return googleMap;

};
 
function createMarker () {
    stationsArray.forEach(function (stations){
                const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(stations.position),
                    map: googleMap
                });
              });
  };

//_________________________________________________appel AJAX:
fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
  .then(infosStations => infosStations.json())
  .then(data => displayStations(data))
  .then(data => initMap(data))
  .then(data => createMarker(data))
  .catch(error => console.log(error));
