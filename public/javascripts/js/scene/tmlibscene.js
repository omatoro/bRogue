/**
 * TmlibScene
 */
(function(ns) {

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
            var logo = tm.app.Sprite("logoTmlib").addChildTo(this);
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