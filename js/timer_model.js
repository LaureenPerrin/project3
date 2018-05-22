/*class Timer {
    constructor(){
        
    }
}*/
var timeInMinutes = 20;
sessionStorage.getItem('date');
var countDownDate = new Date((Date.parse(sessionStorage.getItem('date'))) + timeInMinutes * 60 * 1001);



function myTimer(){

  var now = Date.parse(new Date());

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Calcul des minutes et secondes :
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  if (distance > 0) {
    document.getElementById("count_down").textContent = "Votre réservation expirera dans " + minutes + " minute(s) " + "et " + seconds + " seconde(s). ";
    messageNoBookingElt.style.display = "none";
    messageValidBookingElt.textContent = "Vous avez réservez un vélo à la station " + "" + ".";
  }
  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(myVar);
    document.getElementById("count_down").textContent = "Votre réservation a expiré.";
    setTimeout (function(){
      document.getElementById("count_down").textContent = "";
      messageNoBookingElt.style.display = "";
      },3000);
    
  }

}
var myVar = setInterval(myTimer, 1000);

/*var timeInMinutes = 20;
//var currentTime = Date.parse(new Date());
sessionStorage.getItem('date');
var deadline = new Date((Date.parse(sessionStorage.getItem('date'))) + timeInMinutes*60*1001);

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

