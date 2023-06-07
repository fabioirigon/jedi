// Configuração do jogo

//var player;

class Fase1 extends Phaser.Scene{
    
    preload ()
    {
        console.log('load spritesheet');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('knaiffs_sp', 'assets/spritesheets/knaiffs.png', {frameWidth: 64, frameHeight: 64 });
        
        console.log('load tile sheet');
        this.load.image('tiles', 'assets/maps/tilesheet.png');
        
        console.log('load map');
        this.load.tilemapTiledJSON('themap', 'assets/maps/mapa.json');
        
        this.load.image('barrier_sp','assets/spritesheets/barrier.png');
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
        
        //criação da barreira
        this.barrier = this.physics.add.sprite(313, 96, 'barrier_sp', 0);
        this.barrier.setScale(0.05)
        this.barrier.setImmovable(true)
        
        this.barrier2 = this.physics.add.sprite(313, 126, 'barrier_sp', 0);
        this.barrier2.setScale(0.05)
        this.barrier2.setImmovable(true)

        this.barrier3 = this.physics.add.sprite(480, 432, 'barrier_sp', 0);
        this.barrier3.setScale(0.05)
        this.barrier3.setImmovable(true)

        this.barrier4 = this.physics.add.sprite(480, 464, 'barrier_sp', 0);
        this.barrier4.setScale(0.05)
        this.barrier4.setImmovable(true)

        this.barrier5 = this.physics.add.sprite(618, 672, 'barrier_sp', 0);
        this.barrier5.setScale(0.05)
        this.barrier5.setImmovable(true)

        this.barrier6 = this.physics.add.sprite(618, 704, 'barrier_sp', 0);
        this.barrier6.setScale(0.05)
        this.barrier6.setImmovable(true)


        // criação do personagem
        this.player = this.physics.add.sprite(65, 750, 'player_sp', 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        this.player.body.width = 30;

        this.naiffsNPC = this.physics.add.sprite(65, 200, 'knaiffs_sp', 0);
        //reduzindo a escala do npc(era muito grande)
        this.naiffsNPC.setScale(0.5);
        
        this.naiffsNPC.body.setSize(20, 50);

        this.naiffsNPC.setFrame(27);


        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(65, 750, true);
        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.player, this.naiffsNPC, function(player, naiffsNPC){
            naiffsNPC.setVelocity(0);
            naiffsNPC.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier, function(player, barrier){
            barrier.setVelocity(0);
            barrier.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier2, function(player, barrier2){
            barrier2.setVelocity(0);
            barrier2.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier3, function(player, barrier3){
            barrier3.setVelocity(0);
            barrier3.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier4, function(player, barrier4){
            barrier4.setVelocity(0);
            barrier4.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier5, function(player, barrier5){
            barrier5.setVelocity(0);
            barrier5.body.setImmovable(true);
            
        });

        this.physics.add.collider(this.player, this.barrier6, function(player, barrier6){
            barrier6.setVelocity(0);
            barrier6.body.setImmovable(true);
            
        });
        
        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyE = this.input.keyboard.addKey('E');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        //criacao das zonas
        this.zone_dlg = this.add.zone(30, 200).setSize(100, 100);
        this.physics.world.enable(this.zone_dlg);
        this.physics.add.overlap(this.player, this.zone_dlg);

        this.zone_ques = this.add.zone(200,80).setSize(100,70);
        this.physics.world.enable(this.zone_ques);
        this.physics.add.overlap(this.player, this.zone_ques);
        
        this.zone_ques3 = this.add.zone(500,422).setSize(100,70);
        this.physics.world.enable(this.zone_ques3);
        this.physics.add.overlap(this.player, this.zone_ques3);
        
        this.zone_ques4 = this.add.zone(500,650).setSize(100,70);
        this.physics.world.enable(this.zone_ques4);
        this.physics.add.overlap(this.player, this.zone_ques4);


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

        // criação de lista de textos (diálogs) e do objeto dialogs
        this.txtLst_0 = ["Eu estava te esperando! Seja bem vindo, jogador. Meu nome é Knaíffes, mas pode me chamar de facas.", "Daqui em diante aparecerão inimigos que voce precisará derrotar e perguntas que voce precisará responder.", "Ao responder corretamente, o muro se abrirá e você receberá mais inimigos.", "Porém, cuidado. Ao final desse desafio estará um ser de força incomum. Esteja preparado."];
        this.quest_0 = ["Para produzir bolos, uma fábrica utiliza 5 bandejas de ovos por dia. Sabendo que em uma bandeja tem 30 ovos, quantos ovos serão necessários para produção de bolos no período de 15 dias?",
        4, "◯ 75", "◯ 150",  "◯ 450",  "◯ 2250"]
        
        this.quest_1 = ["O esporte ‘skate’ ganhou muita popularidade com o surgimento das olimpíadas de esportes radicais. Uma das manobras mais difíceis de serem executas é um giro de 900°, onde o skatista gira no ar a seguinte quantidade de vezes:",2, "◯ 1 vez", "◯ 2 1/2 vezes",  "◯ 1 1/2 vezes",  "◯ 2 vezes"]
        
        this.quest_2 = ["A turma de Carlos possui 28 alunos, dos quais 1/4 são meninas. Sabendo disso, qual das opções abaixo representa o número de meninos?",4, "◯ 8.", "◯ 7.",  "◯ 14.",  "◯ 21."]


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
                frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [91, 92, 93, 94, 95, 91]}),
                frameRate: 10,
                repeat: 0
                });


        }


// update é chamada a cada novo quadro
    update (){
        
     // verifica e trata se jogador em zona ativa
        this.checkActiveZone();
        if(this.dialogs.isActive){
            this.naiffsNPC.anims.play('talk_knaiffs', true);
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

    // trata zona ativa
    checkActiveZone(){
        // se jogador dentro de zona e o diálogo não está ativo
        if (this.player.body.embedded && !this.dialogs.isActive){
            // mostra a mensagem e verifica a tecla pressionada
            this.interact_txt.setVisible(true);
            if (this.keyE.isDown){
                this.startDialogsOrQuestion();
            } 
        }
        // se diálogo ativo ou fora da zona, esconde a msg
        else{
            this.interact_txt.setVisible(false);
        }
    }

    startDialogsOrQuestion(){
        if (this.physics.overlap(this.player, this.zone_dlg)){
                this.dialogs.updateDlgBox(this.txtLst_0);
        
        }
        if (this.physics.overlap(this.player, this.zone_ques)){
            this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
        }

        if (this.physics.overlap(this.player, this.zone_ques3)){
            this.dialogs.scene.dialogs.makeQuestion(this.quest_1, acertou_fcn2, errou_fcn);
        }

        if (this.physics.overlap(this.player, this.zone_ques4)){
            this.dialogs.scene.dialogs.makeQuestion(this.quest_2, acertou_fcn3, errou_fcn);
        }
    }
}

function acertou_fcn(ptr){
    console.log("acertou");
    this.dialogs.hideBox();

    this.barrier.destroy()
    this.barrier2.destroy()
}

function acertou_fcn2(ptr){
    console.log("acertou");
    this.dialogs.hideBox();

    this.barrier3.destroy()
    this.barrier4.destroy()
}

function acertou_fcn3(ptr){
    console.log("acertou");
    this.dialogs.hideBox();

    this.barrier5.destroy()
    this.barrier6.destroy()
}


function errou_fcn(ptr){
    console.log("errou")
    this.dialogs.hideBox();
}
