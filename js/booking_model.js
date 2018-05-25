//---------------------class Booking  pour les réservation de vélo :

class Booking {
    constructor(status, User) {
        this.status = status;
        this.user = User;
    }

    //méthode pour accéder à la réservation :
    booking() {
        formElt.style.display = "block";
    };

}




