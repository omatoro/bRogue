/**
 * EnemyManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

(function(ns) {

	var MAP_CHIP_SIZE = 64;

	// tm.mainが来るまでの仮組み
	ns.EnemyManager = tm.createClass({
		init: function (enemyMapPositions) {//, stageData, mapData) {
			// 敵情報をまとめる配列
			this.data = [];

			console.dir(enemyMapPositions);

			// マップの配列上のデータから、ピクセル単位のポジションに変換する(マップ左上から見た座標)
			for (var i = 0; i < enemyMapPositions.length; ++i) {
				enemyMapPositions[i].position = {};
				enemyMapPositions[i].position.x = enemyMapPositions[i].mapPosition.x * MAP_CHIP_SIZE + MAP_CHIP_SIZE/2;
				enemyMapPositions[i].position.y = enemyMapPositions[i].mapPosition.y * MAP_CHIP_SIZE;
			}

			this.data = enemyMapPositions;
			console.dir(this.data);
			
		},

		update: function () {

		},

	});

})(exports);