<!doctype html> 
    <!-- HTML Padrão -->
<html lang="en"> 
<head> 
    <meta charset="UTF-8" />
    <title>Intro Phaser 3</title>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
    <!--<script src="phaser.js"></script> -->
    <script src="src/actors.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>

    <!-- código javascript -->
<script type="text/javascript">

    //import { Actor } from 'actors.js'

    // Configuração do jogo
    var config = {
        type: Phaser.AUTO,

        // resolução e sistema de colisão.
        width: 800,
        height: 600,
        physics: {
              default: 'arcade',
              arcade: {
                  debug: true,
              },
        },

        // tratamento dos gráficos: pixelado
        render: {
          antialiasGL: false,
          pixelArt: true,
        },

        // funções da classe scene:
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    // variáveis globais - jogo e jogador
    console.log('start*');
    var game = new Phaser.Game(config);
    var king;

    // função para carregamento de assets
    function preload ()
    {
        console.log('load spritesheet');
        this.load.spritesheet('king_sp', 'assets/spritesheets/a-king.png', { frameWidth: 78, frameHeight: 58 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('tiles_sp', 'assets/maps/dungeon-16-16.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        console.log('load tile sheet');
        this.load.image('tiles', 'assets/maps/dungeon2.png');
        console.log('load map');
        //this.load.tilemapTiledJSON('themap', 'assets/maps/phaser_intro_map.json');
        this.load.tilemapTiledJSON('themap', 'map_prj/dungeon2.json');
    }

    // função para criação dos elementos
    function create ()
    {

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon2', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        // criação do rei
        //king = this.physics.add.sprite(100, 300, 'king_sp', 5);
        //console.log(Actor)
        king = new Actor(this, 100, 300, 'king_sp', 5);
        //this.enemy = this.physics.add.sprite(100, 100, 'tiles_sp', 166);
        this.enemy  = new Enemy(this, 100, 100, 'tiles_sp', 166);

        // criação da colisão
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(king, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.fballs = this.physics.add.group({
            key: 'fball',
        });
        this.physics.add.collider(this.fballs, this.wallsLayer, fball_hit, null, this);

        // criação da animação de ataque
        this.anims.create({
            key: 'atack',
            frames: this.anims.generateFrameNumbers('king_sp', {frames: [0, 3, 4]}),
            frameRate: 10,
            repeat: 0
            });

        this.anims.create({
            key: 'fire_anim',
            frames: this.anims.generateFrameNumbers('fball_sp', {frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
            });

        this.anims.create({
            key: 'enemy_anim',
            frames: this.anims.generateFrameNumbers('tiles_sp', {frames: [166, 167, 168, 169, 170]}),
            frameRate: 8,
            repeat: -1
            });
        this.enemy.play("enemy_anim");

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    // update é chamada a cada novo quadro
    function update ()
    {
        //king.bar.draw()
        this.enemy.update(king);
        // velocidade horizontal
        if (this.keyD?.isDown) {
            king.setVelocityX(210);
            king.checkFlip();
        }
        else if (this.keyA?.isDown) {
            king.setVelocityX(-210);
            king.checkFlip();
        }
        else{
            king.setVelocityX(0); 
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            king.setVelocityY(-210);
        }
        else if (this.keyS.isDown) {
            king.setVelocityY(210);
        }
        else{
            king.setVelocityY(0); 
        }

        // espaço: ataque
        if (this.keySPACE.isDown) {
            king.anims.play('atack', true);
        }

       if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
                console.log("space")
                fb = this.physics.add.sprite(king.x, king.y, 'fball_sp', 0);
                fb.scaleY = 0.7;
                this.fballs.add(fb);
                fb.setVelocityX(king.flipX?-300:300)
                fb.flipX = king.flipX;
                fb.anims.play("fire_anim", true);
                
        }

    }

    function fball_hit (fb, groundLayer) {
        fb.destroy();
    }

</script>

</body>
</html>