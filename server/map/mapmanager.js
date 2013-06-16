/**
 * MapManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;
var map = require('./generatemap');

var mapEnemyInfo = require('./../stage/stagemanager').StageManager().getMapEnemy();
var EnemyManager = require('./../enemy/enemymanager').EnemyManager;
var MapFileJSON  = require('./../map/mapfilesample');

// var fs = require('fs');

(function(ns) {

    // どこに衝突しているか
    var HIT_UP    = 0x01;
    var HIT_DOWN  = 0x02;
    var HIT_LEFT  = 0x04;
    var HIT_RIGHT = 0x08;

    var MAP_CHIP_SIZE = 64;

    ns.MapManager = tm.createClass({

    	init: function (players) {
			// マップ生成
            // var createdMapData = []; 

            // for (var i = 0; i < 100; ++i) {
            //     var mapSize = Math.rand(20, 31);
            //     this.mapdata = map.GenerateMap(mapSize, mapSize);
            //     createdMapData.push(this.mapdata);
            // }

            // fs.writeFile("mapfilesample400.json",JSON.stringify(createdMapData));


			// var mapSize = Math.rand(20, 31);
            // this.mapdata = map.GenerateMap(mapSize, mapSize);


            // とりあえず1階分だけ
			this.mapdata = MapFileJSON[0];

            // 歩ける場所に何かを生成したら覚えておく
    		this.isCreateSomething = [];

            // 敵のIDカウンター
            this.enemyIDNum = 1;

    		// 階段を設置
            this.stairsPosition = this.getRandomSafeMapChipPosition(
            		this.mapdata.walkMapNum,
            		this.mapdata.collision);
            this.mapdata.stairsPosition = this.stairsPosition;

            // プレイヤーの初期位置
            this.mapdata.playerStartPosition = this.getRandomSafeMapChipPosition(
            		this.mapdata.walkMapNum,
            		this.mapdata.collision);

            // 敵の位置(鯖で管理)
            this.mapdata.mapEnemyInfo = mapEnemyInfo;

            // 敵を設置
            var enemyMapPosition = this.createFirstEnemyPosition(
                    mapEnemyInfo[0],
                    this.mapdata.walkMapNum,
                    this.mapdata.collision);

            // this.enemyManager = enemyManager(enemyMapPosition); // 仮に1階の敵データを渡す
            var enemyManager = EnemyManager(enemyMapPosition);
            this.mapdata.enemyManager = enemyManager.data; // 仮に1階の敵データを渡す
            this.enemyManager = enemyManager;

            // プレイヤーのデータ
            this.players = players;
    	},

        /**
         * 敵の初期位置を作成
         * 仮に1階の敵データを作る
         */
        createFirstEnemyPosition: function (stageEnemy, walkMapNum, collisionMap, currentEnemyNum) {
            var result = [];

            for (var i = 0, n = stageEnemy.length; i < n; ++i) {
                for (var j = currentEnemyNum || 0, jn = stageEnemy[i].num; j < jn; ++j) {
                    // 敵の位置(マップチップの配列状態)
                    var enemyMapPosition = this.getRandomSafeMapChipPosition(walkMapNum, collisionMap);

                    // 格納するデータの作成
                    var enemyData = {
                        id: this.enemyIDNum++, // 一意のIDを与える
                        name: stageEnemy[i].enemy,
                        mapPosition: enemyMapPosition,
                    };
                    result.push(enemyData);
                }
            }
            return result;
        },

        /**
         * 歩ける場所からランダムに選んで返す(マップの左上を0,0)
         */
        getRandomSafeMapChipPosition: function (walkMapNum, collisionMap) {
            // 既に何かを生成していないか調べる
            var mapPosition = Math.rand(0, walkMapNum-1);
            var isBreak = true;
            while (true) {
                for (var i = 0, n = this.isCreateSomething.length; i < n; ++i) {
                    if (this.isCreateSomething[i] === mapPosition) {
                        mapPosition = Math.rand(0, walkMapNum-1);
                        isBreak = false;
                        break;
                    }
                    else {
                        isBreak = true;
                    }
                }
                if (isBreak && this.isCreateSomething[i] !== mapPosition) {
                    break;
                }
            }

            // 歩ける場所を返す
            var counter = 0;
            for (var i = 0, n = collisionMap.length; i < n; ++i) {
                for (var j = 0, jn = collisionMap[i].length; j < jn; ++j) {
                    // 歩ける場所かどうか
                    if (collisionMap[i][j] === 1) {
                        // ランダムに選んだ場所かどうか
                        if (counter === mapPosition) {
                            // ここだ！ マップの左上を0,0とした座標で数値を返す
                            var result = {
                                x: j,
                                y: i
                            };
                            this.isCreateSomething.push(counter);
                            return result;
                        }
                        else {
                            ++counter;
                        }
                    }
                }
            }
        },

        update: function () {
            // ダメージ処理を行う
            var enemies = this.enemyManager;
            enemies.update();

            // 敵の数が減ったら生成する
            if (this.mapdata.mapEnemyInfo[0][0].num > enemies.data.length) {
                var enemyMapPosition = this.createFirstEnemyPosition(
                        this.mapdata.mapEnemyInfo[0], // 一体だけ生成
                        this.mapdata.walkMapNum,
                        this.mapdata.collision,
                        enemies.data.length);

                this.enemyManager.createEnemy(enemyMapPosition);
            }

            // Enemyのupdateを実行する
            // 移動処理はenemyManagerでやったほうがいい？
            // var enemies = this.data;
            for (var i = 0, n = enemies.data.length; i < n; ++i) {
                // 死んでたら処理しない
                if (enemies.data[i].isDead()) {
                    continue;
                }

                enemies.data[i].update(this.players);

                // マップとのヒット判定＆移動制限
                var isHit = this._isHitCollisionMap(
                        enemies.data[i].position.x,
                        enemies.data[i].position.y,
                        enemies.data[i].velocity.clone(),
                        enemies.data[i].speed);
                if (isHit & HIT_UP)    { enemies.data[i].velocity.y = 0; }
                if (isHit & HIT_DOWN)  { enemies.data[i].velocity.y = 0; }
                if (isHit & HIT_LEFT)  { enemies.data[i].velocity.x = 0; }
                if (isHit & HIT_RIGHT) { enemies.data[i].velocity.x = 0; }

                // 移動処理
                enemies.data[i].position.add(
                        tm.geom.Vector2.mul(
                                enemies.data[i].velocity, 
                                enemies.data[i].speed));
            }
        },

        // マップとのヒット判定
        _isHitCollisionMap: function (x, y, velocity, speed) {
            // 返す値
            var result = 0x00;
            // 所属しているマップチップを取得
            var chip = this._getBelong(x, y);
            // 所属しているマップチップのrectを取得
            var chipRect = this._getRect(chip.col, chip.row);
            // 上下左右のマップチップのcollisionを取得
            var crossCollision = this._getCrossCollision(chip.col, chip.row);
            // 移動量を取得
            var movingAmount = tm.geom.Vector2.mul(velocity, speed);
            // 移動後の位置が衝突しているか
            if (crossCollision.up === null || crossCollision.up === 0) {
                var movedY = y + movingAmount.y;
                if (movedY < chipRect.up)   { result |= HIT_UP; } // とりあえず移動させない(マップぴったりに合わせたほうがいいかも)
            }
            if (crossCollision.down === null || crossCollision.down === 0) {
                var movedY = y + movingAmount.y;
                if (movedY > chipRect.down) { result |= HIT_DOWN; }
            }
            if (crossCollision.left === null || crossCollision.left === 0) {
                var movedX = x + movingAmount.x;
                if (movedX < chipRect.left) { result |= HIT_LEFT; }
            }
            if (crossCollision.right === null || crossCollision.right === 0) {
                var movedX = x + movingAmount.x;
                if (movedX > chipRect.right) { result |= HIT_RIGHT; }
            }
            return result;
        },

        /**
         * どこのマップチップに所属しているか取得(Map左上が0,0となる座標で指定)
         */
        _getBelong: function(x, y) {
            var col = (x / MAP_CHIP_SIZE) |0;
            var row = (y / MAP_CHIP_SIZE) |0;

            var result = {
                col: col,
                row: row,
            };
            return result;
        },

        /**
         * マップチップのrectを取得
         */
        _getRect: function(col, row) {
            var up    = row     * MAP_CHIP_SIZE;
            var down  = (row+1) * MAP_CHIP_SIZE-1;
            var left  = col     * MAP_CHIP_SIZE;
            var right = (col+1) * MAP_CHIP_SIZE-1;

            var result = {
                up: up,
                down: down,
                left: left,
                right: right
            };

            return result;
        },

        /**
         * 上下左右のマップチップのcollisionを取得
         */
        _getCrossCollision: function(col, row) {
            var limitDown  = this.mapdata.map.length-1;
            var limitRight = this.mapdata.map[0].length-1;

            var up    = (row > 0)          ? this.mapdata.collision[row-1][col] : null;
            var down  = (row < limitDown)  ? this.mapdata.collision[row+1][col] : null;
            var left  = (col > 0)          ? this.mapdata.collision[row][col-1] : null;
            var right = (col < limitRight) ? this.mapdata.collision[row][col+1] : null;

            var result = {
                up:    up,
                down:  down,
                left:  left,
                right: right,
            };

            return result;
        },

    });

})(exports);
