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

        init : function(player, playerPosition, map) {
            // オンライン化
            // グローバル変数を作成しているので注意
            this.socket = io.connect();

            this.anotherPlayerGroup = tm.app.CanvasElement();

            this.playerPosition = playerPosition;
            this.player = player;

            map.addChild(this.anotherPlayerGroup);
            
            // 移動ポイントを送信するタイミング
            this.frameMoveEmit = EMIT_MOVEPOINT_TIME;
            this.currentFrame = 0;

            // 移動したかどうか調べる用
            this.prePlayerPosition = tm.geom.Vector2(0, 0);
            this.preAnotherPlayerPosition = [];
            
            
            // 初めての接続時に発生
            // 仮の名前を送信する
            var position = this.playerPosition.clone();
            var message = {
                name: "名無し",
                position: position,
            };
            console.dir(message);
            this.socket.emit("addPlayerName", message);




            // 接続処理
            var socket = this.socket;

            // 接続完了のメッセージ取得
            socket.on("connected", function (data) {
                console.log("connected");
            });

            // サーバにプレイヤーデータ登録完了
            var player = this.player;
            socket.on("addedPlayer", function (id) {
                console.log("added player");
                player.name = id;
            });

            // 既に接続済みのメンバーのデータを取得
            socket.on("addedAnotherPlayers", function (message) {
                for (var i = 0; i < message.length; ++i) {
                    if (anotherPlayerGroup.getChildByName(message[i].id)) {
                        continue;
                    }
                    console.log("addedAnotherPlayers");
                    var anotherPlayer = ClassPlayer();
                    anotherPlayer.position.set(message[i].position.x, message[i].position.y);
                    anotherPlayer.name = message[i].id;
                    anotherPlayerGroup.addChild(anotherPlayer);
                }
            });

            // 他プレイヤー接続
            var anotherPlayerGroup = this.anotherPlayerGroup;
            var ClassPlayer = ns.AnotherPlayer;
            socket.on("addedAnotherPlayer", function (message) {
                if (anotherPlayerGroup.getChildByName(message.id)) {
                    return ;
                }
                console.log("add Another Player");
                var anotherPlayer = ClassPlayer();
                anotherPlayer.position.set(message.position.x, message.position.y);
                anotherPlayer.name = message.id;
                anotherPlayerGroup.addChild(anotherPlayer);
            });

            // 他プレイヤー移動
            socket.on("moveAnotherPlayer", function (message) {
                var anotherPlayer = anotherPlayerGroup.getChildByName(message.id);
                if (anotherPlayer &&
                        (anotherPlayer.position.x !== message.position.x ||
                         anotherPlayer.position.y !== message.position.y)) {
                    var vector = tm.geom.Vector2(message.position.x, message.position.y);
                    console.log("move anotherPlayer : ");
                    anotherPlayer.setAutoPosition(vector);
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
        },

        update : function() {

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
        movePlayer: function (position, angle, paused) {
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