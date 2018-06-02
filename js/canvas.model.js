
//-----------------------class Canvas pour que l'utilisateur puisse signer le formulaire  :
/*class Canvas {
    constructor() {
        this.createCanvas = document.getElementById('canvas');
        this.ctx = this.createCanvas.getContext('2d');
        this.paint = false;
        this.drawing = false;
        this.ongoingTouches = new Array;
    }

    //---------------------------------Méthode qui indique que le canvas est vide :

    emptyCanvas() {

        return this.drawing === false;
    }

    //---------------------------------Méthode qui indique que le canvas est remplit :

    validCanvas() {

        return this.drawing === true;
    }

    //---------------------------------Méthode qui déclare une var signature dans laquelle est intègré la valeur du canvas une fois signé :

    signature() {

        var signature = this.createCanvas.toDataURL("image/png");
        return signature;
    }

    //---------------------------------Méthode qui initialise le canvas :

    initDesktop() {

        this.paint = false;

        var that = this;

        window.addEventListener('mousedown', function () {

            that.paint = true;
        });

        window.addEventListener('mouseup', function () {

            that.paint = false;
        });

        //Quand l'utilisateur appuis sur le canvas et dessine :
        this.createCanvas.addEventListener('mousedown', function (e) {

            that.draw(e.pageX, e.pageY);
        });

        //Quand l'utilisateur arrête d'appuyer :
        this.createCanvas.addEventListener('mouseup', function (e) {

            that.draw(e.pageX, e.pageY);
        });

        //Quand il est en mouvement appuyé sur le canvas :
        this.createCanvas.addEventListener('mousemove', function (e) {

            if (that.paint === true) {
                that.draw(e.pageX, e.pageY);
            }
        });

    }

    //---------------------------------Méthode qui permet de dessiner dans le canvas :

    draw(mouseX, mouseY) {

        //Renvoie les coordonnées de décalage pour l'élément canvas :
        var cvsOffset = $(this.createCanvas).offset();
        //Introduit le dessin à créer et les méthodes utilisées :
        this.ctx.beginPath();
        //Renvoie la couleur utilisé pour signer :
        this.ctx.fillStyle = "black";
        //Crée un arc / courbe avec coordonnées de la souris :
        this.ctx.arc(mouseX - cvsOffset.left, mouseY - cvsOffset.top, 3, 0, 2 * Math.PI);
        //Remplit le chemin :
        this.ctx.fill();
        //Créer le chemin :
        this.ctx.closePath();
        this.drawing = true;
    }

    //---------------------------------Méthode qui efface la signature dans le canvas :

    clearDraw() {

        this.ctx.clearRect(0, 0, this.createCanvas.width, this.createCanvas.height);
        this.drawing = false;
    }

    initTactil() {
        var that = this;
        //var el = document.getElementById("canvas");
        this.createCanvas.addEventListener("touchstart", that.handleStart, false);
        this.createCanvas.addEventListener("touchend", that.handleEnd, false);
        this.createCanvas.addEventListener("touchcancel", that.handleCancel, false);
        this.createCanvas.addEventListener("touchleave", that.handleEnd, false);
        this.createCanvas.addEventListener("touchmove", that.handleMove, false);

         //Evite le scrolling  quand on touche au canvas :
        
         document.body.addEventListener("touchstart", function (e) {
            if (e.target == that.createCanvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchend", function (e) {
            if (e.target == that.createCanvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchmove", function (e) {
            if (e.target == that.createCanvas) {
                e.preventDefault();
            }
        });
    }

    colorForTouch(touch) {
        var id = touch.identifier;
        id = id.toString(16); // make it a hex digit
        return "#" + id + id + id;
    }

    ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < this.ongoingTouches.length; i++) {
            var id = this.ongoingTouches[i].identifier;

            if (id == idToFind) {
                return i;
            }
        }
        return -1;    // not found
    }

    handleStart(evt) {
        evt.preventDefault();
        //var el = document.getElementById("canvas");
        //var ctx = el.getContext("2d");
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(touches[i]);
            var color = this.colorForTouch(touches[i]);
            this.ctx.fillStyle = color;
            this.ctx.fillRect(touches[i].pageX - 2, touches[i].pageY - 2, 4, 4);
        }
    }

    handleMove(evt) {
        evt.preventDefault();
        //var el = document.getElementById("canvas");
        //var ctx = el.getContext("2d");
        var touches = evt.changedTouches;

        this.ctx.lineWidth === 4;

        for (var i = 0; i < touches.length; i++) {
            var color = this.colorForTouch(touches[i]);
            var idx = this.ongoingTouchIndexById(touches[i].identifier);

            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
            this.ctx.lineTo(touches[i].pageX, touches[i].pageY);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
        }
    }

    handleEnd(evt) {
        evt.preventDefault();
        //var el = document.getElementById("canvas");
        //var ctx = el.getContext("2d");
        var touches = evt.changedTouches;

        this.ctx.lineWidth = 4;

        for (var i = 0; i < touches.length; i++) {
            var color = this.colorForTouch(touches[i]);
            var idx = this.ongoingTouchIndexById(touches[i].identifier);

            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.ongoingTouches[i].pageX, this.ongoingTouches[i].pageY);
            this.ctx.lineTo(touches[i].pageX, touches[i].pageY);
            this.ongoingTouches.splice(i, 1);  // remove it; we're done
        }
    }

    handleCancel(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            this.ongoingTouches.splice(i, 1);  // remove it; we're done
        }
    }

}








    //Events pour le tactile :
    this.createCanvas.addEventListener("touchstart", function (e) {

    });

    this.createCanvas.addEventListener("touchend", function (e) {

    });

    this.createCanvas.addEventListener("touchmove", function (e) {

    });*/

