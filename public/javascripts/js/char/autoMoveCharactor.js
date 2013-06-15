/**
 * AutoMoveCharactor
 */
(function(ns) {

	/**
	 * AutoMoveCharactor
	 * 目的地を設定するとアニメーション＆移動を行う
	 */
	ns.AutoMoveCharactor = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (imageName, frame, drawImageScaleSize) {
			this.superInit(imageName, frame, drawImageScaleSize);
			this.aimPosition = null;
		},

		/**
		 * 目的地を設定
		 */
        setAim: function (position) {
            this.aimPosition = tm.geom.Vector2(position.x, position.y);
        },
        
        /**
         * 自動移動
         */
        autoMove: function () {
            if (!this.aimPosition) {
                return ;
            }
            // 目的地へのベクトルを取得
            var direct = this.getDirect(this.position, this.aimPosition);
            // 指定された座標が現在と同じであれば移動しない
            if (Math.abs(direct.x) <= this.speed+1 && Math.abs(direct.y) <= this.speed+1) {
                return ;
            }
			// 目的地への角度を求める
			var angle = this.getAngle(direct.clone());
            // 角度の方向へ向く
			this.directWatch(angle);
            // 移動
            direct.normalize();
            this.position.add(tm.geom.Vector2.mul(direct, this.speed));
        },
        
        /**
         * ベクトルを取得
         */
        getDirect: function (from, to) {
            return to.clone().sub(from);
        },
        
        /**
         * 角度を取得
         */
        getAngle: function (normal) {
			normal.y *= -1;
			var angle = Math.radToDeg(normal.toAngle());
            
            // 右箇所0から始まり、360度の角度に変換
            if   (angle < 0) {angle = angle + 360;}
            return angle;
        },
	});

})(game);