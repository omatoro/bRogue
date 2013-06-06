/**
 * EnemyManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

var Enemy = require('./enemy').Enemy;

(function(ns) {

	var MAP_CHIP_SIZE = 64;

	var INIT_MAX_LENGTH_TO_PLAYER = 9999;

	var LENGTH_TO_ATTACK = 50;
	var LENGTH_TO_ACTIVE = 150;
	var LENGTH_TO_SENSE  = 300;

	// tm.mainが来るまでの仮組み
	ns.EnemyManager = tm.createClass({
		init: function (enemyMapPositions) {//} stageData, mapData) {
			// 敵情報をまとめる配列
			this.data = [];

			var enemyData = [];

			// マップの配列上のデータから、ピクセル単位のポジションに変換する(マップ左上から見た座標)
			// Enemyを作成する
			for (var i = 0; i < enemyMapPositions.length; ++i) {
				var x = enemyMapPositions[i].mapPosition.x * MAP_CHIP_SIZE + MAP_CHIP_SIZE/2;
				var y = enemyMapPositions[i].mapPosition.y * MAP_CHIP_SIZE;

				var enemy = Enemy();
				enemy.position.set(x, y);
				enemy.id = enemyMapPositions[i].id;
				enemy.className = enemyMapPositions[i].name;

				enemyData.push(enemy);
			}
			this.data = enemyData;
		},

	});

})(exports);