
//-------------------------------fonction utilisé pour le timer :
class NewTimer {
  constructor(timeInMinutes, storageBookingDate, now) {
    this._timeInMinutes = timeInMinutes;
    this._storageBookingDate = storageBookingDate;
    this._now = now;
    this._countDownDate = new Date((Date.parse(this._storageBookingDate)) + this._timeInMinutes * 60 * 1001);
    this._distance = this._countDownDate - this._now;
  }

  dicreaseTimer() {
    if (this.isTimerOver()) {
      this._distance = this._distance - 1000;
      this.displayFormatedTimer();
    
    }
  }

  isTimerOver() {
    return this._distance > 0;
  }

  displayFormatedTimer() {
    // Calcul des minutes et secondes :
    const minutes = Math.floor((this._distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this._distance % (1000 * 60)) / 1000);

    // Affiche le timer :
    if (!this.isTimerOver()) {
      console.log('Timer is over');
    } else {
      console.log('Timer is not over yet');
      return minutes + " minutes et " + seconds + " seconde(s)";
    }

  }
}

var validButtonElt = document.getElementById("valid_button");

validButtonElt.addEventListener('click', function() {
  var myDate = new Date();
  var newTimer = new NewTimer(20, myDate, myDate);
  setInterval(function() {
    newTimer.dicreaseTimer();
    countDownElt.textContent = "Votre réservation expirera dans " + newTimer.displayFormatedTimer();
  }, 1000);
});




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

      document.getElementById("count_down").textContent = "";
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


