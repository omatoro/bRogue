/**
 * Enemy
 */
(function(ns) {

	var ATTACK_LIMIT_COUNTER = 90;

	ns.Enemy = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (image, imageData, drawImageScaleSize, player, map) {
			this.superInit(image, imageData, drawImageScaleSize);
			// プレイヤーなので操作を受け付けるように設定
			this.isInput = false;
			this.isAuto  = true;

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

			this.speed = 0;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "ナイフ",
					random: 2
				}
			];

			this.map = map;
			this.player = player; // ダメージを与える際に使用
			this.lengthToPlayer = 0;
			this.lengthToAttack = 50;  // 攻撃を開始する距離
			this.lengthToActive = 150; // プレイヤーを察知して近づき始める距離 
			this.lengthToSense = 300;  // 察知して動き始める距離
			this.modeActive = 0;     // 攻撃をし続けるモード(攻撃を受けたら切り替わる)
			this.modeSafe   = 0;     // 攻撃をせずに行動するモード
			this.attackTime = 0;

			// 攻撃時のアニメーション
			var ss = tm.app.SpriteSheet({
                image: "slash",
                frame: {
                    width:  65,
                    height: 65,
                    count: 8
                },
                animations: {
                    "slash": [0, 8]
                }
            });
			var slash = tm.app.AnimationSprite(ss, 120, 120);
            slash.position.set(0, 0);
            this.slash = slash;
            this.attackDistanse = 50;
            this.addChild(slash);
		},

		getMaxHP:     function () { return this.maxhp; },
		getCurrentHP: function () { return this.hp; },
		getMaxMP:     function () { return this.maxmp; },
		getCurrentMP: function () { return this.mp; },

		getAttackPoint: function (attack) {
			// 攻撃力を計算
			var random = Math.rand(9, 11) / 10;
			var attackpoint = ((this._str + this._dex/5 + this._luk/3) * random)|0;
			return attackpoint;
		},

		damage: function (attack) {
			var damage = (attack - this._def) |0;
			damage = (damage < 0) ? 0 : damage;

			this.hp -= damage;
			this.hp = (this.hp < 0) ? 0 : this.hp;

			return damage;
		},

		getExp: function () {
			if (this.hp <= 0) {
				return this.exp;
			}
			return 0;
		},

		getDropItem: function () {
			// hpが0になったら死亡
			if (this.hp <= 0) {
				for (var i = 0; i < this.dropItemList.length; ++i) {
					if (Math.rand(0, this.dropItemList[i].random) === 0) {
						return this.dropItemList[i].itemName;
					}
				}
			}
			return null;
		},

		isEnemyDead: function () {
			if (this.hp <= 0) {
				// tm.asset.AssetManager.get("enemydown").clone().play();
				this.remove();
				return true;
			}
			return false;
		},

		isHit: function (point, radius) {
			// console.log(this.radius);
		},

		update: function (app) {
            // ランダム移動
            // if (this.isAuto) {
            // 	var mapEnemyPosition = this.position.clone();
            // 	mapEnemyPosition = this.map.mapCenterToMapLeftTop(mapEnemyPosition.x, mapEnemyPosition.y);
            // 	mapEnemyPosition.y += 35; // 位置を調整
            // 	var lengthToPlayer = this.map.playerPosition.distance(mapEnemyPosition);
            // 	if (lengthToPlayer <= this.lengthToAttack) {
            // 		// 攻撃
            // 		this._moveAttack();
            // 		this._attack(app, mapEnemyPosition, this.map.playerPosition.clone());

            // 		// 攻撃へのカウントアップ
            // 		++this.attackTime;
            // 	}
            // 	else if (lengthToPlayer <= this.lengthToActive) {
            // 		// playerに近づく
            // 		this._moveActive(mapEnemyPosition, this.map.playerPosition.clone());

            // 		// 攻撃へのカウントアップ
            // 		++this.attackTime;
            // 	}
            // 	else if (lengthToPlayer <= this.lengthToSense) {
            // 		// 動き始める
            // 		this._moveSense(app);

            // 		// 攻撃をキャンセル
            // 		this.attackTime = 0;
            // 	}
            // }
		},

		_attack: function (app, enemyPosition, playerPosition) {
			// 攻撃へのカウントアップが上限に達しているか
			if (this.attackTime < ATTACK_LIMIT_COUNTER) {
				return ;
			}
			else {
				this.attackTime = ATTACK_LIMIT_COUNTER;
			}

            // 攻撃の方向を調べる
            playerPosition.sub(enemyPosition);
            var attackDirect = playerPosition.normalize();
            
            // 攻撃の場所を計算する(画面上)
            var distanse = this.attackDistanse;
            var attackScreenPosition = tm.geom.Vector2.mul(attackDirect, distanse);

            // 攻撃時のアニメーション
            this.slash.position.set(attackScreenPosition.x, attackScreenPosition.y);
            this.slash.gotoAndPlay("slash");

            // 音
            // tm.asset.AssetManager.get("playerdamage").clone().play();

            // 攻撃するポイントを作成
            var attackMapPosition = this.position.clone().add(attackScreenPosition);
            attackMapPosition = this.map.mapCenterToMapLeftTop(attackMapPosition.x, attackMapPosition.y-20);
            var attackElement = tm.app.Object2D();
            attackElement.radius = 40;
            attackElement.position.set(attackMapPosition.x, attackMapPosition.y);

            // プレイヤーのポイントを作成
            var hittedElement = tm.app.Object2D();
            hittedElement.radius = 40;
            hittedElement.position.set(this.map.playerPosition.x, this.map.playerPosition.y);

            // 攻撃が当たっているか調べる
            if (hittedElement.isHitElementCircle(attackElement)) {
            	// 攻撃のカウントを初期化
            	this.attackTime = 0;

            	// ダメージ計算
            	var attack = this.getAttackPoint();
            	var damage = this.player.damage(attack);

            	// ダメージを表示
            	var damageEffect = ns.DamagedNumber(damage, 255, 20, 20, 255, 255, 255);

            	// 表示場所を設定
                var damagePosition = this.map.mapCenterToScreenTopLeft(hittedElement.x, hittedElement.y);
                damageEffect.effectPositionSet(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2 + 10);
                app.currentScene.addChild(damageEffect);
            }
		},

		_moveAttack: function () {
			this.velocity.x = 0;
			this.velocity.y = 0;
		},
		_moveActive: function (enemyPosition, playerPosition) {
			// プレイヤーに近づく
			// プレイヤーへの距離
			playerPosition.sub(enemyPosition);
			// playerPosition.y *= -1;
			this.velocity = playerPosition.normalize();
			this.velocity.x *= -1;
			this.velocity.y *= -1;
			var angle = Math.radToDeg(this.velocity.toAngle());
			angle -= 180;
            if   (angle < 0) {angle *= -1;}
            else             {angle = 360 - angle;}
			this.directWatch(angle);
		},
		_moveSense: function (app) {
			// 移動を開始するモードに変更する
			// this.modeSafe = true;

            // フレームに合わせて移動する
            if (app.frame % 20 === 0) {
                var angle = Math.rand(0, 359);
            }
            if (angle && this.isAnimation) {
                this.velocity.setDegree(angle, 1);
                this.velocity.x *= -1;
                // this.speed = 4;
                // 移動方向に対して体を向けてアニメーションする
                this.directWatch(angle);
            }
            else {
                //this.paused = true;
            }
		},
	});

})(game);