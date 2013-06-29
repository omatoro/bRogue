/**
 * ゲーム起動処理
 */
(function(ns) {

    tm.main(function() {

        // アプリケーション作成
        ns.app = tm.app.CanvasApp("#world");
        ns.app.resize(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT); // 画面サイズに合わせる
        ns.app.fitWindow(); // リサイズ対応
        ns.app.background = "rgb(0, 0, 0)"; // 背景色をセット
        ns.app.canvas.context.imageSmoothingEnabled = false;
        ns.app.canvas.context.mozImageSmoothingEnabled = false;
        ns.app.canvas.context.webkitImageSmoothingEnabled = false;

        // デバッグ時のみ
        if (ns.DEBUG === true) {
            ns.app.enableStats();
        }

        // シーンの切り替え
        var loadingScene = ns.BarLoadingScene({
            width:      ns.app.width,
            height:     ns.app.height,
            assets:     TITLE_ASSETS,
            nextScene:  ns.TmlibScene,
        });
        ns.app.replaceScene(loadingScene);

        // イベント管理クラスの作成
        ns.gameEvent = ns.GameEventManager();

        // Twitter連携クラスを作成
        ns.twitter = ns.TwitterManager();

        // tmlibの実行
        ns.app.run();

    });

})(game);