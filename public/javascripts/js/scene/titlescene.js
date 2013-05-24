/**
 * TitleScene
 */
(function(ns) {

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "RoguePlus",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

            this.addEventListener("pointingend", function(e) {
                // シーンの切り替え
                var loadingScene = ns.EffectLoadingScene({
                    width:        e.app.width,
                    height:       e.app.height,
                    assets:       MAIN_ASSET,
                    nextScene:    ns.MainScene,
                });
                e.app.replaceScene(loadingScene);
            });
        }
    });

})(game);