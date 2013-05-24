/**
 * GameEventManager
 * アチーブの管理とかに使う
 */
(function(ns) {

    var EVENT_NAME_LIST = [
        "attackPlayer",
        "noWeaponAttackPlayer",
        "equipWeapon",
        "equipArmor",
        "killDragon",
        "eatMedicine",
        "getAllItem",
        "getAllWeapon",
        "getAllArmor",
        "getAllMedicine",
        "perfectComplete",
        "gameClear",
        "gameOver",
        "gameStart",
        "oneShotOneKill",
        "damagePlayer",
        "hitPlayer"
    ];

    var ACHIEVE = {
        "ドラゴンキラー",
        "持たざるもの",
        "拳法家",
        "はだかの勇者",
        "節約家",
        "コレクター",
        "武器屋",
        "防具屋",
        "薬屋",
        "完全制覇",
        "スピードキング",
        "一撃必殺",
        "多撃必倒",
        "鉄壁の守り",
        "忍",
        "不殺",
        "リベンジャー",
        "",
        "",
        "",
    };

    ns.GameEventManager = tm.createClass({

        init : function() {
        },

        update : function() {
        }
    });

})(game);