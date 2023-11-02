// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_01 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        super('Fase_01'); 
    } 

    // esta função é usada para receber dados, no caso o status da parede
    init(data)
    {
        this.movingWall_sts = 0;
        if ('movingWall_sts' in data){
            this.movingWall_sts = data.movingWall_sts;
        }
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wizardIdle_sp', 'assets/spritesheets/wizard_idle.png', { frameWidth: 80, frameHeight: 80});
        //CRITICO USAR
        this.load.spritesheet('tiles_sp', 'assets/images/dungeon-16-16.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('lightning_sp', 'assets/spritesheets/lightning.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('swordSwing_sp', 'assets/spritesheets/sw_swing.png', { frameWidth: 16, frameHeight: 16});
        
        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles', 'assets/images/dungeon-16-16.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/map_phase_01.json');

        this.load.audio('surf', ['assets/sound/Surf Rock Loop.ogg']);
    }

    create_map(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
        if (this.movingWall_sts != 1)
            this.movingWall = this.map.createLayer('movingWall', this.tileset, 0, 0);        
    }

    create_actors()
    {
        // criação das armadilhas
        this.traps  = this.physics.add.group();
        for (let i=36; i<=43; i++){
            this.traps.add(this.add.sprite(36*16+8, i*16+8, 'tiles_sp', 353))
        }
        for (let i=36; i<=57; i++){
            for (let j=58; j<=80; j=j+7){
                this.traps.add(this.add.sprite(j*16+8, i*16+8, 'tiles_sp', 353))
            }
        }


        // criação do jogador
        //this.player = this.physics.add.sprite(250, 75, 'player_sp', 0)
        var px = parseInt(localStorage.getItem('px')) || 250;
        var py = parseInt(localStorage.getItem('py')) || 50;
        if (py > 150){
            this.movingWall_sts = 1;
        }

        //this.player = new player(this, px, py, 'player_sp', 0);
        this.player = new player(this, 100, 40, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.has_bow = false;
        this.player.hp = parseInt(localStorage.getItem('hp')) || 100;

        // criação dos inimigos
        this.enemy_0  = this.physics.add.sprite(38*16, 1*16, 'tiles_sp', 638)
        this.enemy_1  = this.physics.add.sprite(44*16, 1*16, 'tiles_sp', 638)
        this.enemy_2  = this.physics.add.sprite(50*16, 1*16, 'tiles_sp', 638)
        this.enemy_3  = this.physics.add.sprite(64*16, 18*16, 'tiles_sp', 503)
        this.enemy_4  = this.physics.add.sprite(64*16, 26*16, 'tiles_sp', 503)
        this.enemy_5  = this.physics.add.sprite(50*16, 22*16, 'tiles_sp', 503)
        // this.enemy_6  = this.physics.add.sprite(100, 100, 'tiles_sp', 251)
        //CRITICO USAR
        this.enemy_6  = this.physics.add.sprite(1350, 900, 'tiles_sp', 251)
        this.enemy_0.setScale(2);this.enemy_1.setScale(2);this.enemy_2.setScale(2);
        this.enemy_3.setScale(2);this.enemy_4.setScale(2);this.enemy_5.setScale(2);
        this.enemy_6.setScale(2);
        this.enemy_3.setAlpha(0.7);this.enemy_4.setAlpha(0.7);this.enemy_5.setAlpha(0.7);

        this.heart_0  = this.physics.add.sprite(100, 600, 'tiles_sp', 530)

        this.bullets  = this.physics.add.group();
        for (let i=0; i<=5; i++){
            //var blt = this.add.sprite(-10, -10, 'tiles_sp', 658);
            var blt = this.physics.add.sprite(-10, -10, 'tiles_sp', 658);
            blt.setScale(3);
            blt.setBodySize(5, 5)
            blt.setActive(false);
            blt.setVisible(false);
            this.bullets.add(blt);
        }
        this.timer = this.time.addEvent({ delay: Phaser.Math.Between(2000, 4000), callback: this.monster_shoot, callbackScope: this });

        this.mage  = this.physics.add.sprite(78, 128, 'wizardIdle_sp', 0);
        this.mage.setScale(0.9)

        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5)   

        this.stairs = this.physics.add.sprite(98*16, 58*16, 'tiles_sp', 357);
        
        var text_cfg = {font: "30px Arial",fill: "#00C040",align: "center"}
        var tip_cfg = {font: "15px Arial",fill: "#00C040",align: "center"}
        //this.T1 = this.add.text(100, 750, "24", text_cfg);
        this.T1 = this.add.text(1400, 750, "24", text_cfg);
        this.T2 = this.add.text(1450, 750, "25", text_cfg);
        this.T3 = this.add.text(1500, 750, "26", text_cfg);
        this.tip = this.add.text(90, 860, "O ponto fraco do monstro são os múltiplos de 3.", tip_cfg);
        this.tip.setVisible(false);

        this.stairs.body.enable = false;
        this.stairs.setScale(2);
        this.stairs.setVisible(false);
    }

    create_animations()
    {
        this.anims.create({
            key: 'mage_idle',
            frames: this.anims.generateFrameNumbers('wizardIdle_sp', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8,9, 8, 7, 6, 5, 4, 3, 2, 1]}),
            frameRate: 6,
            repeat: -1
            });

        this.anims.create({
            key: 'lightning_anim',
            frames: this.anims.generateFrameNumbers('lightning_sp', {}),
            frameRate: 20,
            hideOnComplete: true,
            repeat: 3
            });

        this.anims.create({
            key: 'trap_anim',
            frames: this.anims.generateFrameNumbers('tiles_sp', {frames: [353,354,355,356,356]}),
            frameRate: 18,
            repeat: -1,
            repeatDelay: 1000,
            yoyo: true
            });

        this.anims.create({
            key: 'enemy_1_anim',
            frames: this.anims.generateFrameNumbers('tiles_sp', {start: 503, end: 510}),
            frameRate: 12,
            repeat: -1,
            repeatDelay: 500,
            yoyo: true
            });

        this.anims.create({
            key: 'enemy_6_anim',
            frames: this.anims.generateFrameNumbers('tiles_sp', {start: 251, end: 254}),
            frameRate: 12,
            repeat: -1,
            repeatDelay: 500,
            yoyo: true
            });

    }

    create_collisions()
    {

        // criação da colisão com paredes
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.player, this.wallsLayer);
        if (this.movingWall_sts != 1){
            this.movingWall.setCollisionByExclusion([-1])
            this.physics.add.collider(this.player, this.movingWall);
        }

        if (this.movingWall_sts != 1){
            this.door_3 = this.physics.add.sprite(23*16, 3*16, 'tiles_sp', 65);
            this.physics.add.overlap(this.player, this.door_3, this.trataPorta, null, this);
        }

        // colisão com os inimigos
        this.physics.add.overlap(this.player, this.enemy_0, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_1, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_2, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_3, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_4, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_5, this.enemyHit, null, this);
        this.physics.add.overlap(this.player, this.bullets, this.bulletHit, null, this);
        
        // colisão com armadilhas
        this.physics.add.overlap(this.player, this.traps, this.trapHit, null, this);

        this.physics.add.overlap(this.player, this.heart_0, this.getHeart, null, this);

        // colisão com escada
        this.physics.add.overlap(this.player, this.stairs, this.endFase, null, this);

        console.log(this.physics.add)
        this.physics.world.enable([this.T1, this.T2, this.T3])
        //this.game.physics.arcade.enable([this.T1]);
        this.physics.add.overlap(this.player, this.T1, this.onTextCorr, null, this);
        this.physics.add.overlap(this.player, this.T2, this.onTextErr, null, this);
        this.physics.add.overlap(this.player, this.T3, this.onTextErr, null, this);
    }

    create_tweens()
    {
        // movimento sobe e desce dos inimigos
          this.tweens.add({
            targets: [this.enemy_0, this.enemy_1, , this.enemy_2],
            y: 9*16,
            duration: 600,
            ease: 'Sine.easeInOut',
            offset:2000,
            //easeParams: [ 3.5 ],
            delay: 1000, 
            repeat:-1,
            yoyo:true,
        });

        var wd = window.innerWidth;
        var wh = window.innerHeight;
        console.log("wind", wd, wh)

        this.dlgBox = this.add.rectangle(wd/2, 3*wh/4, wd/2, wh/4, 0x000000);
        this.dlgBox.setScrollFactor(0);
        this.dlgBox.setVisible(false);

        var player_txt_cfg = {font: "15px Arial",fill: "#F0A020", align: "center"}
        var wiz_txt_cfg = {font: "15px Arial",fill: "#10F0A0", align: "center"}
        var t0 = this.add.text(2*wd/20, 6*wh/20, "Vá se acostumando com este calabouço.\nVocê nunca verá o sol novamente!", wiz_txt_cfg);
        var t1 = this.add.text(2*wd/20, 6*wh/20, "Fala com a minha mãozinha...", player_txt_cfg);
        var t2 = this.add.text(2*wd/20, 6*wh/20, "Vai se arrepender disso uhahahaha", wiz_txt_cfg);
        t0.alpha = 0
        t1.alpha = 0
        t2.alpha = 0
        sortBoxes(this);


        this.timeline = this.tweens.createTimeline();
        this.timeline.add({
            targets: t0,
            alpha: 1,
            ease: 'linear',
            duration: 1000, 
            yoyo: true,
            hold: 3000,
            onStart: this.createBox,
            onStartParams: [true, this.dlgBox, this.player],
        });

        this.timeline.add({
            targets: t1,
            alpha: 1,
            ease: 'linear',
            duration: 1000,
            yoyo: true,
            hold: 3000,
        });
        this.timeline.add({
            targets: t2,
            alpha: 1,
            ease: 'linear',
            duration: 1000,
            yoyo: true,
            hold: 3000,
            onComplete: this.createBox,
            onCompleteParams: [false, this.dlgBox, this.player],
        });
        this.timeline.add({
            targets: this.mage,
            alpha: 0,
            ease: 'linear',
            duration: 1000,
        });
        //this.timeline.play();

        this.mageDisapear = this.tweens.add({
            targets: this.mage,
            alpha: 0,
            ease: 'linear',
            duration: 1000,
            paused: true,
        });
        
        console.log('tline');
    }


    // função para criação dos elementos
    create ()
    {
        console.log("create sc 1")

        this.create_map();

        this.create_actors();

        this.create_collisions();

        this.create_animations();

        this.create_tweens();

        this.txtSeq = ["Vá se acostumando com este calabouço.\nVocê nunca verá o sol novamente!\n\n[ESPAÇO]", "Fala com a minha mãozinha...",  "Vai se arrepender disso uhahahaha"];
        this.dialogs = new dialogs(this)

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');
        this.keyEsc = this.input.keyboard.addKey("ESC");
        this.keyN = this.input.keyboard.addKey('N');
        this.game_over = false;


        // estado do jogador
        this.cur_wlk = 0
        if (this.movingWall_sts == 0)
        {
            //this.timeline.play();
            this.dialogs.updateDlgBox(this.txtSeq, 0, onEndDialog);
            this.mage.play('mage_idle')
        }
        else{
            this.mage.alpha = 0;
        }
        this.traps.playAnimation('trap_anim');

        this.enemy_3.play('enemy_1_anim');
        this.enemy_4.play('enemy_1_anim');
        this.enemy_5.play('enemy_1_anim');
        //USAR CRITICO
        this.enemy_6.play('enemy_6_anim');

        this.enemyHitCount = 0;

        this.light = this.add.sprite(this.player.x, this.player.y, 'lightning_sp')
        this.light.setVisible(false);
        this.light.setScale(1.6);


        if (this.movingWall_sts == 2){
            
            this.light.setScale(2);
            this.light.play("lightning_anim");
            this.player.getDamage(25);
            if (this.player.getHPValue() == 0){
                localStorage.setItem('hp',100);
                this.player.die();
            }
        }
        this.player.getDamage(0);
        //this.music = this.sound.add('surf');
        //this.music.play();

        this.score = this.add.text(300, 150, "score: " + 0, {font: "15px Arial",fill: "#FFFFFF", align: "center"});
        this.score.setScrollFactor(0);

        var question =  ["Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?",
        1, "◯ 3589 livros", "◯ 3859 livros",  "◯ 30859 livros",  "◯ 38590 livros"]
  

        //this.dialogs.makeQuestion(question, acertou, errou)
    }

    move_enemy(enemy){
        var dx = this.player.x-enemy.x;
        var dy = this.player.y-enemy.y;
        var scl = 130/Math.sqrt(dx*dx+dy*dy)
        if (dx*dx + dy*dy < 200*200 && scl>0){
            enemy.setVelocityX(dx*scl);
            enemy.setVelocityY(dy*scl);
        }
        else{
            enemy.setVelocityX(0);
            enemy.setVelocityY(0);
        }
    }

    // update é chamada a cada novo quadro
    update ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            console.log(this.player.x, this.player.y);
            //onEndDialog(this)
            if (this.dialogs.isActive)
                this.dialogs.nextDlg();
        }

        // Movimento do inimigo
        this.move_enemy(this.enemy_3);
        this.move_enemy(this.enemy_4);
        this.move_enemy(this.enemy_5);

        // inimigo atira CRITICO USAR
        this.bullets.getMatching('active', true).forEach(function(blt){
            var dx = blt.body.x - this.enemy_6.x;
            var dy = blt.body.y - this.enemy_6.y;

            if (dx*dx + dy *dy > 500*500){
                blt.setVisible(false);
                blt.setActive(false);
                blt.setPosition(-10, -10);
                blt.body.setVelocity(0, 0);

            }
        }, this);
    
        if (this.keyEsc.isDown) {
            if (this.timeline.isPlaying()){
              this.timeline.setTimeScale(100);
            }
        }


        if (this.game_over){
            if (this.keySPACE.isDown) {
                //this.movingWall_sts = 0;
                //this.scene.restart();
                this.scene.start('Fase_01', {'movingWall_sts': 0});
            }            
        }
        if (this.keyN.isDown) {
            this.scene.start('Fase_03')
        }

    }

    trataPorta (porta, player){
        console.log("porta");
        localStorage.setItem('hp',this.player.hp);
        this.scene.start('brick_push_scene');
    }

    enemyHit (player, enemy){
        player.getDamage(3);
        if (player.getHPValue() == 0){
            localStorage.setItem('hp',100);
            player.die();
        }
    }

    trapHit(player, trap){
        if (trap.anims.getProgress() > 0.1)
        {
            player.getDamage(5);
            if (player.getHPValue() == 0){
                localStorage.setItem('hp',100);
                player.die();
            }
        }
    }

    getHeart(player, heart){
        console.log("getheart");
        localStorage.setItem('px', heart.x);
        localStorage.setItem('py', heart.y);

        player.hp = (player.hp + 20 > 100? 100: player.hp + 20);
        player.getDamage(0);
        heart.setVisible(false);
        heart.disableBody();
        this.tip.setVisible(true);
    }

    bulletHit(player, bullet){
        player.getDamage(20);
        bullet.setActive(false);
        bullet.setVisible(false);
        if (player.getHPValue() == 0){
            localStorage.setItem('hp',100);
            player.die();
        }
    }

    endFase(player, stairs){
        this.scene.start('Fase_03')
    }


    createBox(tween, targets, setVisible, box, player){
        console.log('set vis', setVisible, box)
        box.setVisible(setVisible);
        player.move_enable = !setVisible;
    }
    //CRITICO USAR
    monster_shoot(){
        var bullet = this.bullets.getFirstDead(false);
        var vx = this.player.x - this.enemy_6.x
        var vy = this.player.y - this.enemy_6.y
        var scl = 170/Math.sqrt(vx*vx+vy*vy)
        //console.log('blt', bullet)
        if (bullet){
            bullet.body.reset(this.enemy_6.x, this.enemy_6.y);
            bullet.setActive(true);
            bullet.setVisible(true);

            bullet.body.setVelocityX(vx*scl);
            bullet.body.setVelocityY(vy*scl);        
        }
        this.timer = this.time.addEvent({ delay: Phaser.Math.Between(500, 3000), callback: this.monster_shoot, callbackScope: this });
    }
    gameOver(){
        console.log('game over');
        this.game_over = true;
        player.move_enable = false;

        var wd = window.innerWidth;
        var wh = window.innerHeight;        
        var txt_cfg = {font: "15px Arial",fill: "#F0F000", align: "center"}
        console.log(this.player.x, this.player.y, txt_cfg)
        var t0 = this.add.text(this.player.x, this.player.y, "Pressione Espaço para reiniciar", txt_cfg);
        //t0.setScrollFactor(0);
    }

    onTextCorr(scene, text){
        sortBoxes(this);
        this.light.setVisible(true);
        this.light.setPosition(this.enemy_6.x, this.enemy_6.y);
        this.light.play("lightning_anim");
        this.enemyHitCount = this.enemyHitCount +1;
        if (this.enemyHitCount >3){
            this.T1.body.enable=false;
            this.T2.body.enable=false;
            this.T3.body.enable=false;
            this.T1.setVisible(false);
            this.T2.setVisible(false);
            this.T3.setVisible(false);
            this.timer.remove(false);
            this.stairs.body.enable = true;
            this.stairs.setVisible(true);
    
            this.light.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                console.log('done');
                this.enemy_6.setVisible(false);
            }, this);
            
        }
    }

    onTextErr(player, text){
        //const idx = [0, 1, 2];
        sortBoxes(this);
    }

}

function onEndDialog(scene){
    scene.mageDisapear.play();
}
function acertou(pointer){
    console.log('acertou');
    this.dialogs.hideBox();
}
function errou(pointer){
    console.log('errou', this);
    this.dialogs.hideBox();
}

function sortBoxes(scene){

    const pos = [1350, 1450, 1550]
    pos.sort(() => Math.random() - 0.5)

    const b1 =  Math.floor(Math.random()*8+2);
    const b2 =  Math.floor(Math.random()*8+2);
    const b3 =  Math.floor(Math.random()*8+2);
    const ypos = (scene.T1.y == 600 ? 750 : 600);

    console.log("err -- ..", scene.T1.y)

    //this.T1.setPosition(1400, 600);
    scene.T1.setPosition(pos[0], ypos);
    scene.T2.setPosition(pos[1], ypos);
    scene.T3.setPosition(pos[2], ypos);
    scene.T1.text = parseInt(b1*3);
    scene.T2.text = parseInt(b2*3+1);
    scene.T3.text = parseInt(b3*3+2);
}