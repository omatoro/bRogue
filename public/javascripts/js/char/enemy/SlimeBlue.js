/**
 * SlimeBlue
 */
(function(ns) {

	ns.SlimeBlue = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("SlimeBlue", {
				width:  96/6,
				height: 80/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 70;
			this.hp    = 70;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 12; // 攻撃力
			this._def  = 10; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 4; // 倒した時の経験値

			this.speed = 1;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "モンスターの液体",
					random: 30
				},{
					itemName: "ポーション",
					random: 90
				},{
					itemName: "布の鎧",
					random: 60
				}
			];
		}
	});

})(game);