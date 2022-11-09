class Phase_01 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        super('Phase_01');
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
        this.load.spritesheet('player_sp', 'assets/spritesheets/dante_1.png', { frameWidth: 48, frameHeight: 48 });

        
        // carregando mapa (json) e gráficos do mapa
        this.load.image('tiles', 'assets/images/dungeon-16-16.png');
        this.load.image('tiles2', 'assets/images/ProjectUtumno_full.png');
        this.load.image('tiles3', 'assets/images/dungeon_tiles.png');
        this.load.image('tiles4', 'assets/images/base_out_atlas.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/map_phase_02.tmj');
    }

    create_map(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset0 = this.map.addTilesetImage('dungeon_tiles', 'tiles3');
        this.tileset1 = this.map.addTilesetImage('base_out_atlas', 'tiles4');
        this.tileset_PU = this.map.addTilesetImage('ProjectUtumno_full', 'tiles2');

        // criação das camadas
        this.wallsMap = this.map.createLayer('walls', this.tileset0, 0, 0);
        this.groundLayer = this.map.createLayer('ground', this.tileset0, 0, 0);
        this.groundLayer = this.map.createLayer('bateOutAtlas', this.tileset1, 0, 0);
        this.groundLayer = this.map.createLayer('projectUtumno', this.tileset_PU, 0, 0);
    }

    create_actors()
    {


        // criação do jogador
        this.player = this.physics.add.sprite(137, 75, 'player_sp', 0)
        this.player.setScale(0.6)


        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5)   
;

    }

    create_animations()
    {
        // animações (caminhando)        
        this.anims.create({
            key: 'pl_wlk_dwn',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [0, 4, 8, 12]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_lef',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [1, 5, 9, 13]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_up',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [2, 6, 10, 14]}),
            frameRate: 8,
            repeat: -1
            });
        this.anims.create({
            key: 'pl_wlk_rig',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [3, 7, 11, 15]}),
            frameRate: 8,
            repeat: -1
            });

    }

    create_collisions()
    {

        // criação da colisão com paredes
        this.wallsMap.setCollisionBetween(0, 9999, true)
        this.physics.add.collider(this.player, this.wallsMap);

        /* // colisão com os inimigos
        this.physics.add.overlap(this.player, this.enemy_0, enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_1, enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_2, enemyHit, null, this);
        this.physics.add.overlap(this.player, this.enemy_3, enemyHit, null, this);
        */
        
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
    }


    // update é chamada a cada novo quadro
    update ()
    {
        // testa se tecla pressionada e seta a velocidade do jogador 
        if (this.keyD?.isDown) {
            this.player.setVelocityX(210);
            if (this.cur_wlk != 1 && this.player.body.velocity.y == 0){
                this.cur_wlk = 1;
                this.player.play("pl_wlk_rig");
            }
        }
        else if (this.keyA?.isDown) {
            this.player.setVelocityX(-210);
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
            this.player.setVelocityY(-210);
            if (this.cur_wlk != 3){
                this.cur_wlk = 3;
                this.player.play("pl_wlk_up");
            }
        }
        else if (this.keyS.isDown) {
            this.player.setVelocityY(210);
            if (this.cur_wlk != 4){
                this.cur_wlk = 4;
                this.player.play("pl_wlk_dwn");
            }
        }
        else{
            this.player.setVelocityY(0); 
        }

        /*
        if (Phaser.Input.Keyboard.JustDown(this.keyD))
        {
            console.log('jd')
            this.player.play("pl_wlk_rig");
        }*/
        
    }
}