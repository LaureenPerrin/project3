
//---------------------class Booking  pour les réservation de vélo :

class newBooking {
    constructor(status, date, User) {
        this._status = status;
        this._date = date;
        this._user = User;
    }

    //-----Méthode pour accéder au status de la réservation :

    validBookingStatus() {

        return this._status = true;
    }

    //-----Méthode pour accéder à la réservation :

    initBooking() {
        inputFirstNameElt.value = null;
        inputLastNameElt.value = null;
        Canvas.clearCanvas();

        formElt.style.display = "block";
        //Appel de la méthode initCanvas de l'objet Canvas pour signer :
        Canvas.initCanvas();

    }

    //-----Méthode pour supprimer es données existantes si déjà il y a déjà des données d'enregistrées :

    storeBookingWebCondition(station) {

        //Si il y à déjà des données enregistrées dans sessionStorage :
        if (sessionStorage.lenght !== null) {
            //Alors on les supprime :
            sessionStorage.clear();

        }
    }

    //-----Méthode pour enregistrer dans sessionStorage la réservation :

    storeBookingWeb(station) {

        //Création d'une var dateBooking pour calculer le compte à rebour :
        var dateBooking = new Date();

        //Enregistrement des clés et valeurs (infos de réservation) dans le navigateur avec sessionStorage :
        sessionStorage.setItem("prénom", inputFirstNameElt.value);
        sessionStorage.setItem("nom", inputLastNameElt.value);
        sessionStorage.setItem("signature", Canvas.signature());
        sessionStorage.setItem("date", dateBooking);
        sessionStorage.setItem("station", station.name);
        sessionStorage.setItem("booking_status", this.validBookingStatus());

    }
}




