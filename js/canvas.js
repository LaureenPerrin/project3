
//Déclaration du canvas pour que l'utilisateur puisse signer :
var canvas = document.getElementById("signature-pad");

//Déclaration du context du canvas :
var ctx = canvas.getContext("2d");

//Instanciation de l'objet signaturePad avec la class SignaturePad :
var signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    maxWidth: 5,
    penColor: " rgb(0, 0, 0) ",
});

//var qui récupère les valeurs dessinées dans le canvas et qui sont convertient en image png :
var signature = signaturePad.toDataURL('image/png');



