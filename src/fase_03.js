class Fase_03 extends Phaser.Scene {
  constructor() {
    // ######## acertar nome da fase ##########
    super("Fase_03");
  }


  // função para carregamento de assets
  preload() {
    this.load.spritesheet("player_sp", "assets/spritesheets/player_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("playerbow_sp", "assets/spritesheets/playerbow_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("robin_sp", "assets/spritesheets/robin_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("tls_firstasset", "assets/maps/first_asset.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 16,
    });
    this.load.spritesheet("tls_solaria", "assets/maps/solaria.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("tls_topdown-forest", "assets/maps/top-down-forest-tileset.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 16 
    });
    this.load.spritesheet("witch_sp","assets/spritesheets/witch_sp.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("tiles1", "assets/maps/first_asset.png");
    this.load.image("tiles2", "assets/maps/solaria.png");
    this.load.image("tiles3", "assets/maps/top-down-forest-tileset.png");

    this.load.tilemapTiledJSON("fase3", "assets/maps/fase.json");
  }

  create_map(){
    // criação do mapa e ligação com a imagem (tilesheet)
    this.map = this.make.tilemap({
      key: "fase3",
      tileWidth: 16,
      tileHeight: 16,
    });

    this.tileset1 = this.map.addTilesetImage("tls_firstasset", "tiles1");
    this.tileset2 = this.map.addTilesetImage("tls_topdown-forest", "tiles3");
    this.tileset3 = this.map.addTilesetImage("tls_solaria", "tiles2");

    // criação das camadas
    this.ground0Layer = this.map.createLayer(
      "ground0",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.groundLayer = this.map.createLayer(
      "ground",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.riverLayer = this.map.createLayer(
      "river",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.ground2Layer = this.map.createLayer(
      "ground2",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.bridge2Layer = this.map.createLayer(
      "bridge2",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.bridgeLayer = this.map.createLayer(
      "bridge",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.tree1Layer = this.map.createLayer(
      "tree1",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.tree2Layer = this.map.createLayer(
      "tree2",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.houseLayer = this.map.createLayer(
      "house",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.perfumariaLayer = this.map.createLayer(
      "perfumaria",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
  }

  create_actors(){
    // criação do char

    //criação do robin
    this.robin = this.physics.add.sprite(995, 90, "robin_sp", 26);
    this.robin.setScale(0.4);
    this.robin.body.immovable = true;
    this.robin.body.moves = false;

    //this.player = this.physics.add.sprite(800, 700, 'player_sp', 26)
    this.player = this.physics.add.sprite(800, 100, "player_sp", 26);
    this.player.setScale(0.4);
    this.player.setSize(32, 32);
    this.player.setOffset(16, 32);
    
    //criação da bruxinha
    this.bruxa = this.physics.add.sprite(1032, 660, "witch_sp", 1);
    this.bruxa.setScale(0.7);
    this.bruxa.setSize(16, 16);
    this.bruxa.setOffset(7, 26);
    this.bruxa.body.immovable = true;
    this.bruxa.body.moves = false;
    this.bruxa.flipX = true;

    //criação das esferas do dragão
    this.esfera1 = this.physics.add.sprite(1150, 450, "tls_solaria", 331);
    this.esfera2 = this.physics.add.sprite(1150, 475, "tls_solaria", 331);
    this.esfera3 = this.physics.add.sprite(1150, 500, "tls_solaria", 331);
    this.esfera4 = this.physics.add.sprite(1150, 525, "tls_solaria", 331);
    this.esfera5 = this.physics.add.sprite(1150, 550, "tls_solaria", 331);
    this.esfera6 = this.physics.add.sprite(1150, 575, "tls_solaria", 331);
    this.esfera7 = this.physics.add.sprite(1150, 600, "tls_solaria", 331);
    this.esfera7.tint = 0x3388ff;

    //game.input.onDown.add(changeTint, this);



    // camera seguindo o jogador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(2);

  }


  create_animations(){
    this.anims.create({
      key: 'witch_idle',
      frames: this.anims.generateFrameNumbers('witch_sp', {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 8,
      repeat: -1
      });

    this.anims.create({
      key: 'player_up',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [105, 107, 108, 109, 110, 111, 112]}),
      frameRate: 12,
      repeat: -1      
    });

    this.anims.create({
      key: 'player_down',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [131, 132, 133, 134, 135, 136, 137, 138]}),
      frameRate: 12,
      repeat: -1      
    });

    this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [118, 119, 120, 121, 122, 123, 124, 125]}),
      frameRate: 12,
      repeat: -1      
    });

    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [144, 145, 146, 147, 148, 149, 150, 151]}),
      frameRate: 12,
      repeat: -1      
    });

    this.anims.create({
      key: 'player_idle',
      //frames: this.anims.generateFrameNumbers('player_sp', {frames: [234, 235, 236, 235]}),
      //frames: this.anims.generateFrameNumbers('player_sp', {frames: [234, 235]}),
      frames: this.anims.generateFrameNumbers('player_sp', {frames: [26, 27]}),
      frameRate: 3,
      repeat: -1  
    });

    this.anims.create({
      key: 'bow_up',
      frames: this.anims.generateFrameNumbers('playerbow_sp', {frames: [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220]}),
      frameRate: 16,
      repeat: false      
    });

    this.anims.create({
      key: 'bow_left',
      frames: this.anims.generateFrameNumbers('playerbow_sp', {frames: [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233]}),
      frameRate: 16,
      repeat: false      
    });

    this.anims.create({
      key: 'bow_down',
      frames: this.anims.generateFrameNumbers('playerbow_sp', {frames: [234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246]}),
      frameRate: 16,
      repeat: false      
    });

    this.anims.create({
      key: 'bow_right',
      frames: this.anims.generateFrameNumbers('playerbow_sp', {frames: [247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259]}),
      frameRate: 16,
      repeat: false      
    });
  }


  create_collisions(){

    //criação da colisão
    this.ground2Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.ground2Layer);
    this.tree1Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.tree1Layer);
    this.tree2Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.tree2Layer);
    this.houseLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.houseLayer);
    this.bridge2Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.bridge2Layer);
    this.houseLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.houseLayer);
    this.physics.add.collider(this.player, this.robin);
    this.physics.add.collider(this.player, this.bruxa);

  }

  // criação do diálogo
  create_tweens(){

    // Falas da primeira cena
      var t0 = this.add.text(900, 600, "Está perdido?\n Não se pode atravessar o Rio das Flores", {
          font: "12px Arial",
          fill: "#674ea7",
          align: "center"
      });        
      var t1 = this.add.text(900, 600, "Siga para cima.\n As árvores te mostrarão o caminho", {
          font: "12px Arial",
          fill: "#674ea7",
          align: "center"
      });
      var t2 = this.add.text(900, 600, "Obrigada bela bruxa!", {
        font: "12px Arial",
        fill: "#000000",
        align: "center"
      });        
  
      t0.alpha = 0
      t1.alpha = 0
      t2.alpha = 0

      
      // timeline: sequência
      this.timeline = this.tweens.createTimeline({paused: true});

      // primeira fala - bruxinha
      this.timeline.add({
          targets: t0,
          alpha: 1,
          ease: 'linear',
          duration: 1000, 
          yoyo: true,
          hold: 3000
      });

      // segunda fala - bruxinha
      this.timeline.add({
          targets: t1,
          alpha: 1,
          ease: 'linear',
          duration: 1000,
          yoyo: true,
          hold: 3000
      });

      // terceira fala - aventureira
      this.timeline.add({
        targets: t2,
        alpha: 1,
        ease: 'linear',
        duration: 1000,
        yoyo: true,
        hold: 3000
      });
      
  // ----------------------------------------------------------------
  // Falas da segunda cena
  
    var t3 = this.add.text(945, 120, "Olá, o senhor sabe como atravessar o rio?", {
      font: "12px Arial",
      fill: "#000000",
      align: "center"
    });   
         
    var t4 = this.add.text(945, 120, "Oque me diz de uma troca justa?\n Uma resposta por outra.", {
        font: "12px Arial",
        fill: "#744700",
        align: "center"
    });
    
    var t5 = this.add.text(945, 120, "Manda ver!", {
      font: "12px Arial",
      fill: "#000000",
      align: "center"
    });        

    t3.alpha = 0
    t4.alpha = 0
    t5.alpha = 0

    // timeline: sequência
    this.timelineRobin = this.tweens.createTimeline({paused: true});

    // primeira fala - aventureira
    this.timelineRobin.add({
        targets: t3,
        alpha: 1,
        ease: 'linear',
        duration: 1000, 
        yoyo: true,
        hold: 3000
    });

    // segunda fala - Robin Rock
    this.timelineRobin.add({
        targets: t4,
        alpha: 1,
        ease: 'linear',
        duration: 1000,
        yoyo: true,
        hold: 3000
    });

    // terceira fala - aventureira
    this.timelineRobin.add({
      targets: t5,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000
    });

    // ----------------------------------------------------------------
    // Continuação da segunda cena

    var t6 = this.add.text(945, 120, "Impressionante! Tome este arco!", {
      font: "12px Arial",
      fill: "#744700",
      align: "center"
    });   
         
    var t7 = this.add.text(945, 120, "Para atravessar o rio, atire nos cristais\nde número primo que estão na outra margem.", {
        font: "12px Arial",
        fill: "#744700",
        align: "center"
    });
    
    var t8 = this.add.text(945, 120, "Assim a ponte será revelada!", {
      font: "12px Arial",
      fill: "#744700",
      align: "center"
    });       

    var t9 = this.add.text(945, 120, "Valeu meu consagrado!", {
      font: "12px Arial",
      fill: "#000000",
      align: "center"
    });  

    t6.alpha = 0
    t7.alpha = 0
    t8.alpha = 0
    t9.alpha = 0

    // timeline: sequência
    this.timelineRobin2 = this.tweens.createTimeline({paused: true});

    // 
    this.timelineRobin2.add({
        targets: t6,
        alpha: 1,
        ease: 'linear',
        duration: 1000, 
        yoyo: true,
        hold: 3000
    });

    // 
    this.timelineRobin2.add({
        targets: t7,
        alpha: 1,
        ease: 'linear',
        duration: 1000,
        yoyo: true,
        hold: 3000
    });

    // 
    this.timelineRobin2.add({
      targets: t8,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000
    });

    // 
    this.timelineRobin2.add({
      targets: t9,
      alpha: 1,
      ease: 'linear',
      duration: 1000,
      yoyo: true,
      hold: 3000
    });
  }

  // função para criação dos elementos
  create() {

    this.create_map();
    this.create_animations();
    this.create_actors();
    this.create_collisions();
    this.create_tweens();

    // adicionando uma zona com gatilho, quando entrar aciona a função onZone
    this.zoneDialog = true;
    this.zone = this.add.zone(1000, 650).setSize(100, 100);
    this.physics.world.enable(this.zone);
    this.physics.add.overlap(this.player, this.zone, this.onZone, null, this);

   // this.zoneDialog2 = true;
    this.zone2 = this.add.zone(970, 90).setSize(100, 100);
    this.physics.world.enable(this.zone2);
    this.physics.add.overlap(this.player, this.zone2, this.onZone2, null, this);

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey("A");
    this.keyD = this.input.keyboard.addKey("D");
    this.keyW = this.input.keyboard.addKey("W");
    this.keyS = this.input.keyboard.addKey("S");
    this.keySpace = this.input.keyboard.addKey("Space");

    this.cur_wlk = 0
    this.last_dir = 0

    this.bruxa.play('witch_idle')
    this.player.play('player_idle')

    // habilita movimento
    this.enable_move = true;

    this.bow = false;
  }
 
  // update é chamada a cada novo quadro
  update() {
    
  // variável enaable move controla o movimento
  if (this.enable_move){
    
    if (this.keyD?.isDown) {
      this.player.setVelocityX(180);
      if (this.cur_wlk != 1 && this.player.body.velocity.y == 0){
          this.cur_wlk = 1;
          this.last_dir = 1;
          this.player.play("player_right");
      }
  }
  else if (this.keyA?.isDown) {
      this.player.setVelocityX(-180);
      if (this.cur_wlk != 2 && this.player.body.velocity.y == 0){
          this.last_dir = 2;
          this.cur_wlk = 2;
          this.player.play("player_left");
      }
  }
  else{
      this.player.setVelocityX(0); 
      if (this.cur_wlk != 0 && this.player.body.velocity.y == 0){
          this.cur_wlk = 0;
          this.player.play("player_idle");
      }
  }

  // velocidade vertical
  if (this.keyW.isDown) {
      this.player.setVelocityY(-180);
      if (this.cur_wlk != 3){
          this.last_dir = 3;
          this.cur_wlk = 3;
          this.player.play("player_up");
      }
  }
  else if (this.keyS.isDown) {
      this.player.setVelocityY(180);
      if (this.cur_wlk != 4){
          this.last_dir = 4;
          this.cur_wlk = 4;
          this.player.play("player_down");
      }
  }
  else{
      this.player.setVelocityY(0); 
  }

  if (this.keySpace?.isDown && this.bow == true ) {
    this.enable_move = false;
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    switch(this.last_dir){
      case 1: 
        this.player.play("bow_right");
      break;
      case 2:
        this.player.play("bow_left");
      break;
      case 3:
        this.player.play("bow_up");
      break;
      case 4:
        this.player.play("bow_down");
      break;
    }//switch
    setTimeout(() => {  this.enable_move = true; this.player.play("player_idle");}, 1000);
  }
  }
}

  // a função limpa a flag 'zoneDialog' para executar o diálogo (tween) uma vez só
  onZone(){
    if (this.zoneDialog){
      
        this.timeline.play();
        this.zoneDialog = true;
    }
  }

  onZone2(){
    if (this.zoneDialog){


      this.zoneDialog = false;

      this.timelineRobin.play();
       
      // impede o movimento
      this.enable_move = false;
      
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.play("player_idle", true);

       setTimeout(() => {

      // pergunta: 
      this.quest = this.add.text(945, 120, "Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?", {
        font: "12px Arial",
        fill: "#744700",
        align: "center"
      });

      this.a0 = this.add.text(945, 175, "◯ 3589 livros", {
          font: "12px Arial",
          fill: "#744700",
          align: "center"
      });

      this.a1 = this.add.text(945, 200, "◯ 3859 livros", {
          font: "12px Arial",
          fill: "#744700",
          align: "center"
      });

      this.a2 = this.add.text(945, 225, "◯ 30859 livros", {
          font: "12px Arial",
          fill: "#744700",
          align: "center"
      });

      this.a3 = this.add.text(945, 250, "◯ 38590 livros", {
        font: "12px Arial",
        fill: "#744700",
        align: "center"
    });

      // deixa clicar e liga com a função
      this.a0.setInteractive();
      this.a0.on('pointerdown', this.errou, this);
      this.a1.setInteractive();
      this.a1.on('pointerdown', this.acertou, this);
      this.a2.setInteractive();
      this.a2.on('pointerdown', this.errou, this);
      this.a3.setInteractive();
      this.a3.on('pointerdown', this.errou, this);

     }, 15000);
    }
  }

  // função erro e acerto
  errou(){
      console.log("errou");
       this.scene.restart();
  }

  acertou(){
      console.log("acertou");
      this.enable_move = true;
      this.quest.setVisible(false);
      this.a0.setVisible(false);
      this.a1.setVisible(false);
      this.a2.setVisible(false);
      this.a3.setVisible(false);
      this.bow = true;
      this.timelineRobin2.play();
  }

}