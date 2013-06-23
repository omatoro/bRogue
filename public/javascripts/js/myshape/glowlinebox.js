/**
 * GlowLineBox
 */
(function(ns) {

    ns.GlowLineBox = tm.createClass({
        superClass : tm.app.Shape,

        /**
         * param: {
         *     widthPadding:  25,
         *     heightPadding: 50,
         *     h: 190,
         *     s: 80,
         *     l: 30,
         *     background: "rgba(5,25,60,0.5)"
         * }
         */
        init: function(param) {
            this.superInit(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            this.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            // 引数からサイズなどのデータを作成
            param = param || {};
            var widthPadding  = param.widthPadding  || 25;
            var heightPadding = param.heightPadding || 50;
            var width         = ns.SCREEN_WIDTH  - (widthPadding *2);
            var height        = ns.SCREEN_HEIGHT - (heightPadding*2);
            var center        = tm.geom.Vector2(ns.SCREEN_WIDTH/2, heightPadding + height/2);
            var topLeft       = tm.geom.Vector2(center.x - width/2, center.y - height/2);

            this.param = {
                widthPadding: widthPadding,
                heightPadding: heightPadding,
                width: width,
                height: height,
                center: center,
                topLeft: topLeft,
                h: param.h || 190,
                s: param.s || 80,
                l: param.l || 30,
                background: param.background || "rgba(5,25,60,0.5)",
            };

            this.backgroundColor = "rgba(0, 0, 0, 0.0)";
            this.alpha = 1.0;
            this._refresh();
        },
        
        _refresh: function() {
            // 枠線の大きさ
            var lineWidth = 2;

            // 描画
            var c = this.canvas;
            c.resize(this.width, this.height);

            // 描画モード
            c.globalCompositeOperation = "lighter";

            // 外枠
            this._shineStroke(c, lineWidth, lineWidth + this.param.topLeft.x, lineWidth + this.param.topLeft.y, 190, 80, 30, lineWidth/2);

            // 描画モード
            c.globalCompositeOperation = "source-over";

            // 中身
            c.fillStyle = this.param.background;
            c.fillRoundRect(
                lineWidth + this.param.topLeft.x, 
                lineWidth + this.param.topLeft.y, 
                this.param.width, 
                this.param.height, 
                lineWidth*2);
            // this._strokeRefresh(c, lineWidth, lineWidth*2, lineWidth*2, ns.Status.IN_STROKE_COLOR,  lineWidth/2);


            // var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);

            // // グラデーション
            // grad.addColorStop(0.0, ns.Status.BACK_GRADIENT_COLOR_TOP);
            // grad.addColorStop(0.5, ns.Status.BACK_GRADIENT_COLOR_CENTER);
            // grad.addColorStop(0.5, ns.Status.BACK_GRADIENT_COLOR_BOTTOM);
            // grad.addColorStop(1.0, ns.Status.BACK_GRADIENT_COLOR_BOTTOM);
            // c.setGradient(grad);
            // c.fillRect(lineWidth, lineWidth, this.width-lineWidth*2, this.height-lineWidth*2, lineWidth*4);
        },

        _strokeRefresh: function (canvas, lineWidth, linePositionX, linePositionY, color, radius) {
            // 外枠
            radius = radius || 0; // 角丸の大きさ
            canvas.strokeStyle   = color;
            canvas.lineWidth     = lineWidth;
            canvas.fillStyle     = color;

            if (radius === 0) {
                canvas.strokeStyle+= lineWidth/2;
                canvas.strokeRect(linePositionX, linePositionY, this.param.width-(linePositionX*2), this.param.height-(linePositionY*2));
                // canvas.clip();
            }
            else {
                canvas.strokeRoundRect(linePositionX, linePositionY, this.param.width, this.param.height, lineWidth*2);
                //canvas.clip(); // 以下描画時のimageデータをくり抜くため、上記処理が上書きされない
            }
        },

        _shineStroke: function (canvas, lineWidth, linePositionX, linePositionY, h, s, l, radius) {
            var lineHSL   = tm.graphics.Color.createStyleHSL(h, s-50, l+50);
            var shadowHSL = tm.graphics.Color.createStyleHSL(h, s, l);

            // 影を濃くする
            for (var i = 0; i < 12; ++i) {
                // 影
                canvas.setShadow(shadowHSL, 0, 0, 40);
                this._strokeRefresh(canvas, lineWidth, linePositionX, linePositionY, lineHSL, radius);
            }
        },
    });

})(game);