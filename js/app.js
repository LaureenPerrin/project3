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
var validButtonElt = document.getElementById("valid_button");
const clearButtonElt = document.getElementById("clear_button");

//Déclaration du footer :
const footerElt = document.querySelector("footer");

//Déclaration de la div qui contient le compte à rebour :
const containerCountDownElt = document.getElementById("container_count_down");

//Déclaration de l'élément qui indique quand il n'y a pas de réservation :
const messageNoBookingElt = document.getElementById("message_no_booking");

//Déclaration de l'élément qui indique quand il y a une réservation et dans quelle station :
const messageValidBookingElt = document.getElementById("message_valid_booking");

//Déclaration de l'élément qui affiche le compte à rebour :
const countDownElt = document.getElementById("count_down");

//Instanciation de l'objet createBooking avec la class Booking :
const booking = new Booking();

//Déclaration du canvas et instanciation de l'objet Canvas :
var newCanvas = document.getElementById('canvas');
var Canvas = new NewCanvas(newCanvas, newCanvas.getContext('2d'), 0, 0, 0, 0, 0, false, false);

//Intanciation de l'objet Slider :
var Slider = new NewSlider();

//Appel de sa méthode init pour initialiser le slider :
Slider.init();

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

    //Instanciation de l'objet googlMap avec la class Map :
    const googleMap = new google.maps.Map(document.getElementById('map')/*noeud*/, /*options*/{
        zoom: 12,
        center: {
            lat: 45.750000,
            lng: 4.850000
        }
    });

    //Boucle qui parcours les stations de Lyon afin d'ajouter un marqueur par station sur la googleMap ainsi que des events associés :
    data.forEach(function (station) {

        //Intanciation de l'objet marker avec Le constructeur google.maps.Marker qui utilise un objet littéral Marker options unique qui spécifie les propriétés initiales du marqueur :
        const marker = new google.maps.Marker({
            //Position des marqueurs sur chaques stations de Lyon (intanciation de position avec la class LatLng :
            position: new google.maps.LatLng(station.position),
            map: googleMap,
            icon: station.setIconMarker(station)
        });

        //------------Ajout d'un event quand l'utilisateur click sur un marqueur :
        marker.addListener('click', function () {

            //Appel de la méthode divInfoStation(station) de l'objet station pour mettre en place et faire apparaitre la div "info_stations" :
            station.divInfoStation(station);
            //--------Ajout de l'event quand l'utilisateur click sur le bouton réserver :
            bookingButtonElt.addEventListener("click", function () {
                
                //Appel de la méthode booking de l'objet createBooking pour faire apparaitre le formulaire de réservation :
                booking.initBooking();

            });

            //---Ajout d'un event sur le bouton valider du formulaire :
            validButtonElt.addEventListener("click", function (e) {
                
                e.preventDefault();
                //Supprime les données si déjà existantes :
                booking.storeBookingWebCondition();

                //Si l'utilisateur n'a pas remplit tous les champs alors une fenêtre apparaît avec le message suivant :
                if (inputFirstNameElt.value == "" || inputLastNameElt.value == "" || Canvas.emptyCanvas()) {
                    
                    alert("Veuillez remplir tous les champs s'il vous plaît !");
                } else {
                    //Enregistre toutes les données voulue
                    booking.storeBookingWeb(station);
                    station.isAvailableBikes(station);

                    const myDate = new Date();
                    const savedDate = sessionStorage.getItem('date');
                    const newTimer = new NewTimer(1, savedDate, myDate);

                    newTimer.initTimer(station);

                    //Instanciation d'un objet user avec la class User :
                    var UserCreated = new User(sessionStorage.getItem("nom"), sessionStorage.getItem("prénom"), sessionStorage.getItem("signature"));
                    //Instanciation d'un objet validBooking avec la class Booking :
                    var validBooking = new Booking(sessionStorage.getItem("booking_status"),sessionStorage.getItem("date"), UserCreated);
                    //Insertion des validBooking créé dans le tableau validBookings :
                    validBookings.push(validBooking);
                    
                }
                formElt.style.display = "none";
                infoStationsElt.style.display = "none";
            });
        });
        //Ajout des marqueurs dans le tableau markers :
        markers.push(marker);
    });

    //Intanciation de l'objet markerCluster avec la class MarkerClusterer pour le regroupement des marqeurs :
    const markerCluster = new MarkerClusterer(googleMap, markers, {
        imagePath: 'images/m',
    });

    return googleMap;
};

//___________________________________________________Ajouts d'events :


//---------------Ajout d'un event sur le bouton effacer :
clearButtonElt.addEventListener("click", function () {
    //Apple de la méthode clearDraw de l'objet createCanvas pour effacer la signature du canvas :
    Canvas.clearCanvas();
});

