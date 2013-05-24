/**
 * リソースの読み込み
 */
tm.preload(function() {
	//tm.util.ScriptManager.loadStats();

	var STARTING_ASSETS = {
		// ローディング
		"loading":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/effect/loading2.png",
	};
	tm.asset.AssetManager.load(STARTING_ASSETS);
});

var TITLE_ASSETS = {
	// プレイヤー
	"player": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/player.png",
	"playerFace": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/char.png",

	// エフェクト
	"slash": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/boldslash.png",
	"enemydead":    "http://rawgithub.com/omatoro/RoguePlus/master/rsc/effect/enemydead.png",

	// マップ
	"Dirt1_pipo": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[A]Dirt1_pipo.png",
	"Grass1_pipo": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[A]Grass1_pipo.png",
	"Water2_pipo": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[A]Water2_pipo.png",
	"stairs": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/stairs.png",

	// アイテム
	"dropWeapon":   "http://rawgithub.com/omatoro/RoguePlus/master/rsc/drop_weapon.png",
	"dropTreasure": "http://rawgithub.com/omatoro/RoguePlus/master/rsc/item.png",

	// アイコン
	"attackIcon": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/icon000.png",
	"statusIcon": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/icon090.png",

	// モンスター
	"SlimeGreen":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Slime_Green.png",
	"SlimeBlue":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Slime_Blue.png",
	"SlimeRed":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Slime_Red.png",
	// "SlimeGold":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Slime_Gold.png",

	"SmallBatBlack":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]SmallBat_Black.png",
	"SmallBatGreen":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]SmallBat_Green.png",
	// "SmallBatRed":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]SmallBat_Red.png",
	// "SmallBatGhost":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]SmallBat_Ghost.png",

	"GoblinGrey": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Goblin_Grey.png",
	"GoblinGreen": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Goblin_Green.png",
	// "GoblinRed": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Goblin_Red.png",

	"BatBlack":	 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Bat_Black.png",
	"BatGreen":	 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Bat_Green.png",
	// "BatBlue":	 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Bat_Blue.png",
	// "BatRed":	 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Bat_Red2.png",
	// "BatWhite":	 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Bat_White.png",

	"SkeltonNormal": 	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Skelton_Normal.png",
	// "SkeltonGreen": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Skelton_Green.png",
	// "SkeltonBlue": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Skelton_Blue.png",
	// "SkeltonRed": 		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Skelton_Red.png",

	"HarypyNormal":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Harypy_Normal.png",

	"LizardManNormal":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]LizardMan_Normal.png",
	// "LizardManBlue":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]LizardMan_Blue.png",
	// "LizardManRed":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]LizardMan_Red.png",

	"ZombieNormal":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Zombie_Normal.png",
	// "ZombieRed":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Zombie_Red.png",

	// "GolemNormal":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Golem_Normal.png",
	// "GolemGreen":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Golem_Green.png",
	// "GolemBlue":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Golem_Blue.png",
	// "GolemRed":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Golem_Red.png",
	// "GolemGhost":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Golem_Ghost.png",

	// "GhostNormal":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Ghost_Normal.png",

	// "GargoyleBlack":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Gargoyle_Black.png",
	// "GargoyleRed":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Gargoyle_Red.png",

	"DragonGreen":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_Green.png",
	// "DragonBlue":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_Blue.png",
	// "DragonRed":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_Red.png",
	// "DragonBlack":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_Black.png",
	// "DragonWhite":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_White.png",
	// "DragonGhost":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Dragon_Ghost.png",

	// "Death":				"http://rawgithub.com/omatoro/RoguePlus/master/rsc/[Monster]Death_Uroboros.png",
};

var MAIN_ASSET = {
	// 音楽
	"levelup":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Action]Chinese_blade1_Komori.mp3",
	"openTreasure":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Action]Door01_Isooki.mp3",
	"downStairs":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Action]Steps1_Isooki.mp3",
	"playerdamage":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Effect]Attack6_panop.mp3",
	"enemydamage":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Effect]SHUN_panop.mp3",
	// "healing":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Effect]Healing2_panop.mp3",
	"enemydown":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Effect]SHUWAAAN3_panop.mp3",
	"playerdown":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Effect]ZAZAZAZA_panop.mp3",
	"enter":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[System]Enter02_Koya.mp3",
	"openstatus":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[System]Click_Komori.mp3",
	"equip":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Action]Switch2_Komori.mp3",
	"eat":			"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/[Action]Eating_soup_Komori.mp3",
	"dungeon":		"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/Dungeon02_Koya.mp3",
};

var RESULT_ASSETS = {
	"gameclear":	"http://rawgithub.com/omatoro/RoguePlus/master/rsc/sound/Fanfare01_Koya.mp3",
};

