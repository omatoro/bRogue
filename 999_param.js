/*
 * 設定ファイル
 */







        var GLOBAL_DATA = "<br />";

        $(document).ready(function () {
            // コネクションを作る(通信の開始)
            var socket = io.connect();

            // /*
            //  * 接続時
            //  */
            // socket.on("connected", function (data) {
            //     // 初めての接続時に発生
            //     // 仮の名前を送信する
            //     socket.emit("addMenber", "名無し");
            // });


            /*
             * 名前変更ボタンをクリックした
             */
            $("#modifybutton").click(function () {
                // 名前の内容を取得する
                var name = $("#nametext").val() || null;

                // 名前が取得できたら送信処理を行う
                if (name) {
                    socket.emit("modifyName", name);
                }
            });

            /*
             * メンバー表示の書き換え
             */
            socket.on("rewriteMember", function (allMemberName) {
                $("#member").text(allMemberName);
            });


            /*
             * チャット送信ボタンをクリックした
             */
            $("#chatbutton").click(function () {
                // 送信するチャットの内容を取得する
                var messageChat = $("#chattext").val() || null;

                // 送信するチャットの内容が取得できたら送信処理を行う
                if (messageChat) {
                    socket.emit("messageChat", messageChat);
                }
            });

            /*
             * チャット表示の書き換え
             */
            socket.on("rewriteChat", function (allChat) {
                $("#chat").html(allChat);
            });
        });