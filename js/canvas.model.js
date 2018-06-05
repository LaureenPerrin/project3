
//-----------------------class Canvas pour que l'utilisateur puisse signer le formulaire  :

class NewCanvas {
  constructor(domCanvas, context, mouseX, mouseY, mouseDown, touchX, touchY, paint, drawing) {
    this._domCanvas = domCanvas;
    this._context = context;
    this._mouseX = mouseX;
    this._mouseY = mouseY;
    this._mouseDown = mouseDown;
    this._touchX = touchX;
    this._touchY = touchY;
    this._paint = paint;
    this._drawing = drawing;
  }

  //-----------Méthode pour initialiser le canvas :

  initCanvas() {

    newCanvas.addEventListener('mousedown', () => Canvas.sketchpadMouseDown(), false);
    newCanvas.addEventListener('mousemove', e => Canvas.sketchpadMouseMove(e), false);
    window.addEventListener('mouseup', () => Canvas.sketchpadMouseUp(), false);

    newCanvas.addEventListener('touchstart', () => Canvas.sketchpad_touchStart(), false);
    newCanvas.addEventListener('touchmove', e => Canvas.sketchpad_touchMove(e), false);
  }

  //-----------Méthode pour vider le canvas :

  clearCanvas() {

    this._context.clearRect(0, 0, this._domCanvas.width, this._domCanvas.height);
    this._drawing = false;
  }

  signature() {
    var signature = this._domCanvas.toDataURL("image/png");
    return signature;
  }

  validCanvas() {
    return this._drawing === true;

  }

  emptyCanvas() {
    return this._drawing === false;
  }

  //-----------Méthode pour dessiner dans le canvas :

  drawDot() {

    this._drawing = true;
    this._context.fillStyle = "black";
    this._context.lineCap = 'round';
    this._context.beginPath();
    this._context.arc(this._touchX, this._touchY, 8, 0, Math.PI * 2, true);
    this._context.arc(this._mouseX, this._mouseY, 8, 0, Math.PI * 2, true);
    this._context.closePath();
    this._context.fill();
  }

  //-----------Méthode pour enregistrer un clic de souris et dessiner également un pixel à la position actuelle. :

  sketchpadMouseDown() {

    this._mouseDown = 1;
    this.drawDot();
  }

  //-------Méthode pour supprimer le clic de la souris (bouton n'est plus enfoncé) :

  sketchpadMouseUp() {

    this._mouseDown = 0;
  }

  //-------Méthode pour dessiner les coordonnées actuelles si bouton enfoncé :

  sketchpadMouseMove(e) {

    this.getMousePosistion(e);
    if (this._mouseDown === 1) {
      this.drawDot();
    }
  }

  //-----------Méthode pour obtenir les coordonnées actuelles de position de la souris par rapport au coin sup gauche du canvas :

  getMousePosistion(e) {
    if (e.offsetX) {
      this._mouseX = e.offsetX;
      this._mouseY = e.offsetY;
    }
    else if (e.layerX) {
      this._mouseX = e.layerX;
      this._mouseY = e.layerY;
    }
  }

  //-------------Méthodes pour events tactiles :

  // Draw something when a touch start is detected
  sketchpad_touchStart() {

    this.getTouchPos();
    this.drawDot();

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
  }

  // Draw something and prevent the default scrolling when touch movement is detected
  sketchpad_touchMove(e) {
    // Update the touch co-ordinates
    this.getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawDot();

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
  }

  // Get the touch position relative to the top-left of the canvas
  // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
  // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
  // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
  getTouchPos(e) {
    if (!e)
      var e = event;

    if (e.touches) {
      if (e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        this._touchX = touch.pageX - touch.target.offsetLeft;
        this._touchY = touch.pageY - touch.target.offsetTop;
      }
    }
  }

}





