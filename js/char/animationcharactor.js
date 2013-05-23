/**
 * AnimationCharactor
 */
(function(ns) {

    var DOWN_NEUTRAL  = 1;
    var UP_NEUTRAL    = 19;
    var LEFT_NEUTRAL  = 7;
    var RIGHT_NEUTRAL = 13;

    var UPLEFT_NEUTRAL    = 16;
    var UPRIGHT_NEUTRAL   = 22;
    var DOWNLEFT_NEUTRAL  = 4;
    var DOWNRIGHT_NEUTRAL = 10;

    var ANGLE_LEFT      = 180;
    var ANGLE_UPLEFT    = 135;
    var ANGLE_UP        = 90;
    var ANGLE_UPRIGHT   = 45;
    var ANGLE_RIGHT     = 0;
    var ANGLE_DOWNRIGHT = 315;
    var ANGLE_DOWN      = 270;
    var ANGLE_DOWNLEFT  = 225;

    // コマ送りアニメーションの基本的な書式を利用
    var IMAGE_WIDTH  = 120;
    var IMAGE_HEIGHT = 112;
    var IMAGE_DIVIDE_COLUMN = 6;
    var IMAGE_DIVIDE_ROW    = 4;
    var IMAGE_ANIM_COUNT    = 24; // 枚数

    ns.AnimationCharactor = tm.createClass({
        superClass : tm.app.AnimationSprite,

        init: function (imageName, frame, drawImageScaleSize) {

            frame = frame || {
                width:  IMAGE_WIDTH/IMAGE_DIVIDE_COLUMN,
                height: IMAGE_HEIGHT/IMAGE_DIVIDE_ROW,
                count:  IMAGE_ANIM_COUNT
            };

            drawImageScaleSize = drawImageScaleSize || 4;

            var ss = tm.app.SpriteSheet({
                image: imageName,
                frame: frame,
                animations: {
                    "onlydown":   [DOWN_NEUTRAL,   DOWN_NEUTRAL+1, "_onlydown1", 5],
                    "_onlydown1": [DOWN_NEUTRAL+1, DOWN_NEUTRAL+2, "_onlydown2", 5],
                    "_onlydown2": [DOWN_NEUTRAL,   DOWN_NEUTRAL+1, "_onlydown3", 5],
                    "_onlydown3": [DOWN_NEUTRAL-1, DOWN_NEUTRAL,   "onlydown",   5],

                    "onlyup":   [UP_NEUTRAL,   UP_NEUTRAL+1, "_onlyup1", 5],
                    "_onlyup1": [UP_NEUTRAL+1, UP_NEUTRAL+2, "_onlyup2", 5],
                    "_onlyup2": [UP_NEUTRAL,   UP_NEUTRAL+1, "_onlyup3", 5],
                    "_onlyup3": [UP_NEUTRAL-1, UP_NEUTRAL,   "onlyup",   5],

                    "onlyleft":   [LEFT_NEUTRAL,   LEFT_NEUTRAL+1, "_onlyleft1", 5],
                    "_onlyleft1": [LEFT_NEUTRAL+1, LEFT_NEUTRAL+2, "_onlyleft2", 5],
                    "_onlyleft2": [LEFT_NEUTRAL,   LEFT_NEUTRAL+1, "_onlyleft3", 5],
                    "_onlyleft3": [LEFT_NEUTRAL-1, LEFT_NEUTRAL,   "onlyleft",   5],

                    "onlyright":   [RIGHT_NEUTRAL,   RIGHT_NEUTRAL+1, "_onlyright1", 5],
                    "_onlyright1": [RIGHT_NEUTRAL+1, RIGHT_NEUTRAL+2, "_onlyright2", 5],
                    "_onlyright2": [RIGHT_NEUTRAL,   RIGHT_NEUTRAL+1, "_onlyright3", 5],
                    "_onlyright3": [RIGHT_NEUTRAL-1, RIGHT_NEUTRAL,   "onlyright",   5],

                    "upleft":   [UPLEFT_NEUTRAL,   UPLEFT_NEUTRAL+1, "_upleft1", 5],
                    "_upleft1": [UPLEFT_NEUTRAL+1, UPLEFT_NEUTRAL+2, "_upleft2", 5],
                    "_upleft2": [UPLEFT_NEUTRAL,   UPLEFT_NEUTRAL+1, "_upleft3", 5],
                    "_upleft3": [UPLEFT_NEUTRAL-1, UPLEFT_NEUTRAL,   "upleft",   5],

                    "upright":   [UPRIGHT_NEUTRAL,   UPRIGHT_NEUTRAL+1, "_upright1", 5],
                    "_upright1": [UPRIGHT_NEUTRAL+1, UPRIGHT_NEUTRAL+2, "_upright2", 5],
                    "_upright2": [UPRIGHT_NEUTRAL,   UPRIGHT_NEUTRAL+1, "_upright3", 5],
                    "_upright3": [UPRIGHT_NEUTRAL-1, UPRIGHT_NEUTRAL,   "upright",   5],

                    "downleft":   [DOWNLEFT_NEUTRAL,   DOWNLEFT_NEUTRAL+1, "_downleft1", 5],
                    "_downleft1": [DOWNLEFT_NEUTRAL+1, DOWNLEFT_NEUTRAL+2, "_downleft2", 5],
                    "_downleft2": [DOWNLEFT_NEUTRAL,   DOWNLEFT_NEUTRAL+1, "_downleft3", 5],
                    "_downleft3": [DOWNLEFT_NEUTRAL-1, DOWNLEFT_NEUTRAL,   "downleft",   5],

                    "downright":   [DOWNRIGHT_NEUTRAL,   DOWNRIGHT_NEUTRAL+1, "_downright1", 5],
                    "_downright1": [DOWNRIGHT_NEUTRAL+1, DOWNRIGHT_NEUTRAL+2, "_downright2", 5],
                    "_downright2": [DOWNRIGHT_NEUTRAL,   DOWNRIGHT_NEUTRAL+1, "_downright3", 5],
                    "_downright3": [DOWNRIGHT_NEUTRAL-1, DOWNRIGHT_NEUTRAL,   "downright",   5],
                }
            });

            this.superInit(frame.width*drawImageScaleSize, frame.height*drawImageScaleSize, ss);

            // 向いている方向を保持
            this.velocity = tm.geom.Vector2(0, 0);

            // アニメーションさせる場合に指定
            this.isAnimation = true;

            // 操作を受け付けるか指定
            this.isInput = false;

            // ランダム移動を受け付けるか指定
            this.isAuto = false;

            // padがあれば追加する
            this.pad = false;

            // 向いている方向を保持
            this.angle = 270;

            // 歩くスピード
            this.speed = 6;
        },

        // 入力でパッドも使うならセットする
        setInputPad: function (pad) {
            this.pad = pad || false;
        },

        // 向いている方向を決める
        directWatch: function (angle) {
            if (this._exceptDirectWatch(angle)) {
                if (     ANGLE_DOWN      - 22.5 < angle && angle <= ANGLE_DOWN      + 22.5) { this.gotoAndPlay("onlydown"); }
                else if (ANGLE_DOWNLEFT  - 22.5 < angle && angle <= ANGLE_DOWNLEFT  + 22.5) { this.gotoAndPlay("downleft"); }
                else if (ANGLE_LEFT      - 22.5 < angle && angle <= ANGLE_LEFT      + 22.5) { this.gotoAndPlay("onlyleft"); }
                else if (ANGLE_UPLEFT    - 22.5 < angle && angle <= ANGLE_UPLEFT    + 22.5) { this.gotoAndPlay("upleft"); }
                else if (ANGLE_UP        - 22.5 < angle && angle <= ANGLE_UP        + 22.5) { this.gotoAndPlay("onlyup"); }
                else if (ANGLE_UPRIGHT   - 22.5 < angle && angle <= ANGLE_UPRIGHT   + 22.5) { this.gotoAndPlay("upright"); }
                else if (ANGLE_DOWNRIGHT + 22.5 < angle || angle <= ANGLE_RIGHT     + 22.5) { this.gotoAndPlay("onlyright"); }
                else if (ANGLE_DOWNRIGHT - 22.5 < angle && angle <= ANGLE_DOWNRIGHT + 22.5) { this.gotoAndPlay("downright"); }
            }
        },

        // 入力を受け付けてアニメーションする
        inputAnimation: function (app) {
            // 入力受付
            if (this.isInput) {
                var angle = app.keyboard.getKeyAngle();
                if (angle !== null && this.isAnimation) {
                    this.velocity.setDegree(angle, 1);
                    this.velocity.y *= -1;
                    this.directWatch(angle);
                    this.angle = angle;
                }
                // タッチパネルによる速度設定
                else if (this.pad && this.pad.isTouching) {

                    var padAngle = this.pad.angle;
                    if   (padAngle < 0) {padAngle *= -1;}
                    else                {padAngle = 360 - padAngle;}
                    this.velocity.setDegree(padAngle, 1);
                    this.velocity.y *= -1;
                    this.directWatch(padAngle);
                    this.angle = padAngle;
                }
                else {
                    this.paused = true;
                }
                // console.log("x : " + this.x + " y : " + this.y);
            }
        },

        // 指定方向以外の向きか調べる
        _exceptDirectWatch: function (angle) {
            if (this.currentAnimation) {
                if (this.currentAnimation.next.indexOf("onlydown", 0) !== -1) {
                    if (ANGLE_DOWN - 22.5 < angle && angle <= ANGLE_DOWN + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("downleft", 0) !== -1) {
                    if (ANGLE_DOWNLEFT - 22.5 < angle && angle <= ANGLE_DOWNLEFT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("onlyleft", 0) !== -1) {
                    if (ANGLE_LEFT - 22.5 < angle && angle <= ANGLE_LEFT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("upleft", 0) !== -1) {
                    if (ANGLE_UPLEFT - 22.5 < angle && angle <= ANGLE_UPLEFT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("onlyup", 0) !== -1) {
                    if (ANGLE_UP - 22.5 < angle && angle <= ANGLE_UP + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("upright", 0) !== -1) {
                    if (ANGLE_UPRIGHT - 22.5 < angle && angle <= ANGLE_UPRIGHT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("onlyright", 0) !== -1) {
                    if (ANGLE_DOWNRIGHT + 22.5 < angle || angle <= ANGLE_RIGHT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
                else if (this.currentAnimation.next.indexOf("downright", 0) !== -1) {
                    if (ANGLE_DOWNRIGHT - 22.5 < angle && angle <= ANGLE_DOWNRIGHT + 22.5) { this.paused = false; return false; }
                    else { return true; }
                }
            }
            else {
                return true;
            }
        }
    });

})(game);