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
			this.speed = DEFAULT_MOVE_SPEED;
			this.velocity = tm.geom.Vector2(0, 0);
			this.position = tm.geom.Vector2(0, 0);

			// 攻撃のタイミングを図るためのフレームカウンター
			// 上限値決めないとな～ @todo
			this.frame = 0;
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
        	else {// if (minDistanceToPlayer <= LENGTH_TO_SENSE) {
        		// 動き始める
        		this._moveSense();
        	}

			// マップのヒット判定無しに移動　@todo どこか一箇所で処理させたい
			this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));
		},

		_moveAttack: function () {
			this.velocity.x = 0;
			this.velocity.y = 0;
		},
		_moveActive: function (enemyPosition, playerPosition) {
			// プレイヤーへの距離
			var distance = playerPosition.sub(enemyPosition);
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
	});


})(exports);