/*
 * GlossyImageButton
 */
(function(ns) {

	ns.GlossyImageButton = tm.createClass({
	    superClass: tm.app.Shape,

	    init: function(width, height, image, backgroundColor) {
            this.superInit(width, height);
            this.backgroundColor = backgroundColor || "black";
            this.alpha = tm.app.GlossyButton.DEFAULT_ALPHA-0.1;

            image.position.set(0, 0);
            this.addChild(image);

            this.interaction.enabled = true;
            this.interaction.boundingType = "rect";
            this.addEventListener("pointingover", function() {
                this.tweener.clear();
                this.tweener.fade(0.7, 250);
            });
            this.addEventListener("pointingout", function() {
                this.tweener.clear();
                this.tweener.fade(tm.app.GlossyButton.DEFAULT_ALPHA-0.1, 250);
            });

	        this._refresh();
	    },

	    _refresh: function () {
            // ボタン描画
            var c = this.canvas;
            c.resize(this.width, this.height);
            c.fillStyle = this.backgroundColor;
            c.fillCircle(this.width/2, this.height/2, this.width/2-20);
            c.strokeStyle   = "rgba(100,100,100,0.75)";
            c.lineWidth     = 2;
            c.strokeCircle(this.width/2, this.height/2, this.width/2);
            
            // テカリ
            // c.roundRect(2, 2, this.width-4, this.height-4, 10);
            // c.clip();
            
            var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);
            
            // grad.addColorStop(0.0, "hsl(  0, 75%, 50%)");
            // grad.addColorStop(0.5, "hsl(120, 75%, 50%)");
            // grad.addColorStop(1.0, "hsl(240, 75%, 50%)");
            grad.addColorStop(0.0, "rgba(255,255,255,0.9)");
            grad.addColorStop(0.5, "rgba(255,255,255,0.5)");
            grad.addColorStop(0.51, "rgba(255,255,255,0.2)");
            grad.addColorStop(1.0, "rgba(255,255,255,0.0)");
            c.setGradient(grad);
            c.fillCircle(this.width/2, this.height/2, this.width/2-10);
	    }
	});

})(game);