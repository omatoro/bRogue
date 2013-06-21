/**
 * DragonGreen
 */
(function(ns) {

	ns.DragonGreen = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("DragonGreen", {
				width:  228/6,
				height: 120/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 260;
			this.hp    = 260;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 35; // 攻撃力
			this._def  = 30; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 15; // 倒した時の経験値

			this.speed = 2;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "ドラゴンの爪(緑)",
					random: 120
				},{
					itemName: "ドラゴンの鱗鎧(緑)",
					random: 60
				}
			];
		}
	});

})(game);