// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_02 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor (){
        super('Fase_02');
        //console.log('Fase_02')
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('mage_sp', 'assets/spritesheets/Mage.png', { frameWidth:48, frameHeight: 48});
        this.load.spritesheet('mage_sp2', 'assets/spritesheets/Mage.png', { frameWidth:48, frameHeight: 48});
        
        this.load.image('bullet', 'assets/images/bullet.png');

        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles', 'assets/images/dungeon2.png');
        console.log('load map');
        this.load.tilemapTiledJSON('themap', 'assets/maps/dungeon2B.json');
    }

    create_map(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('dungeon2', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
    }

    create_actors()
    {
        
        this.mage0 = this.physics.add.sprite(291.69999999999993, 2435.5, 'mage_sp',0)
        this.mage0.setScale(0.6)
        this.mage1 = this.physics.add.sprite(1347.2 , 2371.7, 'mage_sp2',0)
        this.mage1.setScale(0.6)
        // criação do jogador
        //this.player = this.physics.add.sprite(292.19999999999993  , 2887, 'player_sp', 0)
        this.player = new player(this, 292.19999999999993, 2887, 'player_sp', 0);
        this.player.setScale(0.6)
        // Criando mago
        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2)   // mudar para 2

    }

    create_animations()
    {

    }

    create_collisions()
    {

        // criação da colisão com paredes
        //this.wallsLayer.setCollisionBetween(0, 4000, true) // seta colisao com sprit de 0 a 4000
        this.wallsLayer.setCollisionByExclusion([-1], true)// seta colisao em todo mundo, menos em -1 onde so pode positivo
        this.physics.add.collider(this.player, this.wallsLayer);

        // colisão com armadilhas
        this.physics.add.overlap(this.player, this.traps, this.trapHit, null, this);
        
      
    }

    // criação do diálogo
    create_tweens()
    {   // falas
        var t0 = this.add.text(337.29999999999995  , 2872.6, "Acho que vejo um mago....", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });

        this.quest = this.add.text(323.2 , 2463.1, "O que é, o que é? É tão frágil que,\n só de mencioná-lo, ele se quebra?", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "centedr"
        });
        this.a0 = this.add.text(323.2, 2593.1, "Agua", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "centedr"
        });
        this.a1 = this.add.text(323.2, 2613.1, "Vidro", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "centedr"
        });
        this.a2 = this.add.text(323.2, 2633.1, "Silêncio", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "centedr"
        });


        t0.alpha = 1;
        this.quest.alpha = 0;
        this.a0.alpha = 0;
        this.a1.alpha = 0;
        this.a2.alpha = 0;

        this.timeline = this.tweens.createTimeline(); // sequencias
        this.timeline.add({ // colocando a fala
            targets: t0,
            alpha: 1,
            ease: 'linear',
            duration: 500, 
            yoyo: true,
            hold: 3500
        });
        this.tzone = this.tweens.add({
            targets: t0,
            alpha: 1,
            paused: true,
            ease: 'Power1',
            duration: 500,
            yoyo: true,
            duration: 500,
        });

        this.a2_anim = this.tweens.add({
            targets: this.a2,
            ease: 'linear',
            alpha: 1,
            paused: true,
            duaration:1000,
            delay: 10000,
        });

        this.mageAnin = this.tweens.add({
            targets: this.mage0,
            ease: 'linear',
            alpha: 0,
            paused: true,
            duaration:2000,
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
        this.zone = this.add.zone(288.29999999999995 ,2421.1).setSize(200, 50);
        this.physics.world.enable(this.zone);
        this.physics.add.overlap(this.player, this.zone, this.onZone, null, this);


        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');
        this.keyP = this.input.keyboard.addKey('P');

        // habilita movimento
        this.enable_move = true;
        this.player.has_bow = false;
        this.timeline.play();

    }


    // update é chamada a cada novo quadro
    update ()
    {
        /*
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
        if(this.keyP?.isDown){
            console.log("x",this.player.body.x,"y",this.player.body.y);
        }
        */
    }
        
    // ###################################################################
    // cria os textos
    onZone(){
        if (this.zoneDialog){
            this.zoneDialog = false;
            //this.cameras.
            // pergunta: 
            this.quest.alpha = 1;
            this.a0.alpha = 1;
            this.a1.alpha = 1;
            this.a2_anim.play();


            // deixa clicar e liga com a função
            this.a0.setInteractive();
            this.a0.on('pointerdown', this.errou, this);
            this.a1.setInteractive();
            this.a1.on('pointerdown', this.errou, this);
            this.a2.setInteractive();
            this.a2.on('pointerdown', this.acertou, this);
            // impede o movimento
            this.player.move_enable = false;
            this.player.anims.stop();
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
         //this.mage0.setVisible(false);
         this.mageAnin.play();


    }


}
