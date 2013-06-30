/**
 * LoginScene
 */
(function(ns) {

    ns.LoginScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            this.addEventListener("pointingend", function(e) {
                window.open('/auth/twitter');
            });
        },
    });

})(game);