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

			// マップの配列上のデータから、ピクセル単位のポジションに変換する(マップ左上から見た座標)
			// Enemyを作成する
			this.createEnemy(enemyMapPositions);

			// プレイヤーの攻撃データを保持する
			this.attackPlayersData = [];
		},

		createEnemy: function (enemyMapPositions) {
			console.dir(enemyMapPositions);
			for (var i = 0, n = enemyMapPositions.length; i < n; ++i) {
				var x = enemyMapPositions[i].mapPosition.x * MAP_CHIP_SIZE + MAP_CHIP_SIZE/2;
				var y = enemyMapPositions[i].mapPosition.y * MAP_CHIP_SIZE;

				var enemy = Enemy();
				enemy.position.set(x, y);
				enemy.id = enemyMapPositions[i].id;
				enemy.className = enemyMapPositions[i].name;

				this.data.push(enemy);
			}
		},

		attackPlayers: function (data) {
			this.attackPlayersData.push(data);
			// console.dir(this.attackPlayersData);
		},

		/**
		 * クライアントで攻撃&ヒット判定を行なっているので、クライアントから送信された敵IDと照合してダメージ計算を行う
		 */
		enemyDamage: function (attackData) {
			for (var i = 0; i < this.data.length; ++i) {
				if (this.data[i].id === attackData.enemyId) {
					console.dir("enemyDamage");
					var data = {
						enemyId: attackData.enemyId,
						exp:    this.data[i].getExp(),
						damage: this.data[i].damage(attackData.playerAttackPoint),
						isDead: this.data[i].isDead(),
						itemDrop: {},
					};
					attackData.socket.emit("enemyDamaged", data);
					attackData.socket.broadcast.emit("enemyDamaged", data);

					if (data.isDead) {
						// 敵の情報を配列から削除
						this.data.splice(i, 1);
						// console.dir(this.data);
						--i;
						continue;
					}
				}
			}
		},

		update: function () {
			// まとめて敵ダメージを計算
			for (var i = 0; i < this.attackPlayersData.length; ++i) {
				this.enemyDamage(this.attackPlayersData.shift());
			}
		},

	});

})(exports);