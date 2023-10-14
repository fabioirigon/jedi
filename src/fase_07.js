// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
// ######## acertar nome da fase ##########
class Fase_07 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        // ######## acertar nome da fase ##########
        super('Fase_07'); 
        console.log('Fase_07')
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('wizardIdle_sp', 'assets/spritesheets/wizard_idle.png', { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('player_sp', 'assets/spritesheets/dante_1.png', { frameWidth: 48, frameHeight: 48 });
        
        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles_1', 'assets/images/tls_solaria.png');
        this.load.image('tiles_2', 'assets/images/tls_elfo.png');
        this.load.image('tiles_3', 'assets/images/tls_ork.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/fase_07.json');
    }
	
    create_map(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset1 = this.map.addTilesetImage('tls_solaria', 'tiles_1');
        this.tileset2 = this.map.addTilesetImage('tls_elfo', 'tiles_2');
        this.tileset3 = this.map.addTilesetImage('tls_ork', 'tiles_3');

        // criação das camadas
        this.ground1Layer = this.map.createLayer('Ground_1_fundo', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.colisao1Layer = this.map.createLayer('Colisao_1', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.ground2Layer = this.map.createLayer('Ground_2_objetos', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.colisao2Layer = this.map.createLayer('Colisao_2', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.ground3Layer = this.map.createLayer('Ground_3_Objetos_2', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
    }

    create_actors(){
        // criação do jogador
        this.player = this.physics.add.sprite(250, 75, 'player_sp', 0)
        this.player.setScale(0.6)
 
        this.mage  = this.physics.add.sprite(770, 100, 'wizardIdle_sp', 0);
        this.mage.setScale(0.9)
 
        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5)
    }

    create_animations(){
        this.anims.create({
            key: 'mage_idle',
            frames: this.anims.generateFrameNumbers('wizardIdle_sp', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8,9, 8, 7, 6, 5, 4, 3, 2, 1]}),
            frameRate: 6,
            repeat: -1
            });
    }

    create_collisions(){
        // criação da colisão com paredes
        this.colisao1Layer.setCollisionByProperty({"collider" : true});
       	this.colisao2Layer.setCollisionByProperty({"collider" : true});
       	this.ground3Layer.setDepth(10);

        this.physics.add.collider(this.player, this.colisao1Layer);
        this.physics.add.collider(this.player, this.colisao2Layer);

        // colisão com armadilhas
        //this.physics.add.overlap(this.player, this.traps, this.trapHit, null, this);
    }
       
    // criação do diálogo
    create_tweens()
    {
        var t0 = this.add.text(770, 100, "Você nunca verá as fadinhas", {
            font: "10px Arial",
            fill: "#F0A020",
            align: "center"
        });        
        var t1 = this.add.text(160, 100, "Vai se lascar!", {
            font: "25px Arial",
            fill: "#20C020",
            align: "center"
        });

        t0.alpha = 0
        t1.alpha = 0

        // timeline: sequência
        this.timeline = this.tweens.createTimeline();

        // primeira fala
        this.timeline.add({
            targets: t0,
            alpha: 1,
            ease: 'linear',
            duration: 500, 
            yoyo: true,
            hold: 3500
        });

        // segunda fala
        this.timeline.add({
            targets: t1,
            alpha: 1,
            ease: 'linear',
            duration: 500,
            yoyo: true,
            hold: 3500
        });

        // mago some
        this.timeline.add({
            targets: this.mage,
            alpha: 1,
            ease: 'linear',
            duration: true,
        });
        console.log('tline');

        // texto e tween da 'zona'
        var t3 = this.add.text(460, 100, "Na zona ;)", {
            font: "25px Arial",
            fill: "#20C020",
            align: "centedr"
        });
        t3.alpha = 0
        this.tzone = this.tweens.add({
                targets: t3,
                alpha: 1,
                paused: true,
                ease: 'Power1',
                duration: 500,
                yoyo: true,
                duration: 500,
            });
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

        // adicionando uma zona com gatilho, quando entrar aciona a função onZone
        this.zoneDialog = true;
        this.zone = this.add.zone(500, 100).setSize(100, 100);
        this.physics.world.enable(this.zone);
        this.physics.add.overlap(this.player, this.zone, this.onZone, null, this);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        // habilita movimento
        this.enable_move = true;

        // inicia diálogo e anima o mago:
        //this.timeline.play();
        this.mage.play('mage_idle')
    }

    // update é chamada a cada novo quadro
    update ()    {
        // variável enaable move controla o movimento
        if (this.enable_move){
            // testa se tecla pressionada e seta a velocidade do jogador 
            if (this.keyD?.isDown) {
                this.player.setVelocityX(210);
            }
            else if (this.keyA?.isDown) {
                this.player.setVelocityX(-210);
            }
            else{
                this.player.setVelocityX(0); 
            }

            // velocidade vertical
            if (this.keyW.isDown) {
                this.player.setVelocityY(-210);
            }
            else if (this.keyS.isDown) {
                this.player.setVelocityY(210);
            }
            else{
                this.player.setVelocityY(0); 
            }
        }
        else{
                this.player.setVelocity(0, 0); 
        }
    }
     // cria os textos
     onZone(){
        if (this.zoneDialog){
            this.zoneDialog = false;

            // pergunta: 
            this.quest = this.add.text(400, 100, "Meu avô tem 5 filhos, cada filho tem 3 filhos.\n Quantos primos eu tenho?", {
                font: "15px Arial",
                fill: "#20C020",
                align: "centedr"
            });
            this.a0 = this.add.text(400, 150, "15 primos", {
                font: "15px Arial",
                fill: "#20C020",
                align: "centedr"
            });
            this.a1 = this.add.text(400, 175, "12 primos", {
                font: "15px Arial",
                fill: "#20C020",
                align: "centedr"
            });
            this.a2 = this.add.text(400, 200, "14 primos", {
                font: "15px Arial",
                fill: "#20C020",
                align: "centedr"
            });

            // deixa clicar e liga com a função
            this.a0.setInteractive();
            this.a0.on('pointerdown', this.errou, this);
            this.a1.setInteractive();
            this.a1.on('pointerdown', this.errou, this);
            this.a2.setInteractive();
            this.a2.on('pointerdown', this.acertou, this);

            // impede o movimento
            this.enable_move = false;
            this.tzone.play();
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
    }
    
}