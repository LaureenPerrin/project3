"use strict"
//__________________________________________________Déclaration des const utilisées dans le programme:
const mainWrapperElt = document.getElementById("main_wrapper");

const headerElt = document.querySelector("header");

const sliderElt = document.querySelector("slider_container");

const mapZoneElt = document.querySelector("map");

const infoStationsElt = document.getElementById("info_stations");

const nameStationElt = document.getElementById("name_station");

const addressStationElt = document.getElementById("address_station");

const bankingStationElt = document.getElementById("banking_station");

const statusStationElt = document.getElementById("status_station");

const bikestandsStationElt = document.getElementById("bike_stands_stations");

const availableBikeStandsStationElt = document.getElementById("available_bike_stands_station");

const availableBikesStationElt = document.getElementById("available_bikes_station");

const footerElt = document.querySelector("footer");

const bookingButtonElt = document.getElementById("booking_button");

//________________________________________________________________Déclarations des class :

//----------------------------------------------------------------class User :
class User {
  constructor(lastName, firstName, signature) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.signature = signature;
  }
};



//----------------------------------------------------------------class Station :
class Station {
  constructor (name, address, banking, position, status, bikestands, availableBikeStands, availableBikes) {
    this.name = name;
    this.address = address,
    this.banking = banking;
    this.position = position;
    this.status = status;
    this.bikestands = bikestands;
    this.availableBikeStands = availableBikeStands;
    this.availableBikes = availableBikes;
  }
};

//--------------------------------------------------------------class Booking :

class Booking {
  constructor (status) {
    this.status = status;
  }
};


//__________________________________________Déclaration des fonctions utilisées :

function createInput (id, type, value, parent) {
  const inputCanvasElt = document.createElement("input");
  inputCanvasElt.id = id;
  inputCanvasElt.setAttribute("type", type);
  inputCanvasElt.setAttribute("value", value);
  parent.appendChild(inputCanvasElt);
  return inputCanvasElt;
}

//---------------------------------------------Déclaration d'un tableau des stations :
function displayStations(stations) {

  const stationsArray = stations.map(station => new Station(station.name, station.address, station.banking, station.position, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes));
  console.log(stationsArray);
  return stationsArray;
};

//------------------------------------------------Déclaration/ajout google map et marqueurs :
function initMap(data) {

  const googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 45.750000, lng: 4.850000}
  });

  const markers =[];
  data.forEach(function (stations){
    const icon = "images/iconelyon.png";

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(stations.position),
      map: googleMap,
      icon: icon
    });
    marker.addListener('click', function() {
     infoStationsElt.style.display = "block";
     infoStationsElt.style.display = "flex";
     nameStationElt.textContent = "Station : " + stations.name;
     addressStationElt.textContent = "Adresse : " + stations.address;
     bankingStationElt.textContent = stations.banking;
     const banking = stations.banking;
     //interpretation de la propriété banking :
     if (banking === true){
      bankingStationElt.textContent = "Cette station a un terminal de paiement.";
     } else {
      bankingStationElt.textContent = "Cette station n'a pas de terminal de paiement.";
     }
     statusStationElt.textContent = stations.status;
     const status = stations.status;
     if (status === open) {

      statusStationElt.textContent = "Elle est actuellement ouverte.";
     } else {
      statusStationElt.textContent = "Elle est actuellement fermée.";
     }
     bikestandsStationElt.textContent = stations.bikestands + " points d'attache opérationnels.";
     availableBikeStandsStationElt.textContent = stations.availableBikeStands + " points d'attache disponibles pour y ranger un vélo.";
     availableBikesStationElt.textContent = stations.availableBikes + "  vélos disponibles et opérationnels.";

      bookingButtonElt.addEventListener("click", function() {
      const formElt = document.createElement("form");
      formElt.id = "form_canvas";
      mainWrapperElt.insertBefore(formElt, footerElt);
//<label>Cliquez ici<input type="text" id="Utilisateur" name="Nom" /></label>
      const firtsNameElt = document.createElement("label");
      firtsNameElt.id = "first_name";
      firtsNameElt.textContent = "Prénom : ";
      const inputFirstNameElt = createInput("input_first_name", "text", "", firtsNameElt);
      formElt.appendChild(firtsNameElt);

      const lastNameElt = document.createElement("label");
      lastNameElt.id = "last_name";
      lastNameElt.textContent = "Nom : ";
      const inputLastNameElt = createInput("input_last_name", "text", "", lastNameElt);
      formElt.appendChild(lastNameElt);

      const titleSignatureElt = document.createElement("p");
      titleSignatureElt.id = "title_signature";
      titleSignatureElt.textContent = "Signature :";
      formElt.appendChild(titleSignatureElt);

      const canvasElt = document.createElement("canvas");
      canvasElt.id = "canvas_elt";
      const canvasContextElt = canvasElt.getContext("2d");
      formElt.appendChild(canvasElt);

      const validButtonElt = createInput("valid_button", "submit", "Valider", formElt);
      const clearButtonElt = createInput("clear_button", "button", "Effacer", formElt);
     })
   });
    markers.push(marker);
  });
  const markerCluster = new MarkerClusterer(googleMap, markers, {
    imagePath: 'images/m',

  })
  return googleMap;
};


//_________________________________________________appel AJAX:
fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
.then(infosStations => infosStations.json())
.then(data => displayStations(data))
.then(data => initMap(data))
.catch(error => console.log(error));


//__________________________________________________Ajout event :

//-----------------------------------------------event sur marker :


