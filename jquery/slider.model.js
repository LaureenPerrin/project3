
//--------------------------Class Slider pour créer le slider d'introduction :

class NewSlider {
    constructor() {

        this._$slider = $('#slider'); //, on cible le bloc du slider
        this._$img = $('#slider img'); // on cible les images contenues dans le slider
        this._indexImg = this._$img.length - 1; // on définit l'index du dernier élément
        this._i = 0; // on initialise un compteur
        this._$currentImg = this._$img.eq(this._i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
        
    }

    //---------------------------------Méthode pour faire défiler le slider :

    slideImg() {

        // si le compteur est inférieur au dernier index
        if (this._i < this._indexImg) {
            // on l'incrémente
            this._i++;
            // sinon, on le remet à 0 (première image)
        } else {
            this._i = 0;
        }

        this._$img.css('display', 'none');

        this._$currentImg = this._$img.eq(this._i);
        this._$currentImg.css('display', 'block');

    }

    //---------------------Méthode pour initialiser le slider :

    init() {
        var that = this;
        
        $(document).ready(function () {
            
            // on cache les images :
            that._$img.css('display', 'none');
            // on affiche seulement l'image courante :
            that._$currentImg.css('display', 'block');

            //events clavier :
            $(document).keyup(function (e) {
                // image précédente :
                //touche gauche clavier :
                if (e.keyCode === 37) {
                    // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante" :
                    that._i--;

                    if (that._i >= 0) {
                        that._$img.css('display', 'none');
                        that._$currentImg = that._$img.eq(that._i);
                        that._$currentImg.css('display', 'block');
                    } else {
                        that._i = 0;
                    }
                    // image suivante :
                    //touche droite clavier :
                } else if (e.keyCode === 39) {
                    // on incrémente le compteur :
                    that._i++;

                    if (that._i <= that._indexImg) {
                        // on cache les images
                        that._$img.css('display', 'none');
                        // on définit la nouvelle image :
                        that._$currentImg = that._$img.eq(that._i);
                        // puis on l'affiche :
                        that._$currentImg.css('display', 'block');
                    } else {
                        that._i = that._indexImg;
                    }

                }
            });

            //events click :
            // image suivante :
            $('#next').click(function () {

                // on incrémente le compteur
                that._i++;

                if (that._i <= that._indexImg) {
                    // on cache les images :
                    that._$img.css('display', 'none');
                    // on définit la nouvelle image :
                    that._$currentImg = that._$img.eq(that._i);
                    // puis on l'affiche :
                    that._$currentImg.css('display', 'block');
                } else {
                    that._i = that._indexImg;
                }

            });

            // image précédente :
            $('#prev').click(function () {

                // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante" :
                that._i--;

                if (that._i >= 0) {
                    that._$img.css('display', 'none');
                    that._$currentImg = that._$img.eq(that._i);
                    that._$currentImg.css('display', 'block');
                } else {
                    that._i = 0;
                }

            });

            // on oublie pas de relancer la fonction à la fin :
            this.slideImg;
        });

    }

}

