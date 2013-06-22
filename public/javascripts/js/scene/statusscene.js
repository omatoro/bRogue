/**
 * StatusScene
 */
(function(ns) {

    ns.StatusScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(player) {
            this.superInit();
            this.player = player;

            // 画面にかける色
            var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
            filter.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            // ステータス画面
            var status = ns.Status(this);
            this.status = status;
        },

        // @todo コードが重複
        update : function(app) {
            // ピッカーで何か選んだ時の動作
            var status = this.status;
            if (status.weaponButton.returnedData) {
                // 装備を変更するかどうか選択する
                if (!this.pressedEquipTool) {
                    // ボタンが押されたら[pressedEquipTool]変数に何かが入る
                    app.pushScene(ns.EquipToolScene(this));
                }
                else {
                    this._equalChangedTool(
                            status,
                            status.weaponButton,
                            this.player.getWeapon(),
                            status.player.equipWeapon.bind(status.player));
                }
            }
            if (status.armorButton.returnedData) {
                // 装備を変更するかどうか選択する
                if (!this.pressedEquipTool) {
                    // ボタンが押されたら[pressedEquipTool]変数に何かが入る
                    app.pushScene(ns.EquipToolScene(this));
                }
                else {
                    this._equalChangedTool(
                            status,
                            status.armorButton,
                            this.player.getArmor(),
                            status.player.equipArmor.bind(status.player));
                }
            }
            // 食事
            if (status.medicineButton.returnedData) {
                var id = status.medicineButton.returnedData.gettingId;
                status.player.eatMedicine(status.medicineButton.returnedData);
                status.player.deleteItemId(id);
                status._drawStatus();
                status.medicineButton.returnedData = null;
            }
        },

        /**
         * 道具使用・装備・削除画面で選択後の処理
         */
        _equalChangedTool: function (status, button, tools, equipFunc) {
            switch (this.pressedEquipTool) {
                case ns.EquipToolScene.CANCEL:
                    this.pressedEquipTool = null;
                    button.returnedData = null;
                    break;
                case ns.EquipToolScene.DELETE:
                    // 捨てる装備が装備中の場合
                    if (button.returnedData.gettingId === tools.gettingId) {
                        equipFunc();
                        var id = button.returnedData.gettingId;
                        status.player.deleteItemId(id);
                        // 表示を装備無しに変更
                        button.label.text = "装備無し";
                        status._drawStatus();
                    }
                    // 捨てる装備が装備外の場合
                    else {
                        var id = button.returnedData.gettingId;
                        status.player.deleteItemId(id);
                        status._drawStatus();
                    }
                    // 捨てる装備が"装備無し"だった場合(バグ？)
                    if (button.returnedData.name === "装備無し") {
                        // 何もしない
                    }
                    this.pressedEquipTool = null;
                    button.returnedData = null;
                    break;
                case ns.EquipToolScene.EQUIP:
                    equipFunc(button.returnedData);
                    button.label.text = button.returnedData.name;
                    status._drawStatus();
                    this.pressedEquipTool = null;
                    button.returnedData = null;

                    break;
                default :
                    this.pressedEquipTool = null;
                    button.returnedData = null;
                    break;
            }
        },
    });

})(game);