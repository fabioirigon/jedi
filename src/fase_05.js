// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_05 extends Phaser.Scene{
  // O construtor registra o nome da cena
  constructor (){
    super('Fase_05');
  }

  // função para carregamento de assets
  preload (){
    // carregando spritesheets
    this.load.image('tiles', 'assets/images/dungeon-16-16.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('arrow', 'assets/images/arrow.png');

    this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('pixie_sp', 'assets/spritesheets/pixie.png', {frameWidth: 26, frameHeight: 41});
    this.load.spritesheet('orc_expulso_sp', 'assets/spritesheets/orc_expulso.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_guarda_sp', 'assets/spritesheets/orc_guarda.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_xama_sp', 'assets/spritesheets/orc_xama.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_chefe_sp', 'assets/spritesheets/orc_chefe.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_femea_sp', 'assets/spritesheets/orc_femea.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_macho_lanca_sp', 'assets/spritesheets/orc_macho_lanca.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('orc_macho_machado_sp', 'assets/spritesheets/orc_macho_machado.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('forest_sp', 'assets/images/fase_05/forest.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('lightning_sp', 'assets/spritesheets/lightning.png', {frameWidth: 32, frameHeight: 32});

    // carregando mapa (json) e gráficos do mapa
    this.load.image('tiles_estruturas1_5', 'assets/images/fase_05/estruturas1.png');
    this.load.image('tiles_forest', 'assets/images/fase_05/forest.png');
    this.load.image('tiles_ground', 'assets/images/fase_05/ground.png');
    this.load.image('tiles_navioEjaulas', 'assets/images/fase_05/navioEjaulas.png');
    this.load.image('tiles_tapetes', 'assets/images/fase_05/tapetes.png');
    this.load.image('tiles_vila1', 'assets/images/fase_05/vila1.png');
    this.load.image('tiles_vila2', 'assets/images/fase_05/vila2.png');
    this.load.image('tiles_vila3', 'assets/images/fase_05/vila3.png');

    this.load.tilemapTiledJSON('themap_5', 'assets/maps/map_phase_05.json');

    console.log('LoadTiles');
  }

  create_map(){
    // criação do mapa e ligação com a imagem (tilesheet)
    this.map = this.make.tilemap({ key: 'themap_5', tileWidth: 16, tileHeight: 16 });
    this.tileset1 = this.map.addTilesetImage('estruturas1_5', 'tiles_estruturas1_5');
    this.tileset2 = this.map.addTilesetImage('forest', 'tiles_forest');
    this.tileset3 = this.map.addTilesetImage('ground', 'tiles_ground');
    this.tileset4 = this.map.addTilesetImage('navioEjaulas', 'tiles_navioEjaulas');
    this.tileset5 = this.map.addTilesetImage('tapetes', 'tiles_tapetes');
    this.tileset6 = this.map.addTilesetImage('vila1', 'tiles_vila1');
    this.tileset7 = this.map.addTilesetImage('vila2', 'tiles_vila2');
    this.tileset8 = this.map.addTilesetImage('vila3', 'tiles_vila3');
    console.log('CreateTiles');

    var tilesets = [
      'estruturas1_5',
      'forest',
      'ground',
      'navioEjaulas',
      'navioEjaulas',
      'tapetes',
      'vila1',
      'vila2',
      'vila3'
    ];

    // criação das camadas
    this.groundLayer1 = this.map.createLayer('Ground', tilesets);
    this.wallsLayer1 = this.map.createLayer('River', tilesets);
    this.groundLayer2 = this.map.createLayer('Pontes', tilesets);
    this.groundLayer3 = this.map.createLayer('SoftPlants', tilesets);
    this.wallsLayer3 = this.map.createLayer('HardPlants', tilesets);
    this.wallsLayer4 = this.map.createLayer('GroundObjects', tilesets);
    this.wallsLayer5 = this.map.createLayer('GroundStructures', tilesets);
    this.wallsLayer2 = this.map.createLayer('BlockingPassage', tilesets);
    this.wallsLayer6 = this.map.createLayer('SkyStructures', tilesets);
    console.log('CreateLayers');
  }

  create_actors(){
    // criação do jogador
    this.player = new player(this, 25, 840, 'player_sp', 19);
    this.player.has_bow = true;
    this.player.setScale(0.25);

    // Criação da pixie
    this.pixie = this.physics.add.sprite(70, 1310, 'pixie_sp', 0);
    this.pixie.setScale(0.50);

    // Criação dos orcs
    this.orcE = this.physics.add.sprite(20, 810, 'orc_expulso_sp', 26);
    this.orcE.setScale(0.5);

    this.orcG = this.physics.add.sprite(490, 258, 'orc_guarda_sp', 26);
    this.orcG.setImmovable(true);
    this.orcG.setScale(0.5);

    this.orcX = this.physics.add.sprite(900, 260, 'orc_xama_sp', 26);
    this.orcX.setScale(0.5);

    this.orcC = new orc(this, 1185, 605, 'orc_chefe_sp', 'orc_chefe_sp');
    this.orcC.setScale(0.5);

    // Adiciona inimigos
    this.orc1 = new orc(this, 269.5, 928, 'orc_femea_sp', 'orc_femea_sp');
    this.orc1.setScale(0.5);

    this.orc2 = new orc(this, 127.5, 1430, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc2.setScale(0.5);

    this.orc3 = new orc(this, 478.5, 1254, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc3.setScale(0.5);

    this.orc4 = new orc(this, 399.5, 1051.5, 'orc_femea_sp', 'orc_femea_sp');
    this.orc4.setScale(0.5);

    this.orc5 = new orc(this, 722.5, 833.5, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc5.setScale(0.5);

    this.orc6 = new orc(this, 1004, 992, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc6.setScale(0.5);

    this.orc7 = new orc(this, 994, 1259, 'orc_femea_sp', 'orc_femea_sp');
    this.orc7.setScale(0.5);

    this.orc8 = new orc(this, 1404.5, 827, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc8.setScale(0.5);

    this.orc9 = new orc(this, 1452, 1457, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc9.setScale(0.5);

    this.orc10 = new orc(this, 1128, 1534.5, 'orc_femea_sp', 'orc_femea_sp');
    this.orc10.setScale(0.5);

    this.orc11 = new orc(this, 700, 1519.5, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc11.setScale(0.5);

    this.orc12 = new orc(this, 73, 528, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc12.setScale(0.5);

    this.orc13 = new orc(this, 55, 96, 'orc_femea_sp', 'orc_femea_sp');
    this.orc13.setSize(64, 64);
    this.orc13.setScale(0.5);

    this.orc14 = new orc(this, 89, 331.5, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc14.setScale(0.5);

    this.orc15 = new orc(this, 1096.5, 96, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc15.setScale(0.5);

    this.orc16 = new orc(this, 729, 95, 'orc_femea_sp', 'orc_femea_sp');
    this.orc16.setScale(0.5);

    this.orc17 = new orc(this, 1488, 429.5, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc17.setScale(0.5);

    this.orc18 = new orc(this, 691.5, 732, 'orc_macho_machado_sp', 'orc_macho_machado_sp');
    this.orc18.setScale(0.5);

    this.orc19 = new orc(this, 87, 999.5, 'orc_femea_sp', 'orc_femea_sp');
    this.orc19.setScale(0.5);

    this.orc20 = new orc(this, 737.5, 491.5, 'orc_macho_lanca_sp', 'orc_macho_lanca_sp');
    this.orc20.setScale(0.5);


    this.bullets = this.physics.add.group();
    for (let i = 0; i <= 8; i++){
      var blt = this.add.sprite(-10, -10, 'forest_sp', 23);
      blt.setSize(16,16);
      blt.setScale(0.75);
      blt.setActive(false);
      blt.setVisible(false);
      this.bullets.add(blt);
    }
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.timer = this.time.addEvent({
      delay: Phaser.Math.Between(2000, 4000),
      callback: this.monster_shoot,
      callbackScope: this
    });

    // camera seguindo o jogador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.5);

    this.textPx = this.cameras.main.width*0.35;
    this.textPy = 2 * this.cameras.main.height / 3;

    console.log('CreateActors');
  }

  create_animations(){
    // Animacoes
    this.anims.create({
      key: 'pixie_stand',
      frames: this.anims.generateFrameNumbers('pixie_sp', {frames: [0,1,2,3,4,5,4,3,2,1]}),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_exp_stand',
      frames: this.anims.generateFrameNumbers('orc_expulso_sp', {frames: [26,27,29,27]}),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_guarda_death',
      frames: this.anims.generateFrameNumbers('orc_guarda_sp', {frames: [260,261,262,263,264,265]}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'orc_xama_death',
      frames: this.anims.generateFrameNumbers('orc_xama_sp', {frames: [260,261,262,263,264,265]}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'pixie_leave',
      frames: this.anims.generateFrameNumbers('pixie_sp', {frames: [0,1,2,3,4,5,6,7,8,36,37,38,39,40,41,42,43,44,43,42,43,44]}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'lightning_anim',
      frames: this.anims.generateFrameNumbers('lightning_sp', {}),
      frameRate: 30,
      hideOnComplete: true,
      repeat: 1
    });

    console.log('CreateAnimations');
  }

  addColisoesParedes(actor){
    this.physics.add.collider(actor, this.wallsLayer1);
    this.physics.add.collider(actor, this.wallsLayer2);
    this.physics.add.collider(actor, this.wallsLayer3);
    this.physics.add.collider(actor, this.wallsLayer4);
    this.physics.add.collider(actor, this.wallsLayer5);
    this.physics.add.collider(actor, this.wallsLayer6);
    this.physics.add.collider(actor, this.groundLayer2);
  }

  create_collisions(){
    // criação da colisão com paredes
    this.wallsLayer1.setCollisionBetween(0, 10000,true);
    this.wallsLayer2.setCollisionBetween(0, 10000,true);
    this.wallsLayer3.setCollisionBetween(0, 10000,true);
    this.wallsLayer4.setCollisionBetween(0, 10000,true);
    this.wallsLayer5.setCollisionBetween(0, 10000,true);
    this.wallsLayer6.setCollisionBetween(0, 10000,false);
    this.groundLayer2.setCollisionBetween(0, 10000,false);

    this.addColisoesParedes(this.player);
    this.addColisoesParedes(this.orc1);
    this.addColisoesParedes(this.orc2);
    this.addColisoesParedes(this.orc3);
    this.addColisoesParedes(this.orc4);
    this.addColisoesParedes(this.orc5);
    this.addColisoesParedes(this.orc6);
    this.addColisoesParedes(this.orc7);
    this.addColisoesParedes(this.orc8);
    this.addColisoesParedes(this.orc9);
    this.addColisoesParedes(this.orc10);
    this.addColisoesParedes(this.orc11);
    this.addColisoesParedes(this.orc12);
    this.addColisoesParedes(this.orc13);
    this.addColisoesParedes(this.orc14);
    this.addColisoesParedes(this.orc15);
    this.addColisoesParedes(this.orc16);
    this.addColisoesParedes(this.orc17);
    this.addColisoesParedes(this.orc18);
    this.addColisoesParedes(this.orc19);
    this.addColisoesParedes(this.orc20);

    this.physics.add.collider(this.player.arrows, this.wallsLayer3, projectilHitWall, null, this);
    this.physics.add.collider(this.player.arrows, this.wallsLayer5, projectilHitWall, null, this);
    this.physics.add.collider(this.player,this.orcG);

    this.physics.add.overlap(this.orc1, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc2, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc3, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc4, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc5, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc6, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc7, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc8, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc9, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc10, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc11, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc12, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc13, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc14, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc15, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc16, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc17, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc18, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc19, this.player.arrows, projectilHitActor, null, this);
    this.physics.add.overlap(this.orc20, this.player.arrows, projectilHitActor, null, this);

    this.physics.add.overlap(this.player, this.orc1, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc2, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc3, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc4, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc5, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc6, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc7, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc8, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc9, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc10, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc11, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc12, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc13, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc14, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc15, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc16, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc17, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc18, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc19, this.enemyHit, null, this);
    this.physics.add.overlap(this.player, this.orc20, this.enemyHit, null, this);

    this.physics.add.overlap(this.player, this.bullets, this.bulletHit, null, this);
    this.physics.add.collider(this.bullets, this.wallsLayer3, this.bulletHitWall, null, this);
    this.physics.add.collider(this.bullets, this.wallsLayer5, this.bulletHitWall, null, this);
    this.physics.add.collider(this.bullets, this.wallsLayer1, this.bulletHitWall, null, this);

    console.log('CreateCollisions');
  }

  create_tweens(){
    this.dialog_bg = this.add.rectangle(
      this.cameras.main.width*0.5,
      this.cameras.main.height*0.65, 
      this.cameras.main.width*0.4,
      this.cameras.main.height*0.2,
      0x000000
    );
    this.dialog_bg.setScrollFactor(0);
    this.dialog_bg.setVisible(false);

    // Estilos de texto
    var orcE_txt_cfg = {
      font: "15px Arial",
      fill: "#00FFFF",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    };
    var orcG_txt_cfg = {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    };
    var orcX_txt_cfg = {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    };
    var orcC_txt_cfg = {
      font: "15px Arial",
      fill: "#000000",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    };
    var pixie_txt_cfg = {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    };

    // Dialogo inicial da fase com o orc expulso
    var doe0 = this.add.text(this.textPx+30, this.textPy-60, "Cuidado com os Orcs,\neles são muito fortes, \nmas não tão espertos.", orcE_txt_cfg);
    doe0.setScrollFactor(0);
    doe0.alpha = 0;

    var doe1 = this.add.text(this.textPx+30, this.textPy-60, "Não diga que eu não avisei...\nfui!", orcE_txt_cfg);
    doe1.setScrollFactor(0);
    doe1.alpha = 0;

    this.orcEdialog = this.tweens.createTimeline();

    //dialogos dos orcs
    this.orcEdialog.add({
      targets: doe0,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });
    this.orcEdialog.add({
      targets: doe1,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onComplete: hideDlg, 
      onCompleteParams: [this.dialog_bg, this.player]
    });
    this.orcEdialog.add({
      targets: this.orcE,
      alpha: 0,
      ease: 'linear',
      duration: 500
    });



    // Dialogo com a pixie antes de matar o chefe
    var dp0 = this.add.text(this.textPx+30,this.textPy-80,"Aqui é perigoso!,\nFuja enquanto pode.",pixie_txt_cfg);
    dp0.setScrollFactor(0);
    dp0.alpha = 0;

    this.pixieDialog1 = this.tweens.createTimeline();
    this.pixieDialog1.add({
      targets: dp0,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,

      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player],
      onComplete: hideDlg, 
      onCompleteParams: [this.dialog_bg, this.player]
    });

    // Dialogo com a pixie depois de matar o chefe
    var dp1 = this.add.text(this.textPx+30, this.textPy-60, "Nossa, você derrotou\naquele brutamontes!.", pixie_txt_cfg);
    dp1.setScrollFactor(0);
    dp1.alpha = 0;

    var dp2 = this.add.text(this.textPx+30, this.textPy-60, "Mas ainda há esse cadeado,\n" + "o Xamã o enfeitiçou, sem saber magia\nvocê não conseguirá abrí-lo...", pixie_txt_cfg);
    dp2.setScrollFactor(0);
    dp2.alpha = 0;

    this.pixieDialog2 = this.tweens.createTimeline();
    this.pixieDialog2.add({
      targets: dp1,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });
    this.pixieDialog2.add({
      targets: dp2,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500
    });



    // Dialogo pixie apos abrir o cadeado
    var dp3 = this.add.text(this.textPx+30, this.textPy-60, "Você não deixa de me surpreender!" + "\nMuito obrigada por me libertar!", pixie_txt_cfg);
    dp3.setScrollFactor(0);
    dp3.alpha = 0;

    var dp4 = this.add.text(this.textPx+30, this.textPy-60, "Se não me engano a passagem" + "\nestá bloqueada. Vou abrir ela\npara você como agradecimento!", pixie_txt_cfg);
    dp4.setScrollFactor(0);
    dp4.alpha = 0;

    this.pixieDialog3 = this.tweens.createTimeline();
    this.pixieDialog3.add({
      targets: dp3,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });
    this.pixieDialog3.add({
      targets: dp4,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onComplete: hideDlg, 
      onCompleteParams: [this.dialog_bg, this.player]
    });


    // Dialogo inicial com o guarda
    var dog0 = this.add.text(this.textPx+30, this.textPy-60, "Você não é digno!\nTerá que passar no\nmeu teste primeiro!", orcG_txt_cfg);
    dog0.setScrollFactor(0);
    dog0.alpha = 0;

    this.orcGdialog = this.tweens.createTimeline();
    this.orcGdialog.add({
      targets: dog0,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });

    // Dialogo inicial com o xama
    var dox0 = this.add.text(this.textPx-50, this.textPy-70, "Uma nova cobaia!\nChegue mais, quero fazer\nuns experimentos, hehehe!", orcX_txt_cfg);
    dox0.setScrollFactor(0);
    dox0.alpha = 0;

    this.orcXdialog = this.tweens.createTimeline();
    this.orcXdialog.add({
      targets: dox0,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });

    // Dialogo inicial com o chefe
    var doc0 = this.add.text(this.textPx+30, this.textPy-60, "Você deve ser um pouco\nforte para ter chegado aqui.", orcC_txt_cfg);
    doc0.setScrollFactor(0);
    doc0.alpha = 0;

    var doc1 = this.add.text(this.textPx+30, this.textPy-60, "Isso me deixa ansioso para\nver o seu desespero quando\nfor derrotado!", orcC_txt_cfg);
    doc1.setScrollFactor(0);
    doc1.alpha = 0;

    this.orcCdialog = this.tweens.createTimeline();

    this.orcCdialog.add({
      targets: doc0,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: showDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });
    this.orcCdialog.add({
      targets: doc1,
      alpha: 1,
      ease: 'linear',
      duration: 500,
      yoyo: true,
      hold: 3500,
      onStart: hideDlg, 
      onStartParams: [this.dialog_bg, this.player]
    });
  }

  // função para criação dos elementos
  create (){
    localStorage.setItem('fase', 'Fase_05');

    this.create_map();
    this.create_actors();
    this.create_collisions();
    this.create_animations();
    this.create_tweens();

    // Variável de controle da fase
    this.orcChefeDerrotado = false;
    this.combateChefao = false;

    // Criacao das zonas de dialogo
    this.zoneDialog = true;

    this.pixieZone = this.add.zone(70, 1310).setSize(150, 150);
    this.pixieZoneDlg = true;
    this.physics.world.enable(this.pixieZone);
    this.physics.add.overlap(this.player, this.pixieZone, this.insidePixieZone, null, this);

    this.orcGzone = this.add.zone(490, 258).setSize(90, 90);
    this.physics.world.enable(this.orcGzone);
    this.physics.add.overlap(this.player, this.orcGzone, this.insideOrcGzone, null, this);

    this.orcXzone = this.add.zone(900, 260).setSize(160, 160);
    this.physics.world.enable(this.orcXzone);
    this.physics.add.overlap(this.player, this.orcXzone, this.insideOrcXzone, null, this);

    this.orcCzone = this.add.zone(1185, 605).setSize(150, 150);
    this.physics.world.enable(this.orcCzone);
    this.physics.add.overlap(this.player, this.orcCzone, this.insideOrcCzone, null, this);

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey('A');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyS = this.input.keyboard.addKey('S');
    this.keySPACE = this.input.keyboard.addKey('SPACE');
		this.keyN = this.input.keyboard.addKey("N");

    // estado do jogador
    this.cur_wlk = 0
    this.pixie.play('pixie_stand');
    this.orcE.play('orc_exp_stand');
    this.orcEdialog.play();
    //this.insidePixieZone();
    //this.questaoCadeado()

    console.log('Create');
  }

  move_enemy(enemy){
    var dx = this.player.x-enemy.x;
    var dy = this.player.y-enemy.y;
    var scl = 100/Math.sqrt(dx*dx+dy*dy)
    if (dx*dx + dy*dy < 200*200 && scl>0){
      enemy.setVelocityX(dx*scl);
      enemy.setVelocityY(dy*scl);
    }
    else{
      enemy.setVelocityX(0);
      enemy.setVelocityY(0);
    }
  }

  enemyHit (player, enemy){
    //player.disableBody(true, false);
    //console.log("enemy hit", player);
    player.getDamage(3);
    if (player.getHPValue() <= 0){
      player.die();
    }
  }

  // update é chamada a cada novo quadro
  update (){
    this.move_enemy(this.orc1);
    this.move_enemy(this.orc2);
    this.move_enemy(this.orc3);
    this.move_enemy(this.orc4);
    this.move_enemy(this.orc5);
    this.move_enemy(this.orc6);
    this.move_enemy(this.orc7);
    this.move_enemy(this.orc8);
    this.move_enemy(this.orc9);
    this.move_enemy(this.orc10);
    this.move_enemy(this.orc11);
    this.move_enemy(this.orc12);
    this.move_enemy(this.orc13);
    this.move_enemy(this.orc14);
    this.move_enemy(this.orc15);
    this.move_enemy(this.orc16);
    this.move_enemy(this.orc17);
    this.move_enemy(this.orc18);
    this.move_enemy(this.orc19);
    this.move_enemy(this.orc20);

    // inimigo atira
    if(this.combateChefao){
      this.bullets.getMatching('active', true).forEach(function(blt){
        var dx = blt.body.x - this.orcC.x;
        var dy = blt.body.y - this.orcC.y;

        if (dx*dx + dy *dy > 500*500){
          blt.setVisible(false);
          blt.setActive(false)
        }
      }, this);
    }

    if(!this.orcC.body.enable){
      this.orcChefeDerrotado = true;
      this.combateChefao = false;
      this.groundLayer2.setCollisionBetween(0, 10000,false);
    }

    if (this.game_over){
      if (this.keySPACE.isDown) {
        this.game_over = false;
        this.scene.restart();
      }
    }

    if (this.keyN.isDown) {
      this.scene.start('Fase_gelo')
    }

  }

  bulletHit(player, bullet){
    if(bullet.visible)player.getDamage(10);
    bullet.setActive(false);
    bullet.setVisible(false);
    if (player.getHPValue() == 0){
      player.die();
    }
  }

  bulletHitWall(bullet){
    bullet.setActive(false);
    bullet.setVisible(false);
  }

  monster_shoot(){
    if(this.combateChefao){
      var bullet = this.bullets.getFirstDead(false);
      var vx = this.player.x - this.orcC.x
      var vy = this.player.y - this.orcC.y
      var scl = 300/Math.sqrt(vx*vx+vy*vy)
      //console.log('blt', bullet)
      if (bullet){
        bullet.body.reset(this.orcC.x, this.orcC.y);
        bullet.setActive(true);
        bullet.setVisible(true);

        bullet.body.setVelocityX(vx*scl);
        bullet.body.setVelocityY(vy*scl);
      }
    }
    this.timer = this.time.addEvent({ delay: Phaser.Math.Between(500, 3000), callback: this.monster_shoot, callbackScope: this });
  }



  ////////////////////////////////
  // Tratando zonas de dialogos //
  ////////////////////////////////
  insideProximaFaseZone(){
    console.log("Vai próxima fase");
  }

  insidePixieZone(){
    if(this.pixieZoneDlg){
      this.pixieZoneDlg = false;
      if(this.orcChefeDerrotado){
        this.pixieDialog2.play();
        this.pixieDialog2.on('complete',this.questaoCadeado,this);
      }
      else{
        console.log('dlg1')
        this.pixieDialog1.play();
      }
    }
  }

  questaoCadeado(){
    // pergunta:
    var orcX_txt_cfg = {font: "15px Arial", fill: "#9400D3", align: "center", stroke: "#FFFF00", strokeThickness: 2};

    this.quest0 = this.add.text(this.textPx-50, this.textPy-100, "A magia que tranca o cadeado apresenta 1780\ncaracteres mágicos." + "Para quebrar tal feitiço,\né possível decompor esse número de caracteres em:", orcX_txt_cfg);
    this.quest0.setScrollFactor(0);

    this.a0 = this.add.text(this.textPx-20, this.textPy-30, "(A) 1 unidade de milhar, 7 dezenas e 8 unidades.", orcX_txt_cfg);
    this.a1 = this.add.text(this.textPx-20, this.textPy-10, "(B) 1 unidade de milhar, 70 unidades.", orcX_txt_cfg);
    this.a2 = this.add.text(this.textPx-20, this.textPy+10, "(C) 1 unidade de milhar, 7 centenas e 8 dezenas.", orcX_txt_cfg);
    this.a3 = this.add.text(this.textPx-20, this.textPy+30, "(D) 1 unidade de milhar, 80 unidades.", orcX_txt_cfg);

    this.a0.setScrollFactor(0);
    this.a1.setScrollFactor(0);
    this.a2.setScrollFactor(0);
    this.a3.setScrollFactor(0);

    //deixa ser clicável e conecta com a função de cada um
    this.a0.setInteractive();
    this.a0.on('pointerdown', this.errou, this);
    this.a1.setInteractive();
    this.a1.on('pointerdown', this.errou, this);
    this.a2.setInteractive();
    this.a2.on('pointerdown', this.acertouCadeado, this);
    this.a3.setInteractive();
    this.a3.on('pointerdown', this.errou, this);
  }

  acertouCadeado(){
    console.log("acertouCadeado");

    this.quest0.setVisible(false);
    this.a0.setVisible(false);
    this.a1.setVisible(false);
    this.a2.setVisible(false);
    this.a3.setVisible(false);

    this.pixie.body.reset(70,1260);
    this.pixieDialog3.play();
    this.pixieDialog3.on('complete', this.liberaProximaFase, this);
    hideDlg(null, null, this.dialog_bg, this.player);
  }

  liberaProximaFase(){
    this.wallsLayer2.setVisible(false);
    this.wallsLayer2.setCollisionBetween(0, 10000, false);
    this.pixie.play('pixie_leave');

    this.proximaFaseZone = this.add.zone(1576, 805).setSize(1, 250);
    this.physics.world.enable(this.proximaFaseZone);
    this.physics.add.overlap(this.player, this.proximaFaseZone, this.insideProximaFaseZone, null, this);

    console.log("liberaProximaFase");
  }

  insideOrcGzone(){
    if(this.orcGzone && !this.orcGDerrotado){
      this.orcGzone = false;
      this.orcGdialog.play();
      this.orcGdialog.on('complete', this.questaoOrcG, this);
    }
  }

  questaoOrcG(){
    // pergunta:
    var orcG_txt_cfg = {font: "15px Arial", fill: "#A3A2A0", align: "center", stroke: "#000000", strokeThickness: 3};

    this.quest = this.add.text(this.textPx-50, this.textPy-80, "Um evento de caça começava às 9 horas e durava\n9 horas e meia. " + "João chegou no final da competição.\nQue horas ele chegou?", orcG_txt_cfg);
    this.quest.setScrollFactor(0);

    this.a0 = this.add.text(this.textPx, this.textPy, "(A) 16h30", orcG_txt_cfg);
    this.a1 = this.add.text(this.textPx+110, this.textPy, "(B) 17h30", orcG_txt_cfg);
    this.a2 = this.add.text(this.textPx, this.textPy+30, "(C) 17h45", orcG_txt_cfg);
    this.a3 = this.add.text(this.textPx+110, this.textPy+30, "(D) 18h30", orcG_txt_cfg);

    this.a0.setScrollFactor(0);
    this.a1.setScrollFactor(0);
    this.a2.setScrollFactor(0);
    this.a3.setScrollFactor(0);

    //deixa ser clicável e conecta com a função de cada um
    this.a0.setInteractive();
    this.a0.on('pointerdown', this.errou, this);
    this.a1.setInteractive();
    this.a1.on('pointerdown', this.errou, this);
    this.a2.setInteractive();
    this.a2.on('pointerdown', this.errou, this);
    this.a3.setInteractive();
    this.a3.on('pointerdown', this.acertouG, this);
  }

  acertouG(){
    console.log("acertouG");

    this.quest.setVisible(false);
    this.a0.setVisible(false);
    this.a1.setVisible(false);
    this.a2.setVisible(false);
    this.a3.setVisible(false);

    this.orcG.play('orc_guarda_death');
    this.orcG.body.setEnable(false);
    hideDlg(null, null, this.dialog_bg, this.player);
  }

  insideOrcXzone(){
    if(this.orcXzone){
      this.orcXzone = false;
      this.player.move_enable = false;
      this.orcXdialog.play();
      this.orcXdialog.on('complete', this.questaoOrcX,this);
    }
  }

  questaoOrcX(){
    // pergunta:
    var orcX_txt_cfg = {font: "15px Arial", fill: "#9400D3", align: "center", stroke: "#FFFFFF", strokeThickness: 3};

    this.quest2 = this.add.text(this.textPx+50, this.textPy-50, "Qual frase contem uma ideia de tempo?\n", orcX_txt_cfg);
    this.quest2.setScrollFactor(0);

    this.a0 = this.add.text(this.textPx, this.textPy-30, "(A) \"O Chefe Orc tornou-se chefe nesse ano\"", orcX_txt_cfg);
    this.a1 = this.add.text(this.textPx, this.textPy-10, "(B) \"O Chefe Orc estabeleceu-se nessa vila\"", orcX_txt_cfg);
    this.a2 = this.add.text(this.textPx, this.textPy+10, "(C) \"O Chefe Orc nasceu aqui\"", orcX_txt_cfg);
    this.a3 = this.add.text(this.textPx, this.textPy+30, "(D) \"O Chefe Orc expandiu seu território pelo campo\"", orcX_txt_cfg);

    this.a0.setScrollFactor(0);
    this.a1.setScrollFactor(0);
    this.a2.setScrollFactor(0);
    this.a3.setScrollFactor(0);

    //deixa ser clicável e conecta com a função de cada um
    this.a0.setInteractive();
    this.a0.on('pointerdown', this.acertouX, this);
    this.a1.setInteractive();
    this.a1.on('pointerdown', this.errou, this);
    this.a2.setInteractive();
    this.a2.on('pointerdown', this.errou, this);
    this.a3.setInteractive();
    this.a3.on('pointerdown', this.errou, this);
  }

  acertouX(){
    console.log("acertouX");

    this.quest2.setVisible(false);
    this.a0.setVisible(false);
    this.a1.setVisible(false);
    this.a2.setVisible(false);
    this.a3.setVisible(false);

    this.player.move_enable = true;
    this.orcX.play('orc_xama_death');
    hideDlg(null, null, this.dialog_bg, this.player);
  }

  insideOrcCzone(){
    if(this.orcCzone){
      this.orcCzone = false;
      this.pixieZoneDlg = true;
      this.player.move_enable = false;

      this.orcCdialog.play();
      this.orcCdialog.on('complete', this.comecaCombateComChefao, this);
    }
  }

  errou(){
    console.log("errou");
    this.light = this.add.sprite(this.player.x, this.player.y, 'lightning_sp')
    //this.light.setScale(2);
    this.light.play("lightning_anim");
    this.player.getDamage(25);
    //this.player.getDamage(10);
    if(this.player.getHPValue() <=0){
      this.player.die();
    }
  }

  comecaCombateComChefao(){
    this.combateChefao = true;
    this.player.move_enable = true;
    this.groundLayer2.setCollisionBetween(0, 10000, true);
    this.physics.add.overlap(this.orcC, this.player.arrows, projectilHitActor, null, this);
  }

  gameOver(){
    console.log('game over');
    this.game_over = true;
    player.move_enable = false;

    var wd = window.innerWidth;
    var wh = window.innerHeight;

    var txt_cfg = {font: "15px Arial",fill: "#F0F000", align: "center"}
    console.log(this.player.x, this.player.y, txt_cfg);
    var t0 = this.add.text(this.player.x, this.player.y, "Pressione Espaço para reiniciar", txt_cfg);
    //t0.setScrollFactor(0);
  }
}

function projectilHitActor(actor, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);

  actor.getDamage(22);
  if (actor.getHPValue() == 0){
    actor.die();
    //this.physics.world.removeCollider(collider);
  }
  console.log('HP', actor.getHPValue())
}

function projectilHitWall(projectil, wall){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
}

function hideDlg(tween, targets, dlg_bg, player){
  console.log(dlg_bg)
  dlg_bg.setVisible(false);
  player.move_enable = true;
}

function showDlg(tween, targets, dlg_bg, player){
  dlg_bg.setVisible(true);
  player.move_enable = false;
}
