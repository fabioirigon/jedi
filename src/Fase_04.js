
var collisionZoneExit;

class Fase_04 extends Phaser.Scene {

    // Preload
    preload() {
        console.log('Load Spritesheet');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ice_tile_sp', 'assets/maps/IceTileset.png', { frameWidth: 32, frameHeight: 32, margin: 5 });
        this.load.image('ice_tiles', 'assets/maps/IceTileset.png');
        this.load.spritesheet('obj_tile_sp', 'assets/maps/[Base]BaseChip_pipo.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        this.load.image('obj_tiles', 'assets/maps/[Base]BaseChip_pipo.png')
        this.load.tilemapTiledJSON('Mapa_Fase4', 'map_prj/Mapa_Fase4.json');
        this.load.audio('snowy', ['assets/audio/snowy.mp3']);
        this.load.audio('baath', ['assets/audio/baath.mp3']);
        this.load.spritesheet('bat', 'assets/spritesheets/bat.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('boss', 'assets/spritesheets/boss.png', { frameWidth: 64, frameHeight: 64 });
    }

    // criar elementos
    create() {
        console.log('Create map');
        // criação do mapa e ligação com as imagens
        this.map = this.make.tilemap({ key: 'Mapa_Fase4', tileWidth: 32, tileHeight: 32 });
        this.IceTileset = this.map.addTilesetImage('IceTiled', 'ice_tiles');
        this.ObjTileset = this.map.addTilesetImage('Items2', 'obj_tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('chao', this.IceTileset, 0, 0);
        this.wallsLayer = this.map.createLayer('paredes', this.IceTileset, 0, 0);
        this.boardLayer = this.map.createLayer('placas', this.IceTileset, 0, 0);
        this.iceLayer = this.map.createLayer('gelo', this.IceTileset, 0, 0);
        this.objLayer = this.map.createLayer('objetos', this.ObjTileset, 0, 0);
        this.stairLayer = this.map.createLayer('escada', this.ObjTileset, 0, 0);

        // criação dos personagens
        this.player = new player(this, 100, 700, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.walkEnable = 1;
        this.bat = new Enemy(this, 300, 300, 'bat', 1, this.player);
        this.bat2 = new Enemy(this, 600, 350, 'bat', 1, this.player);
        this.bat3 = new Enemy(this, 200, 300, 'bat', 1, this.player);
        this.bat4 = new Enemy(this, 850, 710, 'bat', 1, this.player);
        this.bat5 = new Enemy(this, 1055, 400, 'bat', 1, this.player);
        this.bat6 = new Enemy(this, 2000, 855, 'bat', 1, this.player);

        //minha parte
        this.enemy_boss = this.physics.add.sprite(250, 750, 'boss', 120);
        this.enemyHitCount = 0;
        this.zoneExitBoss = this.add.zone(20, 880).setSize(32, 32);
        this.physics.world.enable(this.zoneExitBoss);
        this.physics.add.overlap(this.player, this.enemy_boss, this.playerOverlapEnemy, null, this);

        // criação da colisão
        this.wallsLayer.setCollisionBetween(0, 130, true);
        this.physics.add.collider(this.player, this.wallsLayer);

        this.boardLayer.setCollisionBetween(0, 130, true);
        this.physics.add.collider(this.player, this.boardLayer);

        this.objLayer.setCollisionBetween(0, 2000, true);
        this.physics.add.collider(this.player, this.objLayer);



        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.3);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1, -200, -200);

        this.zonePlaca1 = this.add.zone(32 * 12, 64 * 3).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1);
        this.physics.add.overlap(this.player, this.zonePlaca1, Placa1, null, this);

        this.txtLst1 = ["Caminho congelando do conhecimento", "Para passar, responda as perguntas e cuidado para não escorregar"];
        this.txtResposta1a = ["Caminho A: 81"];
        this.txtResposta1b = ["Caminho B: 79"];
        this.txtResposta1c = ["Caminho C: 77"];
        this.dialog = new dialogs(this);
        this.create_dialog = false;
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.zonePlaca1a = this.add.zone(32 * 38, 32 * 9).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1a);
        this.physics.add.overlap(this.player, this.zonePlaca1a, Placa1a, null, this);

        this.zonePlaca1b = this.add.zone(32 * 41, 32 * 7).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1b);
        this.physics.add.overlap(this.player, this.zonePlaca1b, Placa1b, null, this);

