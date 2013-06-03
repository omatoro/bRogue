/**
 * AutoTile
 */

var tm = tm || require('tmlib');

(function(ns) {
     
    /**
     * オートタイルを行うマップチップは、一つのマップチップ(口)を4分割(田)し
     * 4回に分けて描画を行う
     * 適切なマップチップを選択することで、道を繋げた描画を行うことができる
     *
     * 分割するマップチップは、以下のように名前をつける
     * +-+-+
     * |a|b|
     * +-+-+
     * |c|d|
     * +-+-+
     */
    // var IMAGE_TOPLEFT = tm.geom.Vector2(0, 0);
    // var TILE_SIZE = {
    //     width: 16,
    //     height: 16
    // };
    var TILE_PATTERN = {
        circle: {},
        column: {},
        row:    {},
        cross:  {},
        plain:  {},
    };
    var TILE_NAME = ["a", "b", "c", "d"];
    /**
     * wolf rpg editor形式のマップチップを分割
     * ※結局描画時に使ってない
     */
    for (var i = 0; i < 4; ++i) {
        // 円形のマップ情報
        TILE_PATTERN.circle[TILE_NAME[i]] = {}; // a,b,c,d
        TILE_PATTERN.circle[TILE_NAME[i]].id = i+1;
        // TILE_PATTERN.circle[TILE_NAME[i]].imagePosition = {
        //     topLeft:        IMAGE_TOPLEFT.x + ((i%2)            * TILE_SIZE.width),
        //     bottomRight:    IMAGE_TOPLEFT.y + ((((i/2) |0) + 0) * TILE_SIZE.height),
        // };

        // 縦の道となるマップ情報
        TILE_PATTERN.column[TILE_NAME[i]] = {}; // a,b,c,d
        TILE_PATTERN.column[TILE_NAME[i]].id = i+5;
        // TILE_PATTERN.column[TILE_NAME[i]].imagePosition = {
        //     topLeft:        IMAGE_TOPLEFT.x + ((i%2)            * TILE_SIZE.width),
        //     bottomRight:    IMAGE_TOPLEFT.y + ((((i/2) |0) + 2) * TILE_SIZE.height),
        // };
        
        // 横の道となるマップ情報
        TILE_PATTERN.row[TILE_NAME[i]] = {}; // a,b,c,d
        TILE_PATTERN.row[TILE_NAME[i]].id = i+9;
        // TILE_PATTERN.row[TILE_NAME[i]].imagePosition = {
        //     topLeft:        IMAGE_TOPLEFT.x + ((i%2)            * TILE_SIZE.width),
        //     bottomRight:    IMAGE_TOPLEFT.y + ((((i/2) |0) + 4) * TILE_SIZE.height),
        // };

        // 十字路となるマップ情報
        TILE_PATTERN.cross[TILE_NAME[i]] = {}; // a,b,c,d
        TILE_PATTERN.cross[TILE_NAME[i]].id = i+13;
        // TILE_PATTERN.cross[TILE_NAME[i]].imagePosition = {
        //     topLeft:        IMAGE_TOPLEFT.x + ((i%2)            * TILE_SIZE.width),
        //     bottomRight:    IMAGE_TOPLEFT.y + ((((i/2) |0) + 6) * TILE_SIZE.height),
        // };

        // 角がないマップ情報
        TILE_PATTERN.plain[TILE_NAME[i]] = {}; // a,b,c,d
        TILE_PATTERN.plain[TILE_NAME[i]].id = i+17;
        // TILE_PATTERN.plain[TILE_NAME[i]].imagePosition = {
        //     topLeft:        IMAGE_TOPLEFT.x + ((i%2)            * TILE_SIZE.width),
        //     bottomRight:    IMAGE_TOPLEFT.y + ((((i/2) |0) + 8) * TILE_SIZE.height),
        // };
    }

    /**
     * 隣接しているマップから、どのタイルを選択するのかを決定する情報をパターンにしておく
     *
     * パターンを決定する条件
     *  0: タイルが存在しないこと
     *  1:　タイルが存在すること
     * -1: どちらでもよい
     */
    var MAP_PATTERN = {
        /**
         * a に使用するタイルを決定するパターン
         */
        a: [
            {
                pattern: [ // 隣接するマップチップの配置がどうなっているのか
                    [ 1, 1,-1],
                    [ 1, 1,-1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.plain.a // 使用するタイルを選択
            },{
                pattern: [
                    [ 0, 1,-1],
                    [ 1, 1,-1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.cross.a
            },{
                pattern: [
                    [-1, 1,-1],
                    [ 0, 1,-1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.column.a
            },{
                pattern: [
                    [-1, 0,-1],
                    [ 1, 1,-1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.row.a
            },{
                pattern: [
                    [-1, 0,-1],
                    [ 0, 1,-1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.circle.a
            },
        ],

        /**
         * b に使用するタイルを決定するパターン
         */
        b: [
            {
                pattern: [ // 隣接するマップチップの配置がどうなっているのか
                    [-1, 1, 1],
                    [-1, 1, 1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.plain.b // 使用するタイルを選択
            },{
                pattern: [
                    [-1, 1, 0],
                    [-1, 1, 1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.cross.b
            },{
                pattern: [
                    [-1, 1,-1],
                    [-1, 1, 0],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.column.b
            },{
                pattern: [
                    [-1, 0,-1],
                    [-1, 1, 1],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.row.b
            },{
                pattern: [
                    [-1, 0,-1],
                    [-1, 1, 0],
                    [-1,-1,-1]
                ],
                tile: TILE_PATTERN.circle.b
            },
        ],

        /**
         * c に使用するタイルを決定するパターン
         */
        c: [
            {
                pattern: [ // 隣接するマップチップの配置がどうなっているのか
                    [-1,-1,-1],
                    [ 1, 1,-1],
                    [ 1, 1,-1]
                ],
                tile: TILE_PATTERN.plain.c // 使用するタイルを選択
            },{
                pattern: [
                    [-1,-1,-1],
                    [ 1, 1,-1],
                    [ 0, 1,-1]
                ],
                tile: TILE_PATTERN.cross.c
            },{
                pattern: [
                    [-1,-1,-1],
                    [ 0, 1,-1],
                    [-1, 1,-1]
                ],
                tile: TILE_PATTERN.column.c
            },{
                pattern: [
                    [-1,-1,-1],
                    [ 1, 1,-1],
                    [-1, 0,-1]
                ],
                tile: TILE_PATTERN.row.c
            },{
                pattern: [
                    [-1,-1,-1],
                    [ 0, 1,-1],
                    [-1, 0,-1]
                ],
                tile: TILE_PATTERN.circle.c
            },
        ],

        /**
         * d に使用するタイルを決定するパターン
         */
        d: [
            {
                pattern: [ // 隣接するマップチップの配置がどうなっているのか
                    [-1,-1,-1],
                    [-1, 1, 1],
                    [-1, 1, 1]
                ],
                tile: TILE_PATTERN.plain.d // 使用するタイルを選択
            },{
                pattern: [
                    [-1,-1,-1],
                    [-1, 1, 1],
                    [-1, 1, 0]
                ],
                tile: TILE_PATTERN.cross.d
            },{
                pattern: [
                    [-1,-1,-1],
                    [-1, 1, 0],
                    [-1, 1,-1]
                ],
                tile: TILE_PATTERN.column.d
            },{
                pattern: [
                    [-1,-1,-1],
                    [-1, 1, 1],
                    [-1, 0,-1]
                ],
                tile: TILE_PATTERN.row.d
            },{
                pattern: [
                    [-1,-1,-1],
                    [-1, 1, 0],
                    [-1, 0,-1]
                ],
                tile: TILE_PATTERN.circle.d
            },
        ]
    };

    /**
     * 描画するマップチップの場所を自動選択する
     */
    ns.AutoTile = tm.createClass({
        init: function (map, options) {
        	// レイヤーの初期化
        	// var layer1 = _initLayerMap(createdMap);
        	// var layer2 = _initLayerMap(createdMap);

        	// 書き換えるマップチップ
        	this.from = 1;

        	/*
        	 ファイル内容
        	 array[
			 	[0,0,0,0,1,1,1,0,0,0],
			 	[0,0,0,1,1,1,1,1,0,0],
			 	...
        	 ]
        	 こんな感じ
        	 */
        	this.map = map;

        	// 返すデータを作成
        	// var mapdata = {
	        // 	layer1: layer1,
	        // 	layer2: layer2,
	        // 	imageWidth : imageLayer.width,
	        // 	imageHeight: imageLayer.height,
	        // 	chipWidth  : 32,
	        // 	chipHeight : 32,
	        // 	tileWidth  : 16,
	        // 	tileHeight : 16,
	        // 	idList: {
	        // 		layer1: 0,
	        // 		layer2: 1,
	        // 	}
        	// };
        	// this.mapdata = mapdata;

        	// マップ外もオートタイル判定に使うかどうか
        	// true : オートタイル判定OKとして、道をマップ外まで伸ばす
        	// false: オートタイル判定NGとして、道をマップ外まで伸ばさない
        	this.isMatchOutMap = false; //options.isMatchOutMap || false;

        	// オートタイルデータに変換する
        	this.autoTileMap = this.transformTile();
        },

		/**
         * 作成したマップデータを返す
	     * +-+-+
	     * |a|b|
	     * +-+-+
	     * |c|d|
	     * +-+-+
         */
        transformTile: function () {
        	var resultMap = [];

        	for (var i = 0; i < this.map.length; ++i) {
        		resultMap[i] = [];
        		for (var j = 0; j < this.map[i].length; ++j) {
        			var mapChipId = this.map[i][j];

        			// 書き換えるマップチップIDじゃなければ書き換えない
        			if (mapChipId !== this.from) {
        				resultMap[i].push(mapChipId);
        				continue;
        			}

        			var a = this.checkPattern("a", this.map, i, j);
        			var b = this.checkPattern("b", this.map, i, j);
        			var c = this.checkPattern("c", this.map, i, j);
        			var d = this.checkPattern("d", this.map, i, j);

        			// マップデータをタイル状(4分割したもの)に書き換える
        			resultMap[i].push({
        				tile: {
        					a: a,
        					b: b,
        					c: c,
        					d: d
        				},
        				mapChipId: mapChipId
        			});
        		}
        	}

        	return resultMap;
        },

        /**
         * マップパターンと一致しているか調べる
         */
        checkPattern: function (tileName, neighborMapChip, fromIndexI, fromIndexJ) {
        	// 全5パターンの走査
        	var mapPattern = MAP_PATTERN[tileName];
        	for (var i = 0; i < mapPattern.length; ++i) {
        		// 一つのパターンの中身を走査
        		var isMatch = true;
        		var tilePattern = mapPattern[i].pattern;

        		// タイルの中身を走査(二重ループ計9回)
        		// タイルのマッチパターン(0:一致してはならない、1:一致しなければならない、-1:どちらでもよい)を取得して、マッチしているか調べる
        		for (var j = 0; j < tilePattern.length; ++j) {
        			for (var k = 0; k < tilePattern[j].length; ++k) {
        				// マップチップのIDを取得する
        				if (typeof neighborMapChip[fromIndexI+j-1] !== "undefined") {
        					var neighborMapChipId = neighborMapChip[fromIndexI+j-1][fromIndexJ+k-1];
        				}
        				else {
        					var neighborMapChipId = null;
        				}
        				// パターンに合致しているか調べる
        				var is = this._checkNeighborPattern(
        					tilePattern[j][k],
        					this.from,
        					neighborMapChipId);

        				if (!is) {
        					isMatch = false;
        					continue;
        				}
        			}
        		}

    			// 前パターンマッチしていたら、そのパターンを返す
    			if (isMatch) {
    				return mapPattern[i].tile;
    			}
        	}

        	// ここまで来たらエラー
        	console.log("auto tile error!: マップパターンのマッチングがおかしいです" + " tileName : " + tileName + " index i : " + fromIndexI + " index j : " + fromIndexJ);
        	console.log(neighborMapChip[fromIndexI-1][fromIndexJ-1] + " " + neighborMapChip[fromIndexI-1][fromIndexJ] + " " + neighborMapChip[fromIndexI-1][fromIndexJ+1]);
        	console.log(neighborMapChip[fromIndexI-0][fromIndexJ-1] + " " + neighborMapChip[fromIndexI-0][fromIndexJ] + " " + neighborMapChip[fromIndexI-0][fromIndexJ+1]);
        	console.log(neighborMapChip[fromIndexI+1][fromIndexJ-1] + " " + neighborMapChip[fromIndexI+1][fromIndexJ] + " " + neighborMapChip[fromIndexI+1][fromIndexJ+1]);
        },

        _checkNeighborPattern: function (pattern, from, neighbor) {
        	// データがundefined,nullの場合は、マップ外を見ようとしている
        	if (typeof neighbor === "undefined" || neighbor === null) {
        		// 一致させるようにする
        		if (this.isMatchOutMap) {
        			neighbor = from;
        		}
        		// 一致させないようにする
        		else {
					neighbor = null;
        		}
        	}
        	
        	// 合致しているか調べる
        	switch (pattern) {
        		case -1:
        			// チェック不要
        			return true;
        			break;
        		case 0:
        			// 一致してはいけない
	        		if (from !== neighbor) {
	        			return true;
	        		}
	        		return false;
	        		break;
	        	case 1:
	        		// 一致しなければならない
	        		if (from === neighbor) {
	        			return true;
	        		}
	        		return false;
	        		break;
	        	default:
	        		// error
	        		return null;
        	}
        },

        /**
         * 作成したマップデータを返す
         */
        get: function () {
        	return this.autoTileMap;
        },

   //      /**
   //       * レイヤーの初期化 マップチップは4分割するので、長さを二倍にする
   //       */
   //      _initLayerMap: function (createdMap) {
			// var layer = [];
   //      	for (var i = 0; i < createdMap.length*2; ++i) {
   //      		layer[i] = [];
   //      		for (var j = 0; j < createdMap[0].length*2; ++j) {
   //      			layer[i][j] = 0;
   //      		}
   //      	}
   //      },
    });
})(exports);