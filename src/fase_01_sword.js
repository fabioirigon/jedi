class fase_01_sword extends Phaser.Scene {


    // função para carregamento de assets
    preload ()
    {
        //load spritesheet
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });

        // load tile sheet
        this.load.image('tiles', 'assets/maps/dungeon-16-16.png');

        // load map
        this.load.tilemapTiledJSON('themap', 'assets/maps/the_map.json');

        this.load.spritesheet('swordSwing_sp', 'assets/spritesheets/sw_swing.png', { frameWidth: 16, frameHeight: 16});

        this.load.spritesheet("spider_sp", "assets/spritesheets/spider11.png", {
            frameWidth: 64,
            frameHeight: 64,
          });
      
    }

    // função para criação dos elementos
    create ()
    {

        // criação do mapa (json) e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        // criação jogador
        this.player = new player(this, 100, 100, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.has_bow = false;    // previne de atirar flechas

        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.player, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.keyE = this.input.keyboard.addKey('E');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.9);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2)

        // criação das zonas
        this.zone_dlg = this.add.zone(100, 200).setSize(70, 100);
        this.physics.world.enable(this.zone_dlg);
        this.physics.add.overlap(this.player, this.zone_dlg);

        this.zone_ques = this.add.zone(220, 200).setSize(70, 100);
        this.physics.world.enable(this.zone_ques);
        this.physics.add.overlap(this.player, this.zone_ques);

        this.zone_spider = this.add.zone(600, 400).setSize(400, 400);
        this.physics.world.enable(this.zone_spider);

        // criação da mensagem "pressione E para interagir"
        var px = this.cameras.main.width/2;  // pos horizontal
        var ch = this.cameras.main.height
        var py = ch/2 + 0.2*ch/this.cameras.main.zoom;  // pos vertical
        console.log('pp', px, py)
        this.interact_txt = this.add.text(px, py, "Pressione E para interagir !!!", {
            font: "15px Arial",
            fill: "#A0A0A0",
            align: "center", 
            stroke: '#000000',
            strokeThickness: 4,
        });
        this.interact_txt.setScrollFactor(0);  // deixa em posição relativa à camera (e não ao mapa)
        this.interact_txt.setVisible(false);   // deixa invisível

        // criação de lista de textos (diálogs) e do objeto dialog
        this.txtLst_0 = ["Olá turma!\n Vamos criar alguns diálogos?", "Só se for agora", "Então tá"];
        this.txtLst_1 = ["Aí já cansei de falar contigo..."];
        this.quest_0 =  ["Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?",
        1, "◯ 3589 livros", "◯ 3859 livros",  "◯ 30859 livros",  "◯ 38590 livros"]
  
        this.firstDialog = true;
        this.dialogs = new dialogs(this);   

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;
        this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });

        this.spiders = this.physics.add.group();
        this.spiders.enableBody = true;
        this.spiders.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 5; i++){
            var spider = this.spiders.create(-10, -10, 'spider_sp');
            spider.setScale(0.7);
            spider.body.setSize(10, 10);
            spider.setActive(false);
            spider.setVisible(false);
        }    
    }


    // update é chamada a cada novo quadro
    update ()
    {
        // verifica e trata se jogador em zona ativa
        this.checkActiveZone();

        // verifica se precisa avançar no diálogo
        if (this.dialogs.isActive && !this.spacePressed && this.keySPACE.isDown){
            this.dialogs.nextDlg();
            this.spacePressed = true;   // seta flag para false para esperar a tecla espaço ser levantada
        }
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }

        for (let spider of this.spiders.getMatching('active', true)){
            spider.setRotation(Math.atan2(this.player.x-spider.x, -this.player.y+spider.y))
        }

    }

    // trata zona ativa
    checkActiveZone(){
        // se jogador dentro de zona e o diálogo não está ativo
        if (this.player.body.embedded && !this.dialogs.isActive){
            // mostra a mensagem e verifica a tecla pressionada
            this.interact_txt.setVisible(true);
            if (this.keyE.isDown){
                this.startDialogOrQuestion();
            } 
        }
        // se diálogo ativo ou fora da zona, esconde a msg
        else{
            this.interact_txt.setVisible(false);
        }
    }

    startDialogOrQuestion(){
        if (this.physics.overlap(this.player, this.zone_dlg)){
            if (this.firstDialog){
                this.dialogs.updateDlgBox(this.txtLst_0);
                this.firstDialog = false;
            }
            else{
                this.dialogs.updateDlgBox(this.txtLst_1);
            }
        }
        if (this.physics.overlap(this.player, this.zone_ques)){
            this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
        }
    }

    checkSwingOverlap(){
        for (let spider of this.spiders.getMatching('active', true)){
            if (Phaser.Geom.Rectangle.Overlaps(spider.getBounds(), this.player.swing.getBounds())){
                console.log('overl')
                spider.setActive(false);
                spider.setVisible(false);
            }
        }
    }

}

function acertou_fcn(ptr){
    console.log("acertou");
    this.dialogs.hideBox();
}

function errou_fcn(ptr){
    console.log("errou")
    this.dialogs.hideBox();
}

function spawn(){
    if (Phaser.Geom.Rectangle.Overlaps(this.zone_spider.getBounds(), this.player.getBounds())){
        console.log('spawn');
        var spider = this.spiders.getFirstDead(false);
        if (spider){    
            spider.body.reset(this.player.x, this.player.y);
            spider.setActive(true);
            spider.setVisible(true);
        }
    
    }
    this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });
}

