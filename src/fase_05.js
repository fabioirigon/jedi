// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_05 extends Phaser.Scene
{
  // O construtor registra o nome da cena
  constructor ()
  {
    super('Fase_05');
  }

  // função para carregamento de assets
  preload ()
  {
    // carregando spritesheets
    this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('pixie_sp', 'assets/spritesheets/pixie.png', { frameWidth: 26, frameHeight: 41 });
    this.load.spritesheet('orc_expulso_sp', 'assets/spritesheets/orc_expulso.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('orc_guarda_sp', 'assets/spritesheets/orc_guarda.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('orc_xama_sp', 'assets/spritesheets/orc_xama.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('orc_chefe_sp', 'assets/spritesheets/orc_chefe.png', { frameWidth: 64, frameHeight: 64 });

    // carregando mapa (json) e gráficos do mapa
    this.load.image('tiles_estruturas1', 'assets/images/fase_05/estruturas1.png');
    this.load.image('tiles_forest', 'assets/images/fase_05/forest.png');
    this.load.image('tiles_ground', 'assets/images/fase_05/ground.png');
    this.load.image('tiles_navioEjaulas', 'assets/images/fase_05/navioEjaulas.png');
    this.load.image('tiles_tapetes', 'assets/images/fase_05/tapetes.png');
    this.load.image('tiles_vila1', 'assets/images/fase_05/vila1.png');
    this.load.image('tiles_vila2', 'assets/images/fase_05/vila2.png');
    this.load.image('tiles_vila3', 'assets/images/fase_05/vila3.png');
    this.load.tilemapTiledJSON('themap', 'assets/maps/map_phase_05.json');
    console.log('LoadTiles');

  }

  create_map()
  {

    // criação do mapa e ligação com a imagem (tilesheet)
    this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
    this.tileset1 = this.map.addTilesetImage('estruturas1', 'tiles_estruturas1');
    this.tileset2 = this.map.addTilesetImage('forest', 'tiles_forest');
    this.tileset3 = this.map.addTilesetImage('ground', 'tiles_ground');
    this.tileset4 = this.map.addTilesetImage('navioEjaulas', 'tiles_navioEjaulas');
    this.tileset5 = this.map.addTilesetImage('tapetes', 'tiles_tapetes');
    this.tileset6 = this.map.addTilesetImage('vila1', 'tiles_vila1');
    this.tileset7 = this.map.addTilesetImage('vila2', 'tiles_vila2');
    this.tileset8 = this.map.addTilesetImage('vila3', 'tiles_vila3');
    console.log('CreateTiles');

    var tilesets = ['estruturas1','forest','ground','navioEjaulas','navioEjaulas','tapetes','vila1','vila2','vila3'];

    // criação das camadas
    this.groundLayer1 = this.map.createLayer('Ground', tilesets);
    this.wallsLayer1 = this.map.createLayer('River', tilesets);
    this.groundLayer2 = this.map.createLayer('Pontes', tilesets);
    this.wallsLayer2 = this.map.createLayer('BlockingPassage', tilesets);
    this.groundLayer3 = this.map.createLayer('SoftPlants', tilesets);
    this.wallsLayer3 = this.map.createLayer('HardPlants', tilesets);
    this.wallsLayer4 = this.map.createLayer('GroundObjects', tilesets);
    this.wallsLayer5 = this.map.createLayer('GroundStructures', tilesets);
    this.wallsLayer6 = this.map.createLayer('SkyStructures', tilesets);
    console.log('CreateLayers');
  }

  create_actors()
  {

    // criação do jogador
    this.player = this.physics.add.sprite(10, 840, 'player_sp', 19);
    this.player.setScale(0.25);

    // Criação da pixie
    this.pixie = this.physics.add.sprite(70, 1310, 'pixie_sp', 0);
    this.pixie.setScale(0.50);

    // Criação dos orcs
    this.orcE = this.physics.add.sprite(20, 810, 'orc_expulso_sp', 26);
    this.orcE.setScale(0.5);

    this.orcG = this.physics.add.sprite(490, 258, 'orc_guarda_sp', 26);
    this.orcG.setScale(0.5);

    this.orcX = this.physics.add.sprite(900, 260, 'orc_xama_sp', 26);
    this.orcX.setScale(0.5);

    this.orcC = this.physics.add.sprite(1185, 605, 'orc_chefe_sp', 26);
    this.orcC.setScale(0.5);


    // camera seguindo o jogador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.5)

    console.log('CreateActors');
  }

  create_animations()
  {

    // animações (caminhando)
    this.anims.create({
      key: 'pl_wlk_dwn',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [130,131,132,133,134,135,136,137,138]}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'pl_wlk_lef',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [117,118,119,120,121,122,123,124,125]}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'pl_wlk_up',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [104,105,106,107,108,109,110,111,112]}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'pl_wlk_rig',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [143,144,145,146,147,148,149,150,151]}),
      frameRate: 8,
      repeat: -1
    });
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
      key: 'orc_exp_flee',
      frames: this.anims.generateFrameNumbers('orc_expulso_sp', {frames: [117,118,119,120,121,122,123,124,125]}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'orc_guarda_death',
      frames: this.anims.generateFrameNumbers('orc_guarda_sp', {frames: [260,261,262,263,264,265]}),
      frameRate: 2,
      repeat: 0
    });
    this.anims.create({
      key: 'orc_xama_death',
      frames: this.anims.generateFrameNumbers('orc_xama_sp', {frames: [260,261,262,263,264,265]}),
      frameRate: 2,
      repeat: 0
    });
    this.anims.create({
      key: 'orc_chefe_death',
      frames: this.anims.generateFrameNumbers('orc_chefe_sp', {frames: [260,261,262,263,264,265]}),
      frameRate: 2,
      repeat: 0
    });

    console.log('CreateAnimations');
  }

  create_collisions()
  {

    // criação da colisão com paredes
    this.wallsLayer1.setCollisionBetween(0, 10000,true);
    this.physics.add.collider(this.player, this.wallsLayer1);
    this.wallsLayer2.setCollisionBetween(0, 10000,true);
    this.physics.add.collider(this.player, this.wallsLayer2);
    this.wallsLayer3.setCollisionBetween(0, 10000,true);
    this.physics.add.collider(this.player, this.wallsLayer3);
    this.wallsLayer4.setCollisionBetween(0, 10000,true);
    this.physics.add.collider(this.player, this.wallsLayer4);
    this.wallsLayer5.setCollisionBetween(0, 10000,true);
    this.physics.add.collider(this.player, this.wallsLayer5);
    this.wallsLayer6.setCollisionBetween(0, 10000,false);
    this.physics.add.collider(this.player, this.wallsLayer5);

    console.log('CreateCollisions');
  }

  create_tweens()
  {

    // Dialogo inicial da fase com o orc expulso
    var doe0 = this.add.text(25,770,"Não vá atras do chefe,\nele tem um artefato", {
      font: "12px Arial",
      fill: "#00FFFF",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    doe0.alpha = 0;

    var doe1 = this.add.text(25,770,"Eu avisei,\nfui!", {
      font: "12px Arial",
      fill: "#00FFFF",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    doe1.alpha = 0;

    this.orcEdialog = this.tweens.createTimeline();

    this.orcEdialog.add({
      targets: doe0,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000
    });

    this.orcEdialog.add({
      targets: doe1,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    this.orcEdialog.add({
      targets: this.orcE,
      alpha: 0,
      ease: 'linear',
      duration: 1000
    });

    // Dialogo com a pixie antes de matar o chefe
    var dp0 = this.add.text(80,1270,"Aqui é perigoso!,\nFuja enquanto pode.", {
      font: "12px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dp0.alpha = 0;

    this.pixieDialog1 = this.tweens.createTimeline();

    this.pixieDialog1.add({
      targets: dp0,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    // Dialogo com a pixie depois de matar o chefe

    var dp1 = this.add.text(80,1270,"Nossa, você derrotou\naquele brutamontes!.", {
      font: "12px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dp1.alpha = 0;

    var dp2 = this.add.text(80,1270,"Mas ainda há esse cadeado,\n"+
    "o Xamã o enfeitiçou, sem saber magia\n você não conseguirá abrí-lo...", {
      font: "12px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dp2.alpha = 0;

    this.pixieDialog2 = this.tweens.createTimeline();

    this.pixieDialog2.add({
      targets: dp1,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    this.pixieDialog2.add({
      targets: dp2,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    // Dialogo pixie apos abrir o cadeado

    var dp3 = this.add.text(80,1270,"Você não deixa de me surpreender!"+
    "\nMuio obrigada por me libertar!", {
      font: "12px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dp3.alpha = 0;

    var dp4 = this.add.text(80,1270,"Se não me engano a passagem\n"+
    "está bloqueada. Vou abrir ela\npara você como agradecimento!", {
      font: "12px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dp4.alpha = 0;

    this.pixieDialog3 = this.tweens.createTimeline();

    this.pixieDialog3.add({
      targets: dp3,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    this.pixieDialog3.add({
      targets: dp4,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    // Dialogo inicial com o guarda
    var dog0 = this.add.text(495,198,"Você não é digno!,\nTerá que passar no \nmeu teste primeiro.", {
      font: "12px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    dog0.alpha = 0;

    this.orcGdialog = this.tweens.createTimeline();

    this.orcGdialog.add({
      targets: dog0,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    // Dialogo inicial com o xama
    var dox0 = this.add.text(905,220,"Uma nova cobaia!\nChegue mais, quero fazer\nuns experimentos, hehehe", {
      font: "12px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    dox0.alpha = 0;

    this.orcXdialog = this.tweens.createTimeline();

    this.orcXdialog.add({
      targets: dox0,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    // Dialogo inicial com o chefe
    var doc0 = this.add.text(1190,565,"Você deve ser um pouco\nforte para ter chegado aqui.", {
      font: "12px Arial",
      fill: "#000000",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    doc0.alpha = 0;

    var doc1 = this.add.text(1190,565,"Isso me deixa ansioso para\nver o seu dessespero quando\nfor derrotado!", {
      font: "12px Arial",
      fill: "#000000",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    doc1.alpha = 0;

    this.orcCdialog = this.tweens.createTimeline();

    this.orcCdialog.add({
      targets: doc0,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

    this.orcCdialog.add({
      targets: doc1,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000

    });

  }

  // função para criação dos elementos
  create ()
  {
    this.create_map();

    this.create_actors();

    this.create_collisions();

    this.create_animations();

    this.create_tweens();

    // Variável de controle da fase
    this.orcChefeDerrotado = true;

    // Criacao das zonas de dialogo
    this.zoneDialog = true;

    this.pixieZone = this.add.zone(70, 1310).setSize(150, 150);
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


    // estado do jogador
    this.cur_wlk = 0
    this.pixie.play('pixie_stand');
    this.orcE.play('orc_exp_stand');
    this.orcEdialog.play();

    console.log('Create');
  }


  // update é chamada a cada novo quadro
  update ()
  {
    // testa se tecla pressionada e seta a velocidade do jogador
    if (this.keyD?.isDown) {
      this.player.setVelocityX(150);
      if (this.cur_wlk != 1 && this.player.body.velocity.y == 0){
        this.cur_wlk = 1;
        this.player.play("pl_wlk_rig");
      }
    }
    else if (this.keyA?.isDown) {
      this.player.setVelocityX(-150);
      if (this.cur_wlk != 2 && this.player.body.velocity.y == 0){
        this.cur_wlk = 2;
        this.player.play("pl_wlk_lef");
      }
    }
    else{
      this.player.setVelocityX(0);
      if (this.cur_wlk != 0 && this.player.body.velocity.y == 0){
        this.cur_wlk = 0;
        this.player.anims.stop();
      }
    }

    // velocidade vertical
    if (this.keyW.isDown) {
      this.player.setVelocityY(-150);
      if (this.cur_wlk != 3){
        this.cur_wlk = 3;
        this.player.play("pl_wlk_up");
      }
    }
    else if (this.keyS.isDown) {
      this.player.setVelocityY(150);
      if (this.cur_wlk != 4){
        this.cur_wlk = 4;
        this.player.play("pl_wlk_dwn");
      }
    }
    else{
      this.player.setVelocityY(0);
    }

  }

  // Tratando zonas de dialogos

  insidePixieZone(){
    if(this.pixieZone){
      this.pixieZone = false;
      if(this.orcChefeDerrotado){
        this.pixieDialog2.play();
        this.pixieDialog2.on('complete',this.questaoCadeado,this);
      }else{
        this.pixieDialog1.play();
      }
    }
  }

  questaoCadeado(){
    // pergunta:
    this.quest = this.add.text(15,1100, "A magia que tranca o cadeado apresenta 1780\n caracteres mágicos."+
    "Para quebrar tal feitiço,\né possível decompor esse número\nde caracteres em:", {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a0 = this.add.text(15, 1180, "(A) 1 unidade de milhar,  7 dezenas e 8 unidades.", {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a1 = this.add.text(15, 1200, "(B) 1 unidade de milhar, 70 unidades.", {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a2 = this.add.text(15, 1220, "(C) 1 unidade de milhar, 7 centenas e 8 dezenas.", {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a3 = this.add.text(15, 1240, "(D) 1 unidade de milhar, 80 unidades.", {
      font: "15px Arial",
      fill: "#39FF14",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });

    // deixa clicar e liga com a função
    this.a0.setInteractive();
    this.a0.on('pointerdown', this.errouCadeado, this);
    this.a1.setInteractive();
    this.a1.on('pointerdown', this.errouCadeado, this);
    this.a2.setInteractive();
    this.a2.on('pointerdown', this.acertouCadeado, this);
    this.a3.setInteractive();
    this.a3.on('pointerdown', this.errouCadeado, this);

  }

  acertouCadeado(){
    console.log("acertouCadeado");
    this.quest.setVisible(false);
    this.a0.setVisible(false);
    this.a1.setVisible(false);
    this.a2.setVisible(false);
    this.a3.setVisible(false);
    this.pixie.body.reset(70,1260);
    this.pixieDialog3.play();
    this.pixieDialog3.on('complete',this.liberaProximaFase,this);
  }

  errouCadeado(){
    console.log("errouCadeado");
  }

  liberaProximaFase(){
    this.wallsLayer2.setVisible(false);
    this.wallsLayer2.setCollisionBetween(0, 10000,false);
    console.log("liberaProximaFase");
  }

  insideOrcGzone(){

    if(this.orcGzone && !this.orcGDerrotado){
      this.orcGzone = false;
      this.orcGdialog.play();
      this.orcGdialog.on('complete',this.questaoOrcG, this);
    }

  }

  questaoOrcG(){
    // pergunta:
    this.quest = this.add.text(290, 198, "Para um evento de caça, o período de caça\n"+
    "começava às 9 horas e durava por 9 horas e meia."+
    "\nFulano chegou só no final da competição, que horas ele chegou?", {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a0 = this.add.text(320, 268, "(A) 16h30", {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a1 = this.add.text(320, 298, "(B) 17h30", {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a2 = this.add.text(430, 268, "(C) 17h45", {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });
    this.a3 = this.add.text(430, 298, "(D) 18h30", {
      font: "15px Arial",
      fill: "#A3A2A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 3
    });

    // deixa clicar e liga com a função
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
  }

  insideOrcXzone(){
    if(this.orcXzone){
      this.orcXzone = false;
      this.orcXdialog.play();
      this.orcXdialog.on('complete',this.questaoOrcX,this);
    }
  }

  questaoOrcX(){
    // pergunta:
    this.quest = this.add.text(710, 188, "Qual frase contem uma ideia de tempo?\n", {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    this.a0 = this.add.text(700, 240, "(A) “O Chefe Orc tornou-se chefe nesse ano”", {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    this.a1 = this.add.text(700, 260, "(B) “O Chefe Orc estabeleceu-se nessa vila”", {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    this.a2 = this.add.text(700, 280, "(C) “O Chefe Orc nasceu aqui”", {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });
    this.a3 = this.add.text(700, 300, "(D) “O Chefe Orc expandiu seu território pelo campo”", {
      font: "15px Arial",
      fill: "#9400D3",
      align: "center",
      stroke: "#FFFFFF",
      strokeThickness: 3
    });

    // deixa clicar e liga com a função
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
    this.quest.setVisible(false);
    this.a0.setVisible(false);
    this.a1.setVisible(false);
    this.a2.setVisible(false);
    this.a3.setVisible(false);
    this.orcX.play('orc_xama_death');
  }

  insideOrcCzone(){
    if(this.orcCzone){
      this.orcCzone = false;
      this.orcCdialog.play();
    }
  }

  errou(){
    console.log("errou");
    this.scene.restart();
  }

}
