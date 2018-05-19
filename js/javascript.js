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
//Déclaration et ajout des bouttons valider et effacer :
const validButtonElt = createInput("valid_button", "button", "Valider");
const clearButtonElt = createInput("clear_button", "button", "Effacer");


//Déclaration et ajout du canvas pour que l'utilisateur puisse signer :
const canvas = document.createElement('canvas');
//Déclaration du contexte de dessin dans le canvas :
const context = canvas.getContext("2d");
//Déclaration des let utilisées dans le canvas :
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
//il s'agit du marqueur de la signature :
let paint = undefined;
//il s'agit du contenu du canvas :
let validCanvas = false;

const inputFirstNameElt = createInput("input_first_name", "text", "");
const inputLastNameElt = createInput("input_last_name", "text", "");

const containerCountDownElt = document.getElementById("container_countdown");
const countDownElt = document.getElementById("count_down");
let time = 1200;
let counter;

const footerElt = document.querySelector("footer");



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
    const stationsArray = stations.map(station => new Station(station.name, station.address, station.banking, station.position, station.status, station.bike_stands, station.available_bike_stands, station.available_bikes));
    console.log(stationsArray);
    return stationsArray;
}



//--------------------------------fonction pour les images des marqueurs :
function iconMarker(stations) {
    let icon;
    //condition d'affichage des images des marqueurs :
    //si la station est ouverte le marqueurs est rouge :
    if (stations.status === "OPEN") {
        icon = 'images/iconelyon.png';
        //mais si la station n'a plus de vélos disponibles le marqueur est vert :
        if (stations.availableBikes === 0) {
            icon = "images/iconlyon_vert.png";
        }
        //sinon quand la station n'est pas ouverte le marqueur est bleu :
    } else if (stations.status != "OPEN") {
        icon = "images/iconelyon_bleu.png";
    }
    return icon;
}

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



//---------------------------------fonctions pour le canvas :

//fonction qui enregistre les données de la souris :
function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
};

//fonction pour dessiner les données :
function redraw() {

    //efface le canvas :
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //couleur du dessin :
    context.strokeStyle = "black";
    //coin arrondie lorsque les lignes se rejoignent :
    context.lineJoin = "round";
    //largeur des lignes :
    context.lineWidth = 4;
    //canvas avec signature :
    validCanvas = true;
    //boucle for qui dessine la :
    // signature de l'utilisateur :
    for (let i = 0; i < clickX.length; i++) {
        //introduit le dessin à créer et les méthodes utilisées :
        context.beginPath();
        //permet de prendre en comptetous les données de déplacement :
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        //liaison entre toutes les données (les lignes) :
        context.lineTo(clickX[i], clickY[i]);
        //liaison entre le point actuel (les données actuelles) et le point de départ (les données de départ) de la signature :
        context.closePath();
        //Dessine la signature réellement après avoir pris les données des méthodes précédentes :
        context.stroke();

    }
};

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

            //var nameStation = stations.name;
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



//---------------------Ajout d'events sur le canvas :


//Lorsque l'utilisateur clique sur le canevas, les données de position sont enregistrées dans un tableau via la addClick fonction :
canvas.addEventListener("mousedown", function(e) {
    //e.pageY : renvoie la coordonnée Y (verticale) en pixels de l'événement par rapport au document entier :
    //offsetTop renvoie la distance entre l'élément courant et le haut du nœud offsetParent.
    //Renvoie le nombre de pixels dont le coin supérieur gauche de l'élément courant est décalé vers là gauche au sein du nœud offsetParent.
    const mouseX = e.pageX - this.offsetLeft;
    const mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
    validCanvas = true;
});

//--------Ajout event sur le canvas : quand le marqueur (égal true) est sur le canvas alors les fonction addclick et redraw sont effectuées :
canvas.addEventListener("mousemove", function(e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
        validCanvas = true;
    }
});

//---------Ajout event sur le canvas : quansd le marqueur n'est pas appuyé sur le canvas alors le marqueur n'écrit pas :
canvas.addEventListener("mouseup", function(e) {
    paint = false;
});

////--------Ajout event sur le canvas : quansd le marqueur est en dehors du canvas alors le marqueur n'écrit pas :
canvas.addEventListener("mouseleave", function(e) {
    paint = false;
});


//------------Ajout d'un event sur clearButtonElt : quand l'utilisateur clique sur le bouton effacer les tableaux de données enregistrées sont remis à zéro :
clearButtonElt.addEventListener("mousedown", function(e) {

    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

});





//function teste :
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
        var signature = canvas.toDataURL("image/png");
        var validUser = new User(nom, prenom, signature);
        console.log(validUser);

    if (validCanvas === true) {
        //sessionStorage.setItem("station", nameStation);
        sessionStorage.setItem("user_firstName", prenom);
        sessionStorage.setItem("user_lastName", nom);
        sessionStorage.setItem("signature", signature);
        sessionStorage.setItem("booking_status", true);
        sessionStorage.setItem("date_booking", dateBooking);

       startCountdown();
           } else {
         alert("blabla");
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
    //sessionStorage.setItem("user", userCreate);
    //sessionStorage.setItem("signature", signature);*/
