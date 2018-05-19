//---------------------class Booking  pour les réservation de vélo :

class Booking {
    constructor(status, User) {
        this.status = status;
        this.user = User;
    }

//----------------------------------------méthode pour accéder à la réservation :
booking() {

    //Déclaration et ajout dans le main wrapper d'un formulaire contenant le canvas :

    formElt.id = "form_canvas";
    mainWrapperElt.insertBefore(formElt, containerCountDownElt);

    //Déclaration et ajout de deux champs pour renseigner le prénom et le nom de l'utilisateur :
    const firtsNameElt = document.createElement("label");
    firtsNameElt.id = "first_name";
    firtsNameElt.textContent = "Prénom : ";

    firtsNameElt.appendChild(inputFirstNameElt);
    formElt.appendChild(firtsNameElt);

    const lastNameElt = document.createElement("label");
    lastNameElt.id = "last_name";
    lastNameElt.textContent = "Nom : ";

    lastNameElt.appendChild(inputLastNameElt);
    formElt.appendChild(lastNameElt);

    //Déclaration et ajout d'un paragraphe pour cibler la zone de signature pour l'utilisateur :
    const titleSignatureElt = document.createElement("p");
    titleSignatureElt.id = "title_signature";
    titleSignatureElt.textContent = "Signature :";
    formElt.appendChild(titleSignatureElt);

    //ajout d'attribut pour le canvas :
    canvas.setAttribute('width', "250px");
    canvas.setAttribute('height', "150px");
    canvas.setAttribute('id', 'canvas');
    //ajout du canvas :
    formElt.appendChild(canvas);

    //ajout des boutons valider et effacer :
    formElt.appendChild(validButtonElt);
    formElt.appendChild(clearButtonElt);

};

}

//var booking1 = new Booking("true", user1);


