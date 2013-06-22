/**
 * imitate iPhone picker
 */

var game = game || {};

(function(ns) {

	ns.iPhoneBlueButton = tm.createClass({
	    superClass: tm.app.Shape,

	    init: function(width, height, text) {
	        this.superInit(width, height);

	        text  = text  || "Button";
	        this.backgroundColor = "rgba(0, 0, 0, 0.0)";
	        this.alpha = 1.0;
	        this.setInteractive(true);
	        this.boundingType = "rect";
	        // ラベル
	        this.label = tm.app.Label(text || "").addChildTo(this);
	        this.label.setAlign("center").setBaseline("middle");
	        
	        this._refresh();
	    },

	    _refresh: function () {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.height);
	        c.fillStyle = "rgba(0,0,0,0.0)";
	        c.fillRoundRect(2, 2, this.width-4, this.height-4, 8);

	        // 外枠
	        c.strokeStyle   = ns.iPhoneBlueButton.OUT_STROKE_COLOR;
	        c.lineWidth     = 1;
	        c.strokeRoundRect(1, 1, this.width-4, this.height-4, 8);
	        c.clip();

	        c.strokeStyle   = ns.iPhoneBlueButton.IN_STROKE_COLOR
	        c.lineWidth     = 1;
	        c.strokeRoundRect(2, 2, this.width-6, this.height-6, 8);
	        c.clip();

	        var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);

	        // グラデーション
	        grad.addColorStop(0.0, ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_TOP);
	        grad.addColorStop(0.5, ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_CENTER);
	        grad.addColorStop(0.5, ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_BOTTOM);
	        grad.addColorStop(1.0, ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_BOTTOM);
	        c.setGradient(grad);
	        c.fillRect(2, 2, this.width-4, this.height-4, 8);

	        // ラベルのサイズをリセット
	        this.label.setSize(this.width, this.height);
	        this.label.fontSize  = ns.iPhoneBlueButton.FONT_SIZE;
	        this.label.fillStyle = ns.iPhoneBlueButton.FONT_COLOR;
	    }
	});

	ns.iPhoneBlueButton.OUT_STROKE_COLOR = "rgba(20, 40, 100, 1.0)";
	ns.iPhoneBlueButton.IN_STROKE_COLOR  = "rgba(20, 80, 180, 1.0)";

	ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_TOP    = "rgba(120, 160, 245, 1.0)";
	ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_CENTER = "rgba(55, 120, 220, 1.0)";
	ns.iPhoneBlueButton.BACK_GRADIENT_COLOR_BOTTOM = "rgba(35, 95, 220, 1.0)";

	ns.iPhoneBlueButton.FONT_SIZE  = 25;
	ns.iPhoneBlueButton.FONT_COLOR = "white";

	// 慣性を保持
	ns.Inertia = tm.createClass({
	    init : function (middlePoint) {
	        this.current = tm.geom.Vector2(0, 0);
	        this.pre1    = tm.geom.Vector2(0, 0);
	        this.pre2    = tm.geom.Vector2(0, 0);
	        this.pre3    = tm.geom.Vector2(0, 0);
	        this.inertia = tm.geom.Vector2(0, 0);

	        this.middlePoint = middlePoint || 1.2;
	        this.dynamicFriction = 1.2;
	    },

	    // 慣性値を出すためにバッファを作る
	    set : function (currentPosition) {
	        // ポジション
	        this.pre3    = this.pre2.clone();
	        this.pre2    = this.pre1.clone();
	        this.pre1    = this.current.clone();
	        this.current = currentPosition.clone();

	        // 方向ベクトル(平均値)
	        this.inertia = currentPosition.clone().sub(this.pre3).div(3);
	    },

	    middle : function (middlePoint) {
	        middlePoint = middlePoint || this.middlePoint;
	        this.inertia.x /= middlePoint;
	        this.inertia.y /= middlePoint;

	        return this.inertia;
	    },

	    // 摩擦係数を利用して移動量計算
	    getMovedInertiaLength : function (dynamicFriction) {
	        // 現在のベクトル値から摩擦係数を利用して移動量を計算
	        dynamicFriction = dynamicFriction || this.dynamicFriction;
	        this.inertia.x /= dynamicFriction;
	        this.inertia.y /= dynamicFriction;

	        return this.inertia;
	    },

	    // 慣性と目的地を考慮して移動量を計算
	    get : function (diffPosition, middlePoint) {
	        middlePoint = middlePoint || this.middlePoint;
	        if (!diffPosition) {
	            return getMovedInertiaLength();
	        }

	        var result = getMovedMiddleDirectLength(diffPosition, middlePoint);
	        getMovedInertiaLength();
	        result.x += this.inertia.x;
	        result.y += this.inertia.y;

	        return result;
	    },

	    // 慣性と目的地を考慮して移動量を計算(できるだけ良い感じに)(目的地無視)
	    getMovecInertiaMiddle : function (diffPosition, middlePoint) {
	        middlePoint = middlePoint || this.middlePoint;
	        if (!diffPosition) {
	            return getMovedInertiaLength();
	        }

	        this.inertia.x += diffPosition/10;
	        this.inertia.y += diffPosition/10;

	        this.inertia.x /= middlePoint;
	        this.inertia.y /= middlePoint;

	        return this.inertia;
	    }

	});

	// ミドルポイントを利用して目的地への移動量を計算(慣性無視)
	ns.Inertia.getMovedMiddleDirectLength = function (diffPosition, middlePoint) {
	    // 現在のベクトル値から摩擦係数を利用して移動量を計算
	    middlePoint = middlePoint || 1.2;

	    var resultLength = tm.geom.Vector2(0, 0);
	    resultLength.x = diffPosition.x / middlePoint;
	    resultLength.y = diffPosition.y / middlePoint;

	    return resultLength;
	};








	// 完了ボタン定数
	var COMP_BUTTON_WIDTH  = 72;
	var COMP_BUTTON_HEIGHT = 54;
	var COMP_BUTTON_WIDTH_PADDING  = 0;
	var COMP_BUTTON_HEIGHT_PADDING = 10;

	// メニュー定数
	var MENU_HEIGHT   = 500;
	var MENU_PADDING  = 50;
	var MENU_WIDTH    = ns.SCREEN_WIDTH;
	var MENU_TOP_PADDING   = COMP_BUTTON_HEIGHT + (COMP_BUTTON_HEIGHT_PADDING*2); // メニューの上枠の半透明部分の大きさ
	// メニュー定数：スクリーン座標
	var MENU_CENTER_X = ns.SCREEN_WIDTH/2;
	var MENU_CENTER_Y = ns.SCREEN_HEIGHT - (MENU_HEIGHT/2);
	var MENU_TOP      = ns.SCREEN_HEIGHT - MENU_HEIGHT;


	// メニュー内要素定数
	var IN_MENU_PADDING    = MENU_PADDING/2; // 枠部分(グレー)の幅
	var IN_MENU_WIDTH      = MENU_WIDTH  - (IN_MENU_PADDING*2); // メニューの実際の幅
	var IN_MENU_HEIGHT     = MENU_HEIGHT - (IN_MENU_PADDING*2) - MENU_TOP_PADDING;  // メニューの見える部分の高さ

	// メニュー内要素定数：スクリーン座標
	var IN_MENU_CENTER_Y   = ns.SCREEN_HEIGHT - IN_MENU_PADDING - (IN_MENU_HEIGHT/2);//MENU_CENTER_Y + MENU_TOP_PADDING/2 - (MENU_PADDING/4);
	var IN_MENU_TOP        = IN_MENU_CENTER_Y - (IN_MENU_HEIGHT/2);//-(IN_MENU_SCROLL_HEIGHT/2);

	// メニュー内のボタン(文字)要素定数
	var MENU_ELEMENT_PADDING   = 25;
	var MENU_ELEMENT_WIDTH     = MENU_WIDTH - MENU_PADDING - (MENU_ELEMENT_PADDING*2);
	var MENU_ELEMENT_HEIGHT    = 90;
	var MENU_ELEMENT_BETTWEEN_PADDING = 0;
	// メニュー内要素定数：インメニュー座標
	var MENU_ELEMENT_CENTER_X = -(IN_MENU_WIDTH - MENU_ELEMENT_WIDTH)/2 + MENU_ELEMENT_PADDING; // 中心
	var MENU_ELEMENT_TOP      ;
	var FADE_MENU_ELEMENT_PADDING = MENU_ELEMENT_HEIGHT/2;


	var IN_MENU_SCROLL_HEIGHT        = 0;//ns.SCREEN_HEIGHT; // メニューのスクロール部分の実際の高さ メニュー内要素は描画されるので0で構わない
	var IN_MENU_SCROLL_HALF_HEIGHT   = IN_MENU_SCROLL_HEIGHT/2;
	// スクロール部分の定数：スクリーン座標
	var IN_MENU_SCROLL_CENTER_Y      = IN_MENU_SCROLL_HALF_HEIGHT + IN_MENU_TOP;
	var IN_MENU_SCROLL_INITDRAW_CENTER_Y = IN_MENU_SCROLL_CENTER_Y + IN_MENU_HEIGHT/2 - MENU_ELEMENT_HEIGHT/2;


	// メニュー内要素の文字定数
	var MENU_FONT_SIZE = 48;
	var MENU_FONT_UNPUSHED_COLOR = 10;
	var MENU_FONT_PUSHED_COLOR   = 255;
	var MENU_FONT_LEFT_PADDING = 25;


	/*
	 * PullDownStringButton
	 * プルダウンメニュー内の文字(ボタンとして扱う)
	 */
	var PullDownStringButton = tm.createClass({
	    superClass: tm.app.Shape,
	    
	    init: function(width, height, text, subData) {
	        this.superInit(width, height);
	        
	        text  = text  || "String";
	        this.subData = subData;
	        this.fontColor = MENU_FONT_UNPUSHED_COLOR;
	        this.a = 0.0;

	        this.alpha = PullDownStringButton.DEFAULT_ALPHA;
	        this.isPushed = false;
	        this.limitAlpha = 1.0;
	        this.currentAlpha = 0.0;
	        
	        this.setInteractive(true);
	        this.boundingType = "rect";
	        
	        this.addEventListener("pointingover", function() {
	            // this.tweener.clear();
	            // this.tweener.fade(1.0, 250);
	        });
	        this.addEventListener("pointingout", function() {
	            // this.tweener.clear();
	            // this.tweener.fade(tm.app.GlossyButton.DEFAULT_ALPHA, 250);
	        });
	        this.setLabelAlpha = function (val) {
	            if (this.isPushed === true) {
	                this.limitAlpha = 1.0;
	            }
	            else {
	                this.limitAlpha = PullDownStringButton.DEFAULT_ALPHA;
	            }

	            if (val > this.limitAlpha) {
	                val = this.limitAlpha;
	            }
	            else if (val < 0) {
	                val = 0;
	            }
	            this.alpha = val;
	        };
	        this.setLabelCurrentAlpha = function (val) {
	            if (this.isPushed === true) {
	                this.limitAlpha = 1.0;
	            }
	            else {
	                this.limitAlpha = PullDownStringButton.DEFAULT_ALPHA;
	            }

	            if (val > this.limitAlpha) {
	                val = this.limitAlpha;
	            }
	            else if (val < 0) {
	                val = 0;
	            }
	            this.currentAlpha = val;
	        }
	        
	        // ラベル
	        this.label = tm.app.Label(text || "", MENU_FONT_SIZE).addChildTo(this);
	        this.label.fillStyle = tm.graphics.Color.createStyleRGBA(this.fontColor, this.fontColor, this.fontColor, 1.0);
	        this.label.setAlign("left").setBaseline("middle");
	        this.label.x -= this.width / 2 - MENU_FONT_LEFT_PADDING; // 左端に寄せる
	        
	        this._refresh();
	    },
	    
	    pushed: function () {
	        if (this.isPushed === false) {
	            this.tweener.clear();
	            this.tweener
	                .to({"alpha": 1.0, "a": 1.0, "fontColor": MENU_FONT_PUSHED_COLOR}, 100);
	            this.isPushed = true;
	            this.currentAlpha = this.alpha;
	        }
	    },
	    
	    unpushed: function () {
	        if (this.isPushed === true) {
	            this.tweener.clear();
	            this.tweener.
	                to({"alpha": this.currentAlpha, "a": 0.0, "fontColor": MENU_FONT_UNPUSHED_COLOR}, 100);
	            this.isPushed = false;
	        }
	    },

	    // 実行速度が心配
	    update: function () {
	        if (this.tweener.isPlaying) {
	            this._refresh();
	        }
	    },
	    
	    _refresh: function() {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.height);
	        c.fillStyle = "rgba(0,0,0,0.0)";
	        c.fillRoundRect(2, 2, this.width-4, this.height-4, 10);
	        c.strokeStyle   = tm.graphics.Color.createStyleRGBA(15, 80, 200, this.a);
	        c.lineWidth     = 2;
	        c.strokeRoundRect(2, 2, this.width-4, this.height-4, 10);
	        c.clip();

	        var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);

	        // グラデーション
	        grad.addColorStop(0.0, tm.graphics.Color.createStyleRGBA(5, 135, 240, this.a));
	        grad.addColorStop(1.0, tm.graphics.Color.createStyleRGBA(5, 95, 235, this.a));
	        c.setGradient(grad);
	        c.fillRect(2, 2, this.width-4, this.height-4, 10);

	        // ラベルのサイズをリセット
	        this.label.setSize(this.width, this.height);
	        this.label.fillStyle = tm.graphics.Color.createStyleRGBA(this.fontColor, this.fontColor, this.fontColor, 1.0);
	    }
	});

	PullDownStringButton.BACKGROUNDCOLOR_R = 4;
	PullDownStringButton.BACKGROUNDCOLOR_G = 117;
	PullDownStringButton.BACKGROUNDCOLOR_B = 239;
	PullDownStringButton.BACKGROUNDCOLOR_A = 1.0;
	PullDownStringButton.DEFAULT_ALPHA = 1.0;

	/*
	 * ScreenInScrollPullDown
	 * スクロールする部分の生成・管理(背景色は透明となる)
	 */
	var ScreenInScrollPullDown = tm.createClass({
	    superClass : tm.app.Shape,
	    
	    init: function(pushedButton, menu, array) {
	        this.superInit(IN_MENU_WIDTH, IN_MENU_SCROLL_HEIGHT);
	        this.canvas.clearColor("rgba(0, 0, 0, 0.0)");
	        
	        // MainSceneで押下したボタンを保持
	        this.pushedButton = pushedButton;

	        // コンポジション先のクラスであるPullDownクラスを保持
	        this.menu = menu;

            // ボタンを選択した際の、選択したボタンの文字以外の返り値を指定した場合の格納先
	        this.pushedButton.returnedData = null;

	        // 何番目のボタンを押したか
	        this.pushedButton.ite = null;
	        
	        // 引数のデータ型を調べる
	        if (array instanceof Array) {
	        	if (!(array[0] instanceof Array) && !(typeof array === "string" || array instanceof String)) {
	        		this.argType = "complex";
	        	}
	        	else {
	        		this.argType = "array";
	        	}
	        }
	        else if (typeof array === "string" || array instanceof String) { this.argType = "string"; }
	        else { this.argType = "object"; }
	        
	        // プルダウンメニュー内の文字
	        this.button = [];
	        this.buttonNum = 0;
	        
	        // 1.文字一つのみ
	        if (this.argType === "string") {
	            this.buttonNum = 1;
	            this.button[0] = PullDownStringButton(MENU_ELEMENT_WIDTH, MENU_ELEMENT_HEIGHT, array);
	            this.button[0].setPosition(MENU_ELEMENT_CENTER_X, -(IN_MENU_SCROLL_HALF_HEIGHT)+(MENU_ELEMENT_HEIGHT/2));
	            this.addChild(this.button[0]);
	        }
	        // 2.配列
	        else if (this.argType === "array") {
	            this.buttonNum = array.length;
	            for (var i = 0; i < this.buttonNum; ++i) {
	                this.button[i] = PullDownStringButton(MENU_ELEMENT_WIDTH, MENU_ELEMENT_HEIGHT, array[i]);
	                this.button[i].setPosition(MENU_ELEMENT_CENTER_X, -(IN_MENU_SCROLL_HALF_HEIGHT)+(MENU_ELEMENT_HEIGHT/2)+(i*(MENU_ELEMENT_HEIGHT + MENU_ELEMENT_BETTWEEN_PADDING)));
	                this.addChild(this.button[i]);
	            }
	        }
	        // 3.オブジェクト(表示順は保証しない)
	        else if (this.argType === "object") {
	            var i = 0;
	            for (var key in array) {
	                this.button[i] = PullDownStringButton(MENU_ELEMENT_WIDTH, MENU_ELEMENT_HEIGHT, key, array[key]);
	                this.button[i].setPosition(MENU_ELEMENT_CENTER_X, -(IN_MENU_SCROLL_HALF_HEIGHT)+(MENU_ELEMENT_HEIGHT/2)+(i*(MENU_ELEMENT_HEIGHT + MENU_ELEMENT_BETTWEEN_PADDING)));
	                this.addChild(this.button[i]);
	                ++i;
	            }
	            this.buttonNum = i;
	        }
	        // 4.配列(中身はオブジェクト)
	        /*
	         * 書式
	         * [
	         *     { text: "", subData: {} }
	         * ]
	         */
	        else if (this.argType === "complex") {
	        	this.buttonNum = array.length;
	            var i = 0;
	            for (var i = 0; i < this.buttonNum; ++i) {
	                this.button[i] = PullDownStringButton(MENU_ELEMENT_WIDTH, MENU_ELEMENT_HEIGHT, array[i].text, array[i].subData);
	                this.button[i].setPosition(MENU_ELEMENT_CENTER_X, -(IN_MENU_SCROLL_HALF_HEIGHT)+(MENU_ELEMENT_HEIGHT/2)+(i*(MENU_ELEMENT_HEIGHT + MENU_ELEMENT_BETTWEEN_PADDING)));
	                this.addChild(this.button[i]);
	            }
	        }

	        this.setInteractive(true);
	        this.boundingType = "rect";

	        // ボタンのアルファ値を調整させる
	        this.setAllButtonAlpha();
	    },
	    
	    getAllButtonHeight: function () {
	        return this.button.length * (MENU_ELEMENT_HEIGHT + MENU_ELEMENT_BETTWEEN_PADDING);
	    },

	    // メニュー内要素であるボタンを、位置によってアルファ値を変更する
	    setAllButtonAlpha: function () {
	        // 位置によってメニュー内要素の透明度を変更する(上下の表示リミットに近くなるにつれ透明になる)
	        var topPosition = this.position.y - IN_MENU_SCROLL_HALF_HEIGHT;
	        for (var i = 0; i < this.buttonNum; ++i) {
	            // メニュー内ラベルのアルファ値をメニューの高さによって調整(button座標->スクロール座標->スクリーン座標)
	            var buttonTopPosition = this.button[i].position.y - (MENU_ELEMENT_HEIGHT/2) + IN_MENU_SCROLL_HALF_HEIGHT;
	            var buttonParentPosition = buttonTopPosition + topPosition - MENU_TOP;
	            
	            var settingAlpha = 0;
	            var topAlpha = 1.0;
	            if (this.button[i].isPushed) { topAlpha = 1.0; }

	            // 下方向を行き過ぎたらアルファ値は0
	            if      (buttonParentPosition > MENU_HEIGHT - (MENU_ELEMENT_HEIGHT) - (MENU_PADDING/2))   { settingAlpha = 0; }
	            // 下方向、要素一つの高さからアルファ値を下げていく
	            else if (buttonParentPosition > MENU_HEIGHT - (MENU_ELEMENT_HEIGHT) - (MENU_PADDING/2) - FADE_MENU_ELEMENT_PADDING) { settingAlpha = topAlpha - ((buttonParentPosition - MENU_HEIGHT + (MENU_ELEMENT_HEIGHT) + (MENU_PADDING/2) + FADE_MENU_ELEMENT_PADDING) / FADE_MENU_ELEMENT_PADDING);}
	            // メニュー内の要素は最大のアルファ値にして表示する
	            else if (buttonParentPosition > MENU_TOP_PADDING + IN_MENU_PADDING + MENU_ELEMENT_HEIGHT) { settingAlpha = topAlpha; }
	            // 上方向、要素一つの高さからアルファ値を下げていく
	            else if (buttonParentPosition > MENU_TOP_PADDING + IN_MENU_PADDING - MENU_ELEMENT_HEIGHT) { settingAlpha = (buttonParentPosition - MENU_TOP_PADDING - IN_MENU_PADDING) / FADE_MENU_ELEMENT_PADDING; }
	            // 上方向を行き過ぎたらアルファ値は0
	            else if (buttonParentPosition <= MENU_TOP_PADDING)          { settingAlpha = 0; }
	            this.button[i].setLabelAlpha(settingAlpha);
	            this.button[i].setLabelCurrentAlpha(settingAlpha);
	        }
	    },
	    
	    update: function(app) {
	        // ==========メニュー内要素の文字(ボタン)押下時の動作=============
	        app.pointing.getDrag();
	        var isBreak = false; // 移動後のbuttonの位置とヒット判定してしまい、二重処理されてしまうため
	        if (app.pointing.getPointingEndNonDrag()) {
	            var mouse_position = app.pointing;

	            // ヒット判定する範囲(スクロール)
	            var limitTop    = IN_MENU_TOP;//IN_MENU_CENTER_Y - IN_MENU_SCROLL_HALF_HEIGHT + MENU_TOP_PADDING;
	            var limitBottom = IN_MENU_TOP + IN_MENU_HEIGHT;//IN_MENU_CENTER_Y + IN_MENU_SCROLL_HALF_HEIGHT - MENU_ELEMENT_HEIGHT;

	            // プルダウンメニュー内セレクト
	            for (var i = 0; i < this.buttonNum; ++i) {
	                if (isBreak === false &&
	                        (limitBottom > mouse_position.y && limitTop < mouse_position.y) && // 枠外のクリックは判定しない
	                        // this.button[i].alpha > 0.3 &&
	                        this.button[i].isHitPointRect(mouse_position.x, mouse_position.y)) { // メニュー内要素とのヒット判定

	                    // PullDownクラスに文字だけが指定された場合
	                    if (this.argType === "string") {
	                        this.pushedButton.label.text = this.button[i].label.text;
	                        this.pushedButton.ite = i;
	                    }
	                    
	                    // PullDownクラスに配列が指定された場合
	                    else if (this.argType === "array") {
	                        this.pushedButton.label.text = this.button[i].label.text;
	                        this.pushedButton.ite = i;
	                    }
	                    
	                    // PullDownクラスにオブジェクトが指定された場合
	                    else if (this.argType === "object") {
	                        this.pushedButton.label.text   = this.button[i].label.text;
	                        this.pushedButton.returnedData = this.button[i].subData; // 値、もしくは関数を保持
	                        this.pushedButton.ite = i;
	                    }
	                    // PullDownクラスに配列(中身はオブジェクト)が指定された場合
	                    else if (this.argType === "complex") {
	                        // this.pushedButton.label.text   = this.button[i].label.text; // iPhonePickerを利用するクラスで変更するようにする
	                        this.pushedButton.returnedData = this.button[i].subData; // 値、もしくは関数を保持
	                        this.pushedButton.ite = i;
	                    }

	                    // 選択時のエフェクト
	                    this.button[i].pushed();

	                    // 選択した要素が中心になるようにメニューを移動する
	                    var parentTopDiffButtonY = i*(MENU_ELEMENT_HEIGHT + MENU_ELEMENT_BETTWEEN_PADDING);
	                    this.menu.setPositionMiddle(parentTopDiffButtonY);

	                    // ヒット判定はもうやらない
	                    isBreak = true;
	                }
	                else {
	                    this.button[i].unpushed();
	                }
	            }
	        }
	        this.setAllButtonAlpha();
	    }
	});


	var MenuBackground = tm.createClass({
	    superClass : tm.app.Shape,

	    init: function (width, height) {
	        this.superInit(width, height);
	        this.backgroundColor = "rgba(0, 0, 0, 0.0)";
	        this._refresh();
	    },

	    _refresh: function () {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.height);
	        c.fillStyle = this.backgroundColor;
	        c.fillRoundRect(2, 2, this.width-4, this.height-4, 10);
	        c.strokeStyle   = "rgba(100,100,100,0.75)";
	        c.lineWidth     = 2;
	        c.strokeRoundRect(2, 2, this.width-4, this.height-4, 10);

	        // テカリ
	        c.rect(2, 2, this.width-4, this.height-4, 10);
	        c.clip();

	        var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);

	        // 上の半透明部分
	        grad.addColorStop(0.0, "rgba(50,50,50,0.3)");
	        grad.addColorStop(0.07, "rgba(50,50,50,0.3)");
	        grad.addColorStop(0.07, "rgba(10,10,10,0.3)");
	        grad.addColorStop(0.14, "rgba(10,10,10,0.3)");
	        
	        // 中心のドラムの縁部分
	        grad.addColorStop(0.14, "rgba(150,155,170,1.0)");
	        grad.addColorStop(0.55, "rgba(65,70,85,1.0)");
	        grad.addColorStop(0.55, "rgba(30,32,45,1.0)");
	        grad.addColorStop(1.0, "rgba(40,44,55,1.0)");
	        c.setGradient(grad);
	        c.fillRect(2, 2, this.width-4, this.height-4, 10);
	    }
	});


	var MenuElementBackground = tm.createClass({
	    superClass : tm.app.Shape,

	    init: function (width, height) {
	        this.superInit(width, height);
	        this.backgroundColor = "rgba(0, 0, 0, 0.0)";
	        this._refresh();
	    },

	    _refresh: function () {
	        // 描画
	        var c = this.canvas;
	        c.resize(this.width, this.height);
	        c.fillStyle = this.backgroundColor;
	        c.fillRoundRect(2, 2, this.width-4, this.height-4, 10);
	        c.strokeStyle   = "rgba(100,100,100,0.75)";
	        c.lineWidth     = 2;
	        c.strokeRoundRect(2, 2, this.width-4, this.height-4, 10);

	        // テカリ
	        c.rect(2, 2, this.width-4, this.height-4, 10);
	        c.clip();

	        var grad = tm.graphics.LinearGradient(0, 0, 0, this.height);


	        grad.addColorStop(0.0, "rgba(120,120,130,1.0)");
	        grad.addColorStop(0.15, "rgba(252,252,250,1.0)");
	        
	        grad.addColorStop(0.7, "rgba(252,252,250,1.0)");
	        grad.addColorStop(1.0, "rgba(120,120,130,1.0)");
	        c.setGradient(grad);
	        c.fillRect(2, 2, this.width-4, this.height-4, 10);
	    }
	});


	ns.iPhonePicker = tm.createClass({
	    superClass : tm.app.Scene,
	    
	    init: function(pushedButton, obj) {
	        this.superInit();
	        
	        // 画面にかけるメニューの下地
	        var filter = MenuBackground(ns.SCREEN_WIDTH, MENU_HEIGHT);
	        filter.setPosition(MENU_CENTER_X, MENU_CENTER_Y);
	        this.addChild(filter);
	        
	        // 要素が描画されるメニュー内の下地を作成
	        var screen = MenuElementBackground(IN_MENU_WIDTH, IN_MENU_HEIGHT);
	        screen.setPosition(MENU_CENTER_X, IN_MENU_CENTER_Y);
	        this.addChild(screen);
	        
	        // 完了ボタン(押下すると画面を閉じる)
	        var button = ns.iPhoneBlueButton(COMP_BUTTON_WIDTH, COMP_BUTTON_HEIGHT, "完了");
	        button.setPosition(ns.SCREEN_WIDTH - (COMP_BUTTON_WIDTH/2) - (MENU_PADDING/2) - COMP_BUTTON_WIDTH_PADDING, ns.SCREEN_HEIGHT-MENU_HEIGHT + (COMP_BUTTON_HEIGHT/2) + COMP_BUTTON_HEIGHT_PADDING);
	        this.addChild(button);
	        this.button = button;
	        // 完了ボタン押下時の動作
	        this.button.addEventListener("pointingend", function(e) {
	            // メニュー終了
	            var mouse_position = e.app.pointing;
	            if (this.isHitPointRect(mouse_position.x, mouse_position.y)) {
	                e.app.popScene();
	            }
	        });
	        
	        // 中の画面(スクロールする部分) 押下したメニューボタンオブジェクトを綱渡しにする(thisを渡しているのは、要素選択時の自動移動を行いたいため)
	        var inScreen = ScreenInScrollPullDown(pushedButton, this, obj);
	        var inScreenPosition = tm.geom.Vector2(MENU_CENTER_X, IN_MENU_SCROLL_INITDRAW_CENTER_Y);
	        inScreen.position.set(inScreenPosition.x, inScreenPosition.y);
	        this.addChild(inScreen);
	        this.inScreen = inScreen;
	        this.inScreenPosition = inScreenPosition;
	        
	        // スクロール時に使用するクリックのポジションを保持(ドラッグのみ)
	        // var scrollStartPosition = tm.geom.Vector2(0, 0);
	        var scrollEndPosition   = tm.geom.Vector2(0, 0);
	        this.scrollEndPosition = scrollEndPosition;
	        
	        // 慣性を保持する
	        this.inertia = ns.Inertia();

	        this.addEventListener("pointingmove", function(e) {
	            var p = e.app.pointing;
	            if (p.getDrag()) {
	                // ドラッグ開始位置からの移動量を計算してメニュー位置に反映
	                var moving = tm.geom.Vector2(0, p.y - p.dragStartPosition.y);
	                
	                inScreen.position.set(inScreenPosition.x, inScreenPosition.y + moving.y);
	                
	                // 現在のスクロール位置を保存
	                scrollEndPosition.y = moving.y;
	                
	                // 毎フレームの移動量を保存(慣性に使用)
	                this.inertia.set(moving);
	            }
	        });
	        this.addEventListener("pointingend", function() {
	            // ドラッグ終了時に現在位置を保持
	            inScreenPosition.y += scrollEndPosition.y;
	        });
	        this.addEventListener("pointingstart", function() {
	            // 要素選択時の自動移動を終了
	            this.inScreen.tweener.clear();

	            // ドラッグ中はメニュー移動処理を行うが、ドラッグ終了時に移動枠の限度まで戻す(iPhoneのプルダウンを参考)
	            var limitTopPosition    = IN_MENU_SCROLL_HALF_HEIGHT + MENU_CENTER_Y - (MENU_ELEMENT_HEIGHT/2) + MENU_TOP_PADDING/2;
	            var limitBottomPosition = IN_MENU_SCROLL_HALF_HEIGHT + MENU_CENTER_Y + (MENU_ELEMENT_HEIGHT/2) - this.inScreen.getAllButtonHeight() + MENU_TOP_PADDING/2;
	            if (inScreenPosition.y > limitTopPosition) {
	                inScreenPosition.y = limitTopPosition;
	                inScreen.position.set(inScreenPosition.x, inScreenPosition.y);
	            }
	            else if (inScreenPosition.y < limitBottomPosition) {
	                inScreenPosition.y = limitBottomPosition;
	                inScreen.position.set(inScreenPosition.x, inScreenPosition.y);
	            }
	            
	            // ドラッグ時の慣性を初期化する
	            this.inertia.init();
	        });
	    },

	    // ScreenInScrollPullDownクラスで使用
	    setPositionMiddle: function (topDiffButtonPositionY, middle) {
	        var middlePoint = middle || 1.2;

	        // 移動
	        this.inScreen.tweener.clear();
	        this.inScreen.tweener.to({y: IN_MENU_SCROLL_INITDRAW_CENTER_Y - topDiffButtonPositionY}, 200);

	        this.inScreenPosition.y  = this.inScreen.position.y;
	        this.scrollEndPosition.y = this.inScreen.position.y;
	    },
	    
	    update: function(app) {
	        // 慣性移動(ドラッグ中でない場合のみ行う) & 限界まで移動したら戻す
	        if (!app.pointing.getPointingEnd() && !app.pointing.getDrag()) {
	            var limitTopPosition    = IN_MENU_SCROLL_HALF_HEIGHT + MENU_CENTER_Y - (MENU_ELEMENT_HEIGHT/2) + MENU_TOP_PADDING/2;
	            var limitBottomPosition = IN_MENU_SCROLL_HALF_HEIGHT + MENU_CENTER_Y + (MENU_ELEMENT_HEIGHT/2) - this.inScreen.getAllButtonHeight() + MENU_TOP_PADDING/2;
	            // 慣性移動中に上方向の移動上限に達したら、上限まで戻す
	            if (this.inScreen.position.y > limitTopPosition) {
	                this.inScreen.position.y += this.inertia.getMovecInertiaMiddle(limitTopPosition - this.inScreen.position.y, 1.7).y;
	                this.inScreenPosition.y  = this.inScreen.position.y;
	                this.scrollEndPosition.y = this.inScreen.position.y;
	            }
	            // 慣性移動中に下方向の移動上限に達したら、上限まで戻す
	            else if (this.inScreen.position.y < limitBottomPosition) {
	                this.inScreen.position.y += this.inertia.getMovecInertiaMiddle(limitBottomPosition - this.inScreen.position.y, 1.7).y;
	                this.inScreenPosition.y  = this.inScreen.position.y;
	                this.scrollEndPosition.y = this.inScreen.position.y;
	            }
	            // 慣性移動
	            else {
	                this.inScreen.position.y += this.inertia.middle().y;
	                this.inScreenPosition.y  = this.inScreen.position.y;
	                this.scrollEndPosition.y = this.inScreen.position.y;
	            }
	        }
	    }
	});
})(game);
