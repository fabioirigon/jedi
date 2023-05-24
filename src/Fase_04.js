class Fase_04 extends Phaser.Scene{

    // Preload
    preload(){
        console.log('Load Spritesheet');
        this.load.spritesheet('king_sp', 'assets/spritesheets/hero1.png', { frameWidth: 16, frameHeight: 20 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('ice_tile_sp', 'assets/maps/IceTileset.png', { frameWidth: 32, frameHeight: 32, margin: 5 });
        this.load.image('ice_tiles', 'assets/maps/IceTileset.png');
        //this.load.spritesheet('obj_tile_sp', 'assets/maps/[Base]BaseChip_pipo.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        //this.load.image('obj_tiles', 'assets/maps/[Base]BaseChip_pipo.png')
        this.load.tilemapTiledJSON('themap', 'map_prj/phase_initial.json');
    }

    // criar elementos
    create(){
        console.log('Create map');
        // criação do mapa e ligação com as imagens
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('tileset_fase1', 'ice_tiles');
        //this.tileset = this.map.addTilesetImage('Characters', 'obj_tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('Chao', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Objetos', this.tileset, 0, 0);

        // criação dos personagens
        this.king = new Actor(this, 10, 30, 'king_sp', 1);
        this.npc1 = new Actor(this, 80, 32, 'king_sp', 4);
        this.npc2 = new Actor(this, 1424, 48, 'king_sp', 7);
        this.npc3 = new Actor(this, 1504, 1040, 'king_sp', 4);

        // criação da colisão
        this.wallsLayer.setCollisionBetween(0, 130, true)
        this.physics.add.collider(this.king, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');

        this.zonenpc1 = this.add.zone(80,48).setSize(40,40);
        this.physics.world.enable(this.zonenpc1);
        this.physics.add.overlap(this.king, this.zonenpc1, onZone, null, this);

        this.zonenpc2 = this.add.zone(1424,64).setSize(40,40);
        this.physics.world.enable(this.zonenpc2);
        this.physics.add.overlap(this.king, this.zonenpc2, onZone, null, this);

        this.zonenpc3 = this.add.zone(1504,1056).setSize(40,40);
        this.physics.world.enable(this.zonenpc3);
        this.physics.add.overlap(this.king, this.zonenpc3, onZone, null, this);

        this.zone1 = this.add.zone(192, 192).setSize(40, 40);
        this.physics.world.enable(this.zone1);
        this.physics.add.overlap(this.king, this.zone1, onZone, null, this);

        this.zone2 = this.add.zone(1215, 225).setSize(40, 40);
        this.physics.world.enable(this.zone2);
        this.physics.add.overlap(this.king, this.zone2, onZone_2, null, this);

        this.zone3 = this.add.zone(1520, 770).setSize(40, 40);
        this.physics.world.enable(this.zone3);
        this.physics.add.overlap(this.king, this.zone3, onZone_3, null, this);

        this.zone4 = this.add.zone(97, 607).setSize(40, 40);
        this.physics.world.enable(this.zone4);
        this.physics.add.overlap(this.king, this.zone4, onZone_4, null, this);

        this.zoneS1 = this.add.zone(260, 160).setSize(40, 40);
        this.physics.world.enable(this.zoneS1);
        this.physics.add.overlap(this.king, this.zoneS1, onZoneC, null, this);
        this.zoneS2 = this.add.zone(680, 160).setSize(40, 40);
        this.physics.world.enable(this.zoneS2);
        this.physics.add.overlap(this.king, this.zoneS2, onZoneC, null, this);
        this.zoneS3 = this.add.zone(720, 200).setSize(40, 40);
        this.physics.world.enable(this.zoneS3);
        this.physics.add.overlap(this.king, this.zoneS3, onZoneC, null, this);
        this.zoneS4 = this.add.zone(760, 330).setSize(40, 40);
        this.physics.world.enable(this.zoneS4);
        this.physics.add.overlap(this.king, this.zoneS4, onZoneC, null, this);
        this.zoneS5 = this.add.zone(720, 290).setSize(40, 40);
        this.physics.world.enable(this.zoneS5);
        this.physics.add.overlap(this.king, this.zoneS5, onZoneC, null, this);
        this.zoneS6 = this.add.zone(1115, 330).setSize(40, 40);
        this.physics.world.enable(this.zoneS6);
        this.physics.add.overlap(this.king, this.zoneS6, onZoneC, null, this);
        this.zoneS21i = this.add.zone(1430, 130).setSize(40, 40);
        this.physics.world.enable(this.zoneS21i);
        this.physics.add.overlap(this.king, this.zoneS21i, onZoneC, null, this);
        this.zoneS21v = this.add.zone(1430, 255).setSize(40, 40);
        this.physics.world.enable(this.zoneS21v);
        this.physics.add.overlap(this.king, this.zoneS21v, onZoneC, null, this);
        this.zoneS22i = this.add.zone(1395, 290).setSize(40, 40);
        this.physics.world.enable(this.zoneS22i);
        this.physics.add.overlap(this.king, this.zoneS22i, onZoneC, null, this);
        this.zoneS22v = this.add.zone(1315, 290).setSize(40, 40);
        this.physics.world.enable(this.zoneS22v);
        this.physics.add.overlap(this.king, this.zoneS22v, onZoneC, null, this);
        this.zoneS23i = this.add.zone(1280, 255).setSize(40, 40);
        this.physics.world.enable(this.zoneS23i);
        this.physics.add.overlap(this.king, this.zoneS23i, onZoneC, null, this);
        this.zoneS23v = this.add.zone(1280, 160).setSize(40, 40);
        this.physics.world.enable(this.zoneS23v);
        this.physics.add.overlap(this.king, this.zoneS23v, onZoneC, null, this);
        this.zoneS24i = this.add.zone(1315, 120).setSize(40, 40);
        this.physics.world.enable(this.zoneS24i);
        this.physics.add.overlap(this.king, this.zoneS24i, onZoneC, null, this);
        this.zoneS24v = this.add.zone(1455, 120).setSize(40, 40);
        this.physics.world.enable(this.zoneS24v);
        this.physics.add.overlap(this.king, this.zoneS24v, onZoneC, null, this);
        this.zoneS25i = this.add.zone(1490, 160).setSize(40, 40);
        this.physics.world.enable(this.zoneS25i);
        this.physics.add.overlap(this.king, this.zoneS25i, onZoneC, null, this);
        this.zoneS25v = this.add.zone(1490, 195).setSize(40, 40);
        this.physics.world.enable(this.zoneS25v);
        this.physics.add.overlap(this.king, this.zoneS25v, onZoneC, null, this);
        this.zoneS26i = this.add.zone(1455, 220).setSize(40, 40);
        this.physics.world.enable(this.zoneS26i);
        this.physics.add.overlap(this.king, this.zoneS26v, onZoneC, null, this);
        this.zoneS26v = this.add.zone(1395, 220).setSize(40, 40);
        this.physics.world.enable(this.zoneS26v);
        this.physics.add.overlap(this.king, this.zoneS26v, onZoneC, null, this);
        this.zoneS27i = this.add.zone(1360, 255).setSize(40, 40);
        this.physics.world.enable(this.zoneS27i);
        this.physics.add.overlap(this.king, this.zoneS27i, onZoneC, null, this);
        this.zoneS27v = this.add.zone(1360, 355).setSize(40, 40);
        this.physics.world.enable(this.zoneS27v);
        this.physics.add.overlap(this.king, this.zoneS27v, onZoneC, null, this);


        this.zoneP1 = this.add.zone(720, 160).setSize(30, 30);
        this.physics.world.enable(this.zoneP1);
        this.physics.add.overlap(this.king, this.zoneP1, onZoneP, null, this);
        this.zoneP2 = this.add.zone(210, 160).setSize(35, 35);
        this.physics.world.enable(this.zoneP2);
        this.physics.add.overlap(this.king, this.zoneP2, onZoneP, null, this);
        this.zoneP3 = this.add.zone(720, 330).setSize(30, 30);
        this.physics.world.enable(this.zoneP3);
        this.physics.add.overlap(this.king, this.zoneP3, onZoneP, null, this);
        this.zoneP4 = this.add.zone(1160, 330).setSize(30, 30);
        this.physics.world.enable(this.zoneP4);
        this.physics.add.overlap(this.king, this.zoneP4, onZoneP, null, this);
        this.zoneP21 = this.add.zone(1430, 95).setSize(30, 30);
        this.physics.world.enable(this.zoneP21);
        this.physics.add.overlap(this.king, this.zoneP21, onZoneP, null, this);
        this.zoneP22 = this.add.zone(1430, 290).setSize(30, 30);
        this.physics.world.enable(this.zoneP22);
        this.physics.add.overlap(this.king, this.zoneP22, onZoneP, null, this);
        this.zoneP23 = this.add.zone(1280, 290).setSize(30, 30);
        this.physics.world.enable(this.zoneP23);
        this.physics.add.overlap(this.king, this.zoneP23, onZoneP, null, this);
        this.zoneP24 = this.add.zone(1280, 125).setSize(30, 30);
        this.physics.world.enable(this.zoneP24);
        this.physics.add.overlap(this.king, this.zoneP24, onZoneP, null, this);
        this.zoneP25 = this.add.zone(1490, 125).setSize(30, 30);
        this.physics.world.enable(this.zoneP25);
        this.physics.add.overlap(this.king, this.zoneP25, onZoneP, null, this);
        this.zoneP26 = this.add.zone(1490, 230).setSize(30, 30);
        this.physics.world.enable(this.zoneP26);
        this.physics.add.overlap(this.king, this.zoneP26, onZoneP, null, this);
        this.zoneP27 = this.add.zone(1360, 220).setSize(30, 30);
        this.physics.world.enable(this.zoneP27);
        this.physics.add.overlap(this.king, this.zoneP27, onZoneP, null, this);
        this.zoneP28 = this.add.zone(1360, 390).setSize(30, 30);
        this.physics.world.enable(this.zoneP28);
        this.physics.add.overlap(this.king, this.zoneP28, onZoneP, null, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(0.8);
        this.cameras.main.startFollow(this.king, true, 0.1, 0.1, -300, -200);


        //diálogos
        this.fala1 = ["PERIGO! CHÃO INSTÁVEL!"];
        this.fala2 = ["Caminho para o Pilar"];
        this.fala3 = ["As portas apenas se abrem para o real conhecimento..."];
        this.fala4 = ["Você completou uma volta :)"];
        this.dialog = new dialogs(this);
        this.quest_0 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 23 + 75 - 19 = ?",
        1, "◯ 81",  "◯ 79",  "◯ 77"]
        this.walkEnable = 1;

    }

    update(){
        if(this.walkEnable == 1){
            // velocidade horizontal
            if (this.keyD?.isDown) {
                this.king.setVelocityX(210);
                this.king.setFrame(18);
            }
            else if (this.keyA?.isDown) {
                this.king.setVelocityX(-210);
                this.king.setFrame(9);
            }
            else{
                this.king.setVelocityX(0); 
            }

            // velocidade vertical
            if (this.keyW.isDown) {
                this.king.setVelocityY(-210);
                this.king.setFrame(27);
            }
            else if (this.keyS.isDown) {
                this.king.setVelocityY(210);
                this.king.setFrame(1);
            }
            else{
                this.king.setVelocityY(0); 
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            console.log("space")
            if (this.dialog.isActive){

                this.dialog.nextDlg()
            }
            else
            {
                this.create_dialog = true;
            }
            
        }
    }

}



function onZone(){
        if (this.create_dialog){
            this.create_dialog = false;
            this.dialog.updateDlgBox(this.fala1);
        }
}

function onZone_2(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.fala2);
    }
}

function onZone_3(){
    if (this.create_dialog){
         this.create_dialog = false;
        this.dialog.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
    }
}

function onZone_4(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.fala4);
    }
}

function onZoneC(){
    this.walkEnable = 0;
}

function onZoneP(){
    this.walkEnable = 1;
}

function acertou_fcn(ptr){
    console.log("acertou");
    this.dialog.hideBox();
}

function errou_fcn(ptr){
    console.log("errou")
    this.dialog.hideBox();
}
