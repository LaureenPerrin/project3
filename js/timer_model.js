
//---------------------Class Timer pour la reservation de vélo :

/*class Timer {
  constructor() {
    this.timeInMinutes = 20;
    this.dateStart = sessionStorage.getItem('date');
    this.countDownDate = new Date((Date.parse(this.dateStart)) + this.timeInMinutes * 60 * 1001);
    
  }

  //Méthode qui initialise le timer :
  myTimer() {
    
    var now = Date.parse(new Date());

    // Distance entre now et countDownDate :
    var distance = this.countDownDate - now;

    // Calcul des minutes et secondes :
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countDownElt.textContent = "Votre réservation expirera dans " + minutes + " minute(s) " + "et " + seconds + " seconde(s). ";
    
    // Affiche le timer : 
    if (distance > 0) {
      messageValidBookingElt.textContent = "Vous avez réservez un vélo à la station " + sessionStorage.getItem("station") + ".";
      countDownElt.textContent = "Votre réservation expirera dans " + minutes + " minute(s) " + "et " + seconds + " seconde(s). ";
      messageNoBookingElt.style.display = "none";

    }

    // quand le timer est terminé :
    else if (distance < 0) {
      clearInterval(myVar);
      countDownElt.textContent = "Votre réservation a expiré.";

      setTimeout(function () {
        countDownElt.textContent = "";
        messageNoBookingElt.style.display = "";
        messageValidBookingElt.style.display = "none";
      }, 3000);
    }

  }

    exeTimer() {
    
      var myVar = setInterval(() => {
        this.myTimer();
      }, 1000);
      return myVar;
    }

}*/

//var qui définit le temps du timer :
var timeInMinutes = 20;
//Date au moment du click sur la réservation :
sessionStorage.getItem('date');//dateStart
//var qui définit une date d'arrêt du timer :
var countDownDate = new Date((Date.parse(sessionStorage.getItem('date'))) + timeInMinutes * 60 * 1001);//



function myTimer() {

  var now = Date.parse(new Date());

  // Distance entre now et countDownDate permettant de faire le décompte du timer:
  var distance = countDownDate - now;

  // Calcul des minutes et secondes :
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Affiche le timer :
  if (distance > 0) {
    messageValidBookingElt.textContent = "Vous avez réservé un vélo à la station " + sessionStorage.getItem("station") + ".";
    document.getElementById("count_down").textContent = "Votre réservation expirera dans " + minutes + " minute(s) " + "et " + seconds + " seconde(s). ";
    messageNoBookingElt.style.display = "none";

  }
  // quand le timer est terminé :
  else if (distance < 0) {
    clearInterval(myVar);
    document.getElementById("count_down").textContent = "Votre réservation a expiré.";
    setTimeout(function () {

      document.getElementById("count_down").textContent = "";
      messageNoBookingElt.style.display = "block";
      messageValidBookingElt.style.display = "none";

    }, 3000);
    sessionStorage.clear();

  }

}

//lancement du timer : 
var myVar = setInterval(myTimer, 1000);

