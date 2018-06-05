
//-------------------------------fonction utilisé pour le timer :
class NewTimer {
  constructor(timeInMinutes, storageBookingDate, now) {
    this._timeInMinutes = timeInMinutes;
    this._storageBookingDate = storageBookingDate;
    this._now = now;
    this._countDownDate = new Date((Date.parse(this._storageBookingDate)) + this._timeInMinutes * 60 * 1001);
    this._distance = this._countDownDate - this._now;
  }

  //--------Méthode pour décrémenter le timer + affichage :
  dicreaseTimer(station) {
    if (this.isTimerOver()) {
      this._distance = this._distance - 1000;
      this.displayFormatedTimer(station);
    }
  }

  //---------Méthode pour indiquer quand le timer est en cours :
  isTimerOver() {
    return this._distance > 0;
  }

  //---------Méthode format et affichage du timer :
  displayFormatedTimer(station) {
    // Calcul des minutes et secondes :
    const minutes = Math.floor((this._distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this._distance % (1000 * 60)) / 1000);

    // Affiche le timer :
    //Quand le timer est en cours :
    if (this.isTimerOver()) {
      
       if (sessionStorage.getItem("station") === station.name){
      messageNoBookingElt.style.display = "none";
      countDownElt.textContent = "Vous avez réservé un vélo à la station " + sessionStorage.getItem("station") + " pour " + minutes + " minutes et " + seconds + " seconde(s)";
      }
      //Quand le timer est finit :
    } else {
      
      sessionStorage.clear();
      clearInterval(this.initTimer());
      countDownElt.textContent = "Votre réservation a expiré.";

      setTimeout(function () {
        countDownElt.textContent = "";
        messageNoBookingElt.style.display = "block";
      }, 3000);
    }

  }

  //------------Méthode pour lancer le timer :
  initTimer(station) {
    var that = this;
    
    setInterval(function () {
      that.dicreaseTimer(station);
    }, 1000);
      
  }

}


/*

//var qui définit le temps du timer :
var timeInMinutes = 20;

//Date au moment du click sur la réservation :
sessionStorage.getItem('date');

//var qui définit une date d'arrêt du timer :
var countDownDate = new Date((Date.parse(sessionStorage.getItem('date'))) + timeInMinutes * 60 * 1001);

//------fonction pour initialiser le timer :

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

      countDownElt.textContent = "none";
      messageNoBookingElt.style.display = "block";
      messageValidBookingElt.style.display = "none";

    }, 3000);
    sessionStorage.clear();

  }

}

//Déclaration de la variable pour lancer le timer : 
var myVar = setInterval(myTimer, 1000);*/




/*class Timer {
  constructor() {
      this._duration = 1200000;
      this._remainingTime = this._duration;
      this._formatedRemainingTime = this.formatRemainingTime(this._remainingTime);
  }
  
  get remainingTime() {
      return this._remainingTime;
  }

  formatRemainingTime(countdown) {
      let minutes = Math.floor(countdown / 60000);
      let seconds = ((countdown % 60000) / 1000).toFixed(0);
      return minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
  }

  decreaseRemainingTime() {
      this._remainingTime = this._remainingTime - 1000;
      this._formatedRemainingTime = this.formatRemainingTime(this._remainingTime);
  }
}*/


