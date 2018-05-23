
//---------------------Class Timer pour la reservation de vélo :

/*class Timer {
  constructor(timeInMinutes, dateStart) {
    this.timeInMinutes = timeInMinutes;
    this.dateStart = dateStart;
    this.countDownDate = new Date((Date.parse(this.dateStart)) + this.timeInMinutes * 60 * 1001);

  }

//Méthode qui créé le timer :
  myTimer() {
    var self = this;
    var now = Date.parse(new Date());

    // Distance entre now et countDownDate :
    var distance = this.countDownDate - now;

    // Calcul des minutes et secondes :
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Affiche le timer : 
    if (distance > 0) {
      messageValidBookingElt.textContent = "Vous avez réservez un vélo à la station " + "" + ".";
      document.getElementById("count_down").textContent = "Votre réservation expirera dans " + minutes + " minute(s) " + "et " + seconds + " seconde(s). ";
      messageNoBookingElt.style.display = "none";

    }
    
    // quand le timer est terminé :
    else if (distance < 0) {
      clearInterval(myVar);
      document.getElementById("count_down").textContent = "Votre réservation a expiré.";
      
      setTimeout(function () {
        document.getElementById("count_down").textContent = "";
        messageNoBookingElt.style.display = "";
        messageValidBookingElt.style.display = "none";
      }, 3000);

    }
  }

  //Méthode pour lancer le timer :
  exeTimer() {
    var self = this;
    var myVar = setInterval(this.myTimer, 1000);
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











//Deuxième façon de faire le timer :

/*
//var qui définit le temps du timer :
var timeInMinutes = 20;
//Date au moment du click sur la réservation :
sessionStorage.getItem('date');//dateStart
//var qui définit une date d'arrêt du timer :
var countDownDate = new Date((Date.parse(sessionStorage.getItem('date'))) + timeInMinutes * 60 * 1001);//

//fonction qui calcule le timer :
function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  //convertion des millisecondes :
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

//fonction utilisée pour lancer le timer : 
function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = "Votre réservation expirera dans " + t.minutes + " minute(s) " + "et " + t.seconds + " seconde(s)";
    if(t.total<=0){
      clearInterval(timeinterval);
      clock.innerHTML = "Votre réservation a expiré."
    }
  },1000);
  
}
initializeClock('count_down', deadline);*/
