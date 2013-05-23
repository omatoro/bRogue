/*
 * ManageSimpleWindows
 */
(function(ns) {

	var WINDOW_WIDTH = 200;
	var WINDOW_HEIGHT = 70;
	var WINDOW_PADDING = 10;

	var WINDOW_DRAW_POSITION_X = WINDOW_WIDTH/2  + WINDOW_PADDING;
	var WINDOW_DRAW_POSITION_Y = WINDOW_HEIGHT/2 + WINDOW_PADDING + 100;

	ns.ManageSimpleWindows = tm.createClass({

	    init: function(scene) {
	    	this.windowGroup = tm.app.CanvasElement();
	    	scene.addChild(this.windowGroup);
	    },

	    add: function (text, colorR, colorG, colorB) {
	    	// 既にあるウィンドウをずらす
	    	for (var i = 0; i < this.windowGroup.children.length; ++i) {
	    		this.windowGroup.children[i].moveby(0, WINDOW_HEIGHT);
	    	}
	    	// ウィンドウを追加
	    	var simpleWindow = ns.SimpleMessageWindow(text, colorR, colorG, colorB);
	    	simpleWindow.position.set(WINDOW_DRAW_POSITION_X, WINDOW_DRAW_POSITION_Y);
	    	this.windowGroup.addChild(simpleWindow);
	    },

	    update: function () {
	    },
	});

})(game);