/**
 * GameEventManager
 * アチーブの管理とかに使う
 * グローバル変数を作成しているので注意
 */
(function(ns) {

    // var EVENT_NAME_LIST = [
    //     "attackPlayer",
    //     "noWeaponAttackPlayer",
    //     "equipWeapon",
    //     "equipArmor",
    //     "killDragon",
    //     "eatMedicine",
    //     "getAllItem",
    //     "getAllWeapon",
    //     "getAllArmor",
    //     "getAllMedicine",
    //     "perfectComplete",
    //     "gameClear",
    //     "gameOver",
    //     "gameStart",
    //     "oneShotOneKill",
    //     "damagePlayer",
    //     "hitPlayer"
    // ];

    // var ACHIEVE = {
    //     "ドラゴンキラー",
    //     "持たざるもの",
    //     "拳法家",
    //     "はだかの勇者",
    //     "節約家",
    //     "コレクター",
    //     "武器屋",
    //     "防具屋",
    //     "薬屋",
    //     "完全制覇",
    //     "スピードキング",
    //     "一撃必殺",
    //     "多撃必倒",
    //     "鉄壁の守り",
    //     "忍",
    //     "不殺",
    //     "リベンジャー",
    //     "",
    //     "",
    //     "",
    // };

    var EMIT_MOVEPOINT_TIME = 30;

    ns.GameEventManager = tm.createClass({

        init : function() {
            // オンライン化
            // グローバル変数を作成しているので注意
            this.socket = io.connect();
            
            // 移動ポイントを送信するタイミング
            this.frameMoveEmit = EMIT_MOVEPOINT_TIME;
            this.currentFrame = 0;

            // 移動したかどうか調べる用
            this.prePlayerPosition = tm.geom.Vector2(0, 0);
            this.preAnotherPlayerPosition = [];

            // 敵のダメージ情報
            this.enemyDamagedData = [];

            // 接続処理
            var socket = this.socket;

            // 接続時にマップデータを取得
            // var mapData = [];
            // this.mapData = mapData;
            var self = this;

            // 接続完了のメッセージ取得
            socket.on("connected", function (data) {
                console.log("connected");
                // socket.emit("getMapData");
                // // mapデータ取得
                // socket.on("gotMapData", function (data) {
                //     console.log("gotMapData");
                //     this.mapData = data;
                // }.bind(self));
            });

            // 途中：マップ情報は随時受け取るようにしたい
            // // ステージ情報受信処理
            // socket.on("gotStageInfo", function (data) {
            //     this.stageInfo = data;
            // }.bind(self));

            // サーバにプレイヤーデータ登録完了
            socket.on("gotEnemyData", function (enemies) {
                // console.log("got Enemy Data");
                this.enemyData = enemies;
            }.bind(self));
        },

        setPlayer: function (player) {
            this.player = player;

            // 接続処理
            var socket = this.socket;

            // サーバにプレイヤーデータ登録完了
            socket.on("addedPlayer", function (id) {
                console.log("added player");
                player.name = id;
            });
        },

        setPlayerPosition: function (position) {
            this.playerPosition = position;

            // 初めての接続時に発生
            // 仮の名前を送信する
            var message = {
                name: "名無し",
                position: position,
                stairs: ns.STAIRS
            };
            this.socket.emit("addPlayerName", message);
        },

        setAnotherPlayer: function (map) {
            this.anotherPlayerGroup = tm.app.CanvasElement();
            map.addChild(this.anotherPlayerGroup);
            var anotherPlayerGroup = this.anotherPlayerGroup;
            var self = this;

            // 接続処理
            var socket = this.socket;

            // 既に接続済みのメンバーのデータを取得
            socket.on("addedAnotherPlayers", function (message) {
                for (var i = 0; i < message.length; ++i) {
                    if (anotherPlayerGroup.getChildByName(message[i].id)) {
                        continue;
                    }
                    console.log("addedAnotherPlayers");
                    var anotherPlayer = ClassPlayer();
                    var position = map.mapLeftTopToMapCenter(message[i].position.x, message[i].position.y);
                    anotherPlayer.position.set(position.x, position.y);
                    anotherPlayer.name = message[i].id;
                    anotherPlayerGroup.addChild(anotherPlayer);
                }
            });

            // 他プレイヤー接続
            var ClassPlayer = ns.AnotherPlayer;
            socket.on("addedAnotherPlayer", function (message) {
                if (anotherPlayerGroup.getChildByName(message.id)) {
                    return ;
                }
                console.log("add Another Player");
                var anotherPlayer = ClassPlayer();
                var position = map.mapLeftTopToMapCenter(message.position.x, message.position.y);
                anotherPlayer.position.set(position.x, position.y);
                anotherPlayer.name = message.id;
                anotherPlayerGroup.addChild(anotherPlayer);
            });

            // 他プレイヤー移動
            socket.on("moveAnotherPlayer", function (message) {
                var anotherPlayer = anotherPlayerGroup.getChildByName(message.id);
                if (anotherPlayer &&
                        (anotherPlayer.position.x !== message.position.x ||
                         anotherPlayer.position.y !== message.position.y)) {
                    console.log("move anotherPlayer : ");
                    var position = map.mapLeftTopToMapCenter(message.position.x, message.position.y);
                    anotherPlayer.setAim(position);
                    // anotherPlayer.paused = message.paused;
                    // anotherPlayer.directWatch(message.angle);
                }
            });

            // プレイヤー削除
            socket.on("deleteAnotherPlayer", function (message) {
                var anotherPlayer = anotherPlayerGroup.getChildByName(message);
                console.log("delete another player");
                anotherPlayerGroup.removeChild(anotherPlayer);
            });

            /**
             * 敵が攻撃を受けた
             * message = {
             *     enemyId,
             *     damage,
             *     isDead,
             *     exp,
             *     itemDrop: {
             *         空,
             *     },
             * }
             */
            socket.on("enemyDamaged", function (message) {
                // 一旦データを蓄積して、MainSceneで取り出し処理する
                this.enemyDamagedData.push(message);
            }.bind(self));
        },

        sendDamageEnemy: function (enemyId, playerAttackPoint, stairsNum) {
            var data = {
                enemyId: enemyId,
                playerAttackPoint: playerAttackPoint,
                stairs: stairsNum
            };
            this.socket.emit("enemyDamage", data);
        },

        getMapData: function () {
            // console.dir(this.mapData);
            return this.mapData;
        },

        getEnemyData: function (stairsNum) {
            return this.enemyData;
        },

        getAndSendEnemyData: function (stairsNum) {
            // console.dir(this.enemyData);
            this.socket.emit("getEnemyData", stairsNum);
            return this.enemyData;
        },

        getStageInfo: function (stageNum) {
            // 途中：マップ情報は随時受け取るようにしたい
            // this.socket.emit("getStageInfo");
            // return this.stageInfo;
        },

        /**
         * システムに関するイベント
         */
        gameStart: function (playerPosition) {},
        gameClear: function () {},
        gameOver: function () {},
        gameReStart: function () {},

        /**
         * プレイヤーに関するイベント
         */
        attackPlayer: function () {},
        movePlayer: function (position, player) {
            if (!player) {
                return ;
            }
            var angle  = player.angle;
            var paused = player.paused;

            // 一定の時間が経過したかどうか
            ++this.currentFrame;
            var isTimer = false;
            if (this.currentFrame > this.frameMoveEmit) {
                isTimer = true;
                this.currentFrame = this.frameMoveEmit;
            }

            // 移動したかどうか
            var isMove = false;
            if (this.prePlayerPosition.x !== position.x ||
                this.prePlayerPosition.y !== position.y) {
                isMove = true;
            }


            if (isTimer && isMove) {
                this.currentFrame = 0;
                this.prePlayerPosition = position.clone();
                
                var socket = this.socket;
                var message = {
                    position: position,
                    angle: angle,
                    paused: paused,
                    // stairs: ns.STAIRS,
                };
                socket.emit("movePlayer", message);
            }
        },
        noWeaponAttackPlayer: function () {},
        equipWeapon: function () {},
        equipArmor: function () {},
        eatMedicine: function () {},
        hitPlayer: function () {},
        damagePlayer: function () {},
        getItem: function () {},

        /**
         * 他プレイヤーに関するイベント
         */
        attackAnotherPlayer: function () {},
        moveAnotherPlayer: function () {},

        /**
         * 敵に関するイベント
         */
        killDragon: function () {},
        perfectComplete: function () {},
        oneShotOneKill: function () {},

        /**
         * アチーブメントに直接関するイベント
         */
        getAllItem: function () {},
        getAllWeapon: function () {},
        getAllArmor: function () {},
        getAllMedicine: function () {},
    });

})(game);