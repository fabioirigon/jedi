
// cada cena do jogo é uma classe que extende a classe base Phaser.Scene
// ######## acertar nome da fase ##########
class Fase_04 extends Phaser.Scene
{
    // O construtor registra o nome da cena
    constructor ()
    {
        // ######## acertar nome da fase ##########
        super('Fase_04'); 
    }

   // função para carregamento de assets
 preload ()
{
    
    this.load.spritesheet('king_sp', 'assets/spritesheets/a-king.png', { frameWidth: 78, frameHeight: 58 });
    this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('heroi_sp', 'assets/spritesheets/heroi.png', { frameWidth: 55, frameHeight: 60 });
    this.load.spritesheet('esqueleto_sp', 'assets/spritesheets/esqueleto.png', { frameWidth: 32, frameHeight: 33 });

    this.load.spritesheet('First Asset pack 16x', 'assets/maps/First Asset pack 16x.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
    this.load.spritesheet('Solaria Demo Update 01', 'assets/maps/Solaria Demo Update 01.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
    this.load.image('tiles', 'assets/maps/First Asset pack 16x.png');
    this.load.image('tiles2', 'assets/maps/Solaria Demo Update 01.png');
    //this.load.tilemapTiledJSON('themap', 'assets/maps/phaser_intro_map.json');
    this.load.tilemapTiledJSON('themap', 'assets/maps/fase4Mapa.json');
}

// função para criação dos elementos
 create ()
{

    // criação do mapa e ligação com a imagem (tilesheet)
    this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('First Asset pack 16x', 'tiles');
    this.tileset2 = this.map.addTilesetImage('Solaria Demo Update 01', 'tiles2');

    // criação das camadas
    
    this.chaolayer = this.map.createLayer('Agrupar 1/chao', [this.tileset,this.tileset2], 0, 0);
    this.arvorelayer = this.map.createLayer('Agrupar 1/arvore', [this.tileset,this.tileset2], 0, 0);
    this.cercalayer = this.map.createLayer('Agrupar 1/cerca', [this.tileset,this.tileset2], 0, 0);
    this.chao2layer = this.map.createLayer('Agrupar 1/chao2', [this.tileset,this.tileset2], 0, 0);
    this.buracoslayer = this.map.createLayer('Agrupar 1/buracos', [this.tileset,this.tileset2], 0, 0);
    this.pedraslayer = this.map.createLayer('Agrupar 1/pedras', [this.tileset,this.tileset2], 0, 0);
    this.cercamadeiralayer = this.map.createLayer('Agrupar 1/cerca madeira', [this.tileset,this.tileset2], 0, 0);
    this.chaodiferentepedralayer = this.map.createLayer('Agrupar 1/chao diferente pedra', [this.tileset,this.tileset2], 0, 0);
    this.saidasantuariolayer = this.map.createLayer('Agrupar 1/Saida santuario', [this.tileset,this.tileset2], 0, 0);
    this.perfumarialayer = this.map.createLayer('Agrupar 1/perfumaria', [this.tileset,this.tileset2], 0, 0);
    
    

    // criação do rei
    //king = this.physics.add.sprite(100, 300, 'king_sp', 5);
    //console.log(Actor)
    
    //king
    //this.king = this.physics.add.sprite(100, 490, 'king_sp', 5);
    //this.king.setScale(0.5);
    //this.king.setSize(30,25);
    //this.king.setOffset(15,20);

    //criacao heroi
    this.heroi = this.physics.add.sprite(100, 490, 'heroi_sp', '18');
    this.heroi.setScale(0.5);
    this.heroi.setSize(37,30);
    this.heroi.setOffset(7,26);

    
    //esqueleto
    this.esqueleto = this.physics.add.sprite(550, 450, 'esqueleto_sp', 0);
    this.esqueleto.setScale(0.5);
    this.esqueleto.setSize(30,25);
    this.esqueleto.setOffset(2,2);

    //esqueleto
    this.esqueleto = this.physics.add.sprite(550, 310, 'esqueleto_sp', 0);
    this.esqueleto.setScale(0.5);
    this.esqueleto.setSize(30,25);
    this.esqueleto.setOffset(2,2);

    //esqueleto
    this.esqueleto = this.physics.add.sprite(500, 450, 'esqueleto_sp', 0);
    this.esqueleto.setScale(0.5);
    this.esqueleto.setSize(30,25);
    this.esqueleto.setOffset(2,2);

    //esqueleto
    this.esqueleto = this.physics.add.sprite(500, 310, 'esqueleto_sp', 0);
    this.esqueleto.setScale(0.5);
    this.esqueleto.setSize(30,25);
    this.esqueleto.setOffset(2,2);



    //camera
    this.cameras.main.startFollow(this.heroi,true,0.1,0.1);
    this.cameras.main.setZoom(2);

    // criação da colisão
    this.arvorelayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.heroi, this.arvorelayer);
    this.physics.add.collider(this.esqueleto, this.arvorelayer);

    this.perfumarialayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.heroi, this.perfumarialayer);
    this.physics.add.collider(this.esqueleto, this.perfumarialayer);

    this.cercamadeiralayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.heroi, this.cercamadeiralayer);
    this.physics.add.collider(this.esqueleto, this.cercamadeiralayer);

    
   

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey('A');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyS = this.input.keyboard.addKey('S');
    
    //animação
   
    /*
this.anims.create({
    key: "D",
    frames: this.anims.generateFrameNumbers("heroi_sp",{frames:[27,28,29,30,31,32,33,34,35]}),
    framerate: 20,
    repeat: -1
}); 
*/
   
}

// update é chamada a cada novo quadro
 update ()
{
   // testa se tecla pressionada e seta a velocidade do jogador 
   if (this.keyD?.isDown) {
    this.heroi.setVelocityX(210);
    
    
}
else if (this.keyA?.isDown) {
    this.heroi.setVelocityX(-210);
   
    
}
else{
    this.heroi.setVelocityX(0); 
   
    
}

// velocidade vertical
if (this.keyW.isDown) {
    this.heroi.setVelocityY(-210);
   
    
}
else if (this.keyS.isDown) {
    this.heroi.setVelocityY(210);
   
    
}
else{
    this.heroi.setVelocityY(0); 
   
}


}


}
