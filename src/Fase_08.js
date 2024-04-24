class Fase_08 extends Phaser.Scene {

  constructor ()
  {
      // ######## acertar nome da fase ##########
      super('Fase_08'); 
      console.log('Fase_08 start')
  }

  // função para carregamento de assets
  preload() {
    //load spritesheet
    this.load.spritesheet("player_sp", "assets/spritesheets/player_sp.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("npc_sp", "assets/spritesheets/npc.png", {
      frameWidth: 48,
      frameHeight: 64,
    });

    // load tile sheet
    //this.load.image('tiles', 'assets/maps/dungeon-16-16.png');
    this.load.image("tiles_8", "assets/maps/MapaV3/Mapacongelado.png");

    // load map
    //this.load.tilemapTiledJSON('themap', 'map_prj/the_map.json');
    this.load.tilemapTiledJSON("themap_8", "assets/maps/MapaV3/MapaV3.json");
  }

  // função para criação dos elementos
  create() {
    // criação do mapa (json) e ligação com a imagem (tilesheet)
    this.map = this.make.tilemap({
      key: "themap_8",
      tileWidth: 16,
      tileHeight: 16,
    });
    //this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');
    this.tileset = this.map.addTilesetImage("MapaV3", "tiles_8");

    // criação das camadas
    //this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
    //this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
    this.groundLayer = this.map.createLayer("Chao", this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer("Parede", this.tileset, 0, 0);

    // criação jogador
    this.player = new player(this, 80, 80, "player_sp", 26);
    this.player.setScale(0.5);
    this.player.has_bow = false; // previne de atirar flechas

    // criação do npc
    this.mago = this.physics.add.sprite(180, 125, "npc_sp", 7);
    this.mago.setScale(0.5);

    // criação da colisão com camadas
    this.wallsLayer.setCollisionBetween(17, 50, true);
    this.physics.add.collider(this.player, this.wallsLayer);

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey("A");
    this.keyD = this.input.keyboard.addKey("D");
    this.keyW = this.input.keyboard.addKey("W");
    this.keyS = this.input.keyboard.addKey("S");
    this.keySPACE = this.input.keyboard.addKey("SPACE");
		this.keyN = this.input.keyboard.addKey("N");

    this.keyE = this.input.keyboard.addKey("E");

    // definição de zoom da câmera e comando para seguir jogador
    this.cameras.main.setZoom(1.9);
    this.cameras.main.startFollow(this.player, true, 0.2, 0.2);

    // criação das zonas
    this.zone_dlg = this.add.zone(136, 130).setSize(48, 45);
    this.physics.world.enable(this.zone_dlg);
    this.physics.add.overlap(this.player, this.zone_dlg);

    this.zone_ques = this.add.zone(503, 390).setSize(175, 70);
    this.physics.world.enable(this.zone_ques);
    this.physics.add.overlap(this.player, this.zone_ques);

    // criação da mensagem "pressione E para interagir"
    var px = this.cameras.main.width / 2; // pos horizontal
    var ch = this.cameras.main.height;
    var py = ch / 2 + (0.2 * ch) / this.cameras.main.zoom; // pos vertical
    console.log("pp", px, py);
    this.interact_txt = this.add.text(px, py, "Pressione E para interagir", {
      font: "15px Arial",
      fill: "#A0A0A0",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4,
    });
    this.interact_txt.setScrollFactor(0); // deixa em posição relativa à camera (e não ao mapa)
    this.interact_txt.setVisible(false); // deixa invisível

    // criação de lista de textos (diálogs) e do objeto dialog
    this.txtLst_0 = [
      "Olá Herói!",
      "Esta pronto para se aventurar?",
      "Passe pela dungeon congelada",
      "E avançe para escrever a sua história!",
    ];
    this.txtLst_1 = ["Aí já cansei de falar contigo..."];
    this.quest_0 = [
      "Gilda comprou copos descartáveis de 200 mililitros,\npara servir refrigerantes, em sua festa de aniversário.\nQuantos copos ela encherá com 1 litro de refrigerante?",
      1,
      "◯ 3 copos",
      "◯ 5 copos",
      "◯ 4 copos",
      "◯ 6 copos",
    ];
    this.quest_1 = [
      "João participou de um campeonato de judô na categoria juvenil, pesando 45,350kg. Cinco meses depois estava 3,150kg mais pesado e precisou mudar de categoria. Quanto ele estava pesando nesse período?",
      2,
      "◯ 14,250kg",
      "◯ 40,850kg",
      "◯ 48,500kg",
      "◯ 76,450kg",
    ];
    this.quest_2 = [
      "A professora de João pediu para ele decompor um número e ele fez da seguinte forma: 4 x 1000 + 3 x 10 + 5 x 1 Qual foi o número pedido?",
      0,
      "◯ 4035",
      "◯ 4305",
      "◯ 5034",
      "◯ 5304",
    ];
    this.quest_3 = [
      "Eu comprei 500 balas comi 305 e dei 120 para meu irmão. Com quantas balas eu fiquei?",
      3,
      "◯ 85",
      "◯ 65",
      "◯ 70",
      "◯ 75",
    ];

    this.firstDialog = true;
    this.dialogs = new dialogs(this);

    // flag para responder uma única vez à tecla pressionada
    this.spacePressed = false;

    console.group(this.player.body);
    console.log(this.physics);
  }

  // update é chamada a cada novo quadro
  update() {
    // verifica e trata se jogador em zona ativa
    this.checkActiveZone();

    // verifica se precisa avançar no diálogo
    if (this.dialogs.isActive && !this.spacePressed && this.keySPACE.isDown) {
      this.dialogs.nextDlg();
      this.spacePressed = true; // seta flag para false para esperar a tecla espaço ser levantada
    }
    // se tecla solta, limpa a flag
    if (!this.keySPACE.isDown) {
      this.spacePressed = false;
    }

    // dano na agua gelada
    var tile = this.groundLayer.getTileAtWorldXY(
      this.player.x,
      this.player.y,
      true
    );
    if (tile.index == 109 || tile.index == 31 || tile.index == 89) {
      console.log("Dano");
      this.player.getDamage(0.1);
    }
    if (this.keyN.isDown) {
      console.log("start Fase_3")
      this.scene.start('Fase_3')
    }

  }

  // trata zona ativa
  checkActiveZone() {
    // se jogador dentro de zona e o diálogo não está ativo
    if (this.player.body.embedded && !this.dialogs.isActive) {
      // mostra a mensagem e verifica a tecla pressionada
      this.interact_txt.setVisible(true);
      if (this.keyE.isDown) {
        this.startDialogOrQuestion();
      }
    }
    // se diálogo ativo ou fora da zona, esconde a msg
    else {
      this.interact_txt.setVisible(false);
    }
  }

  startDialogOrQuestion() {
    if (this.physics.overlap(this.player, this.zone_dlg)) {
      if (this.firstDialog) {
        this.dialogs.updateDlgBox(this.txtLst_0);
        this.firstDialog = false;
      } else {
        this.dialogs.updateDlgBox(this.txtLst_1);
      }
    }
    if (this.physics.overlap(this.player, this.zone_ques)) {
      var aux = Phaser.Math.Between(0, 3);
      console.log(aux);
      switch (aux) {
        case 0:
          this.dialogs.scene.dialogs.makeQuestion(
            this.quest_0,
            acertou_fcn,
            errou_fcn
          );
          break;

        case 1:
          this.dialogs.scene.dialogs.makeQuestion(
            this.quest_1,
            acertou_fcn,
            errou_fcn
          );
          break;

        case 2:
          this.dialogs.scene.dialogs.makeQuestion(
            this.quest_2,
            acertou_fcn,
            errou_fcn
          );
          break;

        case 3:
          this.dialogs.scene.dialogs.makeQuestion(
            this.quest_3,
            acertou_fcn,
            errou_fcn
          );
          break;

        default:
          this.dialogs.scene.dialogs.makeQuestion(
            this.quest_0,
            acertou_fcn,
            errou_fcn
          );
          break;
      }
    }
  }
}

function acertou_fcn(ptr) {
  console.log("acertou");
  this.dialogs.hideBox();
}

function errou_fcn(ptr) {
  console.log("errou");
  this.dialogs.hideBox();
}
