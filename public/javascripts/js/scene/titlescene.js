/**
 * TitleScene
 */
(function(ns) {

    ns.TitleScene = tm.createClass({
        superClass : tm.app.TitleScene,

        init : function() {
            this.superInit({
                title :  "b-rogue",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

            // Oauth認証できてたらロード画像を追加(アイコン)
            ns.twitter.addUserIcon(MAIN_ASSET);

            this.addEventListener("pointingend", function(e) {
                this._onClickOpenButton();
            }.bind(this));

            // 直接onmenuselectedイベントからreplaceSceneを呼ぶと、popSceneと交錯するのでエラー
            this.isNextScene = false;
        },

        update: function (app) {
            if (this.isNextScene) {
                // セーブされている階層があるか調べる
                var saveData = this._loadSaveData();
                if (saveData) {
                    var stairs = 1;//saveData.saveData.stairs;
                }
                else {
                    var stairs = 1; // 1階から開始
                }
                ns.STAIRS = stairs;

                // デバッグ用
                // var equipButton = tm.app.GlossyButton(200, 60, "gray", "データ削除").addChildTo(this);
                // equipButton.position.set(ns.SCREEN_WIDTH-200, ns.SCREEN_HEIGHT-200);
                // equipButton.addEventListener("pointingend", function(e) {
                //     localStorage.removeItem("b-rogue");
                // });
                
                // シーンの切り替え
                var loadingScene = ns.AsyncLoading({
                    width:        this.width,
                    height:       this.height,
                    assets:       MAIN_ASSET,
                    loadingScene: ns.EffectLoadingScene,
                    nextScene:    ns.MainScene,
                },function (postLoadingFunc) {
                    var self = this;
                    var socket = self.socket;
                    socket.emit("getMapData", stairs);
                    // mapデータ取得
                    socket.on("gotMapData", function (data) {
                        console.log("gotMapData");
                        this.mapData = data;
                        postLoadingFunc();
                    }.bind(self));
                }.bind(ns.gameEvent)); // 仕方なくここで通信系の処理を書く
                app.replaceScene(loadingScene);
            }
        },

        // MainSceneと処理もろかぶり...　あとで考える
        _loadSaveData: function () {
            // ローカルストレージからデータを取得
            var loadLocalStorage = localStorage["b-rogue"];
            if (loadLocalStorage) {
                return JSON.parse(loadLocalStorage);
            }
            else {
                return null;
            }
        },

        _onClickOpenButton: function() {
            if (ns.twitter.isLogin()) {
                var menu = ["ゲームスタート(Twitter認証済み)"];
                var menuDesctiptions = ["Twitterと連携してゲームを開始"];
            }
            else {
                var menu = ["ゲームスタート(名無し)", "Twitter認証"];
                var menuDesctiptions = ["名無しでゲームを開始", "Twitterと連携する"];
            }
            var dialog = tm.app.MenuDialog({
                screenWidth: this.app.width,
                screenHeight: this.app.height,
                title: "タイトルメニュー",
                menu: menu,
                defaultSelected: this.lastSelection,
                menuDesctiptions: menuDesctiptions,
            });

            this.app.pushScene(dialog);

            dialog.onmenuopened = function(e) {
            };

            dialog.onmenuselect = function(e) {
            };

            dialog.onmenuselected = function(e) {
                switch (menu[e.selectIndex]) {
                    case "ゲームスタート(Twitter認証済み)":
                    case "ゲームスタート(名無し)":
                        this.isNextScene = true;
                        break;
                    case "Twitter認証":
                        window.open('/auth/twitter');
                        break;
                    default :
                        break;
                }
                console.log(menu[e.selectIndex]);
                this.lastSelection = e.selectIndex;
            }.bind(this);
        },
    });

})(game);