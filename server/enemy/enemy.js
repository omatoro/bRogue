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

	ns.RegistState = tm.createClass({
		init: function () {
			this.stateList = [];
			this.currentState = {func: function(){}};
			this.always       = {func: function(){}};
			this.last         = {func: function(){}};
		},
		add: function (state, func) {
			if (state === "alwaysFirst") {
				this.always = {
					state: state,
					func: func,
				};
			}
			if (state === "alwaysLast") {
				this.last = {
					state: state,
					func: func,
				};
			}
			else {
				this.stateList.push({
					state: state,
					func: func,
				});
			}

		},
		remove: function () {}, // @todo
		replace: function (state) {
			// 既に状態が同じなら以下処理を行わない
			if (this.currentState && this.currentState.state === state) {
				return ;
			}
			for (var i = 0; i < this.stateList.length; ++i) {
				if (this.stateList[i].state === state) {
					this.currentState = this.stateList[i];
					return ;
				}
			}
			this.currentState = {func: function(){}};
		},
		update: function () {
			this.always.func();
			this.currentState.func();
			this.last.func();
		}, 
	});

	ns.Enemy = tm.createClass({
		init: function () {
			this.speed = DEFAULT_MOVE_SPEED;
			this.velocity = tm.geom.Vector2(0, 0);
			this.position = tm.geom.Vector2(0, 0);

			// 攻撃のタイミングを図るためのフレームカウンター
			// 上限値決めないとな～ @todo
			this.frame = 0;

			// 状態管理
			var self = this;
			this.state = ns.RegistState();

			this.state.add("alwaysFirst", function () {
				// フレームをカウントアップ
				++this.frame;
				var players = this.players;

				// マップ上の位置
				var myPosition = this.position; // CPU効果無し
	        	var mapEnemyPosition = tm.geom.Vector2(myPosition.x, myPosition.y);
	        	mapEnemyPosition.y += 35; // 位置を調整
	        	this.mapEnemyPosition = mapEnemyPosition; // ここだけで2%くらい上がってる

	        	// 一番近いプレイヤーを探す
	        	var minDistanceToPlayer = INIT_MAX_LENGTH_TO_PLAYER;
	        	var playerPosition      = null;
	        	for (var i = 0; i < players.length; ++i) {
	        		var position = tm.geom.Vector2(players[i].data.position.x, players[i].data.position.y);
	        		var distanceToPlayer = mapEnemyPosition.distance(position);
	        		if (distanceToPlayer < minDistanceToPlayer) {
	        			minDistanceToPlayer = distanceToPlayer;
	        			playerPosition      = position;
	        		}
	        	}
	        	this.playerPosition = playerPosition; // ここだけで2%くらい上がってる

	        	if      (minDistanceToPlayer <= LENGTH_TO_ATTACK) { this.state.replace("attack"); }
	        	else if (minDistanceToPlayer <= LENGTH_TO_ACTIVE) { this.state.replace("active"); }
	        	else if (minDistanceToPlayer <= LENGTH_TO_SENSE)  { this.state.replace("sense"); }
	        	else { this.state.replace("sense"); }
			}.bind(self));
			this.state.add("attack", function () {
				this.velocity.x = 0;
				this.velocity.y = 0;
			}.bind(self));
			this.state.add("active", function () {
				this.playerPosition.sub(this.mapEnemyPosition);
				this.velocity = this.playerPosition.normalize();
			}.bind(self));
			this.state.add("sense", function () {
	            // フレームに合わせてランダム移動する
	            if (this.frame % FPS === 0) {
	                var angle = Math.rand(0, 359);
	            }
	            if (angle) {// && this.isAnimation) {
	                this.velocity.setDegree(angle, 1);
	            }
	            else {
	            }
			}.bind(self));
			this.state.add("alwaysLast", function () {
				// マップのヒット判定無しに移動　@todo どこか一箇所で処理させたい
				this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));
			}.bind(self));
		},

		update: function (players) {
			// playersを保持 - ここだけで2%くらい上がってる
			this.players = players;
			// AI処理
			this.state.update();
		},
	});


})(exports);