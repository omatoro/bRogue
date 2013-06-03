/**
 * StageManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;

(function(ns) {

    var STAGE_MAKING = [
        // 1-10
        [
            {enemy: "SlimeGreen",      num: 10},
        ],[
            {enemy: "SlimeGreen",      num: 20},
            {enemy: "SmallBatBlack",   num: 5},
        ],[
            {enemy: "SlimeGreen",      num: 15},
            {enemy: "SmallBatBlack",   num: 10},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 15},
            {enemy: "GoblinGrey",      num: 5},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 15},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 5},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 10},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 10},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 5},
        ],[
            {enemy: "SlimeGreen",      num: 10},
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 5},
        ],

        // 11-20
        [
            {enemy: "SmallBatBlack",   num: 10},
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 10},
            {enemy: "SkeltonNormal",   num: 5},
        ],[
            {enemy: "GoblinGrey",      num: 10},
            {enemy: "BatBlack",        num: 15},
            {enemy: "SkeltonNormal",   num: 10},
        ],[
            {enemy: "GoblinGrey",      num: 5},
            {enemy: "BatBlack",        num: 10},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
        ],[
            {enemy: "GoblinGrey",      num: 5},
            {enemy: "BatBlack",        num: 10},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
        ],[
            {enemy: "GoblinGrey",      num: 5},
            {enemy: "BatBlack",        num: 5},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 10},
        ],[
            {enemy: "BatBlack",        num: 5},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 15},
        ],[
            {enemy: "BatBlack",        num: 5},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 15},
        ],[
            {enemy: "BatBlack",        num: 5},
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 15},
        ],[
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 15},
            {enemy: "LizardManNormal", num: 5},
        ],[
            {enemy: "SkeltonNormal",   num: 10},
            {enemy: "SlimeBlue",       num: 10},
            {enemy: "HarypyNormal",    num: 15},
            {enemy: "LizardManNormal", num: 5},
        ],

        // 21-30
        [
            {enemy: "HarypyNormal",    num: 15},
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
        ],[
            {enemy: "HarypyNormal",    num: 10},
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
        ],[
            {enemy: "HarypyNormal",    num: 10},
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
        ],[
            {enemy: "HarypyNormal",    num: 10},
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
        ],[
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
            {enemy: "SlimeRed",        num: 10},
        ],[
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
            {enemy: "SlimeRed",        num: 10},
        ],[
            {enemy: "LizardManNormal", num: 5},
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
            {enemy: "SlimeRed",        num: 10},
        ],[
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
            {enemy: "SlimeRed",        num: 15},
        ],[
            {enemy: "SmallBatGreen",   num: 10},
            {enemy: "GoblinGreen",     num: 10},
            {enemy: "BatGreen",        num: 10},
            {enemy: "SlimeRed",        num: 15},
        ],[
            {enemy: "GoblinGreen",     num: 5},
            {enemy: "BatGreen",        num: 5},
            {enemy: "SlimeRed",        num: 10},
            {enemy: "DragonGreen",     num: 20},
        ]
    ];

	ns.StageManager = tm.createClass({
		init: function (stageNum, enemyGroup, player, map) {
            // this._isGameClear = false;
            // if (STAGE_MAKING.length < stageNum) {
            //     // ゲームクリア
            //     this._isGameClear = true;
            // }
            // else {
            //     for (var i = 0; i < STAGE_MAKING[stageNum-1].length; ++i) {
            //         var dataCreateEnemy = STAGE_MAKING[stageNum-1][i];
            //         this._createEnemy(enemyGroup, player, map, dataCreateEnemy.enemy, dataCreateEnemy.num);
            //     }
            // }
		},

        isGameClear: function () {
            // return this._isGameClear;
        },

        _createEnemy: function (enemyGroup, player, map, enemyClass, num) {
            // // 敵を生成して返す
            // for (var i = 0; i < num; ++i) {
            //     // enemyを作成
            //     var enemy = enemyClass(player, map);
            //     // Sceneの座標に変換
            //     var safeEnemyPosition = map.getRandomSafeMapChipPosition();
            //     safeEnemyPosition = map.mapLeftTopToMapCenter(
            //         safeEnemyPosition.x * map.mapChipWidth + map.mapChipWidth/2,
            //         safeEnemyPosition.y * map.mapChipHeight);

            //     enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
            //     enemyGroup.addChild(enemy);
            // }
        },

        // 1ステージごとに送信したい todo
        getMapEnemy: function (stage) {
            // return STAGE_MAKING[stage];
            return STAGE_MAKING;
        },
	});

})(exports);