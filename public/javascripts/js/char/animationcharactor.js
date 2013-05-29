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
                    "onlydown": {
                        frames: [DOWN_NEUTRAL, DOWN_NEUTRAL+1, DOWN_NEUTRAL, DOWN_NEUTRAL-1],
                        next: "onlydown",
                        frequency: 5,
                    },

                    "onlyup": {
                        frames: [UP_NEUTRAL, UP_NEUTRAL+1, UP_NEUTRAL, UP_NEUTRAL-1],
                        next: "onlyup",
                        frequency: 5,
                    },

                    "onlyleft": {
                        frames: [LEFT_NEUTRAL, LEFT_NEUTRAL+1, LEFT_NEUTRAL, LEFT_NEUTRAL-1],
                        next: "onlyleft",
                        frequency: 5,
                    },

                    "onlyright": {
                        frames: [RIGHT_NEUTRAL, RIGHT_NEUTRAL+1, RIGHT_NEUTRAL, RIGHT_NEUTRAL-1],
                        next: "onlyright",
                        frequency: 5,
                    },

                    "upleft": {
                        frames: [UPLEFT_NEUTRAL, UPLEFT_NEUTRAL+1, UPLEFT_NEUTRAL, UPLEFT_NEUTRAL-1],
                        next: "upleft",
                        frequency: 5,
                    },

                    "upright": {
                        frames: [UPRIGHT_NEUTRAL, UPRIGHT_NEUTRAL+1, UPRIGHT_NEUTRAL, UPRIGHT_NEUTRAL-1],
                        next: "upright",
                        frequency: 5,
                    },

                    "downleft": {
                        frames: [DOWNLEFT_NEUTRAL, DOWNLEFT_NEUTRAL+1, DOWNLEFT_NEUTRAL, DOWNLEFT_NEUTRAL-1],
                        next: "downleft",
                        frequency: 5,
                    },

                    "downright": {
                        frames: [DOWNRIGHT_NEUTRAL, DOWNRIGHT_NEUTRAL+1, DOWNRIGHT_NEUTRAL, DOWNRIGHT_NEUTRAL-1],
                        next: "downright",
                        frequency: 5,
                    },
                }
            });

            this.superInit(ss, frame.width*drawImageScaleSize, frame.height*drawImageScaleSize);

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