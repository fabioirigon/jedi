class fase_01_spider_1 extends Phaser.Scene {

    constructor ()
    {
        super('fase_01_spider_1'); 
    }

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
        this.physics.add.overlap(this.player, this.spider_bullet,  hit_fcn, null, this);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.keyE = this.input.keyboard.addKey('E');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2)

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;

    }

    // update é chamada a cada novo quadro
    update ()
    {
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }

    }

}



