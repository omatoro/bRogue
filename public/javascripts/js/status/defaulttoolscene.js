/**
 * DefaultToolScene
 */
(function(ns) {

    ns.DefaultToolScene = tm.createClass({
        superClass : tm.app.Scene,

        init: function(parent) {
            this.superInit();

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            // 枠
            ns.GlowLineBox({heightPadding:200}).addChildTo(this);

            var self = this;

            // [装備する]ボタン
            var equipButton = tm.app.GlossyButton(280, 60, "gray", "装備を外す").addChildTo(this);
            equipButton.position.set(200, 300);
            this.equipButton = equipButton;
            equipButton.addEventListener("pointingend", function(e) {
                parent.pressedButton = ns.DefaultToolScene.EQUIP;
                e.app.popScene();
            });

            // [キャンセル]ボタン
            var cancelButton = tm.app.GlossyButton(280, 60, "gray", "キャンセル").addChildTo(this);
            cancelButton.position.set(200, 400);
            this.cancelButton = cancelButton;
            cancelButton.addEventListener("pointingend", function(e) {
                parent.pressedButton = ns.DefaultToolScene.CANCEL;
                e.app.popScene();
            });
        },
    });

    ns.DefaultToolScene.CANCEL = 1;
    ns.DefaultToolScene.EQUIP  = 2;

})(game);