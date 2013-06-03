/**
 * MapManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;
var map = require('./generatemap');

var mapEnemyInfo = require('./../stage/stagemanager').StageManager().getMapEnemy();


(function(ns) {

    ns.MapManager = tm.createClass({

    	init: function () {
			// マップ生成
			var mapSize = Math.rand(20, 31);
			this.mapdata = map.GenerateMap(mapSize, mapSize);

            // 歩ける場所に何かを生成したら覚えておく
    		this.isCreateSomething = [];

    		// 階段を設置
            this.stairsPosition = this.getRandomSafeMapChipPosition(
            		this.mapdata.walkMapNum,
            		this.mapdata.collision);

            this.mapdata.stairsPosition = this.stairsPosition;

            this.mapdata.mapEnemyInfo = mapEnemyInfo;

            // 敵を設置
            ;
    	},

        /**
         * 歩ける場所からランダムに選んで返す(マップの左上を0,0)
         */
        getRandomSafeMapChipPosition: function (walkMapNum, collisionMap) {
            // 既に何かを生成していないか調べる
            var mapPosition = Math.rand(0, walkMapNum-1);
            var isBreak = true;
            while (true) {
                for (var i = 0; i < this.isCreateSomething.length; ++i) {
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
            for (var i = 0; i < collisionMap.length; ++i) {
                for (var j = 0; j < collisionMap[i].length; ++j) {
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

    });

})(exports);
