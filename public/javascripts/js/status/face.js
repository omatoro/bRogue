/**
 * Face
 */
(function(ns) {

    ns.Face = tm.createClass({
        superClass : tm.app.Shape,

        init: function(parent) {
            this.superInit(220, 220);
            this.backgroundColor = "rgba(255, 255, 255, 0.5)";
            this._refresh();

            // 画像
            if (ns.twitter.isLogin()) {
                var face = tm.app.Sprite(ns.twitter.getIconName(), 192, 192);
            }
            else {
                var face = tm.app.Sprite("playerFace", 192, 192);
            }
            face.position.set(0, 0);

            // 画面に追加
            this.addChild(face);
        },
        
        _refresh: function() {
            // ボタン描画
            var c = this.canvas;
            c.resize(this.width, this.height);
            c.fillStyle = this.backgroundColor;
            c.fillRoundRect(2, 2, this.width-4, this.height-4, 10);
            c.strokeStyle   = "rgba(255,255,255,0.75)";
            c.lineWidth     = 2;
            c.strokeRoundRect(2, 2, this.width-4, this.height-4, 10);
        },
    });
})(game);