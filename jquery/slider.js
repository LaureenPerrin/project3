let $slider = $('#slider'), // on cible le bloc du slider
    $img = $('#slider img'), // on cible les images contenues dans le slider
    indexImg = $img.length - 1, // on définit l'index du dernier élément
    i = 0, // on initialise un compteur
    $currentImg = $img.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)

function slideImg() {

    if (i < indexImg) { // si le compteur est inférieur au dernier index
        i++; // on l'incrémente
    } else { // sinon, on le remet à 0 (première image)
        i = 0;
    }

    $img.css('display', 'none');

    $currentImg = $img.eq(i);
    $currentImg.css('display', 'block');

}

$(document).ready(function() {


    $img.css('display', 'none'); // on cache les images
    $currentImg.css('display', 'block'); // on affiche seulement l'image courante

      $(document).keyup(function(e){
    if(e.keyCode === 37){
         i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"

        if (i >= 0) {
            $img.css('display', 'none');
            $currentImg = $img.eq(i);
            $currentImg.css('display', 'block');
        } else {
            i = 0;
        }
    }
    else if(e.keyCode === 39){
          i++; // on incrémente le compteur

        if (i <= indexImg) {
            $img.css('display', 'none'); // on cache les images
            $currentImg = $img.eq(i); // on définit la nouvelle image
            $currentImg.css('display', 'block'); // puis on l'affiche
        } else {
            i = indexImg;
        }

    }
    });

    $('#next').click(function() { // image suivante

        i++; // on incrémente le compteur

        if (i <= indexImg) {
            $img.css('display', 'none'); // on cache les images
            $currentImg = $img.eq(i); // on définit la nouvelle image
            $currentImg.css('display', 'block'); // puis on l'affiche
        } else {
            i = indexImg;
        }

    });

    $('#prev').click(function() { // image précédente

        i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"

        if (i >= 0) {
            $img.css('display', 'none');
            $currentImg = $img.eq(i);
            $currentImg.css('display', 'block');
        } else {
            i = 0;
        }

    });

  slideImg(); // on oublie pas de relancer la fonction à la fin
});


/*var launch = new Date();
var minutes = document
function set date(){
    var now = new Date();
}
var minutes = 20;
var secondes = 60;
 function chrono(){
    secondes -= 1;

  if (secondes=0){

  }

  var compteurElt = document.getElementById("compteur");

// Diminue le compteur jusqu'à 0
function diminuerCompteur() {
    // Conversion en nombre du texte du compteur
    var compteur = Number(compteurElt.textContent);
    if (compteur > 1) {
        compteurElt.textContent = compteur - 1;
    } else {
        // Annule l'exécution répétée
        clearInterval(intervalId);
        // Modifie le titre de la page
        var titre = document.getElementById("titre");
        titre.textContent = "BOUM !!!";
        // Modification du titre au bout de 2 secondes
        setTimeout(function () {
            titre.textContent = "Tout est cassé :(";
        }, 2000);
    }
}*/
