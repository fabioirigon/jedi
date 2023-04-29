// Configuração do jogo

//var player;
console.log("WHISTLE BABY");
class Fase1 extends Phaser.Scene{
    
    preload ()
    {
        console.log('load spritesheet');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('knaiffs_sp', 'assets/spritesheets/knaiffs.png', {frameWidth: 64, frameHeight: 64 });

        console.log('load tile sheet');
        this.load.image('tiles', 'assets/maps/tilesheet.png');

        console.log('load map');
        this.load.tilemapTiledJSON('themap', 'assets/maps/mapa2.json');
    }

// função para criação dos elementos
    create ()
    {

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('Minifantasy_ForgottenPlainsTiles', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createDynamicLayer('Chao', this.tileset, 0, 0);
        this.wallsLayer = this.map.createDynamicLayer('Parede', this.tileset, 0, 0);
        
        
        // criação do rei
        this.player = this.physics.add.sprite(65, 750, 'player_sp', 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        this.player.body.width = 20;

        this.naiffsNPC = this.physics.add.sprite(65, 200, 'knaiffs_sp', 0);
        //reduzindo a escala do npc(era muito grande)
        this.naiffsNPC.setScale(0.5);
        this.naiffsNPC.body.width = 20;
        this.naiffsNPC.setFrame(27);

        this.wallsLayer.setCollisionBetween(65, 750, true);
        this.physics.add.collider(this.player, this.wallsLayer);
        
        
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyE = this.input.keyboard.addKey('E');
        this.keySPACE = this.input.keyboard.addKey('SPACE');


        this.zone = this.add.zone(30, 200).setSize(100, 100);
        this.physics.world.enable(this.zone);
        this.physics.add.overlap(this.player, this.zone);

        // criação da mensagem "pressione E para interagir"
        var px = this.cameras.main.width*0.35;  // pos horizontal
        var py = 2*this.cameras.main.height/3;  // pos vertical
        console.log('pp', px, py)
        this.interact_txt = this.add.text(px, py, "Pressione E para interagir", {
            font: "15px Arial",
            fill: "#A0A0A0",
            align: "center", 
            stroke: '#000000',
            strokeThickness: 4,
        });
        this.interact_txt.setScrollFactor(0);  // deixa em posição relativa à camera (e não ao mapa)
        this.interact_txt.setVisible(false);   // deixa invisível

        // criação de lista de textos (diálogs) e do objeto dialog
        this.txtLst = ["Eu estava te esperando! Seja bem vindo, jogador. Meu nome é Knaíffes, mas pode me chamar de facas.", "Daqui em diante aparecerão inimigos que voce precisará derrotar e perguntas que voce precisará responder.", "Ao responder corretamente, o muro se abrirá e você receberá mais inimigos.", "Porém, cuidado. Ao final desse desafio estará um ser de força incomum. Esteja preparado."];
        this.dialogs = new dialogs(this);   

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;


        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [24, 25, 26, 27]}),
            frameRate: 10,
            repeat: 0
            });
        this.anims.create({
            key: 'talk_knaiffs',
                frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [28,29]}),
                frameRate: 10,
                repeat: 0
                });


        }


// update é chamada a cada novo quadro
    update (){

        this.checkActiveZone();
        if(this.dialogs.isActive){
            this.player.anims.play('talk_knaiffs', true);
        }
        // verifica se precisa avançar no diálogo
        if (this.dialogs.isActive && !this.spacePressed && this.keySPACE.isDown){
            this.dialogs.nextDlg();
            this.spacePressed = true;   // seta flag para false para esperar a tecla espaço ser levantada
        }
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }
        {

         
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
    checkActiveZone(){
        // se jogador dentro de zona e o diálogo não está ativo
        if (this.player.body.embedded && !this.dialogs.isActive){
            // mostra a mensagem e verifica a tecla pressionada
            this.interact_txt.setVisible(true);
            if (this.keyE.isDown){
                this.dialogs.updateDlgBox(this.txtLst);
            } 
        }
        // se diálogo ativo ou fora da zona, esconde a msg
        else{
            this.interact_txt.setVisible(false);
        }
    }
}

