/**
 * ZombieNormal
 */
(function(ns) {

	ns.ZombieNormal = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("ZombieNormal", {
				width:  96/6,
				height: 80/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 5;
			this.hp    = 5;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 3; // 攻撃力
			this._def  = 0; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 500; // 倒した時の経験値

			this.speed = 1;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					// itemNum: 1,
					// random: 2
				}
			];
		}
	});

})(game);