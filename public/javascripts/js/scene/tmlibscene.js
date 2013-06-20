/**
 * TmlibScene
 */
(function(ns) {

    /*
     * TmlibLogo
     */
    ns.TmlibLogo = tm.createClass({
        superClass : tm.app.Shape,
        
        init: function(width, height) {
            this.superInit(width, height);
            this.backgroundColor = "rgba(100,100,100,0.5)";
            this.alpha = 1.0;
        },
        
        update: function() {
            this._refresh();
        },
        
        _refresh: function () {
            var c = this.canvas;
            c.resize(this.width, this.height);
            c.fillStyle = "rgba(0,0,255,1.0)";
            c.fillCircle(this.position.x - this.width/10, this.position.y - this.height/4, this.width/5);
            
            c.fillStyle = "rgba(255,255,0,1.0)";
            c.fillCircle(this.position.x + this.width/10, this.position.y - this.height/8, this.width/5);
            
            
            // テキストを描画
            c.setShadow("rgb(20,20,20)", 2, 2, 7);
            c.setText("80px 'Consolas', 'Monaco', 'ＭＳ ゴシック'", "center", "center");
            c.fillStyle = "rgba(255,255,255,1.0)";
            c.fillText("tmlib.js", this.position.x, this.position.y + this.height/20);
        },
    });

    ns.TmlibScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(255, 255, 255, 1.0)");
            this.addChild(filter);

            // tmlib logo
            var logo = ns.TmlibLogo(ns.SCREEN_WIDTH, ns.SCREEN_WIDTH).addChildTo(this);
            logo.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            this.alpha = 0.0;
            this.tweener.
                clear().
                fadeIn(200).
                wait(1500).
                call(function() {
                    this.tweener.clear().fadeOut(200).call(function() {
                        this.app.replaceScene(ns.DevelopResourceScene());
                    }.bind(this));
                }.bind(this));
        },
    });

})(game);