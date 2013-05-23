/**
 * ゲーム用ネームスペース作成、定数作成
 */
var game = game || {};

(function(ns) {

    // デバッグ時定数
    ns.DEBUG = true;

    // スクリーンサイズ
    ns.SCREEN_WIDTH  = 640;
    ns.SCREEN_HEIGHT = 960;

    // ボタンサイズ
    ns.BUTTON_SIZE_X = 213;
    ns.BUTTON_SIZE_Y = 213;

    // ボタンの描画開始位置
    ns.BUTTON_START_DRAW_X = 320;

    // 問題数
    // ns.QUESTNUM = 10;

    // 何問前の答えを答えるか
    // ns.BACK_NUMBER = 2;

    // ? 仮組みで作ったものなので後で整理する
    ns.BUTTON_Y = 300;

    // 次の問題へ以降するフレーム数
    // ns.NEXT_GAME_FRAME = 90;

})(game);