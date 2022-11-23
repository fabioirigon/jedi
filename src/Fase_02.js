// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_02 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        super('Fase_02');
        //console.log('Fase_02')
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('player_sp', 'assets/spritesheets/dante_1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('mage_sp', 'assets/spritesheets/Mage.png', { frameWidth:48, frameHeight: 48});
        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles', 'assets/images/dungeon2.png');
        console.log('load map');
        this.load.tilemapTiledJSON('themap', 'assets/maps/dungeon2.json');
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
        // criação do jogador
        this.player = this.physics.add.sprite(120.1 , 2038.1, 'player_sp', 0)
        this.player.setScale(0.6)
        // Criando mago
        this.mage = this.physics.add.sprite(67.19999999999999 , 1596.6999999999998, 'mage_sp',0)
        this.mage.setScale(0.6)
        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1)   

    }

    create_animations()
    {

    }

    create_collisions()
    {

        // criação da colisão com paredes
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.player, this.wallsLayer);

        // colisão com armadilhas
        this.physics.add.overlap(this.player, this.traps, this.trapHit, null, this);
    }

    // criação do diálogo
    create_tweens()
    {   // falas
        var t0 = this.add.text(203.70000000000002 , 2072.7, "Acho que vejo um mago....", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });
        t0.alpha = 0
        this.timeline = this.tweens.createTimeline(); // sequencias
        this.timeline.add({ // colocando a fala
            targets: t0,
            alpha: 1,
            ease: 'linear',
            duration: 1000, 
            yoyo: true,
            hold: 3000
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
        this.zone = this.add.zone(67.19999999999999,1596.6999999999998).setSize(50, 50);
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

    }


    // update é chamada a cada novo quadro
    update ()
    {
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
    }
        
    // ###################################################################
    // cria os textos
    onZone(){
        if (this.zoneDialog){
            this.zoneDialog = false;

            // pergunta: 
            this.quest = this.add.text(127.1 , 1663.6, "O que é, o que é? É tão frágil que,\n só de mencioná-lo, ele se quebra?", {
                font: "18px Arial",
                fill: "#ffffff",
                align: "centedr"
            });
            this.a0 = this.add.text(127.1, 1703.6, "Agua", {
                font: "18px Arial",
                fill: "#ffffff",
                align: "centedr"
            });
            this.a1 = this.add.text(127.1, 1723.6, "Vidro", {
                font: "18px Arial",
                fill: "#ffffff",
                align: "centedr"
            });
            this.a2 = this.add.text(127.1, 1743.6, "Manteiga", {
                font: "18px Arial",
                fill: "#ffffff",
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
         this.a2    .setVisible(false);
    }


}
