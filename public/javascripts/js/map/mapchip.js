/**
 * MapChip
 */
(function(ns) {

	var counterObject = function(obj) {
	    var count = 0;
	    for (var key in obj) {
	        ++count;
	    }
	    return count;
	};

    ns.MapChip = tm.createClass({
        init: function(param) {
            this.chips     = param.chips;
            this.map       = param.map;
            this.autotile  = param.autotile;
            this.collision = param.collision;
            this.frames    = [];

            var objectNum = counterObject(param.chips);
            this.images = [];
            for (var i = 0; i < objectNum; ++i) {
            	this.images.push(tm.asset.AssetManager.get(param.chips[i].image));

	            if (this.images[i].loaded === false) {
	                this.images[i].element.addEventListener("load", function() {
	                    this._calcFrames(i, param.chips);
	                }.bind(this), false);
	            }
	            else {
	                this._calcFrames(i, param.chips);
	            }
            }
        },

        getMapChip: function(chips, index) {
            return this.frames[chips][index];
        },
        
        _calcFrames: function(chipsNum, chips) {
            var w = chips[chipsNum].width;
            var h = chips[chipsNum].height;
            var row = ~~(this.images[chipsNum].width / w); // 1chipの横の個数
            var col = ~~(this.images[chipsNum].height/ h); // 1chipの縦の個数
            this.frames[chipsNum] = [];
            
            if (!chips[chipsNum].count) chips[chipsNum].count = row*col; // 指定されてなかったら全てカウントする

            for (var i=0,len=chips[chipsNum].count; i<len; ++i) {
                var x   = i%row;		// 何列目か(0スタート)
                var y   = (i/row)|0;	// 何段目か(0スタート)
                var rect = {
                    x:x*w,				// 切り抜く画像のleft座標
                    y:y*h,				// 切り抜く画像のtop座標
                    width: w,			// 画像の幅(pixel)
                    height: h 			// 画像の高さ(pixel)
                };
                this.frames[chipsNum].push(rect); // 画像の切り抜きに必要な数値をまとめる
            }
        }
    });

})(game);