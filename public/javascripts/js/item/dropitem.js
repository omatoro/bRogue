/**
 * DropItem
 */
(function(ns) {

    var IMAGE_WIDTH  = 32;
    var IMAGE_HEIGHT = 128;
    var IMAGE_DIVIDE_COLUMN = 1;
    var IMAGE_DIVIDE_ROW    = 4;
    var IMAGE_ANIM_COUNT    = 4; // 枚数

	ns.DropItem = tm.createClass({
		superClass : tm.app.AnimationSprite,

		init: function (item, image, drawImageScaleSize) {
			var frame = {
                width:  IMAGE_WIDTH/IMAGE_DIVIDE_COLUMN,
                height: IMAGE_HEIGHT/IMAGE_DIVIDE_ROW,
                count:  IMAGE_ANIM_COUNT
            };

            this.item = item;

            var drawImageScaleSize = drawImageScaleSize || 3;

			var ss = tm.app.SpriteSheet({
                image: image || "dropTreasure",
                frame: frame,
                animations: {
                    "open":   [0, 3, "opened", 5],
                    "opened": [3, 4, "opened", 5]
                }
            });

			this.superInit(ss, frame.width*drawImageScaleSize, frame.height*drawImageScaleSize);

			// アニメーション終了時の動作
			this.addEventListener("animationend", function(e) {
				// アニメーションを止める
				this.paused = true;

				// だんだん消える
				this.tweener.
                	to({"alpha": 0}, 700).
                	call(function () {
                		this.remove();
                	}.bind(this));
			});

			// 削除フラグ
			this.isRemove = false;
		},

		isHit: function (player) {
			if (this.isHitElementCircle(player) && this.isRemove === false) {
				this.isRemove = true;
				this.gotoAndPlay("open");
				return this.item;
			}
			return null;
		},

		update: function (app) {
		}
	});

})(game);