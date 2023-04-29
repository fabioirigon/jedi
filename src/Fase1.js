// Configuração do jogo

//var player;
console.log("WHISTLE BABY");
class Fase1 extends Phaser.Scene{
    
    preload ()
    {
        console.log('load spritesheet');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player.png', { frameWidth: 32, frameHeight: 32 });
        console.log('load tile sheet');
        this.load.image('tiles', 'assets/maps/tilesheet.png');
        console.log('load map');
        this.load.tilemapTiledJSON('themap', 'assets/maps/Mapa.json');
    }

// função para criação dos elementos
     create ()
    {

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('tileset', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createDynamicLayer('Chao', this.tileset, 0, 0);
        this.wallsLayer = this.map.createDynamicLayer('Parede', this.tileset, 0, 0);
        

        // criação do rei
        this.player = this.physics.add.sprite(100, 300, 'player_sp', 0);
        this.player.body.width = 20;

        this.wallsLayer.setCollisionBetween(60, 80, true);
        this.physics.add.collider(this.player, this.wallsLayer, function(){
            console.log("Colissssion!");
        });
        
        
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [24, 25, 26, 27]}),
            frameRate: 10,
            repeat: 0
            });

        }


// update é chamada a cada novo quadro
     update ()
        {
        // velocidade horizontal
        if (this.keyD?.isDown) {
            this.player.setVelocityX(210);
            this.player.anims.play('run', true);
        }
        else if (this.keyA?.isDown) {
            this.player.setVelocityX(-210);
            this.player.anims.play('run', true);
        }
        else{
            this.player.setVelocityX(0); 
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            this.player.setVelocityY(-210);
            this.player.anims.play('run', true);
        }
        else if (this.keyS.isDown) {
            this.player.setVelocityY(210);
            this.player.anims.play('run', true);
        }
        else{
            this.player.setVelocityY(0); 
        }
        }
    }

