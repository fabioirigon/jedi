class Fase_03 extends Phaser.Scene {
  // O construtor registra o nome da cena
  constructor() {
    super("Fase_03");
  }

  // função para carregamento de assets
  preload() {

    // Personagem principal
    this.load.spritesheet("playerbow_sp", "assets/spritesheets/playerbow_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    // Elfa
    this.load.spritesheet("elfa", "assets/spritesheets/elfa.png", {
      frameWidth: 64,
      frameHeight: 64,
    });    
    // Robin Rocks
    this.load.spritesheet("robin_sp", "assets/spritesheets/robin_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    // Good Witch
    this.load.spritesheet("witch_sp","assets/spritesheets/witch_sp.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    
    // Elementos gráficos do mapa
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

    this.load.image("tiles1", "assets/maps/first_asset.png");
    this.load.image("tiles2", "assets/maps/solaria.png");
    this.load.image('bullet', 'assets/images/bullet.png');
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
    this.bridgeLayer = this.map.createLayer(
      "bridge",
      [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    this.bridgeLayer.setVisible(false);
   //   this.bridgeLayer;
  }

  create_actors(){

    // Criação do Robin Rock
    this.robin = this.physics.add.sprite(995, 90, "robin_sp", 26);
    this.robin.setScale(0.4);
    this.robin.body.immovable = true;
    this.robin.body.moves = false;


    // Criação do personagem principal
    this.player = new player(this, 50, 750, 'playerbow_sp', 26);
    this.player.setScale(0.4);
    this.player.setSize(32, 32);
    this.player.setOffset(16, 32);
    this.player.has_bow = true;

    // Criação da Elfa 
    this.elfa = new Elfa(this, 300, 375, 'elfa', 26);
    this.elfa.setScale(0.4);
    this.elfa.setSize(32, 32);
    this.elfa.setOffset(16, 32);
    this.elfa.body.immovable = true;
    this.elfa.body.moves = false;
    this.elfa.flipX = true;

    
    // Criação da Good Witch
    this.bruxa = this.physics.add.sprite(1032, 660, "witch_sp", 1);
    this.bruxa.setScale(0.7);
    this.bruxa.setSize(16, 16);
    this.bruxa.setOffset(7, 26);
    this.bruxa.body.immovable = true;
    this.bruxa.body.moves = false;
    this.bruxa.flipX = true;

    // Criação das esferas do dragão
    var e1 = this.add.text(1135, 445, "1", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera1 = this.physics.add.sprite(1150, 450, "tls_solaria", 331);
    this.esfera1.body.immovable = true;
    this.esfera1.body.moves = false;

    var e2 = this.add.text(1135, 470, "2", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera2 = this.physics.add.sprite(1150, 475, "tls_solaria", 331);
    this.esfera2.body.immovable = true;
    this.esfera2.body.moves = false;

    var e3 = this.add.text(1135, 495, "3", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera3 = this.physics.add.sprite(1150, 500, "tls_solaria", 331);
    this.esfera3.body.immovable = true;
    this.esfera3.body.moves = false;

    var e4 = this.add.text(1135, 520, "4", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera4 = this.physics.add.sprite(1150, 525, "tls_solaria", 331);
    this.esfera4.body.immovable = true;
    this.esfera4.body.moves = false;
    
    var e5 = this.add.text(1135, 545, "5", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera5 = this.physics.add.sprite(1150, 550, "tls_solaria", 331);
    this.esfera5.body.immovable = true;
    this.esfera5.body.moves = false;

    var e6 = this.add.text(1135, 570, "6", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera6 = this.physics.add.sprite(1150, 575, "tls_solaria", 331);
    this.esfera6.body.immovable = true;
    this.esfera6.body.moves = false;
    
    var e7 = this.add.text(1135, 595, "7", {font: "12px Arial",fill: "#000000",align: "center"});
    this.esfera7 = this.physics.add.sprite(1150, 600, "tls_solaria", 331);
    this.esfera7.body.immovable = true;
    this.esfera7.body.moves = false;

    //game.input.onDown.add(changeTint, this);

    //criação da parede invisível
    this.invisible = this.physics.add.sprite(1048, 695, "tls_solaria", 345);
    this.invisible.body.immovable = true;
    this.invisible.body.moves = false;
    this.invisible.setSize(16, 40);



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
  }


  create_collisions(){

    //criação da colisão
    this.ground2Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.ground2Layer);
    //this.physics.add.collider(this.player.arrows, this.ground2Layer, projectilHitWall, null, this);

    this.tree1Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.tree1Layer);
    this.physics.add.collider(this.player.arrows, this.tree1Layer, projectilHitWall, null, this);
    this.physics.add.collider(this.elfa.bullets, this.tree1Layer, projectilHitWall, null, this);

    this.tree2Layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.tree2Layer);
    this.physics.add.collider(this.player.arrows, this.tree2Layer, projectilHitWall, null, this);
    this.physics.add.collider(this.elfa.bullets, this.tree2Layer, projectilHitWall, null, this);

    this.houseLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.houseLayer);
    this.physics.add.collider(this.player.arrows, this.houseLayer, projectilHitWall, null, this);
    this.physics.add.collider(this.elfa.bullets, this.houseLayer, projectilHitWall, null, this);

    this.physics.add.overlap(this.player, this.elfa.bullets, projectilHitActor, null, this);
    this.physics.add.overlap(this.elfa, this.player.arrows, projectilHitActor, null, this);

    this.physics.add.collider(this.player, this.robin);
    this.physics.add.collider(this.player, this.bruxa);
    this.physics.add.collider(this.player, this.elfa);

    this.physics.add.collider(this.player, this.esfera1);
    this.physics.add.collider(this.player.arrows, this.esfera1, projectilHitCrystal, null, this);
    this.physics.add.collider(this.player, this.esfera2);
    this.physics.add.collider(this.player.arrows, this.esfera2, projectilHitCrystal2, null, this);
    this.physics.add.collider(this.player, this.esfera3);
    this.physics.add.collider(this.player.arrows, this.esfera3, projectilHitCrystal3, null, this);
    this.physics.add.collider(this.player, this.esfera4);
    this.physics.add.collider(this.player.arrows, this.esfera4, projectilHitCrystal, null, this);
    this.physics.add.collider(this.player, this.esfera5);
    this.physics.add.collider(this.player.arrows, this.esfera5, projectilHitCrystal5, null, this);
    this.physics.add.collider(this.player, this.esfera6);
    this.physics.add.collider(this.player.arrows, this.esfera6, projectilHitCrystal, null, this);
    this.physics.add.collider(this.player, this.esfera7);
    this.physics.add.collider(this.player.arrows, this.esfera7, projectilHitCrystal7, null, this);

    this.physics.add.collider(this.player, this.invisible);
  }

  // criação do diálogo
  create_tweens(){

    // Falas da primeira cena
      var t0 = this.add.text(530, 650, "Está perdido?\n Não se pode atravessar o Rio das Flores", {
          font: "15px Arial",
          fill: "#674ea7",
          align: "center"
      });        
      var t1 = this.add.text(530, 650, "Siga para cima.\n As árvores te mostrarão o caminho", {
          font: "15px Arial",
          fill: "#674ea7",
          align: "center"
      });
      var t2 = this.add.text(530, 650, "Obrigada bela bruxa!", {
        font: "15px Arial",
        fill: "#000000",
        align: "center"
      });        

      t0.setScrollFactor(0);
      t1.setScrollFactor(0);
      t2.setScrollFactor(0);

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
    this.create_actors();
    this.create_animations();
    this.create_collisions();

    this.dlgBox = this.add.rectangle(700, 700, 1000, 200, 0x000000);
    this.dlgBox.setScrollFactor(0);
    this.dlgBox.setVisible(false)
    this.dialogActive = false;

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

    // adicionando uma zona de saida
    this.zoneSaida = this.add.zone(1200, 500).setSize(10, 80);
    this.physics.world.enable(this.zoneSaida);
    this.physics.add.overlap(this.player, this.zoneSaida, this.onZoneSaida, null, this);
    this.physics.add.collider(this.player.arrows, this.zoneSaida, projectilHitCrystal, null, this);
    this.zoneSaida.body.immovable = true;
    this.zoneSaida.body.moves = false;

    // adicionando uma zona de saida
    this.parede = this.add.zone(5, 750).setSize(10, 80);
    this.physics.world.enable(this.parede);
    this.physics.add.collider(this.player.arrows, this.parede, projectilHitCrystal, null, this);
    this.physics.add.collider(this.player, this.parede, null, null, this);
    this.parede.body.immovable = true;
    this.parede.body.moves = false;

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey("A");
    this.keyD = this.input.keyboard.addKey("D");
    this.keyW = this.input.keyboard.addKey("W");
    this.keyS = this.input.keyboard.addKey("S");
    this.keySPACE = this.input.keyboard.addKey("Space");

    this.bruxa.play('witch_idle')

    this.crystal2 = false;
    this.crystal3 = false;
    this.crystal5 = false;
    this.crystal7 = false;
    this.ponte = true;

  }
 
  // update é chamada a cada novo quadro
  update() {

    if(this.crystal2 && this.crystal3 && this.crystal5 && this.crystal7 && this.ponte){
      this.bridgeLayer.setVisible(true);
      this.bridge2Layer.setActive(false);
      this.invisible.destroy();
      this.ponte = false;
    }

}

  onZoneSaida(){
    console.log("saiu")
  }

  // a função limpa a flag 'zoneDialog' para executar o diálogo (tween) uma vez só
  onZone(){
    if (this.zoneDialog){
        this.dlgBox.setVisible(true)
        this.timeline.play();
        this.zoneDialog = true;
    }
  }

  onZone2(){
    if (this.zoneDialog){


      this.zoneDialog = false;

      this.timelineRobin.play();
       
      // impede o movimento
      this.player.move_enable = false;
      this.player.anims.stop();
      
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

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
      this.player.move_enable = true;
      this.quest.setVisible(false);
      this.a0.setVisible(false);
      this.a1.setVisible(false);
      this.a2.setVisible(false);
      this.a3.setVisible(false);
      this.player.has_bow = true;
      this.timelineRobin2.play();
  }
}

function projectilHitActor(actor, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);

  console.log('HP', actor.getHPValue())
  actor.getDamage(22);
  if (actor.getHPValue() == 0){
      actor.die();
      //this.physics.world.removeCollider(collider);
  }
}


function projectilHitWall(projectil, wall){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
}

function projectilHitCrystal(crystal, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
  if(this.ponte){
    this.crystal2 = false;
    this.crystal3 = false;
    this.crystal5 = false;
    this.crystal7 = false;
    this.esfera2.tint = 0xffffff;
    this.esfera3.tint = 0xffffff;
    this.esfera5.tint = 0xffffff;
    this.esfera7.tint = 0xffffff;
  }
}

function projectilHitCrystal2(crystal, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
  this.crystal2 = true;
  this.esfera2.tint = 0x3388ff;
}

function projectilHitCrystal3(crystal, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
  this.crystal3 = true;
  this.esfera3.tint = 0x3388ff;
}

function projectilHitCrystal5(crystal, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
  this.crystal5 = true;
  this.esfera5.tint = 0x3388ff;
}

function projectilHitCrystal7(crystal, projectil){
  projectil.setActive(false);
  projectil.setVisible(false);
  projectil.setVelocity(0, 0);
  projectil.body.reset(-10, -10);
  this.crystal7 = true;
  this.esfera7.tint = 0x3388ff;
}
