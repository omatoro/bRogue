/**
 * SmallBatBlack
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;
var Enemy = require('./../enemy.js').Enemy;

(function(ns) {

	ns.SmallBatBlack = tm.createClass({
		superClass : Enemy,

		init: function () {
			this.superInit();

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
					random: 3
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

})(exports);