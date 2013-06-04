/*
 * Baloon
 */
(function(ns) {

	var FONT_SIZE    = 30;
	var FONT_STYLE   = "rgba(20, 20, 20, 0.0)";
	var FONT_PADDING = 0;
	var FONT_LEFT_PADDING = 0;

	ns.Baloon = tm.createClass({
	    superClass: tm.app.Shape,

	    init: function(text, colorR, colorG, colorB, far) {
	    	// 文字を先に作成(幅を取得するため)
	    	var label = tm.app.Label(text + "", FONT_SIZE);
            label.fillStyle = FONT_STYLE;
            label.setAlign("center").setBaseline("middle");
            this.label = label;

            // 文字列の横幅が取得できないので、仮に正確ではないが計算する
            var width  = label.width + FONT_SIZE;
            var height = label.height + 15;

            // 初期化
	        this.superInit(width, height);

	        // 消えながら離れるときの距離
	        this.far = far || 50;

	        // 色
	        this.colorR = colorR || 255;
	        this.colorG = colorG || 255;
	        this.colorB = colorB || 255;

	        // フォントの描画場所
            label.x = 0;
            label.y = -5;

	        this.setInteractive(false);
	        this.alpha = 1000;
	        this.backgroundColor = "rgba(0, 0, 0, 0.0)";

	        // 文字を追加
	        this.addChild(label);
	        this._refresh();
	    },

	    effectPositionSet: function (x, y) {
	    	x += -10;  // ずらさないと点とかぶるため
	    	y -= this.height/3;

	    	this.position.set(x, y);

	        // だんだん消えていく
            this.tweener.
                to({"alpha": -1, "x": x, "y": y - this.far}, 700);
	    },

	    update: function () {
            this._refresh();

	        if (this.alpha <= 0) {
	        	this.remove();
	        }
	    },

	    _refresh: function () {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.width);
	        var lineWidth   = 0;

	        // テキスト描画部分
	        c.fillStyle = tm.graphics.Color.createStyleRGBA(this.colorR, this.colorG, this.colorB, this.alpha*0.5/1000);
	        c.lineWidth = 0;
	        c.fillRoundRect(lineWidth, lineWidth, this.width-(lineWidth*2), this.height-(lineWidth*2), 5);

            // ラベルのサイズをリセット
            this.label.fillStyle = tm.graphics.Color.createStyleRGBA(20, 20, 20, this.alpha/1000);
            this.label.setSize(this.width, this.height);
	    }
	});

})(game);