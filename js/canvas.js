
//-----------------------class Canvas pour que l'utilisateur puisse signer le formulaire  :

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.paint = false;
        this.drawing = false;
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

        var signature = this.canvas.toDataURL("image/png");
        return signature;
    }

    //---------------------------------Méthode qui initialise le canvas :

    init() {

        this.paint = false;

        var that = this;

        window.addEventListener('mousedown', function () {

            that.paint = true;
        });

        window.addEventListener('mouseup', function () {

            that.paint = false;
        });

        //Quand l'utilisateur appuis sur le canvas et dessine :
        this.canvas.addEventListener('mousedown', function (e) {

            that.draw(e.pageX, e.pageY);
        });

        //Quand l'utilisateur arrête d'appuyer :
        this.canvas.addEventListener('mouseup', function (e) {

            that.draw(e.pageX, e.pageY);
        });
        
        //Quand il est en mouvement appuyé sur le canvas :
        this.canvas.addEventListener('mousemove', function (e) {

            if (that.paint === true) {
                that.draw(e.pageX, e.pageY); 
            }
        });
  
    }

    //---------------------------------Méthode qui permet de dessiner dans le canvas :

    draw(mouseX, mouseY) {
        
        //Renvoie les coordonnées de décalage pour l'élément canvas :
        var cvsOffset = $(this.canvas).offset();
        //Introduit le dessin à créer et les méthodes utilisées :
        this.context.beginPath();
        //Renvoie la couleur utilisé pour signer :
        this.context.fillStyle = "black";
        //Crée un arc / courbe avec coordonnées de la souris :
        this.context.arc(mouseX - cvsOffset.left, mouseY - cvsOffset.top, 3, 0, 2 * Math.PI);
        //Remplit le chemin :
        this.context.fill();
        //Créer le chemin :
        this.context.closePath();
        this.drawing = true;
    }

    //---------------------------------Méthode qui efface la signature dans le canvas :

    clearDraw() {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawing = false;
    }

}

