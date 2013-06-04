/*
 * SimpleMessageWindow
 */
(function(ns) {

	var FONT_SIZE    = 12;
	var FONT_STYLE   = "rgba(255, 255, 255, 0.0)";
	var FONT_PADDING = 0;
	var FONT_LEFT_PADDING = 0;

	var WINDOW_WIDTH = 200;
	var WINDOW_HEIGHT = 70;
	var WINDOW_PADDING = 10;

	var WINDOW_DRAW_POSITION_X = WINDOW_WIDTH/2  + WINDOW_PADDING;
	var WINDOW_DRAW_POSITION_Y = WINDOW_HEIGHT/2 + WINDOW_PADDING + 100;

	ns.SimpleMessageWindow = tm.createClass({
	    superClass: tm.app.Shape,

	    init: function(text, colorR, colorG, colorB) {
            // 初期化
	        this.superInit(WINDOW_WIDTH, WINDOW_HEIGHT);

	    	// 文字を先に作成(幅を取得するため)
	    	var label = tm.app.Label(text + "", FONT_SIZE);
            label.fillStyle = FONT_STYLE;
            label.setAlign("left").setBaseline("top");
            label.fontFamily = "'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            this.label = label;

	        // 色
	        this.colorR = colorR || 255;
	        this.colorG = colorG || 255;
	        this.colorB = colorB || 255;

	        // フォントの描画場所
            label.x = -this.width/2 + 10;
            label.y = -this.height/2 + 5;

	        this.setInteractive(false);
	        this.alpha = 0;
	        this.backgroundColor = "rgba(0, 0, 0, 0.0)";

	        // だんだん消えていく
	        var removeFlag = {is:false};
	        this.removeFlag = removeFlag;
            this.tweener
            	.to({"alpha": 1000}, 500)
            	.wait(5000)
                .to({"alpha": -1}, 1000)
                .call(function(){removeFlag.is = true;});

	        // 文字を追加
	        this.addChild(label);
	        this._refresh();

	        // 移動先を保存
	        this.directX = WINDOW_DRAW_POSITION_X;
	        this.directY = WINDOW_DRAW_POSITION_Y;
	    },

	    moveby: function (deltax, deltay) {
	    	this.directX += deltax/2;
	    	this.directY += deltay/2;
	    	this.timeline
	    		.set({"x": this.x, "y": this.y}, 0)
                .to({"x": this.directX, "y": this.directY}, 300, this.timeline.currentFrame * 1000/30 |0);
	    },

	    update: function () {
            this._refresh();
            if (this.removeFlag.is) {
            	this.remove();
            }
	    },

	    // 改行処理をphi_jp氏のサンプルからとりあえずそのまま入れる
		fillTextLine: function(context, text, x, y) {
			var textList = text.split('\n');
			var lineHeight = context.measureText("あ").width;
			textList.forEach(function(text, i) {
				context.fillText(text, x, y+lineHeight*i);
			});
		},

	    _refresh: function () {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.width);
	        var lineWidth   = 2;

	        // テキスト描画部分
	        c.fillStyle = tm.graphics.Color.createStyleRGBA(this.colorR, this.colorG, this.colorB, this.alpha*0.5/1000);
	        c.lineWidth = lineWidth;
	        c.fillRoundRect(lineWidth, lineWidth, WINDOW_WIDTH-(lineWidth*2), WINDOW_HEIGHT-(lineWidth*2), 5);

            // ラベルのサイズをリセット
            this.label.fillStyle = tm.graphics.Color.createStyleRGBA(20, 20, 20, this.alpha/1000);
            this.label.setSize(this.width, this.height);
	    }
	});

})(game);