/**
 * MainScene
 */
(function(ns) {

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "stairsNum",
                x: 100,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "right"
            },{
                type: "Label",
                name: "statusLevel",
                x: 130,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusHP",
                x: 230,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            },{
                type: "Label",
                name: "statusMP",
                x: 430,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 25,
                align: "left"
            }]
        }
    };

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(continuePlayer, continuePad) {
            this.superInit();

            console.time("MainScene init");

            // コントローラーパッド
            var pad = continuePad || tm.app.Pad();
            pad.position.set(100, ns.SCREEN_HEIGHT - 80);
            this.pad = pad;

            // プレイヤー
            var player = continuePlayer || ns.Player(pad);
            this.player = player;
            player.setInputPad(pad);
            player.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);

            // セーブデータがあれば引き継ぐ
            var saveData = this._loadSaveData();
            if (saveData && !continuePlayer) {
                player.dataLoad(saveData.saveData.player);
                ns.MainScene.STAGE_NUMBER = saveData.saveData.stairs;
            }

            // マップ
            // サーバからマップデータを取得
            var mapData = ns.gameEvent.getMapData();
            var map = ns.Map(pad, mapData);
            this.map = map;
            // 取得した位置をスクリーンの中心になるようにマップの中心座標を設定する
            var safePosition = map.getRandomSafeMapChipPosition(); // 場所を取得
            safePosition = map.mapLeftTopToMapCenter(
                safePosition.x * map.mapChipWidth  + map.mapChipWidth/2,
                safePosition.y * map.mapChipHeight);
            // マップの中心位置を計算する(safePositionがスクリーンの中心に来るように)
            safePosition.x = ns.SCREEN_WIDTH/2  - safePosition.x;
            safePosition.y = ns.SCREEN_HEIGHT/2 - safePosition.y;
            map.setStairs();
            map.initMapPosition(safePosition);
            map.setPlayer(safePosition);

            // アイテム
            var itemList   = ns.ItemList();
            var itemGroup  = tm.app.CanvasElement();
            this.itemGroup = itemGroup;
            map.setItemGroup(itemGroup);

            // 敵
            var enemyGroup = tm.app.CanvasElement();
            this.enemyGroup = enemyGroup;
            // var mapEnemyInfo = mapData.mapEnemyInfo;
            this.stage = ns.StageManager(ns.MainScene.STAGE_NUMBER, enemyGroup, player, map, mapData.enemyManager);

            // 敵をマップに追加
            map.setEnemyGroup(enemyGroup);

            // 攻撃時のエフェクト
            var slash = tm.app.AnimationSprite("slashSS", 120, 120);
            slash.position.set(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);

            // 攻撃ボタン
            var attackIcon = tm.app.Sprite("attackIcon", 72, 72);
            var attackButton = ns.GlossyImageButton(200, 160, attackIcon, "green");
            attackButton.position.set(ns.SCREEN_WIDTH-50-50, ns.SCREEN_HEIGHT-30-50);
            this.attackButton = attackButton;
            var attackTiming = ns.GameBar(100, 20);
            attackTiming.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2 + 55);
            attackTiming.resetAnimation(1); // 初期化時は高速でアクティブバーをマックスにする
            this.attackTiming = attackTiming;

            attackButton.addEventListener("pointingmove", function(e) {
                // タイミングが来たら攻撃可能
                // attackTiming.reset(player.getAttackSpeed(e.app.fps));
                if (attackTiming.isMax() === false) {
                    return ;
                }
                attackTiming.resetAnimation(player.getAttackSpeed());

                // 攻撃の方向を調べる
                var attackAngle = player.attack();
                var attackVelocity = tm.geom.Vector2(0,0).setDegree(attackAngle, 1);
                attackVelocity.y *= -1;
                // 攻撃の場所を計算する()画面上
                var distanse = 50 + (player.getDistanse() * 20);
                var attackScreenPosition = player.position.clone().add(tm.geom.Vector2.mul(attackVelocity, distanse));

                // 攻撃時のアニメーション
                slash.position.set(attackScreenPosition.x, attackScreenPosition.y);
                slash.gotoAndPlay("slash");

                // 攻撃するポイントを作成
                var attackMapPosition = map.playerPosition.clone().add(tm.geom.Vector2.mul(attackVelocity, distanse));
                attackMapPosition = map.mapLeftTopToMapCenter(attackMapPosition.x, attackMapPosition.y-20);
                var attackElement = tm.app.Object2D();
                attackElement.radius = 20;
                attackElement.position.set(attackMapPosition.x, attackMapPosition.y);

                // 攻撃が当たっているか調べる
                for (var i = 0; i < enemyGroup.children.length; ++i) {
                    var enemy = enemyGroup.children[i];
                    var position = enemy.position.clone();
                    if (enemy.isHitElementCircle(attackElement)) {
                        // ダメージ数を計算
                        var attack = player.getAttackPoint();
                        // ダメージ数送信
                        ns.gameEvent.sendDamageEnemy(enemy.id, attack);
                    }
                }
            });

            // ステータス画面への遷移ボタン
            var statusIcon = tm.app.Sprite("statusIcon", 72, 72);
            var statusButton = ns.GlossyImageButton(200, 160, statusIcon, "blue");
            statusButton.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT-30-50);
            this.statusButton = statusButton;
            statusButton.addEventListener("pointingend", function(e) {
                // tm.asset.AssetManager.get("openstatus").clone().play();
                e.app.pushScene(ns.StatusScene(player));
            });

            // ゲームに関するイベントセット
            ns.gameEvent.setPlayer(this.player);
            ns.gameEvent.setPlayerPosition(map.playerPosition);
            ns.gameEvent.setAnotherPlayer(this.map);

            // 画面に追加
            this.addChild(map);
            this.windows = ns.ManageSimpleWindows(this); // ウィンドウ
            this.addChild(pad);
            this.addChild(player);
            this.addChild(attackTiming);
            this.addChild(slash);
            this.addChild(attackButton);
            this.addChild(statusButton);

            // サウンド：BGM
            // this.bgm = tm.asset.AssetManager.get("dungeon");
            // this.bgm.loop = true;
            // this.bgm.play();

            // ステータス表示
            this.fromJSON(UI_DATA.LABELS);


            console.timeEnd("MainScene init");

        },

        screenLeftTopToCenter: function (x, y) {
            var result = tm.geom.Vector2(x - ns.SCREEN_WIDTH/2, y - ns.SCREEN_HEIGHT/2);
            return result;
        },
        screenCenterToLeftTop: function (x, y) {
            var result = tm.geom.Vector2(x + ns.SCREEN_WIDTH/2, y + ns.SCREEN_HEIGHT/2);
            return result;
        },

        drawStatus: function () {
            this.stairsNum.text   = ns.MainScene.STAGE_NUMBER + "階";
            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            // this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        },

        update : function(app) {
            // 攻撃のアクティブバーのカウントアップ
            this.attackTiming.update()

            // ステータスの描画
            this.drawStatus();

            // 敵の情報をサーバから取得
            var enemies = ns.gameEvent.getEnemyData();
            if (enemies) {
                // 受信した敵の情報と、クライアントの情報が不一致だったら、敵を生成/削除する
                var cliantEnemyNum = this.enemyGroup.children.length;
                var serverEnemyNum = enemies.length;

                if (serverEnemyNum >= cliantEnemyNum) {
                    var iLimit = serverEnemyNum;
                    var jLimit = cliantEnemyNum;
                    var isCreateOrDelete = "create";
                }
                // サーバーの敵の数よりクライアントの敵の数の方が少ない！？
                else {
                    var iLimit = cliantEnemyNum;
                    var jLimit = serverEnemyNum;
                    var isCreateOrDelete = "delete";
                }
                // 総当りで調べるので、効率化可能 @todo
                for (var i = 0; i < iLimit; ++i) {
                    // 同じIDの敵情報を取得
                    var isEnemy = false;
                    for (var j = 0; j < jLimit; ++j) {
                        if (serverEnemyNum >= cliantEnemyNum) {
                            var serverIte = i;
                            var cliantIte = j;
                        }
                        else {
                            var serverIte = j;
                            var cliantIte = i;
                        }
                        if (this.enemyGroup.children[cliantIte].id === enemies[serverIte].id) {
                            isEnemy = true;
                            break;
                        }
                    }
                    if (!isEnemy) {
                        if (isCreateOrDelete === "create") {
                            // 敵を生成
                            this.stage.createEnemy(
                                    this.enemyGroup, 
                                    this.player, 
                                    this.map, 
                                    enemies[serverIte].className, 
                                    enemies[serverIte].position, 
                                    enemies[serverIte].id);
                        }
                        else {
                            this.enemyGroup.children[cliantIte].remove();
                        }
                        break;
                    }
                }
            }

            // 敵へのダメージ量をサーバから受信してたら処理する
            for (var i = 0, n = ns.gameEvent.enemyDamagedData.length; i < n; ++i) {
                var damageData = ns.gameEvent.enemyDamagedData.shift();
                for (var j = 0; j < this.enemyGroup.children.length; ++j) {
                    var enemy    = this.enemyGroup.children[j];
                    if (damageData.enemyId === enemy.id) {
                        // ダメージ数を表示
                        var damageEffect = ns.DamagedNumber(damageData.damage);

                        // 表示場所を設定
                        var damagePosition = this.map.mapCenterToScreenTopLeft(enemy.x, enemy.y);
                        damageEffect.effectPositionSet(damagePosition.x + 10, damagePosition.y + 5);
                        app.currentScene.addChild(damageEffect);

                        // 敵が死んでいた場合
                        if (damageData.isDead) {
                            // 経験値取得
                            this.player.addExp(damageData.exp, app);

                            // // アイテムドロップ
                            // var itemData = itemList.get(enemy.getDropItem());
                            // if (itemData !== null) {
                            //     var dropItem = ns.DropItem(itemData);
                            //     dropItem.position.set(enemy.x, enemy.y);
                            //     this.map.addItem(dropItem);
                            // }

                            // 死んだエフェクト
                            var enemydead = tm.app.AnimationSprite("enemydeadSS", 120, 120);
                            enemydead.position.set(enemy.x, enemy.y);
                            this.map.setEnemyDeadAnimation(enemydead);
                            enemydead.gotoAndPlay("enemydead");

                            enemy.remove();
                        }
                    }
                }
            }

            // 次のステージに進むフラグがたったらマップ更新
            if (this.map.isNextStage()) {
                ++ns.MainScene.STAGE_NUMBER;
                // this.bgm.stop();
                // tm.asset.AssetManager.get("downStairs").clone().play();
                this._autoSave();
                app.replaceScene(ns.MainScene(this.player, this.pad));
            }

            // ゲームオーバーフラグがたったらゲーム終了
            if (this.player.isGameOver()) {
                // this.bgm.stop();
                this._deleteSaveData();
                app.replaceScene(ns.EndScene(ns.MainScene.STAGE_NUMBER, this.player.getLevel(), false));
            }

            // ゲームクリアフラグがたったらゲーム終了
            if (this.stage.isGameClear()) {
                // this.bgm.stop();
                this._deleteSaveData();
                // tm.asset.AssetManager.get("levelup").clone().play();
                app.replaceScene(ns.EndScene(ns.MainScene.STAGE_NUMBER, this.player.getLevel(), true));
            }
        },

        _autoSave: function () {
            // セーブデータを作成
            var saveData = {
                player: this.player.cloneToSave(),
                stairs: ns.MainScene.STAGE_NUMBER,
            };

            var date = new Date();
            var alldate = date.format("Y/m/d");
            var year    = date.format("Y");
            var month   = date.format("m");
            var day     = date.format("d");

            var memorizeData = {
                date: {
                    all: alldate,
                    year: year,
                    month: month,
                    day: day,
                },
                saveData: saveData
            };

            localStorage["RoguePlus"] = JSON.stringify(memorizeData);
        },

        _loadSaveData: function () {
            // ローカルストレージからデータを取得
            var loadLocalStorage = localStorage["RoguePlus"];
            if (loadLocalStorage) {
                return JSON.parse(loadLocalStorage);
            }
            else {
                return null;
            }
        },

        _deleteSaveData: function () {
            localStorage.removeItem("RoguePlus");
        },
    });

    ns.MainScene.STAGE_NUMBER = 1;

})(game);