/**
 * ItemList
 */
(function(ns) {

	var ITEM_LIST = {
		item: [
			// 短剣
			{
				name: "ダガー",
				type: "shortsword",
				summary: "両刃の短刀。",
				dropImage: "dropWeapon",
				status: {
					aspd: 6, // 攻撃速度
					dis: 1, // 射程距離
					str: 2,
					def: 0,
					agi: 1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ナイフ",
				type: "shortsword",
				summary: "片刃の短刀。多目的に使用する。",
				dropImage: "dropWeapon",
				status: {
					aspd: 6, // 攻撃速度
					dis: 1, // 射程距離
					str: 1,
					def: 0,
					agi: 2,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ジャンビーヤ",
				type: "shortsword",
				summary: "刀身が湾曲しており、刀身の幅が広い。",
				dropImage: "dropWeapon",
				status: {
					aspd: 6, // 攻撃速度
					dis: 1, // 射程距離
					str: 5,
					def: 0,
					agi: 3,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "パリングダガー",
				type: "shortsword",
				summary: "受け流し用の短剣",
				dropImage: "dropWeapon",
				status: {
					aspd: 6, // 攻撃速度
					dis: 1, // 射程距離
					str: 3,
					def: 2,
					agi: 2,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ドラゴンの爪(緑)",
				type: "shortsword",
				summary: "ドラゴンの爪は鋭く、鉄より硬い。",
				dropImage: "dropWeapon",
				status: {
					aspd: 6, // 攻撃速度
					dis: 1, // 射程距離
					str: 15,
					def: 0,
					agi: 4,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},

			// 長剣
			{
				name: "サーベル",
				type: "longsword",
				summary: "金属を打っただけの直刀。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					dis: 2.5, // 射程距離
					str: 10,
					def: 0,
					agi: -2,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "カッター",
				type: "longsword",
				summary: "片刃の直刀。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					dis: 2.5, // 射程距離
					str: 15,
					def: 0,
					agi: -2,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "レイピア",
				type: "longsword",
				summary: "刺突用の剣。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					dis: 2.5, // 射程距離
					str: 4,
					def: 0,
					agi: 0,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "シャムシール",
				type: "longsword",
				summary: "曲刀。別名、三日月刀。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					dis: 2.5, // 射程距離
					str: 22,
					def: 0,
					agi: -2,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "刀",
				type: "longsword",
				summary: "東洋の直刀。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					dis: 2.5, // 射程距離
					str: 36,
					def: 0,
					agi: -4,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},
			// 大剣two hand sword
			// 槍
			// 戦斧
			// 槌
			// 
			// 盾
			// 大盾

			// 服 cloths
			{
				name: "布の服",
				type: "cloths",
				summary: "布でできた服。生地は薄い。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					str: 0,
					def: 1,
					agi: 0,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},
			// ローブ
			// 軽鎧 lightarmor スケイルアーマー(鱗状)、ラメラーアーマー(薄板を繋ぎ合わせる)、チェーンメイル、含む
			{
				name: "布の鎧",
				type: "lightarmor",
				summary: "布を厚く縫い込んだ軽鎧。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					str: 0,
					def: 3,
					agi: -1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "革の鎧",
				type: "lightarmor",
				summary: "動物の革を縫い込んだ軽鎧。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					str: 0,
					def: 7,
					agi: -1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "鱗鎧",
				type: "lightarmor",
				summary: "動物の鱗を縫い込んだ軽鎧。",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					str: 0,
					def: 12,
					agi: -1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ドラゴンの鱗鎧(緑)",
				type: "lightarmor",
				summary: "ドラゴンの鱗を縫い込んだ軽鎧。とても軽い",
				dropImage: "dropWeapon",
				status: {
					aspd: 0, // 攻撃速度
					str: 1,
					def: 15,
					agi: 1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},
			// 重鎧 heavyarmor


			// 使用アイテム
			{
				name: "雑草",
				type: "medicine",
				summary: "食べられそうな草。",
				dropImage: "dropWeapon",
				status: {
					hp: 2
				}
			},{
				name: "薬草",
				type: "medicine",
				summary: "滋養強壮に。",
				dropImage: "dropWeapon",
				status: {
					hp: 7
				}
			},{
				name: "肉",
				type: "medicine",
				summary: "謎肉。",
				dropImage: "dropWeapon",
				status: {
					hp: 10
				}
			},{
				name: "モンスターの液体",
				type: "medicine",
				summary: "不思議な色をしている。たまに動く。",
				dropImage: "dropWeapon",
				status: {
					hp: 10
				}
			},{
				name: "ポーション",
				type: "medicine",
				summary: "薬草を調合した飲み物。",
				dropImage: "dropWeapon",
				status: {
					hp: 30
				}
			},
		]
	};

	ns.ItemList = tm.createClass({
		superClass : tm.app.CanvasElement,

		init: function () {
			this.superInit();
			// アイテムデータ
			this.fromJSON(ITEM_LIST);
		},

		get: function (item) {
			if (item !== null) {
				for (var i = 0; i < this.item.length; ++i) {
					if (this.item[i].name === item) {
						return this.item[i];
					}
				}
			}
			return null;
		}
	});

})(game);