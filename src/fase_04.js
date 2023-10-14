
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
        this.load.spritesheet('heroi_sp', 'assets/spritesheets/heroi.jpeg', { frameWidth: 50, frameHeight: 60 });
        this.load.spritesheet('esqueleto_sp', 'assets/spritesheets/esqueleto.png', { frameWidth: 32, frameHeight: 33 });

        this.load.spritesheet('First Asset pack 16x', 'assets/maps/First Asset pack 16x.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        this.load.spritesheet('Solaria Demo Update 01', 'assets/maps/Solaria Demo Update 01.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        this.load.image('tiles', 'assets/maps/First Asset pack 16x.png');
        this.load.image('tiles2', 'assets/maps/Solaria Demo Update 01.png');
        //this.load.tilemapTiledJSON('themap', 'assets/maps/phaser_intro_map.json');
        this.load.tilemapTiledJSON('themap', 'assets/maps/fase4Mapa.json');
    }
create_tweens()
{
    var t0 = this.add.text(100, 450, "Aventureiro: Meu deus que lugar é esse !!!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });        
    var t1 = this.add.text(100, 400, "Susurro: Aventureiro venha cá", {
        font: "15px Arial",
        fill: "#000080",
        align: "center"
    });
    var t2 = this.add.text(100, 400, "Aventureiro: Meu deus estou ouvindo vozes!\n mas bora seguir adiante!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t3 = this.add.text(100, 400, "Pixie: Jovem aventureiro\n preciso que você consiga uma poção para curar uma pixie,\npois eu já estou morta,e sozinha eu não consigo,\n por favor encontre a poção", {
        font: "15px Arial",
        fill: "#000080",
        align: "center"
    });
    var t4 = this.add.text(100, 355, "Aventureiro:Tudo bem, senhora irei conseguir.", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t5 = this.add.text(500, 355, "Voz misteriosa: Esqueletos ergam-se!!!!", {
        font: "20px Arial",
        fill: "#FFFF00",
        align: "center"
    });

    var t6 = this.add.text(500, 355, "Aventureiro: Socorro, terei que fugir rápido!!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t7 = this.add.text(500, 355, "Aventureiro: Com a poção em mãos\n agora é possível salvar a outra pixie.", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t8 = this.add.text(50, 300, "Aventureiro: Se eu não pegar esse baú,\n eu não me chamo Adamastor!!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t9 = this.add.text(50, 300, "Baú: HAHAHA eu não sou um baú comum,\ncaso não responda a pergunta a tempo os monstros irão te pegar,\n caso acerte te darei a recompensa dentro de mim", {
        font: "20px Arial",
        fill: "#008000",
        align: "center"
    });
    var t10 = this.add.text(50, 300, "Aventureiro: Tomem isso seus monstrengos!!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t11 = this.add.text(50, 300, "Pixie: Muito obrigado jovem aventureiro,\n agora entregue isso para a pixie que está escondida\n em algum lugar desse santuário", {
        font: "15px Arial",
        fill: "#000080",
        align: "center"
    });
    var t12 = this.add.text(50, 300, "Aventureiro: Tenho que correr!", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t13 = this.add.text(50, 300, "Pixie: Socorro !!", {
        font: "15px Arial",
        fill: "#000080",
        align: "center"
    });
    var t14 = this.add.text(50, 300, "Aventureiro: Aqui está a poção pixie,\n sobreviva por favor !", {
        font: "20px Arial",
        fill: "#000000",
        align: "center"
    });
    var t15 = this.add.text(50, 300, "Pixie: Muito obrigado pela ajuda aventureiro,\ndeve ter sido muito difícil me encontrar,\ncomo compensação irei te guiar adentro da caverna a seguir.", {
        font: "15px Arial",
        fill: "#000080",
        align: "center"
    });
    
    t0.alpha = 0
    t1.alpha = 0
    t2.alpha = 0
    t3.alpha = 0
    t4.alpha = 0
    t5.alpha = 0
    t6.alpha = 0
    t7.alpha = 0
    t8.alpha = 0
    t9.alpha = 0
    t10.alpha = 0
    t11.alpha = 0
    t12.alpha = 0
    t13.alpha = 0
    t14.alpha = 0
    t15.alpha = 0

    // timeline: sequência
    this.timeline = this.tweens.createTimeline();

    // primeira fala
    this.timeline.add({
        targets: t0,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });

    // segunda fala
    this.timeline.add({
        targets: t1,
        alpha: 1,
        ease: 'linear',
        duration: 500,
        yoyo: true,
        hold: 3500
    });
    this.timeline.add({
        targets: t2,
        alpha: 1,
        ease: 'linear',
        duration: 500,
        yoyo: true,
        hold: 3500
    });
    this.timeline.add({
        targets: t3,
        alpha: 1,
        ease: 'linear',
        duration: 500,
        yoyo: true,
        hold: 3500
    });
    this.timeline.add({
        targets: t4,
        alpha: 1,
        ease: 'linear',
        duration: 500,
        yoyo: true,
        hold: 3500
    });

    this.timeline2 = this.tweens.createTimeline({paused: true});

     this.timeline2.add({
        targets: t5,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline2.add({
        targets: t6,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline2.add({
        targets: t7,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });

    this.timeline3 = this.tweens.createTimeline({paused: true});

    this.timeline3.add({
        targets: t8,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline3.add({
        targets: t9,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    
    this.timeline4 = this.tweens.createTimeline({paused: true});
    this.timeline4.add({
        targets: t10,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline4.add({
        targets: t11,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline4.add({
        targets: t12,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline4.add({
        targets: t13,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline4.add({
        targets: t14,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
    this.timeline4.add({
        targets: 15,
        alpha: 1,
        ease: 'linear',
        duration: 500, 
        yoyo: true,
        hold: 3500
    });
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
    this.king = this.physics.add.sprite(100, 490, 'king_sp', 5);
    this.king.setScale(0.5);
    this.king.setSize(30,25);
    this.king.setOffset(15,20);

    //criacao heroi
    //heroi = this.physics.add.sprite(100, 300, 'heroi_sp', 5);
    //console.log(Actor)
    //this.heroi = this.physics.add.sprite(100, 490, 'heroi_sp', 5);
    //this.heroi.setScale(0.5);
    //this.heroi.setSize(16,16);
    //this.heroi.setOffset(7,26);

    // criação do jogador
    
    //esqueleto
    this.esqueleto = this.physics.add.sprite(300, 490, 'esqueleto_sp', 0);
    this.esqueleto.setScale(0.5);
    this.esqueleto.setSize(30,25);
    this.esqueleto.setOffset(2,2);



    //camera
    this.cameras.main.startFollow(this.king,true,0.1,0.1);
    this.cameras.main.setZoom(2);

    // criação da colisão
    this.arvorelayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.king, this.arvorelayer);
    this.physics.add.collider(this.esqueleto, this.arvorelayer);

    this.perfumarialayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.king, this.perfumarialayer);
    this.physics.add.collider(this.esqueleto, this.perfumarialayer);

    this.cercamadeiralayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.king, this.cercamadeiralayer);
    this.physics.add.collider(this.esqueleto, this.cercamadeiralayer);

    this.create_tweens();

    // adicionando uma zona com gatilho, quando entrar aciona a função onZone
    this.zoneDialog = true;
    this.zone = this.add.zone(170, 500).setSize(100, 100);
    this.physics.world.enable(this.zone);
    this.physics.add.overlap(this.king, this.zone, this.onZone, null, this);
    this.zoneDialog2 = false;
    this.zone2 = this.add.zone(500, 355).setSize(25, 25);
    this.physics.world.enable(this.zone2);
    this.physics.add.overlap(this.king, this.zone2, this.onZone2, null, this);
    this.zoneDialog3 = false;
    this.zone3 = this.add.zone(35, 450).setSize(25,25);
    this.physics.world.enable(this.zone3);
    this.physics.add.overlap(this.king, this.zone3, this.onZone3, null, this);


    
   

    // ligação das teclas de movimento
    this.keyA = this.input.keyboard.addKey('A');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyS = this.input.keyboard.addKey('S');
    
     

}

  // a função limpa a flag 'zoneDialog' para executar o diálogo (tween) uma vez só
  onZone(){
    if (this.zoneDialog){
        this.zoneDialog = false;
        this.zoneDialog2 = true;
        this.zoneDialog3 = false;
        console.log("onzone");
        this.timeline.play();

  }
  }
  onZone2(){
    if (this.zoneDialog2){
        this.zoneDialog2 = false;
        this.timeline2.play();
        this.zoneDialog3 = true;
       // this.king.move_enable = true;
    }
  }
  onZone3(){
    this.timeline3.play();
    setTimeout(() => {
        if (this.zoneDialog3){
            this.zoneDialog3 = false;

        // pergunta: 
        this.quest = this.add.text(50, 300, "Numa fazenda, havia 524 bois. Na feira de gado,\no fazendeiro vendeu 183 de seus bois e comprou mais 266 bois.\nQuantos bois há agora na fazenda?", {
          font: "12px Arial",
          fill: "#000000",
          align: "center"
        });
  
        this.a0 = this.add.text(50, 325, "◯ 507 bois", {
            font: "12px Arial",
            fill: "#000000",
            align: "center"
        });
  
        this.a1 = this.add.text(50, 350, "◯ 607 bois", {
            font: "12px Arial",
            fill: "#000000",
            align: "center"
        });
  
        this.a2 = this.add.text(50, 375, "◯ 707 bois", {
            font: "12px Arial",
            fill: "#000000",
            align: "center"
        });
  
        this.a3 = this.add.text(50, 400, "◯ 727 bois", {
          font: "12px Arial",
          fill: "#000000",
          align: "center"
      });
  
        // deixa clicar e liga com a função
        this.a0.setInteractive();
        this.a0.on('pointerdown', this.errou, this);
        this.a1.setInteractive();
        this.a1.on('pointerdown', this.acertou, this);
        this.a2.setInteractive();
        this.a2.on('pointerdown', this.errou, this);
        this.a3.setInteractive();
        this.a3.on('pointerdown', this.errou, this);
        }
     }, 15000);
  
    }
  
    // função erro e acerto
    errou(){
        console.log("errou");
         this.scene.restart();
    }
  
    acertou(){
        console.log("acertou");
        this.quest.setVisible(false);
        this.a0.setVisible(false);
        this.a1.setVisible(false);
        this.a2.setVisible(false);
        this.a3.setVisible(false);
        this.timeline4.play();
     
    }

 



// update é chamada a cada novo quadro
 update ()
{
   // testa se tecla pressionada e seta a velocidade do jogador 
   if (this.keyD?.isDown) {
    this.king.setVelocityX(201);
}
else if (this.keyA?.isDown) {
    this.king.setVelocityX(-210);
}
else{
    this.king.setVelocityX(0); 
}

// velocidade vertical
if (this.keyW.isDown) {
    this.king.setVelocityY(-210);
}
else if (this.keyS.isDown) {
    this.king.setVelocityY(210);
}
else{
    this.king.setVelocityY(0); 
}

    
}


}
