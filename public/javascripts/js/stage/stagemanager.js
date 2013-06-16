/**
 * StageManager
 */
(function(ns) {

	ns.StageManager = tm.createClass({
		init: function (stageNum, enemyGroup, player, map, enemyManager) {
            // this._isGameClear = false;
            // if (STAGE_MAKING.length < stageNum) {
            //     // ゲームクリア
            //     this._isGameClear = true;
            // }
            // else {

            // サーバからステージ情報取得
            ns.gameEvent.getStageInfo(stageNum);

            if (enemyManager) {
                for (var i = 0; i < enemyManager.length; ++i) {
                    var dataCreateEnemy = enemyManager[i];
                    this.createEnemy(
                            enemyGroup, 
                            player, 
                            map, 
                            dataCreateEnemy.className, 
                            dataCreateEnemy.position, 
                            dataCreateEnemy.id);
                }
            }

            // }
		},

        isGameClear: function () {
            // return this._isGameClear;
        },

        createEnemy: function (enemyGroup, player, map, enemyClassName, position, enemyId) {
            // 敵を生成して返す
            // for (var i = 0; i < num; ++i) {
            // enemyを作成
            var enemy = ns[enemyClassName](player, map);
            // Sceneの座標に変換
            // var safeEnemyPosition = map.getRandomSafeMapChipPosition();
            safeEnemyPosition = map.mapLeftTopToMapCenter(
                position.x,//safeEnemyPosition.x * map.mapChipWidth + map.mapChipWidth/2,
                position.y);//safeEnemyPosition.y * map.mapChipHeight);

            enemy.position.set(safeEnemyPosition.x, safeEnemyPosition.y);
            enemy.id = enemyId;
            enemyGroup.addChild(enemy);
            // }
        },
	});

})(game);