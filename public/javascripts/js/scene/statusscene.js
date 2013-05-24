/**
 * StatusScene
 */
(function(ns) {

    ns.StatusScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(player) {
            this.superInit();
            this.player = player;

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            // ステータス画面
            var status = ns.Status(this);
            this.status = status;
        },

        update : function() {
        }
    });

})(game);