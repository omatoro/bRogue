/**
 * DevelopResourceScene
 */
(function(ns) {

    var UI_DATA = {
        labels: {
            children: [{
                type: "Label",
                name: "labelDevelop",
                x: 80,
                y: 120,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "素材提供",
                fontSize: 40,
                align: "left"
            }]
        }
    };

    ns.DevelopResourceScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 1.0)");
            this.addChild(filter);

            // ラベル表示
            this.fromJSON(UI_DATA.labels);

            // wolf
            var wolf = tm.app.Sprite("logoWolf").addChildTo(this);
            wolf.position.set(80 + 100, 230);

            // // fsm
            // var fsm = tm.app.Sprite("logoFSM").addChildTo(this);
            // fsm.position.set(80 + 200 + 80 + 100, 230);

            this.alpha = 0.0;
            this.tweener.
                clear().
                fadeIn(200).
                wait(1500).
                call(function() {
                    this.tweener.clear().fadeOut(200).call(function() {
                        this.app.replaceScene(ns.TitleScene());
                    }.bind(this));
                }.bind(this));
        },
    });

})(game);