
//---------------------class Booking  pour les réservation de vélo :

class Booking {
    constructor(date, User) {
        this.status = true;
        this.date = date;
        this.user = User;
    }

    //-----Méthode pour accéder au status de la réservation :

    validBookingStatus() {

        return this.status;
    }

    //-----Méthode pour accéder à la réservation :

    booking() {

        formElt.style.display = "block";
        //Appel de la méthode init de l'objet createCanvas pour signer :
        createCanvas.init();
    }

    //-----Méthode pour supprimer es données existantes si déjà il y a déjà des données d'enregistrées :

    webStorageCondition() {

        //Si il y à déjà des données enregistrées dans sessionStorage :
        if (sessionStorage.lenght >= 1) {
            //Alors on les supprime :
            sessionStorage.clear();
        }
    }

    //-----Méthode pour enregistrer dans sessionStorage la réservation :
    
    webStorage(station) {
        
    //Création d'une var dateBooking pour calculer le compte à rebour :
    var dateBooking = new Date();

    //Enregistrement des clés et valeurs (infos de réservation) dans le navigateur avec sessionStorage :
    sessionStorage.setItem("prénom", inputFirstNameElt.value);
    sessionStorage.setItem("nom", inputLastNameElt.value);
    sessionStorage.setItem("signature", createCanvas.signature());
    sessionStorage.setItem("date", dateBooking);
    sessionStorage.setItem("station", station.name);
    sessionStorage.setItem("booking_status", createBooking.validBookingStatus());

    //Récupération des données enregistrées dans le navigateur :
    sessionStorage.getItem("date");
    }
}




