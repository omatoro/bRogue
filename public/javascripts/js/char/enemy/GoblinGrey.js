/**
 * GoblinGrey
 */
(function(ns) {

	ns.GoblinGrey = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("GoblinGrey", {
				width:  108/6,
				height: 72/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 20;
			this.hp    = 32;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 10; // 攻撃力
			this._def  = 3; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 2; // 倒した時の経験値

			this.speed = 2;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "サーベル",
					random: 50
				},{
					itemName: "ダガー",
					random: 80
				},{
					itemName: "布の服",
					random: 30
				}
			];
		}
	});

})(game);