/**
 * MapSprite
 */
(function(ns) {

    ns.MapSprite = tm.createClass({

        superClass: tm.app.Shape,

        /**
         * 初期化
         * ※width,heightで指定する大きさはmapchip一つの大きさ
         */
        init: function(mapchip, mapChipWidth, mapChipHeight)
        {
            var width  = mapchip.map[0].length * (mapChipWidth  || 16);
            var height = mapchip.map.length    * (mapChipHeight || 16);
            this.superInit(width, height);
            
            this.mapChipWidth  = mapChipWidth  || 16;
            this.mapChipHeight = mapChipHeight || 16;
            
            this.mapchip = mapchip; // マップチップの情報や画像情報が格納されてる
            this.currentFrame = 0;
            this.currentFrameIndex = 0;

            this.createMap();
        },

        /**
         * 描画時のマップ(canvas)を作成
         */
        createMap: function() {
        	for (var i = 0; i < this.mapchip.map.length; ++i) {
        		for (var j = 0; j < this.mapchip.map[i].length; ++j) {
                    // 数値であれあば通常通り描画
                    if (typeof this.mapchip.autotile.autoTileMap[i][j] === "number") {
                        var drawingMapChipID = this.mapchip.map[i][j];

                        var srcRect = this.mapchip.getMapChip(drawingMapChipID, 4);//this.currentFrame);
                        var element = this.mapchip.images[drawingMapChipID].element;

                        var dx =  j*this.mapChipWidth;
                        var dy =  i*this.mapChipHeight;

                        // http://www.html5.jp/canvas/ref/method/drawImage.html
                        this.canvas.drawImage(
                            element,
                            srcRect.x,
                            srcRect.y,
                            srcRect.width,
                            srcRect.height,
                            dx,
                            dy,
                            this.mapChipWidth,
                            this.mapChipHeight);
                    }
                    // オートタイルだった場合は四回に分けて描画(ただの数値でなければOK)
                    else {
                        var drawingMapChipID = this.mapchip.map[i][j];
                        var element = this.mapchip.images[drawingMapChipID].element;

                        var dx =  j*this.mapChipWidth;
                        var dy =  i*this.mapChipHeight;

                        // 描画するタイルを取得
                        var tile = this.mapchip.autotile.autoTileMap[i][j].tile;
                        var a = tile.a.id-1;
                        var b = tile.b.id-1;
                        var c = tile.c.id-1;
                        var d = tile.d.id-1;

                        var srcRect = this.mapchip.getMapChip(drawingMapChipID, a);
                        this.canvas.drawImage(
                            element,
                            srcRect.x,
                            srcRect.y,
                            srcRect.width,
                            srcRect.height,
                            dx,
                            dy,
                            this.mapChipWidth/2,
                            this.mapChipHeight/2);

                        var srcRect = this.mapchip.getMapChip(drawingMapChipID, b);
                        this.canvas.drawImage(
                            element,
                            srcRect.x,
                            srcRect.y,
                            srcRect.width,
                            srcRect.height,
                            dx+this.mapChipWidth/2,
                            dy,
                            this.mapChipWidth/2,
                            this.mapChipHeight/2);

                        var srcRect = this.mapchip.getMapChip(drawingMapChipID, c);
                        this.canvas.drawImage(
                            element,
                            srcRect.x,
                            srcRect.y,
                            srcRect.width,
                            srcRect.height,
                            dx,
                            dy+this.mapChipHeight/2,
                            this.mapChipWidth/2,
                            this.mapChipHeight/2);

                        var srcRect = this.mapchip.getMapChip(drawingMapChipID, d);
                        this.canvas.drawImage(
                            element,
                            srcRect.x,
                            srcRect.y,
                            srcRect.width,
                            srcRect.height,
                            dx+this.mapChipWidth/2,
                            dy+this.mapChipHeight/2,
                            this.mapChipWidth/2,
                            this.mapChipHeight/2);
                    }
        		}
        	}
        },

        /**
         * どこのマップチップに所属しているか取得(Map左上が0,0となる座標で指定)
         */
        getBelong: function(x, y) {
        	var col = (x / this.mapChipWidth)  |0;
        	var row = (y / this.mapChipHeight) |0;

        	var result = {
        		col:       col,
        		row:       row,
        		map:       this.mapchip.map[row][col],
        		collision: this.mapchip.collision[row][col],
        	};
        	return result;
        },

        /**
         * 上下左右のマップチップのcollisionを取得
         */
        getCrossCollision: function(col, row) {
        	var limitDown  = this.mapchip.map.length-1;
        	var limitRight = this.mapchip.map[0].length-1;

        	var up    = (row > 0)          ? this.mapchip.collision[row-1][col] : null;
        	var down  = (row < limitDown)  ? this.mapchip.collision[row+1][col] : null;
        	var left  = (col > 0)          ? this.mapchip.collision[row][col-1] : null;
        	var right = (col < limitRight) ? this.mapchip.collision[row][col+1] : null;

        	var result = {
        		up:    up,
        		down:  down,
        		left:  left,
        		right: right,
        	};

        	return result;
        },

        /**
         * マップチップのrectを取得
         */
        getRect: function(col, row) {
        	var up    = row     * this.mapChipHeight;
        	var down  = (row+1) * this.mapChipHeight-1;
        	var left  = col     * this.mapChipWidth;
        	var right = (col+1) * this.mapChipWidth -1;

        	var result = {
        		up: up,
        		down: down,
        		left: left,
        		right: right
        	};

        	return result;
        }
    });

})(game);