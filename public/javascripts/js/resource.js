/**
 * リソースの読み込み
 */
tm.preload(function() {
	//tm.util.ScriptManager.loadStats();

	var STARTING_ASSETS = {
		// ローディング
		"loading":			"/images/rsc/effect/loading2.png",
	};
	tm.asset.AssetManager.load(STARTING_ASSETS);
});

var TITLE_ASSETS = {
	// タイトル、クレジット用
	"logoTmlib": 	"/images/rsc/logo/logo_tmlib.png",
	"logoWolf": 	"/images/rsc/logo/logo_wolf.gif",
	"logoFSM": 		"/images/rsc/logo/logo_FSM.gif",


	// プレイヤー
	"player": 		"/images/rsc/player.png",
	"playerFace": 	"/images/rsc/char.png",

	// エフェクト
	"slash": 		"/images/rsc/boldslash.png",
	"enemydead":    "/images/rsc/effect/enemydead.png",

	// マップ
	"Dirt1_pipo": 	"/images/rsc/[A]Dirt1_pipo.png",
	"Grass1_pipo": 	"/images/rsc/[A]Grass1_pipo.png",
	"Water2_pipo": 	"/images/rsc/[A]Water2_pipo.png",
	"stairs": 		"/images/rsc/stairs.png",

	// アイテム
	"dropWeapon":   "/images/rsc/drop_weapon.png",
	"dropTreasure": "/images/rsc/item.png",

	// アイコン
	"attackIcon": 	"/images/rsc/icon000.png",
	"statusIcon": 	"/images/rsc/icon090.png",

	// モンスター
	"SlimeGreen":		"/images/rsc/[Monster]Slime_Green.png",
	"SlimeBlue":		"/images/rsc/[Monster]Slime_Blue.png",
	"SlimeRed":			"/images/rsc/[Monster]Slime_Red.png",
	// "SlimeGold":			"/images/rsc/[Monster]Slime_Gold.png",

	"SmallBatBlack":	"/images/rsc/[Monster]SmallBat_Black.png",
	"SmallBatGreen":	"/images/rsc/[Monster]SmallBat_Green.png",
	// "SmallBatRed":		"/images/rsc/[Monster]SmallBat_Red.png",
	// "SmallBatGhost":		"/images/rsc/[Monster]SmallBat_Ghost.png",

	"GoblinGrey": 		"/images/rsc/[Monster]Goblin_Grey.png",
	"GoblinGreen": 		"/images/rsc/[Monster]Goblin_Green.png",
	// "GoblinRed": 		"/images/rsc/[Monster]Goblin_Red.png",

	"BatBlack":	 		"/images/rsc/[Monster]Bat_Black.png",
	"BatGreen":	 		"/images/rsc/[Monster]Bat_Green.png",
	// "BatBlue":	 		"/images/rsc/[Monster]Bat_Blue.png",
	// "BatRed":	 		"/images/rsc/[Monster]Bat_Red2.png",
	// "BatWhite":	 		"/images/rsc/[Monster]Bat_White.png",

	"SkeltonNormal": 	"/images/rsc/[Monster]Skelton_Normal.png",
	// "SkeltonGreen": 		"/images/rsc/[Monster]Skelton_Green.png",
	// "SkeltonBlue": 		"/images/rsc/[Monster]Skelton_Blue.png",
	// "SkeltonRed": 		"/images/rsc/[Monster]Skelton_Red.png",

	"HarypyNormal":		"/images/rsc/[Monster]Harypy_Normal.png",

	"LizardManNormal":	"/images/rsc/[Monster]LizardMan_Normal.png",
	// "LizardManBlue":		"/images/rsc/[Monster]LizardMan_Blue.png",
	// "LizardManRed":		"/images/rsc/[Monster]LizardMan_Red.png",

	"ZombieNormal":		"/images/rsc/[Monster]Zombie_Normal.png",
	// "ZombieRed":			"/images/rsc/[Monster]Zombie_Red.png",

	// "GolemNormal":		"/images/rsc/[Monster]Golem_Normal.png",
	// "GolemGreen":		"/images/rsc/[Monster]Golem_Green.png",
	// "GolemBlue":			"/images/rsc/[Monster]Golem_Blue.png",
	// "GolemRed":			"/images/rsc/[Monster]Golem_Red.png",
	// "GolemGhost":		"/images/rsc/[Monster]Golem_Ghost.png",

	// "GhostNormal":		"/images/rsc/[Monster]Ghost_Normal.png",

	// "GargoyleBlack":		"/images/rsc/[Monster]Gargoyle_Black.png",
	// "GargoyleRed":		"/images/rsc/[Monster]Gargoyle_Red.png",

	"DragonGreen":		"/images/rsc/[Monster]Dragon_Green.png",
	// "DragonBlue":		"/images/rsc/[Monster]Dragon_Blue.png",
	// "DragonRed":			"/images/rsc/[Monster]Dragon_Red.png",
	// "DragonBlack":		"/images/rsc/[Monster]Dragon_Black.png",
	// "DragonWhite":		"/images/rsc/[Monster]Dragon_White.png",
	// "DragonGhost":		"/images/rsc/[Monster]Dragon_Ghost.png",

	// "Death":				"/images/rsc/[Monster]Death_Uroboros.png",
};

var MAIN_ASSET = {
	// 音楽
	// "levelup":		"/images/rsc/sound/[Action]Chinese_blade1_Komori.mp3",
	// "openTreasure":	"/images/rsc/sound/[Action]Door01_Isooki.mp3",
	// "downStairs":	"/images/rsc/sound/[Action]Steps1_Isooki.mp3",
	// "playerdamage":	"/images/rsc/sound/[Effect]Attack6_panop.mp3",
	// "enemydamage":	"/images/rsc/sound/[Effect]SHUN_panop.mp3",
	// // "healing":		"/images/rsc/sound/[Effect]Healing2_panop.mp3",
	// "enemydown":	"/images/rsc/sound/[Effect]SHUWAAAN3_panop.mp3",
	// "playerdown":	"/images/rsc/sound/[Effect]ZAZAZAZA_panop.mp3",
	// "enter":		"/images/rsc/sound/[System]Enter02_Koya.mp3",
	// "openstatus":	"/images/rsc/sound/[System]Click_Komori.mp3",
	// "equip":		"/images/rsc/sound/[Action]Switch2_Komori.mp3",
	// "eat":			"/images/rsc/sound/[Action]Eating_soup_Komori.mp3",
	// "dungeon":		"/images/rsc/sound/Dungeon02_Koya.mp3",
	"slashSS":      "/images/rsc/boldslash.tmss",
	"enemydeadSS":  "/images/rsc/effect/enemydead.tmss",
};

var RESULT_ASSETS = {
	"gameclear":	"/images/rsc/sound/Fanfare01_Koya.mp3",
};

