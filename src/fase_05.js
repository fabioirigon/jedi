// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
class Fase_05 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        super('Fase_05');
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('player_sp', 'assets/spritesheets/elle.png', { frameWidth: 16, frameHeight: 16 });

        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles_estruturas1', 'assets/images/estruturas1.png');
        this.load.image('tiles_forest', 'assets/images/forest.png');
        this.load.image('tiles_ground', 'assets/images/ground.png');
        this.load.image('tiles_navioEjaulas', 'assets/images/navioEjaulas.png');
        this.load.image('tiles_tapetes', 'assets/images/tapetes.png');
        this.load.image('tiles_vila1', 'assets/images/vila1.png');
        this.load.image('tiles_vila2', 'assets/images/vila2.png');
        this.load.image('tiles_vila3', 'assets/images/vila3.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/mapaPhase05.json');
        console.log('LoadTiles');

    }

    create_map(){

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset1 = this.map.addTilesetImage('estruturas1', 'tiles_estruturas1');
        this.tileset2 = this.map.addTilesetImage('forest', 'tiles_forest');
        this.tileset3 = this.map.addTilesetImage('ground', 'tiles_ground');
        this.tileset4 = this.map.addTilesetImage('navioEjaulas', 'tiles_navioEjaulas');
        this.tileset5 = this.map.addTilesetImage('tapetes', 'tiles_tapetes');
        this.tileset6 = this.map.addTilesetImage('vila1', 'tiles_vila1');
        this.tileset7 = this.map.addTilesetImage('vila2', 'tiles_vila2');
        this.tileset8 = this.map.addTilesetImage('vila3', 'tiles_vila3');
        console.log('CreateTiles');

        var tilesets = ['estruturas1','forest','ground','navioEjaulas','navioEjaulas','tapetes','vila1','vila2','vila3'];

        // criação das camadas
        this.groundLayer1 = this.map.createLayer('Ground', tilesets);
        this.wallsLayer1 = this.map.createLayer('River', tilesets);
        this.groundLayer2 = this.map.createLayer('Pontes', tilesets);
        this.wallsLayer2 = this.map.createLayer('BlockingPassage', tilesets);
        this.groundLayer3 = this.map.createLayer('SoftPlants', tilesets);
        this.wallsLayer3 = this.map.createLayer('HardPlants', tilesets);
        this.wallsLayer4 = this.map.createLayer('GroundObjects', tilesets);
        this.wallsLayer5 = this.map.createLayer('GroundStructures', tilesets);
        this.wallsLayer6 = this.map.createLayer('SkyStructures', tilesets);
        console.log('CreateLayers');
    }

    create_actors()
    {

        // criação do jogador
        this.player = this.physics.add.sprite(10, 840, 'player_sp', 0);
        this.player.setScale(1);

        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5)

        console.log('CreateActors');
    }

    create_animations()
    {
        // animações (caminhando)
        this.anims.create({
            key: 'pl_wlk_dwn',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [1, 2, 3, 4]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_lef',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [7, 8, 9, 10]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_up',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [19,20,21,22]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_rig',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [13,14,15,16]}),
            frameRate: 8,
            repeat: -1
            });

            console.log('CreateAnimations');
    }

    create_collisions()
    {

        // criação da colisão com paredes
        this.wallsLayer1.setCollisionBetween(0, 10000,true);
        this.physics.add.collider(this.player, this.wallsLayer1);
        this.wallsLayer2.setCollisionBetween(0, 10000,true);
        this.physics.add.collider(this.player, this.wallsLayer2);
        this.wallsLayer3.setCollisionBetween(0, 10000,true);
        this.physics.add.collider(this.player, this.wallsLayer3);
        this.wallsLayer4.setCollisionBetween(0, 10000,true);
        this.physics.add.collider(this.player, this.wallsLayer4);
        this.wallsLayer5.setCollisionBetween(0, 10000,true);
        this.physics.add.collider(this.player, this.wallsLayer5);
        this.wallsLayer6.setCollisionBetween(0, 10000,false);
        this.physics.add.collider(this.player, this.wallsLayer5);

        console.log('CreateCollisions');
    }

    // função para criação dos elementos
    create ()
    {
        this.create_map();

        this.create_actors();

        this.create_collisions();

        this.create_animations();


        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');


        // estado do jogador
        this.cur_wlk = 0

        console.log('Create');
    }


    // update é chamada a cada novo quadro
    update ()
    {
        // testa se tecla pressionada e seta a velocidade do jogador
        if (this.keyD?.isDown) {
            this.player.setVelocityX(150);
            if (this.cur_wlk != 1 && this.player.body.velocity.y == 0){
                this.cur_wlk = 1;
                this.player.play("pl_wlk_rig");
            }
        }
        else if (this.keyA?.isDown) {
            this.player.setVelocityX(-150);
            if (this.cur_wlk != 2 && this.player.body.velocity.y == 0){
                this.cur_wlk = 2;
                this.player.play("pl_wlk_lef");
            }
        }
        else{
            this.player.setVelocityX(0);
            if (this.cur_wlk != 0 && this.player.body.velocity.y == 0){
                this.cur_wlk = 0;
                this.player.anims.stop();
            }
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            this.player.setVelocityY(-150);
            if (this.cur_wlk != 3){
                this.cur_wlk = 3;
                this.player.play("pl_wlk_up");
            }
        }
        else if (this.keyS.isDown) {
            this.player.setVelocityY(150);
            if (this.cur_wlk != 4){
                this.cur_wlk = 4;
                this.player.play("pl_wlk_dwn");
            }
        }
        else{
            this.player.setVelocityY(0);
        }

    }
}