        this.zonePlaca1c = this.add.zone(32 * 41, 32 * 2).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1c);
        this.physics.add.overlap(this.player, this.zonePlaca1c, Placa1c, null, this);

        this.txtResposta2a = ["Caminho A: 24"];
        this.txtResposta2b = ["Caminho B: 22"];
        this.txtResposta2c = ["Caminho C: 23"];

        this.zonePlaca2a = this.add.zone(32 * 39, 32 * 20).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2a);
        this.physics.add.overlap(this.player, this.zonePlaca2a, Placa2a, null, this);

        this.zonePlaca2b = this.add.zone(32 * 39, 32 * 23).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2b);
        this.physics.add.overlap(this.player, this.zonePlaca2b, Placa2b, null, this);

        this.zonePlaca2c = this.add.zone(32 * 39, 32 * 26).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2c);
        this.physics.add.overlap(this.player, this.zonePlaca2c, Placa2c, null, this);

        //criação da música
        this.bgsong1 = this.sound.add('snowy');
        this.bgnormal = true;
        this.bssong1 = this.sound.add('baath');
        this.bgboss = false;
        this.zoneMusicBoss = this.add.zone(450, 830).setSize(64, 64);
        this.physics.world.enable(this.zoneMusicBoss);
        this.BossMessage1 = ["Se prepare para congelar o cérebro, tolo! Para Não congelar é preciso por multiplos de 3 caminhar"];
        this.BossMessage2 = ["OH NÃO FUI DESCONGELADOOOO!"];
        this.physics.add.overlap(this.player, this.zoneMusicBoss, BossMessage, null, this);

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 1,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.bgsong1.play(musicConfig);

        //numeros minha parte
        var text_cfg = { font: "30px Arial", fill: "#00C040", align: "center" }
        this.T1 = this.add.text(125, 650, "24", text_cfg);
        this.T2 = this.add.text(225, 650, "25", text_cfg);
        this.T3 = this.add.text(325, 650, "26", text_cfg);

        //colisao minha parte
        console.log(this.physics.add)
        this.physics.world.enable([this.T1, this.T2, this.T3])
        this.physics.add.overlap(this.player, this.T1, onTextCorr, null, this);
        this.physics.add.overlap(this.player, this.T2, onTextErr, null, this);
        this.physics.add.overlap(this.player, this.T3, onTextErr, null, this);

        this.zoneExitBoss.body.setAllowGravity(false);
        this.zoneExitBoss.body.setImmovable(true);

        collisionZoneExit = this.physics.add.collider(this.player, this.zoneExitBoss, this.playerCollideZone, null, this);

    }

    moveE(Enemy, speedX, speedY) {
        Enemy.x += speedX;
        Enemy.y += speedY;
    }

    update() {


        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.dialog.isActive) {

                this.dialog.nextDlg()
            }
            else {
                this.create_dialog = true;
            }
        }

        if (this.iceLayer.getTileAtWorldXY(this.player.x, this.player.y) == null) {
            this.player.walkEnable = 1;
        } else {
            this.player.walkEnable = 0;
        }

        //this.moveE(this.bat, -50, -50);
        //this.moveE(this.bat, 50, 50);
    }

    enemyHit(player, enemy) {
        player.getDamage(10);
        if (player.getHPValue() == 0) {
            // this.localStorage.setItem('hp', 100);
            player.die();
        }
    }

    playerCollideZone(player, zone) {
        // Ação a ser executada quando o jogador colide com a zona
        console.log('O jogador colidiu com a zona!');
        this.dialog.updateDlgBox(["QUER SAIR? SÓ POR CIMA DO MEU CADAVER"]);
    }

    playerOverlapEnemy(player, enemy_boss) {
        // Ação a ser executada quando o jogador sobrepor o inimigo
        console.log('O jogador tomou dano!');

        // ...resto do código para lidar com o dano ao jogador...
    }


    deleteCollision() {
        collisionZoneExit.destroy();
        collisionZoneExit = this.physics.add.overlap(this.player, this.zoneExitBoss, this.changeFase, null, this);
    }

    changeFase() {
        console.log('Saindo da fase');
    }


    // createAnimation(){
    //     this.anims.create({

    //     });
    // }


}



function sortBoxes(scene) {

    const pos = [125, 225, 325]
    pos.sort(() => Math.random() - 0.5)

    const b1 = Math.floor(Math.random() * 8 + 2);
    const b2 = Math.floor(Math.random() * 8 + 2);
    const b3 = Math.floor(Math.random() * 8 + 2);
    const ypos = (scene.T1.y == 650 ? 850 : 650);

    console.log("err -- ..", scene.T1.y);

    scene.T1.setPosition(pos[0], ypos);
    scene.T2.setPosition(pos[1], ypos);
    scene.T3.setPosition(pos[2], ypos);
    scene.T1.text = parseInt(b1 * 3);
    scene.T2.text = parseInt(b2 * 3 + 1);
    scene.T3.text = parseInt(b3 * 3 + 2);
}

function onTextCorr(scene, text) {
    console.log("hit enemy..", this.enemyHitCount)
    sortBoxes(this);
    flashColor(scene.scene);
    this.enemyHitCount = this.enemyHitCount + 1;
    if (this.enemyHitCount > 5) {

        this.T1.body.enable = false;
        this.T2.body.enable = false;
        this.T3.body.enable = false;
        this.T1.setVisible(false);
        this.T2.setVisible(false);
        this.T3.setVisible(false);
        console.log('done');
        this.dialog.updateDlgBox(this.BossMessage2);
        this.enemy_boss.setVisible(false);
        this.deleteCollision();

    }
}

function changeFase() {
    console.log("Saiu da fase");
}

function flashColor(scene) {
    console.log(scene)
    scene.enemy_boss.setTint(0xFF0000);

    scene.time.addEvent({
        delay: 200,
        callback: function () { scene.enemy_boss.clearTint(); },
        callbackScope: this,
    });
}

function onTextErr(player, text) {
    //const idx = [0, 1, 2];
    sortBoxes(this);
    console.log("erro jogador DAR DANO");
    this.enemyHit(this.player)
    console.log(this.player.getHPValue());
}

function Placa1() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtLst1);
    }
}

function Placa1a() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1a);
    }
}

function Placa1b() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1b);
    }
}
function Placa1c() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1c);
    }
}

function Placa2a() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2a);
    }
}

function Placa2b() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2b);
    }
}
function Placa2c() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2c);
    }
}

function BossMessage() {
    if (this.create_dialog) {
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.BossMessage1);
    }

    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 1,
        seek: 0,
        loop: true,
        delay: 0
    }

    this.bgsong1.stop();
    this.bssong1.play(musicConfig);

}