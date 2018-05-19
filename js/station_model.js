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



    //---------------------------------méthode pour créer la div infoStation :
    divInfoStation(stations) {
        infoStationsElt.style.display = "";
        infoStationsElt.style.display = "flex";
        nameStationElt.textContent = "Station : " + stations.name;
        addressStationElt.textContent = "Adresse : " + stations.address;
        bankingStationElt.textContent = stations.banking;

        //si bankingStationElt égal à true alors la station sélectionnée a un terminal de paiement et le premier message apparait :
        if (bankingStationElt.textContent) {
            bankingStationElt.textContent = "Cette station a un terminal de paiement.";
            //autrement la station sélectionnée n'a pas de terminal de paiement et le second message apparait :
        } else {
            bankingStationElt.textContent = "Cette station n'a pas de terminal de paiement.";
        }

        statusStationElt.textContent = stations.status;

        //si statusStationElt est égal à open alors la station sélectionnée est ouverte et le premier message apparait :
        if (statusStationElt.textContent === "open") {
            statusStationElt.textContent = "Elle est actuellement ouverte.";
            //autrement la station sélectionnée est fermée et le second message apparait :
        } else {
            statusStationElt.textContent = "Elle est actuellement fermée.";
        }
        bikestandsStationElt.textContent = stations.bikestands + " points d'attache opérationnels.";
        availableBikeStandsStationElt.textContent = stations.availableBikeStands + " points d'attache disponibles pour y ranger un vélo.";
        availableBikesStationElt.textContent = stations.availableBikes + "  vélos disponibles et opérationnels.";


        if (stations.availableBikes === 0 || stations.status !== "OPEN") {
            bookingButtonElt.disabled = true;
        } else {
            bookingButtonElt.disabled = false;
        }

    }

    availableBikesChange(stations){
        stations.availableBikes-=1;
    }

}
