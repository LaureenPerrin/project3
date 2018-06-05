
//-----------------------class Station pour les stations de vélo de Lyon :

class Station {
    constructor(name, address, banking, position, status, bikestands, availableBikeStands, availableBikes) {
        this.name = name;
        this.address = address;
        this.banking = banking;
        this.position = position;
        this.status = status;
        this.bikestands = bikestands;
        this.availableBikeStands = availableBikeStands;
        this.availableBikes = availableBikes;
    }

    //---------------------------------Méthode pour personnaliser les images des marqueurs :

    setIconMarker(station) {

        //Si les stations sont ouvertes et n'ont aucun vélo de disponible alors les marqueurs sont bleus :
        if (station.status === "OPEN" && station.availableBikes === 0) {
            return "images/iconlyon_bleu.png";
            //Si les stations sont ouvertes alors les marqueurs sont verts :
        } else if (station.status === "OPEN") {
            return "images/iconlyon_vert.png";
        }
        //Dans les autres cas les marqueurs sont rouges :
        return "images/iconelyon.png";
    }

    //---------------------------------Méthode pour créer la div infoStation :

    divInfoStation(station) {

        infoStationsElt.style.display = "block";
        infoStationsElt.style.display = "flex";
        nameStationElt.textContent = "Station : " + station.name;
        addressStationElt.textContent = "Adresse : " + station.address;
        bankingStationElt.textContent = station.banking;

        //Si bankingStationElt égal à true alors la station sélectionnée a un terminal de paiement et le premier message apparait :
        if (bankingStationElt.textContent) {
            bankingStationElt.textContent = "Cette station a un terminal de paiement.";
            //Autrement la station sélectionnée n'a pas de terminal de paiement et le second message apparait :
        } else {
            bankingStationElt.textContent = "Cette station n'a pas de terminal de paiement.";
        }

        statusStationElt.textContent = station.status;

        //Si statusStationElt est égal à open alors la station sélectionnée est ouverte et le premier message apparait :
        if (statusStationElt.textContent === "open") {
            statusStationElt.textContent = "Elle est actuellement ouverte.";
            //Autrement la station sélectionnée est fermée et le second message apparait :
        } else {
            statusStationElt.textContent = "Elle est actuellement fermée.";
        }

        bikestandsStationElt.textContent = station.bikestands + " points d'attache opérationnels.";
        availableBikeStandsStationElt.textContent = station.availableBikeStands + " points d'attache disponibles pour y ranger un vélo.";
        availableBikesStationElt.textContent = station.availableBikes + "  vélos disponibles et opérationnels.";

        //Si 0 vélo de disponible dans la station ou que celle-ci est fermée alors l'utilisateur ne peux pas appuyer sur le bouton valider et donc réserver un vélo :
        if (station.availableBikes === 0 || station.status !== "OPEN") {
            bookingButtonElt.disabled = true;
        } else {
            //Sinon l'utilisateur peut appuyer sur le bouton valider :
            bookingButtonElt.disabled = false;
        }

    }

    //---------------------------------Méthode qui permet si une réservation est présente dans sessionStorage sur telle station de lui retirer le vélo qui a été reservé :

    isAvailableBikes(station) {

        if (station.name === sessionStorage.getItem("station")) {
            if (station.availableBikes >= 1) {
                station.availableBikes -= 1;
            }

        } else if (station.name !== sessionStorage.getItem("station")) {
            station.availableBikes += 1;
        }
    }

}
