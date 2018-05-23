"use strict"


//__________________________________________________Déclarations des const utilisées dans le programme:

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
const validButtonElt = createInput("valid_button", "submit", "Valider");
const clearButtonElt = createInput("clear_button", "button", "Effacer");

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

//Ajout des différents éléments cités au dessus :
containerCountDownElt.appendChild(messageNoBookingElt);
containerCountDownElt.appendChild(messageValidBookingElt);
containerCountDownElt.appendChild(countDownElt);

mainWrapperElt.insertBefore(containerCountDownElt, footerElt);

//Déclaration d'un tableau des stations :
var stationsArray = [];





//_______________________________________________________________appel AJAX:
fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b9eae55b32f61852fc6a740a3867d131bb01dd37')
    .then(infosStations => infosStations.json())
    .then(data => displayStations(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));




//_____________________________________________________Déclarations des fonctions utilisées :


//---------------------fonction pour déclarer le tableau des stations :
function displayStations(station) {
    //Intanciation de l'objet stationArray avec la class Station :
    stationsArray = station.map(station => new Station(station.name, station.address, station.banking, station.position, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes));
    return stationsArray;
}


//--------------------------------fonction pour les images des marqueurs :
function iconMarker(station) {

    //si les stations sont ouvertes et n'ont aucun vélo de disponible alors les marqueurs sont verts :
    if (station.status === "OPEN" && station.availableBikes === 0) {
        return "images/iconlyon_vert.png";
    //si les stations sont ouvertes alors les marqueurs sont rouges :
    } else if (station.status === "OPEN") {
        return 'images/iconelyon.png';
    }
    //Dans les autres cas les marqueurs sont bleus :
    return "images/iconelyon_bleu.png";
}

/* ce que j'avais fait de mon côté qui ne fonctionnait pas :
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

//----------------------fonction pour Déclarer la google map, les marqueurs positionnés sur celle-ci et les events associés :
function initMap(data) {
    //Déclaration et ajout de la google map :
    const googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 45.750000,
            lng: 4.850000
        }
    });

    //Boucle qui parcours les stations de Lyon afin d'ajouter un marqueur par station sur la google map ainsi que des events associés :
    data.forEach(function (station) {
        //si une reservation est présente dans sessionStorage sur tel station on lui retire le vélo qui a été reservé :
        if (station.name === sessionStorage.getItem("station")) {
            station.availableBikes--;
        }


        //Déclaration et ajout de l'objet marqueur :
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(station.position),
            map: googleMap,
            icon: iconMarker(station)
        });

        //------------ajout de l'event quand l'utilisateur click sur un marqueur :
        marker.addListener('click', function () {
            
            //Intenciation de l'objet infoStation avec la class Station :
            const infoStation = new Station();
            ////Appel de la méthode divInfoStation(station) de l'objet infoStation pour faire la div "info_stations" :
            infoStation.divInfoStation(station);


            //---Ajout d'un event sur le bouton valider du formulaire :
            validButtonElt.addEventListener("click", function (e) {
                //est ce vraiment necéssaire :
                /*if (sessionStorage.length >= 1){
                    sessionStorage.clear();  
                }*/

                if (signaturePad.isEmpty() === true) {
                    e.preventDefault();
                    return alert("blabla");

                } else {
                    //Création d'un var dateBooking pour calculer le compte à rebour :
                    var dateBooking = new Date();

                    //Enregistrement des clés et valeurs (infos de réservation) dans le navigateur avec sessionStorage :
                    sessionStorage.setItem("prénom", inputFirstNameElt.value);
                    sessionStorage.setItem("nom", inputLastNameElt.value);
                    sessionStorage.setItem("signature", signature);
                    sessionStorage.setItem("date", dateBooking);
                    sessionStorage.setItem("station", station.name);
                    sessionStorage.setItem("booking_status", true);
                    sessionStorage.setItem("availablesBikes", station.availableBikes - 1);

                    //Récupération des données enregistrées dans le navigateur :
                    sessionStorage.getItem("date");
                    sessionStorage.getItem("station");
                    sessionStorage.getItem("availablesBikes");

                    //Démarrage du compte à rebour avec class timer :
                    /*var timerObject = new Timer(20, (sessionStorage.getItem("date")));
                    timerObject.myTimer();
                    timerObject.exeTimer();*/

                    //Démarrage du compte à rebour avec fonction :
                    myVar;

                }

            });


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


//___________________________________________________Ajouts d'events :


//--------ajout de l'event quand l'utilisateur click sur le bouton réserver :

bookingButtonElt.addEventListener("click", function () {

    //Instanciation de l'objet createBooking avec la class Booking :
    const createBooking = new Booking();
    //Appel de la méthode booking de l'objet createBooking pour faire apparaitre le formulaire de réservation :
    createBooking.booking();

});

//---------------ajout d'un event sur le bouton effacer :

clearButtonElt.addEventListener("click", function () {
    //La signature du canvas s'efface :
    signaturePad.clear();
});










