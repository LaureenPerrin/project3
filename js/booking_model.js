
//---------------------class Booking  pour les réservation de vélo :

class Booking {
    constructor(status, date, User) {
        this.status = status;
        this.date = date;
        this.user = User;
    }

    //-----Méthode pour accéder à la réservation :

    booking() {
        formElt.style.display = "block";
    }

}




