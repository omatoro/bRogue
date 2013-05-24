/**
 * BarLoadingScene
 */
(function(ns) {
    
    var DEFAULT_PARAM = {
        width: 465,
        height: 465,
    };
    
    ns.BarLoadingScene = tm.createClass({
        superClass: tm.app.Scene,
        
        init: function(param) {
            this.superInit();
            
            param = {}.$extend(DEFAULT_PARAM, param);
            
            // 既にロードしたオブジェクト数
            this.loadedCounter = 0;

            // これからロードするオブジェクト数
            var planLoadNum = 0;
            for (var i in param.assets) {
                ++planLoadNum;
            }
            this.planLoadNum = planLoadNum;

            // 一つロードした際に増加する割合
            this.barUnit = 100 / planLoadNum;
            
            // プログレスバー
            var bar = ns.ProgressBar(ns.SCREEN_WIDTH-100, 25);
            bar.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT - 90);
            bar.setBarLength(0);
            this.bar = bar;
            this.addChild(bar);

            this.alpha = 0.0;
            this.tweener.clear().fadeIn(100).call(function() {
                if (param.assets) {
                    tm.asset.AssetManager.onload = function() {
                        this.tweener.clear().fadeOut(200).call(function() {
                            this.app.replaceScene(param.nextScene());
                        }.bind(this));
                    }.bind(this);
                    this.assets = tm.asset.AssetManager.load(param.assets);
                    this.loadedCounter = this.assets._loadedCounter;
                }
            }.bind(this));
        },

        update: function () {
            if (this.assets) {
                this.bar.setBarLength((this.assets._loadedCounter - this.loadedCounter) * this.barUnit);
            }
        },
    });
    
    
})(game);