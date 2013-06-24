/**
 * EnemyManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

var enemyClass = {};
enemyClass.BatBlack 		= require('./type/BatBlack.js').BatBlack;
enemyClass.BatBlue 			= require('./type/BatBlue.js').BatBlue;
enemyClass.BatGreen 		= require('./type/BatGreen.js').BatGreen;
enemyClass.BatRed2 			= require('./type/BatRed2.js').BatRed2;
enemyClass.BatWhite 		= require('./type/BatWhite.js').BatWhite;
enemyClass.Death 			= require('./type/Death.js').Death;
// enemyClass.DragonBlack 		= require('./type/DragonBlack.js').DragonBlack;
// enemyClass.DragonBlue 		= require('./type/DragonBlue.js').DragonBlue;
// enemyClass.DragonGhost 		= require('./type/DragonGhost.js').DragonGhost;
enemyClass.DragonGreen 		= require('./type/DragonGreen.js').DragonGreen;
enemyClass.DragonRed 		= require('./type/DragonRed.js').DragonRed;
enemyClass.DragonWhite 		= require('./type/DragonWhite.js').DragonWhite;
enemyClass.GargoyleBlack 	= require('./type/GargoyleBlack.js').GargoyleBlack;
enemyClass.GargoyleRed 		= require('./type/GargoyleRed.js').GargoyleRed;
enemyClass.GhostNormal 		= require('./type/GhostNormal.js').GhostNormal;
enemyClass.GoblinGreen 		= require('./type/GoblinGreen.js').GoblinGreen;
enemyClass.GoblinGrey 		= require('./type/GoblinGrey.js').GoblinGrey;
enemyClass.GoblinRed 		= require('./type/GoblinRed.js').GoblinRed;
enemyClass.GolemBlue 		= require('./type/GolemBlue.js').GolemBlue;
enemyClass.GolemGhost 		= require('./type/GolemGhost.js').GolemGhost;
enemyClass.GolemGreen 		= require('./type/GolemGreen.js').GolemGreen;
enemyClass.GolemNormal 		= require('./type/GolemNormal.js').GolemNormal;
enemyClass.GolemRed 		= require('./type/GolemRed.js').GolemRed;
enemyClass.HarypyNormal 	= require('./type/HarypyNormal.js').HarypyNormal;
enemyClass.LizardManBlue 	= require('./type/LizardManBlue.js').LizardManBlue;
enemyClass.LizardManNormal 	= require('./type/LizardManNormal.js').LizardManNormal;
enemyClass.LizardManRed 	= require('./type/LizardManRed.js').LizardManRed;
enemyClass.SkeltonBlue 		= require('./type/SkeltonBlue.js').SkeltonBlue;
enemyClass.SkeltonGreen 	= require('./type/SkeltonGreen.js').SkeltonGreen;
enemyClass.SkeltonNormal 	= require('./type/SkeltonNormal.js').SkeltonNormal;
enemyClass.SkeltonRed 		= require('./type/SkeltonRed.js').SkeltonRed;
enemyClass.SlimeBlue 		= require('./type/SlimeBlue.js').SlimeBlue;
enemyClass.SlimeGold 		= require('./type/SlimeGold.js').SlimeGold;
enemyClass.SlimeGreen 		= require('./type/SlimeGreen.js').SlimeGreen;
enemyClass.SlimeRed 		= require('./type/SlimeRed.js').SlimeRed;
enemyClass.SmallBatBlack 	= require('./type/SmallBatBlack.js').SmallBatBlack;
enemyClass.SmallBatGhost 	= require('./type/SmallBatGhost.js').SmallBatGhost;
enemyClass.SmallBatGreen 	= require('./type/SmallBatGreen.js').SmallBatGreen;
enemyClass.SmallBatRed 		= require('./type/SmallBatRed.js').SmallBatRed;
enemyClass.ZombieNormal 	= require('./type/ZombieNormal.js').ZombieNormal;
enemyClass.ZombieRed 		= require('./type/ZombieRed.js').ZombieRed;

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
			for (var i = 0, n = enemyMapPositions.length; i < n; ++i) {
				var x = enemyMapPositions[i].mapPosition.x * MAP_CHIP_SIZE + MAP_CHIP_SIZE/2;
				var y = enemyMapPositions[i].mapPosition.y * MAP_CHIP_SIZE;

				if (enemyClass[enemyMapPositions[i].name]) {
					var enemy = enemyClass[enemyMapPositions[i].name]();
				}
				else {
					console.log("★★★★★★★★★★★★★★★★★そんなモンスターいません");
					var enemy = enemyClass["SlimeGreen"]();
				}
				enemy.position.set(x, y);
				enemy.id = enemyMapPositions[i].id;
				enemy.className = enemyMapPositions[i].name;

				this.data.push(enemy);
			}
		},

		getEnemyNum: function (type) {
			var counter = 0;
			// this.data.each(function () {
			// 	if (this.ClassName === type) {
			// 		++counter;
			// 	}
			// });
			for (var i = 0, len = this.data.length; i < len; ++i) {
				if (this.data[i].className === type) {
					++counter;
				}
			}
			return counter;
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