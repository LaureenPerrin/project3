"use strict"

//__________________________________________________Déclarations des const utilisées dans le programme :

//Déclaration du mainWrapper :
const mainWrapperElt = document.getElementById("main_wrapper");

//Déclaration de la header :
const headerElt = document.querySelector("header");

//Déclaration de la div contenant le slider :
const sliderElt = document.querySelector("slider_container");

//Déclaration du tableau des marqueurs :
const markers = [];

//Déclaration du tableau des user :
const users = [];

//Déclaration du tableau des validBooking :
const validBookings = [];

//Déclaration de la div de la google map :
const mapZoneElt = document.querySelector("map");

//Déclaration de la div d'informations sur les stations et les éléments quelle comporte :
const infoStationsElt = document.getElementById("info_stations");
const nameStationElt = document.getElementById("name_station");
const addressStationElt = document.getElementById("address_station");
const bankingStationElt = document.getElementById("banking_station");
const statusStationElt = document.getElementById("status_station");
const bikestandsStationElt = document.getElementById("bike_stands_stations");
const availableBikeStandsStationElt = document.getElementById("available_bike_stands_station");
const availableBikesStationElt = document.getElementById("available_bikes_station");
const bookingButtonElt = document.getElementById("booking_button");

//Déclaration du formulaire de réservation :
const formElt = document.getElementById("form_canvas");

//Déclaration des inputs du formulaire :
const inputFirstNameElt = document.getElementById("input_first_name");
const inputLastNameElt = document.getElementById("input_last_name");

//Déclaration des bouttons valider et effacer :
const validButtonElt = document.getElementById("valid_button");
const clearButtonElt = document.getElementById("clear_button");

//Déclaration du footer :
const footerElt = document.querySelector("footer");

//Déclaration de la div qui contient le compte à rebour :
const containerCountDownElt = document.createElement("div");
containerCountDownElt.id = "container_count_down";

//Déclaration de l'élément qui affiche le compte à rebour :
const countDownElt = document.createElement("p");
countDownElt.id = "count_down";

//Déclaration de l'élément qui indique quand il n'y a pas de réservation :
const messageNoBookingElt = document.createElement("p");
messageNoBookingElt.id = "message_no_booking";
messageNoBookingElt.textContent = "Aucune réservation.";

//Déclaration de l'élément qui indique quand il y a une réservation et dans quelle station :
const messageValidBookingElt = document.createElement("p");
messageValidBookingElt.id = "message_valid_booking";

//Ajout des différents éléments cités au dessus dans l'élément containerCountDownElt :
containerCountDownElt.appendChild(messageNoBookingElt);
containerCountDownElt.appendChild(messageValidBookingElt);
containerCountDownElt.appendChild(countDownElt);

//Ajout de l'élément containerCountDownElt dans l'élément mainWrapperElt avant son élément enfant footerElt :
mainWrapperElt.insertBefore(containerCountDownElt, footerElt);

//_______________________________________________________________Appel AJAX:

