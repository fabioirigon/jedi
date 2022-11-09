// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
// ######## acertar nome da fase ##########
class Fase_07 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        // ######## acertar nome da fase ##########
        super('Fase_07'); 
    }

    // função para carregamento de assets
    preload ()
    {
        // carregando spritesheets
        this.load.spritesheet('player_sp', 'assets/spritesheets/dante_1.png', { frameWidth: 48, frameHeight: 48 });
        
        // carregando mapa (json) e gráficos do mapa
        //this.load.image('tiles', '../assets/images/dungeon-16-16.png');
        this.load.image('tiles_1', 'assets/images/tls_solaria.png');
        this.load.image('tiles_2', 'assets/images/tls_elfo.png');
        this.load.image('tiles_3', 'assets/images/tls_ork.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/fase7_2.json');

        //this.load.tilemapTiledJSON('themap', 'assets/maps/fase7_2.json');
    }
	
    create(){
        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset1 = this.map.addTilesetImage('tls_solaria', 'tiles_1');
        this.tileset2 = this.map.addTilesetImage('tls_elfo', 'tiles_2');
        this.tileset3 = this.map.addTilesetImage('tls_ork', 'tiles_3');


        // criação das camadas
        //this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        //this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        this.ground1Layer = this.map.createLayer('Ground_1_fundo', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.colisao1Layer = this.map.createLayer('Colisao_1', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.ground2Layer = this.map.createLayer('Ground_2_objetos', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.colisao2Layer = this.map.createLayer('Colisao_2', [this.tileset1, this.tileset2, this.tileset3], 0, 0);
        this.ground3Layer = this.map.createLayer('Ground_3_Objetos_2', [this.tileset1, this.tileset2, this.tileset3], 0, 0);

        // criação da colisão com paredes
        this.colisao1Layer.setCollisionByProperty({"collider" : true});
       	this.colisao2Layer.setCollisionByProperty({"collider" : true});
       	this.ground3Layer.setDepth(10);
       
        // criação do jogador
        this.player = this.physics.add.sprite(100, 130, 'player_sp', 0);
        this.player.setScale(0.6)

        // camera seguindo o jogador
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(3)

        this.physics.add.collider(this.player, this.colisao1Layer);
        this.physics.add.collider(this.player, this.colisao2Layer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
    }


    // update é chamada a cada novo quadro
    update ()
    {
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
}
