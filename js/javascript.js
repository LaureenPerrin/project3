"use strict"


//__________________________________________________Déclarations des const utilisées dans le programme:
var storage = window.sessionStorage;
const mainWrapperElt = document.getElementById("main_wrapper");

const headerElt = document.querySelector("header");

const sliderElt = document.querySelector("slider_container");

//tableau des marqueurs :
const markers = [];

//google map :
const mapZoneElt = document.querySelector("map");

//la div d'informations sur les stations :
const infoStationsElt = document.getElementById("info_stations");

const nameStationElt = document.getElementById("name_station");
const addressStationElt = document.getElementById("address_station");
const bankingStationElt = document.getElementById("banking_station");
const statusStationElt = document.getElementById("status_station");
const bikestandsStationElt = document.getElementById("bike_stands_stations");
const availableBikeStandsStationElt = document.getElementById("available_bike_stands_station");
const availableBikesStationElt = document.getElementById("available_bikes_station");
const bookingButtonElt = document.getElementById("booking_button");

//déclaration du formulaire de réservation :
const formElt = document.createElement("form");

const inputFirstNameElt = createInput("input_first_name", "text", "");
const inputLastNameElt = createInput("input_last_name", "text", "");

//Déclaration et ajout des bouttons valider et effacer :
const validButtonElt = createInput("valid_button", "button", "Valider");
const clearButtonElt = createInput("clear_button", "button", "Effacer");

//Déclaration du compte à rebour :
const containerCountDownElt = document.getElementById("container_countdown");
const countDownElt = document.getElementById("count_down");
let time = 1200;
let counter;

const footerElt = document.querySelector("footer");
var stationsArray = [];


//_______________________________________________________________appel AJAX:
fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
    .then(infosStations => infosStations.json())
    .then(data => displayStations(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));




//_____________________________________________________Déclarations des fonctions utilisées :


//---------------------fonction pour déclarer le tableau des stations :
function displayStations (stations) {
    //Déclaration de l'objet station et du tableau stationsArray :
    stationsArray = stations.map(station => new Station(station.name, station.address, station.banking, station.position, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes));
    console.log(stationsArray);
    return stationsArray;
}



//--------------------------------fonction pour les images des marqueurs :
function iconMarker(stations) {
    if (stations.status === "OPEN" && stations.availableBikes === 0) {
        return "images/iconlyon_vert.png";
    } else if (stations.status === "OPEN") {
        return 'images/iconelyon.png';
    }
    return "images/iconelyon_bleu.png";
}

/*
if (stations.status ==="OPEN"){
    return "images/iconelyon.png";
}else if (stations.status === "OPEN" && stations.availableBikes === 0) {
    return "images/iconlyon_vert.png";
} else {
    return "images/iconelyon_bleu.png";
}
*/

//-----------------------------------fonction pour créer des inputs :
function createInput(id, type, value) {
    const inputCanvasElt = document.createElement("input");
    inputCanvasElt.id = id;
    inputCanvasElt.setAttribute("type", type);
    inputCanvasElt.setAttribute("value", value);
    inputCanvasElt.setAttribute("required", "required");

    return inputCanvasElt;
}

//-----------------------fonction pour le compte à rebour :

function countdown(bibi) {

    if (time <= 0) {
        clearInterval(counter);
    }

    let minutes = Math.floor((time % 3600) / 60);
    let secondes = time % 60;

    countDownElt.textContent = minutes + " minute(s) " + secondes + " secondes(s)";

    time--;

}

function startCountdown() {
    countdown();
    counter = setInterval("countdown()", 1000);

}

//-----function pour déclarer, ajouter et créer des event sur la google map et les marqueurs,:

function initMap(data) {
    //Déclaration et ajout de la google map :
    const googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 45.750000,
            lng: 4.850000
        }
    });

    //Boucle qui parcours les stations de Lyon afin d'ajouter un marqueur par station sur la google map :
    data.forEach(function(stations) {

        //Déclaration et ajout de l'objet marqueur :
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(stations.position),
            map: googleMap,
            icon: iconMarker(stations)
        });

        //------------ajout de l'event quand l'utilisateur click sur un marqueur :
        marker.addListener('click', function() {
            //la div "info_stations" apparait quand l'utilisateur click sur un marqueur :
            const infoStation = new Station();
            infoStation.divInfoStation(stations);
        });


        //ajout des marqueurs dans le tableau markers :
        markers.push(marker);
    });


    //Déclaration et ajout de l'objet markercluster pour le regroupement de tous les marqeurs :
    const markerCluster = new MarkerClusterer(googleMap, markers, {
        imagePath: 'images/m',
    });

    return googleMap;
};


//___________________________________________________Ajout d'events :


//--------ajout de l'event quand l'utilisateur click sur le bouton réserver :

bookingButtonElt.addEventListener("click", function() {

    const createBooking = new Booking();
    createBooking.booking();

});


/*function validateBooking(e) {
    if (validCanvas === true && valueFirstName != null && valueLastName != null) {

        sessionStorage.setItem("firstName", valueFirstName);
        sessionStorage.setItem("lastName", valueLastName);
        sessionStorage.setItem("signature", signature);

    } else if (validCanvas === false) {
        alert("Veullez signer !")
        e.preventDefault();
    }
}*/

function validBooking() {
    var dateBooking = new Date();

        var nom = inputLastNameElt.value;
        var prenom = inputFirstNameElt.value;
        var signature = signaturePad.toDataURL('image/png');
        var validUser = new User(nom, prenom, signature);
        console.log(validUser);

      if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }
        else if (signaturePad.isEmpty() === true) {//sessionStorage.setItem("station", nameStation);
        sessionStorage.setItem("user_firstName", prenom);
        sessionStorage.setItem("user_lastName", nom);
        sessionStorage.setItem("signature", signature);
        sessionStorage.setItem("booking_status", true);
        sessionStorage.setItem("date_booking", dateBooking);

       startCountdown();
    }
}



//---------------ajout d'un event sur le bouton valider :

var storageStation = sessionStorage.getItem('station');
var storageUserFirstName = sessionStorage.getItem('user_firstName');
var storageUserFirstName = sessionStorage.getItem('user_lastName');
var storageStatusBooking = sessionStorage.getItem('booking_status');
var storageDateBooking = sessionStorage.getItem('date_booking');




validButtonElt.addEventListener("click", function() {
    validBooking();
    })
    
