// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class phase_01 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        super('phase_01');
    }

    // função para carregamento de assets 
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('wizardIdle_sp', 'assets/spritesheets/wizard_idle.png', { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('tiles_sp', 'assets/images/dungeon-16-16.png', { frameWidth: 16, frameHeight: 16});
        
        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles', 'assets/images/dungeon-16-16.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/map_phase_01.json');
    }

    create_map(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
    }

    create_actors()
    {
        // criação do jogador
        //this.player = this.physics.add.sprite(250, 75, 'player_sp', 0)
        this.player = new player(this, 250, 75, 'player_sp', 0);
        this.player.setScale(0.6);

        this.mage  = this.physics.add.sprite(78, 128, 'wizardIdle_sp', 0);
        this.mage.setScale(0.9)

        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.2)   

    }

    create_animations()
    {
        this.anims.create({
            key: 'mage_idle',
            frames: this.anims.generateFrameNumbers('wizardIdle_sp', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8,9, 8, 7, 6, 5, 4, 3, 2, 1]}),
            frameRate: 6,
            repeat: -1
            });

    }

    create_collisions()
    {

        // criação da colisão com paredes
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.player, this.wallsLayer);

        // colisão com armadilhas
        this.physics.add.overlap(this.player, this.traps, this.trapHit, null, this);
    }


    // função para criação dos elementos
    create ()
    {
        console.log("create sc 1")

        this.create_map();

        this.create_actors();

        this.create_collisions();

        this.create_animations();


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


        // inicia diálogo e anima o mago:
        //this.mage.play('mage_idle')
    }


    // update é chamada a cada novo quadro
    update ()
    {
        // testa se tecla pressionada e seta a velocidade do jogador 

    }

    // a função limpa a flag 'zoneDialog' para executar o diálogo (tween) uma vez só
    onZone(){
        if (this.zoneDialog){
            this.zoneDialog = false;
            this.tzone.play();
        }
    }
}