class Canvas {
    constructor() {
        this.createCanvas = document.getElementById('canvas');
        this.ctx = this.createCanvas.getContext('2d');
        this.mouseX = this.mouseX;
        this.mouseY = this.mouseY;
        this.mouseDown = 0;
        this.touchX;
        this.touchY;
        this.paint = false;
        this.drawing = false;

    }

     // Set-up the canvas and add our event handlers after the page has loaded
     init() {
        var that = this;
        // Get the specific canvas element from the HTML document
        //canvas = document.getElementById('sketchpad');

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        //if (canvas.getContext)
        //ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        // if (ctx) {
        // React to mouse events on the canvas, and mouseup on the entire document
        this.createCanvas.addEventListener('mousedown', that.sketchpad_mouseDown, false);
        this.createCanvas.addEventListener('mousemove', that.sketchpad_mouseMove, false);
        window.addEventListener('mouseup', that.sketchpad_mouseUp, false);

        // React to touch events on the canvas
        this.createCanvas.addEventListener('touchstart', that.sketchpad_touchStart, false);
        this.createCanvas.addEventListener('touchmove', that.sketchpad_touchMove, false);
        // }
    }

    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    drawDot(ctx, x, y, size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r = 0; g = 0; b = 0; a = 255;

        // Select a fill style
        this.ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

        // Draw a filled circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Clear the canvas context using the canvas width and height
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.createCanvas.width, this.createCanvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    sketchpad_mouseDown() {
        var that = this;
        this.mouseDown = 1;
        this.drawDot(that.ctx, that.mouseX, that.mouseY, 12);
    }

    // Keep track of the mouse button being released
    sketchpad_mouseUp() {
        this.mouseDown = 0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    sketchpad_mouseMove(e) {
        var that = this;
        // Update the mouse co-ordinates when moved
        this.getMousePos;

        // Draw a dot if the mouse button is currently being pressed
        if (this.mouseDown == 1) {
            this.drawDot(this.ctx, this.mouseX, this.mouseY, 12);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
    }

    // Draw something when a touch start is detected
    sketchpad_touchStart() {
        // Update the touch co-ordinates
        this.getTouchPos;

        this.drawDot(this.ctx, this.touchX, this.touchY, 12);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpad_touchMove(e) {
        // Update the touch co-ordinates
        this.getTouchPos;

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        this.drawDot(this.ctx, this.touchX, this.touchY, 12);

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
                this.touchX = touch.pageX - touch.target.offsetLeft;
                this.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    }


   
}