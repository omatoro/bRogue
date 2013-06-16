/**
 * AsyncLoading
 */
(function(ns) {
    
    var DEFAULT_PARAM = {
        width: 465,
        height: 465,
    };

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "loadingLabel",
                x: ns.SCREEN_WIDTH/2,
                y: ns.SCREEN_HEIGHT/2,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "サーバーと同期中...",
                fontSize: 25,
                align: "center"
            }]
        }
    };
    
    ns.AsyncLoading = tm.createClass({
        superClass: tm.app.Scene,
        
        init: function(param, asyncFunc) {
            this.superInit();
            
            param = {}.$extend(DEFAULT_PARAM, param);
            
            // ロード中のエフェクト
            this.fromJSON(UI_DATA.LABELS);
            this.loadingLabel.tweener.
                fadeOut(500).
                fadeIn(700).
                wait(300).
                setLoop(true);

            this.alpha = 0.0;
            this.tweener.clear().fadeIn(100).call(function() {
                if (asyncFunc) {
                    asyncFunc(function() {
                        if (param.loadingScene) {
                            this.tweener.clear().fadeOut(200).call(function() {
                                this.app.replaceScene(param.loadingScene({
                                    width:        param.width,
                                    height:       param.height,
                                    assets:       param.assets,
                                    nextScene:    param.nextScene,
                                }));
                            }.bind(this));
                        }
                        else {
                            this.tweener.clear().fadeOut(200).call(function() {
                                // 引数はarguments
                                this.app.replaceScene(param.nextScene());
                            }.bind(this));
                        }
                    }.bind(this));
                }
            }.bind(this));
        },
    });
    
    
})(game);