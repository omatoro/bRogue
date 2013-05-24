/*
 * OnePlayAnimationSprite
 */
(function(ns) {

	ns.OnePlayAnimationSprite = tm.createClass({
	    superClass: tm.app.AnimationSprite,

	    init: function(width, height, ss) {
	    	this.superInit(width, height, ss);
	    },

	    update: function () {
	        if (this.isAnimation === false) {
	        	this.remove();
	        }
	    }
	});

})(game);