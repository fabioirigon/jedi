
var collisionZoneExit;

class Fase_06 extends Phaser.Scene {

    constructor (){
        console.log('##constructor - fase 6');
        super('Fase_06'); 
    }

    // Preload  
    preload() {
        console.log('Load Spritesheet - fase 6');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ice_tile_sp', 'assets/maps/IceTileset.png', { frameWidth: 32, frameHeight: 32, margin: 5 });
        this.load.image('ice_tiles', 'assets/maps/IceTileset.png');
        this.load.spritesheet('obj_tile_sp', 'assets/maps/[Base]BaseChip_pipo.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        this.load.image('obj_tiles', 'assets/maps/[Base]BaseChip_pipo.png')
        this.load.tilemapTiledJSON('Mapa_Fase6', 'map_prj/Mapa_Fase6.json');
        this.load.audio('snowy', ['assets/audio/snowy.mp3']);
        this.load.audio('baath', ['assets/audio/baath.mp3']);
        this.load.spritesheet('bat', 'assets/spritesheets/bat.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('boss', 'assets/spritesheets/boss.png', { frameWidth: 64, frameHeight: 64 });
    }

    // criar elementos
    create() {
        console.log('Create map - gelo');
        // criação do mapa e ligação com as imagens
        this.map = this.make.tilemap({ key: 'Mapa_Fase6', tileWidth: 32, tileHeight: 32 });
        this.IceTileset = this.map.addTilesetImage('IceTiled', 'ice_tiles');
        this.ObjTileset = this.map.addTilesetImage('Items2', 'obj_tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('chao', this.IceTileset, 0, 0);
        this.wallsLayer = this.map.createLayer('paredes', this.IceTileset, 0, 0);
        this.boardLayer = this.map.createLayer('placas', this.IceTileset, 0, 0);
        this.iceLayerVert = this.map.createLayer('geloVertical', this.IceTileset, 0, 0);
        this.iceLayerHor = this.map.createLayer('geloHorizontal', this.IceTileset, 0, 0);
        this.objLayer = this.map.createLayer('objetos', this.ObjTileset, 0, 0);
        this.stairLayer = this.map.createLayer('escada', this.ObjTileset, 0, 0);

        // criação dos personagens
        this.player = new player(this, 100, 100, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.walkEnable = 1;

        this.bat = new Enemy(this, 100, 300, 'bat', 1, this.player);
        this.bat2 = new Enemy(this, 600, 350, 'bat', 1, this.player);
        this.bat3 = new Enemy(this, 200, 300, 'bat', 1, this.player);
        this.bat4 = new Enemy(this, 850, 710, 'bat', 1, this.player);
        this.bat5 = new Enemy(this, 1055, 400, 'bat', 1, this.player);
        this.bat6 = new Enemy(this, 2000, 855, 'bat', 1, this.player);
        console.log("Bat criado");

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
		this.keyN = this.input.keyboard.addKey("N");  

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.3);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1, -200, -200);

        this.zonePlaca1 = this.add.zone(32*12, 64*3).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1);
        this.physics.add.overlap(this.player, this.zonePlaca1, Placa1, null, this);

        this.txtLst1 = ["Caminho congelando do conhecimento", "Para passar, responda as perguntas e cuidado para não escorregar"];
        this.txtResposta1a = ["Caminho A:"];
        this.txtResposta1b = ["Caminho B:"];
        this.txtResposta1c = ["Caminho C:"];
        this.dialog = new dialogs(this);
        this.create_dialog = false;
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.zoneEst1 = this.add.zone(16*65,32*5).setSize(32,64);
        this.physics.world.enable(this.zoneEst1);
        this.physics.add.overlap(this.player, this.zoneEst1, Questao1, null, this);

        this.quest_0 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 23 + 75 - 19 = ?",
            1, "A - ◯ 81",  "B - ◯ 79",  "C - ◯ 77"]
        this.quest_1 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 45 - 23 + 14 = ?",
            1, "A - ◯ 38",  "B - ◯ 36",  "C - ◯ 39"]
        this.quest_2 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 56 + 28 - 9 = ?",
            1, "A - ◯ 81",  "B - ◯ 75",  "C - ◯ 83"]

        this.textQuestao1 = ["Agora escolha o caminho da sua resposta"];

        this.zonePlaca1a = this.add.zone(32*38, 32*9).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1a);
        this.physics.add.overlap(this.player, this.zonePlaca1a, Placa1a, null, this);

        this.zonePlaca1b = this.add.zone(32*41, 32*7).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1b);
        this.physics.add.overlap(this.player, this.zonePlaca1b, Placa1b, null, this);

        this.zonePlaca1c = this.add.zone(32*41, 32*2).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1c);
        this.physics.add.overlap(this.player, this.zonePlaca1c, Placa1c, null, this);

        this.txtResposta2a = ["Caminho A:"];
        this.txtResposta2b = ["Caminho B:"];
        this.txtResposta2c = ["Caminho C:"];

        this.zoneEst2 = this.add.zone(16*95,32*26).setSize(32,64);
        this.physics.world.enable(this.zoneEst2);
        this.physics.add.overlap(this.player, this.zoneEst2, Questao2, null, this);

        this.quest_3 = ["Para continuar sua jornada, outra resposta você deve responder:\n 3x9 - 5 = ?",
	        1, "A - ◯ 24",  "B - ◯ 22",  "C - ◯ 23"]  
        this.quest_4 = ["Para continuar sua jornada, outra resposta você deve responder:\n 4x7 - 13 = ?",
	        1, "A - ◯ 17",  "B - ◯ 15",  "C - ◯ 16"]
        this.quest_5 = ["Para continuar sua jornada, outra resposta você deve responder:\n 2x8 - 4 = ?",
	        1, "A - ◯ 14",  "B - ◯ 12",  "C - ◯ 11"]  

        this.zonePlaca2a = this.add.zone(32*39, 32*20).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2a);
        this.physics.add.overlap(this.player, this.zonePlaca2a, Placa2a, null, this);

        this.zonePlaca2b = this.add.zone(32*39, 32*23).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2b);
        this.physics.add.overlap(this.player, this.zonePlaca2b, Placa2b, null, this);

        this.zonePlaca2c = this.add.zone(32*39, 32*26).setSize(64, 64);
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
        this.anims.create({
            key: 'boss',
            //frames: this.anims.generateFrameNumbers('boss', {frames: [126, 131, 136, 141, 146,151,156,161,166,171,176,181,186,191]}),
            frames: this.anims.generateFrameNumbers('boss', {frames: [50, 51, 52,53,54,101, 102]}),
            frameRate: 8,
            repeat: -1
            });
        this.enemy_boss.play("boss");

        this.physics.add.overlap(this.player, this.bat, damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.bat2, damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.bat3, damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.bat4, damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.bat5, damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.bat6, damagePlayer, null, this);

        this.physics.add.overlap(this.player.arrows, this.bat, damageEnemy, null, this);
        this.physics.add.overlap(this.player.arrows, this.bat2, damageEnemy, null, this);
        this.physics.add.overlap(this.player.arrows, this.bat3, damageEnemy, null, this);
        this.physics.add.overlap(this.player.arrows, this.bat4, damageEnemy, null, this);
        this.physics.add.overlap(this.player.arrows, this.bat5, damageEnemy, null, this);
        this.physics.add.overlap(this.player.arrows, this.bat6, damageEnemy, null, this);

    }

    moveE(Enemy, speedX, speedY) {
        Enemy.x += speedX*0.5;
        Enemy.y += speedY*0.5;
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.dialog.isActive) {
                this.dialog.nextDlg();
            } else {
                this.create_dialog = true;
            }
        }
    
        if (this.isInvulnerable) {
            // Verificar se o jogador está invulnerável antes de processar colisões
            if (this.invulnerabilityEndTime > this.time.now) {
                // Piscar o jogador (alternar a visibilidade)
                if (this.time.now % 300 < 150) {
                    this.player.setVisible(false);
                } else {
                    this.player.setVisible(true);
                }
            } else {
                // Fim da invulnerabilidade, redefinir a cor e parar de piscar
                this.player.clearTint();
                this.player.setVisible(true);
                this.isInvulnerable = false;
            }
        } else {
            if (this.iceLayerVert.getTileAtWorldXY(this.player.x, this.player.y) == null && this.iceLayerHor.getTileAtWorldXY(this.player.x, this.player.y) == null) {
                this.player.walkEnable = 1;
            } else {
                if (this.iceLayerVert.getTileAtWorldXY(this.player.x, this.player.y) != null) {
                    this.player.walkEnable = 0;
                    if (this.player.facing[1] == -1) {
                        this.player.setVelocityY(-210);
                    } else if (this.player.facing[1] == 1) {
                        this.player.setVelocityY(210);
                    }
                } else if (this.iceLayerHor.getTileAtWorldXY(this.player.x, this.player.y) != null) {
                    this.player.walkEnable = 0;
                    if (this.player.facing[0] == -1) {
                        this.player.setVelocityX(-210);
                    } else if (this.player.facing[0] == 1) {
                        this.player.setVelocityX(210);
                    }
                }
            }
    
            // Processar atualizações de inimigos somente se o jogador não estiver invulnerável
            this.bat.update(this.player);
            this.bat2.update(this.player);
            this.bat3.update(this.player);
            this.bat4.update(this.player);
            this.bat5.update(this.player);
            this.bat6.update(this.player);
    
            // Verificar se o jogador está morto
            if (this.player.dead == 1) {
                this.timedEvent = this.time.delayedCall(1500, resetFase, [], this);
            }
        }
        if (this.keyN.isDown) {
            console.log("nova")
            this.scene.start('Fase_08')
          }

    }

    enemyHit(player, enemy) {
        player.getDamage(10);
        if (player.getHPValue() <= 0) {
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
    this.dialog.updateDlgBox(["OH NÃO VOCÊ ACERTOU"]);
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
    this.dialog.updateDlgBox(["ACHO QUE ERROU. HEHEHEHEH"]);

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

function Questao1(){
    if(this.create_dialog){
        var value = Phaser.Math.Between(1,3);
        console.log(value);
        if(value == 1){
            this.dialog.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
        } else if(value == 2){
            this.dialog.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
        } else {
            this.dialog.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
        }
        this.create_dialog = false;
    }
}

function Questao2(){
    if(this.create_dialog){
        var value = Phaser.Math.Between(1,3);
        console.log(value);
        if(value == 1){
            this.dialog.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
        } else if(value == 2){
            this.dialog.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
        } else {
            this.dialog.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
        }
        this.create_dialog = false;
    }
}

function acertou_fcn(ptr){
    this.dialog.hideBox();
    this.dialog.updateDlgBox(this.textQuestao1);
}

function errou_fcn(ptr){
    this.dialog.updateDlgBox(this.textQuestao1);
}


function damagePlayer() {
    if (!this.isInvulnerable) {
        this.player.getDamage(10);
        this.isInvulnerable = true;
        this.invulnerabilityDuration = 1500; // Duração em milissegundos
        this.invulnerabilityEndTime = this.time.now + this.invulnerabilityDuration;

        // Defina a duração da invulnerabilidade (por exemplo, 2 segundos)
        this.time.delayedCall(this.invulnerabilityDuration, () => {
            this.isInvulnerable = false;
        }, [], this);

        // Aplicar o push-back
        if (this.player.direction == 0) {
            this.player.x -= 40;
        } else if (this.player.direction == 1) {
            this.player.x += 40;
        } else if (this.player.direction == 2) {
            this.player.y -= 40;
        } else if (this.player.direction == 3) {
            this.player.y += 40;
        }
    }
    this.player.setVisible(true);

}


function damageEnemy(enemy){
    console.log("dano inimigo");
    enemy.getDamage(3);
    console.log(enemy.getHPValue())
    if (enemy.getHPValue()<0) {
        console.log("Morcego morreu");
        enemy.body.enable=false;
        enemy.setVisible(false);
        enemy.bar.setVisible(false);
        enemy.bar_bg.setVisible(false);
    }
}

function resetFase(){
    this.bgsong1.stop();
    this.scene.restart();
}

