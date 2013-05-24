/**
 * BatBlack
 */
(function(ns) {

	ns.BatBlack = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("BatBlack", {
				width:  180/6,
				height: 112/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 25;
			this.hp    = 25;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 13; // 攻撃力
			this._def  = 4; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 2; // 倒した時の経験値

			this.speed = 4;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "ダガー",
					random: 6
				},{
					itemName: "肉",
					random: 6
				},{
					itemName: "布の服",
					random: 6
				}
			];
		}
	});

})(game);