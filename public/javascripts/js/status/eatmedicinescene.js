/**
 * EatMedicineScene
 */
(function(ns) {

    ns.EatMedicineScene = tm.createClass({
        superClass : tm.app.Scene,

        init: function(parent) {
            this.superInit();

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            var self = this;

            // 枠
            ns.GlowLineBox({heightPadding:200}).addChildTo(this);

            // [装備する]ボタン
            var equipButton = tm.app.GlossyButton(280, 60, "gray", "食べる").addChildTo(this);
            equipButton.position.set(200, 300);
            this.equipButton = equipButton;
            equipButton.addEventListener("pointingend", function(e) {
                parent.pressedButton = ns.EatMedicineScene.EAT;
                e.app.popScene();
            });

            // [捨てる]ボタン
            var deleteButton = tm.app.GlossyButton(280, 60, "gray", "捨てる").addChildTo(this);
            deleteButton.position.set(200, 400);
            this.deleteButton = deleteButton;
            deleteButton.addEventListener("pointingend", function(e) {
                parent.pressedButton = ns.EatMedicineScene.DELETE;
                e.app.popScene();
            });

            // [キャンセル]ボタン
            var cancelButton = tm.app.GlossyButton(280, 60, "gray", "キャンセル").addChildTo(this);
            cancelButton.position.set(200, 500);
            this.cancelButton = cancelButton;
            cancelButton.addEventListener("pointingend", function(e) {
                parent.pressedButton = ns.EatMedicineScene.CANCEL;
                e.app.popScene();
            });
        },
    });

    ns.EatMedicineScene.CANCEL = 1;
    ns.EatMedicineScene.EAT    = 2;
    ns.EatMedicineScene.DELETE = 3;

})(game);