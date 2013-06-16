/**
 * Player
 */
(function(ns) {

	ns.Player = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function () {
			this.superInit("player", {
				width:  120/6,
				height: 112/4,
				count:  24,
			}, 3);
			// プレイヤーなので操作を受け付けるように設定
			this.isInput = true;
			this._isGameOver = false;

			// ダメージ= [[[最終ATK * スキル倍率 ] * (4000 + 除算Def) / (4000 + 除算DEF * 10)] * 種族耐性] - 減算DEF

			this.level = 1;

			this.maxhp = 30;
			this.hp    = 30;
			this.maxmp = 10;
			this.mp    = 10;

			this._str = 100; // 攻撃力
			this._def = 1; // 防御力
			// this._int = 40; // 魔力
			this._agi = 100; // 素早さ // 初期値10くらい
			this._luk = 1; // 運
			this._vit = 1; // 体力
			this._dex = 1; // 器用さ

			// 剣系：154
			// 大剣系：140
			// 大槌系：135
			// ナイフ系：160
			// 二刀流：163
			// 最速：167
			this._aspd = 154; // 攻撃スピード

			this.speed = 7;

			this.exp = 0; // 取得経験値
			this.nextLevelExp = 8;

			this.item = [];

			this.equipedWeapon = null;
			this.equipedArmor  = null;
		},

		getLevel: function ()		{ return this.level; },
		getMaxHP: function ()		{ return this.maxhp; },
		getCurrentHP: function ()	{ return this.hp; },
		getMaxMP: function ()		{ return this.maxmp; },
		getCurrentMP: function ()	{ return this.mp; },
		getSTR: function ()			{ return this._str; },
		getDEF: function ()			{ return this._def; },
		getAGI: function ()			{ return this._agi; },
		getLUK: function ()			{ return this._luk; },
		getVIT: function ()			{ return this._vit; },
		getDEX: function ()			{ return this._dex; },
		getEXP: function ()			{ return this.exp; },
		getNextLevel: function ()	{ return this.nextLevelExp; },
		isGameOver: function ()		{ return this._isGameOver; },

		/**
		 * セーブ時に使えるようにデータを変換
		 */
		cloneToSave: function () {
			// アイテムデータを値だけにする
			var parseItem = function (item) {
				if (item === null) {
					return null;
				}

				var result = {
					name: item.name,
					type: item.type,
					summary: item.summary,
					dropImage: item.dropImage,
					status: {
						hp: item.status.hp,

						dis: item.status.dis,
						agi: item.status.agi,
						def: item.status.def,
						dex: item.status.dex,
						luk: item.status.luk,
						str: item.status.str,
						vit: item.status.vit,
					},
				}
				return result;
			};


			var result = {
				level: this.level,
				maxhp: this.maxhp,
				hp   : this.hp,
				maxmp: this.maxmp,
				mp   : this.mp,
				_str:  this._str, // 攻撃力
				_def:  this._def, // 防御力
				// _int: 40, // 魔力
				_agi:  this._agi, // 素早さ
				_luk:  this._luk, // 運
				_vit:  this._vit, // 体力
				_dex:  this._dex, // 器用さ
				_aspd: this._aspd, // 攻撃スピード
				speed: this.speed,
				exp:   this.exp, // 取得経験値
				nextLevelExp: this.nextLevelExp,

				item: [],
				equipedWeapon: parseItem(this.equipedWeapon),
				equipedArmor : parseItem(this.equipedArmor),
			};

			for (var i = 0; i < this.item.length; ++i) {
				result.item.push(parseItem(this.item[i]));
			}

			return result;
		},

		/**
		 * ロード時に使えるようにデータを変換
		 */
		dataLoad: function (saveData) {
			this.level = saveData.level;
			this.maxhp = saveData.maxhp;
			this.hp    = saveData.hp;
			this.maxmp = saveData.maxmp;
			this.mp    = saveData.mp;
			this._str  = saveData._str; // 攻撃力
			this._def  = saveData._def; // 防御力
			// this._int = 40; // 魔力
			this._agi  = saveData._agi; // 素早さ
			this._luk  = saveData._luk; // 運
			this._vit  = saveData._vit; // 体力
			this._dex  = saveData._dex; // 器用さ
			this._aspd = saveData._aspd; // 攻撃スピード
			this.speed = saveData.speed;

			this.exp          = saveData.exp; // 取得経験値
			this.nextLevelExp = saveData.nextLevelExp;

			this.item          = saveData.item;
			this.equipedWeapon = saveData.equipedWeapon;
			this.equipedArmor  = saveData.equipedArmor;
		},

		getSpeed: function () {
			return this.speed + (this.getLastAGI()/15 |0);
		},

		getLastAGI: function () {
			var agi = this.getAGI();
			if (this.equipedWeapon !== null) {
				agi += this.equipedWeapon.status.agi;
			}
			if (this.equipedArmor !== null) {
				agi += this.equipedArmor.status.agi;
			}
			return agi;
		},

		getAttackSpeed: function (fps) {
			// 攻撃速度を計算
			// var attackSpeed = this._aspd + Math.sqrt(this.getLastAGI() * (10 + 10/111) + (this.getDEX() * 9 / 49));
			var attackSpeed = this._aspd + Math.sqrt((this.getLastAGI() * (10)) + (this.getDEX() * 9 / 49));

			// attackSpeed = (attackSpeed > 190) ? 190 : (attackSpeed |0);
			// attackSpeed = (attackSpeed > 250) ? 190 : (attackSpeed |0);

			// ミリ秒速に変換して返す
			return ((200 - attackSpeed) / 50 * 1000) |0;
		},

		getDistanse: function () {
			if (this.equipedWeapon !== null) {
				return this.equipedWeapon.status.dis;
			}
			return 0;
		},

		eatMedicine: function (item) {
			if (!item.status) {
				return ;
			}
			this.hp += item.status.hp || 0;
			// tm.asset.AssetManager.get("eat").clone().play();
			if (this.hp > this.maxhp) {
				this.hp = this.maxhp;
			}
		},

		levelUp: function (app) {
			// パラメータ上昇
			this.maxhp += Math.rand(0, 10);
			this.maxmp += Math.rand(0, 5);
			this._str  += Math.rand(0, 2); // 攻撃力
			this._def  += Math.rand(0, 2); // 防御力
			// this._int = 40; // 魔力
			this._agi  += (Math.rand(0, 8) === 0) ? 1 : 0; // 素早さ
			this._luk  += Math.rand(0, 2); // 運
			this._vit  += Math.rand(0, 2); // 体力
			this._dex  += Math.rand(0, 2); // 器用さ

			// HP全回復
			this.hp = this.maxhp;
			this.mp = this.maxmp;

			// 音
			// tm.asset.AssetManager.get("levelup").clone().play();

			// ウィンドウ表示
			app.currentScene.windows.add("レベルが" + this.level + "に上がった", 255, 255, 30);
		},

		addExp: function (exp, app) {
			this.exp += exp;
			if (this.exp >= this.nextLevelExp) {
				++this.level;
				this.nextLevelExp = Math.ceil(this.nextLevelExp * 1.4);
				this.levelUp(app);
				this.addExp(0);
			}
		},

		addItem: function (item) {
			this.item.push(item);
		},

		getItem: function () {
			return this.item;
		},

		deleteItem: function (itemNum) {
			this.item.splice(itemNum, 1);
		},

		equipWeapon: function (item) {
			if (item) {
				this.equipedWeapon = item;
				// tm.asset.AssetManager.get("equip").clone().play();
			}
			else {
				this.equipedWeapon = null;
			}
		},
		getWeapon: function () {
			if (this.equipedWeapon === null) {
				var result = {
					dropImage: null,
					name: "装備無し",
					status: {
						dis: 0,
						str: 0,
						def: 0,
						agi: 0,
						luk: 0,
						vit: 0,
						dex: 0
					}
				};
				return result;
			}
			return this.equipedWeapon;
		},

		equipArmor: function (item) {
			if (item) {
				this.equipedArmor = item;
				// tm.asset.AssetManager.get("equip").clone().play();
			}
			else {
				this.equipedArmor = null;
			}
		},
		getArmor: function () {
			if (this.equipedArmor === null) {
				var result = {
					dropImage: null,
					name: "装備無し",
					status: {
						str: 0,
						def: 0,
						agi: 0,
						luk: 0,
						vit: 0,
						dex: 0
					}
				};
				return result;
			}
			return this.equipedArmor;
		},

		getAttackPoint: function (attack) {
			// 攻撃力を計算
			var random = Math.rand(9, 11) / 10;
			var attackpoint = ((this._str + this._dex/5 + this._luk/3) * random)|0;
			attackpoint += this.getWeapon().status.str + this.getArmor().status.str;
			return attackpoint;
		},

		damage: function (attack) {
			var damage = (attack - this._def - this.getWeapon().status.def - this.getArmor().status.def) |0;
			damage = (damage < 0) ? 0 : damage;

			this.hp -= damage;
			this.hp = (this.hp < 0) ? 0 : this.hp;

			// hpが0になったら死亡
			if (this.hp <= 0) {
				this._isGameOver = true;
				// tm.asset.AssetManager.get("playerdown").clone().play();
			}

			return damage;
		},

		attack: function () {
			// tm.asset.AssetManager.get("enemydamage").clone().play();
			return this.angle;
		},

		update: function (app) {
			this.inputAnimation(app);
		}
	});

})(game);