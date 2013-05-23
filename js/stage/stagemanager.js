/**
 * StageManager
 */
(function(ns) {

    var STAGE_MAKING = [
        // 1-10
        [
            {enemy: ns.SlimeGreen,      num: 15},
        ],[
            {enemy: ns.SlimeGreen,      num: 20},
            {enemy: ns.SmallBatBlack,   num: 5},
        ],[
            {enemy: ns.SlimeGreen,      num: 15},
            {enemy: ns.SmallBatBlack,   num: 10},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 15},
            {enemy: ns.GoblinGrey,      num: 5},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 15},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 5},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 10},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 10},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 5},
        ],[
            {enemy: ns.SlimeGreen,      num: 10},
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 5},
        ],

        // 11-20
        [
            {enemy: ns.SmallBatBlack,   num: 10},
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 10},
            {enemy: ns.SkeltonNormal,   num: 5},
        ],[
            {enemy: ns.GoblinGrey,      num: 10},
            {enemy: ns.BatBlack,        num: 15},
            {enemy: ns.SkeltonNormal,   num: 10},
        ],[
            {enemy: ns.GoblinGrey,      num: 5},
            {enemy: ns.BatBlack,        num: 10},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
        ],[
            {enemy: ns.GoblinGrey,      num: 5},
            {enemy: ns.BatBlack,        num: 10},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
        ],[
            {enemy: ns.GoblinGrey,      num: 5},
            {enemy: ns.BatBlack,        num: 5},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 10},
        ],[
            {enemy: ns.BatBlack,        num: 5},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 15},
        ],[
            {enemy: ns.BatBlack,        num: 5},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 15},
        ],[
            {enemy: ns.BatBlack,        num: 5},
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 15},
        ],[
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 15},
            {enemy: ns.LizardManNormal, num: 5},
        ],[
            {enemy: ns.SkeltonNormal,   num: 10},
            {enemy: ns.SlimeBlue,       num: 10},
            {enemy: ns.HarypyNormal,    num: 15},
            {enemy: ns.LizardManNormal, num: 5},
        ],

        // 21-30
        [
            {enemy: ns.HarypyNormal,    num: 15},
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
        ],[
            {enemy: ns.HarypyNormal,    num: 10},
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
        ],[
            {enemy: ns.HarypyNormal,    num: 10},
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
        ],[
            {enemy: ns.HarypyNormal,    num: 10},
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
        ],[
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
            {enemy: ns.SlimeRed,        num: 10},
        ],[
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
            {enemy: ns.SlimeRed,        num: 10},
        ],[
            {enemy: ns.LizardManNormal, num: 5},
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
            {enemy: ns.SlimeRed,        num: 10},
        ],[
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
            {enemy: ns.SlimeRed,        num: 15},
        ],[
            {enemy: ns.SmallBatGreen,   num: 10},
            {enemy: ns.GoblinGreen,     num: 10},
            {enemy: ns.BatGreen,        num: 10},
            {enemy: ns.SlimeRed,        num: 15},
        ],[
            {enemy: ns.GoblinGreen,     num: 5},
            {enemy: ns.BatGreen,        num: 5},
            {enemy: ns.SlimeRed,        num: 10},
            {enemy: ns.DragonGreen,     num: 20},
        ]
    ];

	ns.StageManager = tm.createClass({
		init: function (stageNum, enemyGroup, player, map) {
            this._isGameClear = false;
            if (STAGE_MAKING.length < stageNum) {
                // ゲームクリア
                this._isGameClear = true;
            }
            else {
                for (var i = 0; i < STAGE_MAKING[stageNum-1].length; ++i) {
                    var dataCreateEnemy = STAGE_MAKING[stageNum-1][i];
                    this._createEnemy(enemyGroup, player, map, dataCreateEnemy.enemy, dataCreateEnemy.num);
                }
            }
		},

        isGameClear: function () {
            return this._isGameClear;
        },

        _createEnemy: function (enemyGroup, player, map, enemyClass, num) {
            // 敵を生成して返す
            for (var i = 0; i < num; ++i) {
                // enemyを作成
                var enemy = enemyClass(player, map);
                // Sceneの座標に変換
                var safeEnemyPosition = map.getRandomSafeMapChipPosition();
                safeEnemyPosition = map.mapLeftTopToMapCenter(
                    safeEnemyPosition.x * map.mapChipWidth + map.mapChipWidth/2,
                    safeEnemyPosition.y * map.mapChipHeight);

                enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
                enemyGroup.addChild(enemy);
            }
        },
	});

})(game);