//Déclaration et ajout du canvas pour que l'utilisateur puisse signer :
const canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
//Déclaration du contexte de dessin dans le canvas :
var signaturePad = new SignaturePad(canvas, {
   minWidth :  5 ,
    maxWidth :  5 ,
    penColor :  " rgb (66, 133, 244) ",
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});