fetch('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
    .then(infosStations => infosStations.json())
    .then(data => displayStations(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));

//_____________________________________________________Déclarations des fonctions utilisées :

//---------------------Fonction pour déclarer le tableau des stations :

function displayStations(station) {

    //Intanciation de l'objet stationArray avec la class Station :
    var stationsArray = station.map(station => new Station(station.name, station.address, station.banking, station.position, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes));
    return stationsArray;
}

//----------------------Fonction pour déclarer la google map, les marqueurs positionnés sur celle-ci et les events associés :

function initMap(data) {

    //Intanciation de l'objet googleMap avec la class Map :
    const googleMap = new google.maps.Map(document.getElementById('map')/*noeud*/, /*options*/{
        //Zoom de la carte :
        zoom: 12,
        //Coordonnées gps de Lyon :
        center: {
            lat: 45.750000,
            lng: 4.850000
        }
    });

    //Boucle qui parcours les stations de Lyon afin d'ajouter un marqueur par station sur la googleMap ainsi que des events associés :

    data.forEach(function (station) {

        //Si une réservation est présente dans sessionStorage sur telle station on lui retire le vélo qui a été reservé :
        if (station.name === sessionStorage.getItem("station")) {
            station.availableBikes--;
        }

        //Intanciation de l'objet marker avec Le constructeur google.maps.Marker qui utilise un objet littéral Marker options unique qui spécifie les propriétés initiales du marqueur :
        const marker = new google.maps.Marker({
            //Position des marqueurs sur chaques stations de Lyon (intanciation de position avec la class LatLng :
            position: new google.maps.LatLng(station.position),
            //Spécifie l'objet googlMap sur lequel positionner les marqueurs :
            map: googleMap,
            //Appel de la méthode setIconMarker() de l'objet station pour mettre en places les images des marqueurs :
            icon: station.setIconMarker(station)
        });

        //------------Ajout d'un event quand l'utilisateur click sur un marqueur :

        marker.addListener('click', function () {

            //Appel de la méthode divInfoStation(station) de l'objet station pour mettre en place et faire apparaitre la div "info_stations" :
            station.divInfoStation(station);

            //---Ajout d'un event sur le bouton valider du formulaire :

            validButtonElt.addEventListener("click", function (e) {

                //Si l'utilisateur n'a pas signé alors une fenêtre apparaît avec le message suivant :
                if (signaturePad.isEmpty() === true) {
                    //Stop le comportement d'origine de l'event tant que l'utilisateur n'a pas signé :
                    e.preventDefault();
                    return alert("Veuillez signer s'il vous plaît !");

                    //Sinon la réservation peut se faire :
                } else {

                    //Création d'une var dateBooking pour calculer le compte à rebour :
                    var dateBooking = new Date();

                    //Enregistrement des clés et valeurs (infos de réservation) dans le navigateur avec sessionStorage :
                    sessionStorage.setItem("prénom", inputFirstNameElt.value);
                    sessionStorage.setItem("nom", inputLastNameElt.value);
                    sessionStorage.setItem("signature", signature);
                    sessionStorage.setItem("date", dateBooking);
                    sessionStorage.setItem("station", station.name);
                    sessionStorage.setItem("booking_status", true);

                    //Récupération des données enregistrées dans le navigateur :
                    sessionStorage.getItem("date");

                    //Démarrage du timer :
                    myVar;

                }

            });

        });

        //Ajout des marqueurs dans le tableau markers :
        markers.push(marker);
    });

    //Intanciation de l'objet markerCluster avec la class MarkerClusterer pour le regroupement des marqeurs :
    const markerCluster = new MarkerClusterer(googleMap, markers, {
        //Images utiliser pour le regroupement :
        imagePath: 'images/m',
    });

    //Instanciation d'un objet user avec la class User :
    //var user = new User(sessionStorage.getItem("nom"), sessionStorage.getItem("prénom"), sessionStorage.getItem("signature"));
    var user = new User(sessionStorage.getItem("nom"), sessionStorage.getItem("prénom"), sessionStorage.getItem("signature"));
    //Insertion des user créé dans le tableau users :
    users.push(user);

    //Instanciation d'un objet validBooking avec la class Booking :
    var validBooking = new Booking(true, sessionStorage.getItem("date"), users);
    //Insertion des validBooking créé dans le tableau validBookings :
    validBookings.push(validBooking);

    return googleMap;

};

//___________________________________________________Ajouts d'events :

//--------Ajout de l'event quand l'utilisateur click sur le bouton réserver :

bookingButtonElt.addEventListener("click", function () {

    //Instanciation de l'objet createBooking avec la class Booking :
    const createBooking = new Booking();
    //Appel de la méthode booking de l'objet createBooking pour faire apparaitre le formulaire de réservation :
    createBooking.booking();

});

//---------------Ajout d'un event sur le bouton effacer :

clearButtonElt.addEventListener("click", function () {

    //La signature du canvas s'efface :
    signaturePad.clear();
});










