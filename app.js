
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);

/*
 * イベント待受状態を開始する
 */
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
	//console.log("Server running at http://" + setting.IP + ":" + setting.PORT + "/");
	console.log("サーバを終了する際は[ctrl + c]を押してください");
});



//ここまでexpress
//======================================================================


/**
 * モジュール読み込み
 */
var fs = require("fs");
var socketio = require("socket.io");
var io = socketio.listen(server, {'log level': 1});
io.set("log level", 0);
// var mongodb = require("mongodb");

// /**
//  * データベースサーバ用意
//  */
// var setting = {};
// setting.IP      = "192.168.1.202";
// setting.PORT    = 1337;
// setting.HEADER  = { "Content-Type": "text/html; charset=UTF-8" };

// setting.DB_IP   = "192.168.1.202";
// setting.DB_PORT = 27017;
// setting.DB_NAME = "bRogue";


//  /*
//  * MongoDBサーバへの接続
//  */
// var databaseServer = new mongodb.Server(setting.DB_IP, setting.DB_PORT);
// var database       = new mongodb.Db(setting.DB_NAME, databaseServer, {safe: true});

// // グローバル変数を用意する
// var TODO_DATA;

// database.open(function (err, db) {
// 	if (err) { throw err; }
// 	// 以下データベースにアクセスするコード
// 	console.log(setting.DB_NAME + "にアクセスしました");

// 	// データベース接続時に変数を更新する
// 	db.collection("datas").find().toArray(function (err, values) {
// 		TODO_DATA = values;
// 		console.log(values);
// 		console.log(setting.DB_NAME + "のデータを整形しました");
// 	});
// });

// var setDBData = function (data) {
// 	// データを格納する
// 	database.collection("datas").insert(data, function (err, result) {
// 		if (err) { throw err; }
// 		console.log(setting.DB_NAME + "のデータを格納しました");
// 	});
// };

// var deleteDBData = function (dataId) {
// 	console.log(dataId);
// 	// データを削除する
// 	database.collection("datas").remove({"_id": new mongodb.ObjectID(dataId)}, function (err) {
// 		console.log(setting.DB_NAME + "のデータを削除しました");
// 	});
// };

// var getDBData = function (res) {
// 	// データを配列に整形する
// 	database.collection("datas").find().toArray(function (err, values) {
// 		// result = values;
// 		TODO_DATA = values;
// 		// console.log("sampledbにデータを整形しました");

// 		// 結果を表示する
// 		// HTTPレスポンスヘッダを作成・送信(200:OK,500:ServerError,404:NotFound)
// 		res.writeHead(200, setting.HEADER);
// 		res.write(HTML_HEAD);
// 		res.write(getHtmlBody(TODO_DATA));
// 		res.write(HTML_FOOTER);
// 		res.end();
// 	});
// };


/**
 * メンバーデータ
 */
var MEMBER = [];
var getName = function (id) {
    for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
			return MEMBER[i].name;
		}
	}
    return null;
};
var setMember = function (id, data) {
    if (getName(id) === null) {
        MEMBER.push({"id": id, "data": data});
        console.log("setMember : " + id);
    	// console.dir(MEMBER);
    }
    else {
    	modifyMember(id, data);
    }
};
var deleteMember = function (id) {
	for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
			MEMBER.splice(i, 1);
		}
	}
    console.log("deleteMember : " + id);
};
var modifyMember = function (id, data) {
	for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
			MEMBER[i].data = data;
		}
	}
    console.log("modifyMember : " + id);
};
var movePlayer = function (id, data) {
	for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
			MEMBER[i].data.position = data.position;
			MEMBER[i].data.angle    = data.angle;
		}
	}
    console.log("movePlayer : " + id);
};
var getMember = function (id) {
	for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
			return MEMBER[i].data;
		}
	}
	return null;
};
var getAnotherMember = function (id, stairs) {
	var result = [];
	for (var i = 0; i < MEMBER.length; ++i) {
		if (MEMBER[i].id === id) {
		}
		else {
			// 同じ階層
			if (MEMBER[i].data.stairs === stairs) {
				result.push(MEMBER[i].data);
			}
		}
	}
	return result;
};

/**
 * マップ生成
 */
var mapManager = require('./server/map/mapmanager').MapManager(MEMBER);

/**
 * 敵
 */
// var enemyManager = require('./server/enemy/enemymanager').EnemyManager();

/**
 * FPS
 */
var main = require('./server/loop/loopmanager').LoopManager();
main.addChild(mapManager.update.bind(mapManager));
main.update();



/*
 * 通信時の処理
 * クライアント側がio.connect()を実行すると、サーバの以下処理が実行される(イベント名：connection)
 */
io.sockets.on("connection", function (socket) {
	// 接続したら[connected]イベントを発信
	socket.emit("connected", {});

	// ゲームのイベント受信処理
	gameMessage(socket);

	// 接続が終了した
	socket.on("disconnect", function (cliant) {
		// 名前を削除したので、メンバー名の書き換えメッセージを送信
		// socket.emit("deletePlayer", getMember());
		var meData = getMember(socket.id);
		var stairs = meData.stairs;

		// 切断したメンバーを削除
		deleteMember(socket.id);
		io.sockets.in(stairs + "").emit("deleteAnotherPlayer", socket.id);
	});

});

/*
 * ゲームのイベント受信処理
 */
function gameMessage(socket) {
	// クライアント接続時に発した[addMember]イベントの受信処理
	socket.on("addPlayerName", function (client) {
		// console.log("お名前 : " + client.name);

		// 過去にルールへ参加していたら、離脱する
		var preData = getMember(socket.id);
		if (preData) {
			socket.leave(preData.stairs + "");
			io.sockets.in(preData.stairs + "").emit("deleteAnotherPlayer", socket.id);
		}

		// メンバー追加処理(仮の名前)
		setMember(socket.id, client);
		client.id = socket.id;

		// 名前を追加したので、メンバー名の書き換えメッセージを送信
		socket.emit("addedPlayer", socket.id);
		// 既に参加しているメンバーのデータを送る
		socket.emit("addedAnotherPlayers", getAnotherMember(socket.id, client.stairs));

		// ループ参加済みのメンバーへ、新しいプレイヤー情報を送信する
		io.sockets.in(client.stairs + "").emit("addedAnotherPlayer", client);

		// 階層ごとにルーム作成し、参加する
		socket.join(client.stairs + "");
	});

	socket.on("movePlayer", function (client) {
		movePlayer(socket.id, client);
		client.id = socket.id;
		var meData = getMember(socket.id);
		var stairs = meData.stairs;
		io.sockets.in(stairs + "").emit("moveAnotherPlayer", client);
	});

	// いずれまとめて同期する？
	// socket.on("getAnotherPlayerInfomation", function () {
	// 	socket.volatile.emit("addedAnotherPlayers", getMember(socket.id));
	// });

	socket.on("getMapData", function (stairsNum) {
		socket.emit("gotMapData", mapManager.mapdatas[stairsNum-1]);
	});

	socket.on("getEnemyData", function (stairsNum) {
		if (mapManager.enemyManager[stairsNum-1]) {
			socket.emit("gotEnemyData", mapManager.enemyManager[stairsNum-1].data);
		}
	});

	socket.on("enemyDamage", function (data) {
		// ダメージ量計算
		data.socket = socket;
		if (mapManager.enemyManager[data.stairs-1]) {
			mapManager.enemyManager[data.stairs-1].attackPlayers(data);
		}
	});
};


