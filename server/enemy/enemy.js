/**
 * Enemy
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

(function(ns) {

	var ATTACK_LIMIT_COUNTER = 90;

	var INIT_MAX_LENGTH_TO_PLAYER = 9999;
	var LENGTH_TO_ATTACK = 50;
	var LENGTH_TO_ACTIVE = 150;
	var LENGTH_TO_SENSE  = 300;

	var DEFAULT_MOVE_SPEED = 4;

	var FPS = 30;


	ns.Enemy = tm.createClass({
		init: function () {
			this.velocity = tm.geom.Vector2(0, 0);
			this.position = tm.geom.Vector2(0, 0);

			// 攻撃のタイミングを図るためのフレームカウンター
			// 上限値決めないとな～ @todo
			this.frame = 0;

			// パラメータ関連
			this.maxhp = 0;
			this.hp    = 0;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 0; // 攻撃力
			this._def  = 0; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 0; // 倒した時の経験値

			this.speed = DEFAULT_MOVE_SPEED;


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
			this.exp = 1; // 倒した時の経験値
			this.isDeaded = false;

			this.dropItemList = [
				{
					itemName: "雑草",
					random: 2
				},{
					itemName: "モンスターの液体",
					random: 2
				},{
					itemName: "布の服",
					random: 2
				}
			];
		},

		update: function (players) {
			// フレームをカウントアップ
			++this.frame;

			// マップ上の位置
        	var mapEnemyPosition = tm.geom.Vector2(this.position.x, this.position.y);
        	mapEnemyPosition.y += 35; // 位置を調整

        	// 一番近いプレイヤーを探す
        	var minDistanceToPlayer = INIT_MAX_LENGTH_TO_PLAYER;
        	var playerPosition      = null;
        	for (var i = 0; i < players.length; ++i) {

        		var position = tm.geom.Vector2(players[i].data.position.x, players[i].data.position.y);
        		var distanceToPlayer = mapEnemyPosition.distance(position);
        		if (distanceToPlayer < minDistanceToPlayer) {
        			minDistanceToPlayer = distanceToPlayer;
        			playerPosition      = tm.geom.Vector2(players[i].data.position.x, players[i].data.position.y);
        		}
        	}

        	// キャラクターの位置によって行動を変化させる(AI)
        	if (minDistanceToPlayer <= LENGTH_TO_ATTACK) {
        		// 攻撃
        		this._moveAttack();
        	}
        	else if (minDistanceToPlayer <= LENGTH_TO_ACTIVE) {
        		// playerに近づく
        		this._moveActive(mapEnemyPosition, playerPosition.clone());
        	}
        	else if (minDistanceToPlayer <= LENGTH_TO_SENSE) {
        		// 動き始める
        		this._moveSense();
        	}
        	else {
        		// 動かない
        		this._moveSense();
        		// this._moveStop();
        	}
		},

		damage: function (attack) {
			var damage = (attack - this._def) |0;
			damage = (damage < 0) ? 0 : damage;

			this.hp -= damage;
			this.hp = (this.hp < 0) ? 0 : this.hp;

			return damage;
		},

		isDead: function () {
			if (this.hp <= 0) {
				this.isDeaded = true;
				// this.remove();
				return true;
			}
			return false;
		},

		getExp: function () { return this.exp; },

		_moveAttack: function () {
			this.velocity.x = 0;
			this.velocity.y = 0;
		},
		_moveActive: function (enemyPosition, playerPosition) {
			// プレイヤーへの距離
			playerPosition.sub(enemyPosition);
			this.velocity = playerPosition.normalize();
		},
		_moveSense: function () {
            // フレームに合わせて移動する
            if (this.frame % FPS === 0) {
                var angle = Math.rand(0, 359);
            }
            if (angle) {// && this.isAnimation) {
                this.velocity.setDegree(angle, 1);
            }
            else {
            }
		},
		_moveStop: function () {
			this.velocity.x = 0;
			this.velocity.y = 0;
		},


	});


})(exports);