/**
 * LoopManager
 */

var tmlib = require('tmlib');
var tm = tmlib.tm;
Math = tmlib.Math;

(function(ns) {

	// tm.mainが来るまでの仮組み
	ns.LoopManager = tm.createClass({
		init: function () {
			this.fps = 30;
			this.interval = 1000 / this.fps;
			this.children = [];

			// setIntervalでいいや
			this.setIntervalLoop();

			// var testCall = function () {
			// 	console.log("loop");
			// };

			// this.addChild(testCall);
		},

		addChild: function (child) {
			this.children.push(child);
		},

		// http://jsdo.it/omatoro/97LU
		// setIntervalを利用したゲームループ
		setIntervalLoop: function () {
			var self = this;
		    setInterval(function() {
		        this.update();
		    }.bind(self), this.interval);
		},

		// setTimeoutを利用したゲームループ
		setTimeoutLoop: function () {
		    setTimeout(function() {
		        setTimeout(setTimeoutLoop, interval);
		        update();
		    }, interval);
		},

		// setTimeoutのintervalをより正確にする
		setTimeoutLoopVariable: function () {
		    setTimeout(function() {
		        var start = (new Date()).getTime();
		        update();
		        var progress = (new Date()).getTime() - start;
		        var newInterval = interval - progress;
		        newInterval = (newInterval > 0) ? newInterval : 0;
		        setTimeout(setTimeoutLoop, newInterval);
		    }, interval);
		},

		// requestAnimationFrameはsetTimeoutと併用するとFPS設定ができる？
		setTimeouAndAnimationFrametLoop: function () {
		    setTimeout(function() {
		        window.requestAnimationFrame(animationFrameLoop);
		        update();
		    }, interval);
		},

		// requestAnimationFrameはFPSの設定不可

		animationFrameLoop: function () {
		    var _cb = function () {
		        update();
		        requestAnimationFrame(_cb);
		    };
		    _cb();
		},

		update: function () {
			for (var i = 0; i < this.children.length; ++i) {
				this.children[i]();
			}
		}
	});

})(exports);