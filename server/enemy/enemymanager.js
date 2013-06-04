/**
 * EnemyManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

(function(ns) {

	// tm.mainが来るまでの仮組み
	ns.EnemyManager = tm.createClass({
		init: function (mapData, playerData) {
			// 敵情報をまとめる配列
			this.data = [];

			
		},

		update: function () {

		},

	});

})(exports);