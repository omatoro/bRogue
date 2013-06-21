/**
 * GoblinGreen
 */
(function(ns) {

	ns.GoblinGreen = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("GoblinGreen", {
				width:  108/6,
				height: 72/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 80;
			this.hp    = 80;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 25; // 攻撃力
			this._def  = 12; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 8; // 倒した時の経験値

			this.speed = 2;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "刀",
					random: 120
				},{
					itemName: "肉",
					random: 50
				}
			];
		}
	});

})(game);