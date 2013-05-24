/**
 * SkeltonNormal
 */
(function(ns) {

	ns.SkeltonNormal = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("SkeltonNormal", {
				width:  96/6,
				height: 80/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 40;
			this.hp    = 40;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 18; // 攻撃力
			this._def  = 6; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 3; // 倒した時の経験値

			this.speed = 2;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "カッター",
					random: 13
				},{
					itemName: "ジャンビーヤ",
					random: 15
				},{
					itemName: "シャムシール",
					random: 20
				},{
					itemName: "布の鎧",
					random: 10
				}
			];
		}
	});

})(game);