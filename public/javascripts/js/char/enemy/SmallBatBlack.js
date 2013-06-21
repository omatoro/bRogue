/**
 * SmallBatBlack
 */
(function(ns) {

	ns.SmallBatBlack = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("SmallBatBlack", {
				width:  120/6,
				height: 96/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 10;
			this.hp    = 10;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 5; // 攻撃力
			this._def  = 1; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 1; // 倒した時の経験値

			this.speed = 5;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "ナイフ",
					random: 30
				},{
					itemName: "肉",
					random: 60
				},{
					itemName: "布の服",
					random: 60
				}
			];
		}
	});

})(game);