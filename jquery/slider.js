
//--------------------------Class Slider pour créer le slider d'introduction :

class Slider {
    constructor() {

        this.$slider = $('#slider'), // on cible le bloc du slider
        this.$img = $('#slider img'), // on cible les images contenues dans le slider
        this.indexImg = this.$img.length - 1, // on définit l'index du dernier élément
        this.i = 0, // on initialise un compteur
        this.$currentImg = this.$img.eq(this.i) // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)

    }

    //---------------------------------Méthode pour faire défiler le slider :

    slideImg() {

        // si le compteur est inférieur au dernier index
        if (this.i < this.indexImg) {
            // on l'incrémente
            this.i++;
            // sinon, on le remet à 0 (première image)
        } else {
            this.i = 0;
        }

        this.$img.css('display', 'none');

        this.$currentImg = this.$img.eq(this.i);
        this.$currentImg.css('display', 'block');

    }

    //---------------------Méthode pour initialiser le slider :

    init() {
        var that = this;

        $(document).ready(function () {

            // on cache les images :
            that.$img.css('display', 'none');
            // on affiche seulement l'image courante :
            that.$currentImg.css('display', 'block');

            //events clavier :
            $(document).keyup(function (e) {
                // image précédente :
                //touche gauche clavier :
                if (e.keyCode === 37) {
                    // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante" :
                    that.i--;

                    if (that.i >= 0) {
                        that.$img.css('display', 'none');
                        that.$currentImg = that.$img.eq(that.i);
                        that.$currentImg.css('display', 'block');
                    } else {
                        that.i = 0;
                    }
                    // image suivante :
                    //touche droite clavier :
                } else if (e.keyCode === 39) {
                    // on incrémente le compteur :
                    that.i++;

                    if (that.i <= that.indexImg) {
                        // on cache les images
                        that.$img.css('display', 'none');
                        // on définit la nouvelle image :
                        that.$currentImg = that.$img.eq(that.i);
                        // puis on l'affiche :
                        that.$currentImg.css('display', 'block');
                    } else {
                        that.i = that.indexImg;
                    }

                }
            });

            //events click :
            // image suivante :
            $('#next').click(function () {

                // on incrémente le compteur
                that.i++;

                if (that.i <= that.indexImg) {
                    // on cache les images :
                    that.$img.css('display', 'none');
                    // on définit la nouvelle image :
                    that.$currentImg = that.$img.eq(that.i);
                    // puis on l'affiche :
                    that.$currentImg.css('display', 'block');
                } else {
                    that.i = that.indexImg;
                }

            });

            // image précédente :
            $('#prev').click(function () {

                // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante" :
                that.i--;

                if (that.i >= 0) {
                    that.$img.css('display', 'none');
                    that.$currentImg = that.$img.eq(that.i);
                    that.$currentImg.css('display', 'block');
                } else {
                    that.i = 0;
                }

            });

            // on oublie pas de relancer la fonction à la fin :
            this.slideImg;
        });

    }

}

