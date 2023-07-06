class Fase_01 extends Phaser.Scene {


    // função para carregamento de assets
    preload ()
    {
        //load spritesheet
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });

        // load tile sheet
        this.load.image('tiles', 'assets/maps/Serene Village - Outside.png');

        // load map
        this.load.tilemapTiledJSON('themap', 'map_prj/the_map.json');

        //load birds protegem as casas
        this.load.spritesheet('bird', 'assets/spritesheets/bird.png', { frameWidth:184 , frameHeight: 184 }); 

        //load spritesheet boss
        this.load.spritesheet('boss', 'assets/spritesheets/bossFinal.png',  { frameWidth: 92, frameHeight: 95});
    }

    // função para criação dos elementos
    create ()
    {

        // criação do mapa (json) e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        // criação jogador
        this.player = new player(this, 100, 100, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.has_bow = false;    // previne de atirar flechas

        //criação do boss
        this.finalBoss = this.physics.add.sprite(70*16, 40*16, 'boss', 638)

        //Birds PROTETORES DA CASA
     
       //  this.bird1 = new Enemy(this, 900, 250, 'bird', 1, this.player);
         //this.bird1.setScale(0.2);
         //this.bird2 = new Enemy(this,700, 250, 'bird', 1, this.player);
         //this.bird2.setScale(0.2);
         //this.bird3 = new Enemy(this,275, 650, 'bird', 1, this.player);
         //this.bird3.setScale(0.2);
         //this.bird4 = new Enemy(this,475, 650, 'bird', 1, this.player);
         //this.bird4.setScale(0.2);

        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(0, 140, true);
        this.physics.add.collider(this.player, this.wallsLayer);

 //-------------------------------------------------------------------
        //boss animation
        this.anims.create({
            key: 'finalBoss',
            frames: this.anims.generateFrameNumbers('boss', {start: 0, end: 4}),
            frameRate: 12,
            repeat: -1,
            //repeatDelay: 10,
            //yoyo: true
            });

        this.finalBoss.play('finalBoss');
        this.finalBoss.body.immovable = true;
        
        this.physics.add.collider(this.player, this.finalBoss);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.keyE = this.input.keyboard.addKey('E');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.9);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2)


        // criação das zonas
        this.zone_dlg = this.add.zone(100, 100).setSize(70, 100);
        this.physics.world.enable(this.zone_dlg);
        this.physics.add.overlap(this.player, this.zone_dlg);

        this.zone_ques = this.add.zone(800, 230).setSize(70, 50);
        this.physics.world.enable(this.zone_ques);
        this.physics.add.overlap(this.player, this.zone_ques);

        //ZONA BIRDS
        this.zone_birds = this.add.zone(800, 250).setSize(200, 200);
        this.physics.world.enable(this.zone_birds);



        //ZONA P/ PERGUNTA 2
        //--------------------
        this.zone_ques1 = this.add.zone(375, 700).setSize(50, 50);
        this.physics.world.enable(this.zone_ques1);
        this.physics.add.overlap(this.player, this.zone_ques1);

        //Zona p/ Pergunta do Boss
        this.zone_Boss = this.add.zone(1120, 650).setSize(150,150);
        this.physics.world.enable(this.zone_Boss);
        this.physics.add.overlap(this.player, this.zone_Boss);
        
        // criação da mensagem "pressione E para interagir"
        var px = this.cameras.main.width/2;  // pos horizontal
        var ch = this.cameras.main.height
        var py = ch/2 + 0.2*ch/this.cameras.main.zoom;  // pos vertical
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
        this.txtLst_0 = ["Olá Jogador\nProcure até as áreas e responda as perguntas.\nSe todas respostas forem corretas,\nse prepare para luta!\nSerá liberado o grande chefão!", "VAMOOS LÁ!"];
        this.quest_0 =  ["67 + { 50 . [ 70 ÷ ( 27 + 8 ) + 18 ÷ 2 ] + 21 }",3, "◯ 194", "◯ 193",  "◯ 195",  "◯ 197"]
        this.quest_1 =  ["[(18 + 3 · 2) ÷ 8 + 5 · 3] ÷ 6",2, "◯ 17", "◯ 20",  "◯ 18",  "◯ 19"]
        this.quest_2 = ["{[(8 · 4 + 3) ÷ 7 + (3 + 15 ÷ 5) · 3] · 2 – (19 – 7) ÷ 6} · 2 + 12", 2, "◯ 45", "◯ 38",  "◯ 49",  "◯ 43"]  
        this.quest_3 = ["[2*(– 3/4) - (–2/3)]", 1, "◯ -3/4", "◯ -5/6",  "◯ 3/4",  "◯ 5/6"]  
        this.quest_4 = ["3 x 5 + 8 / 2 – 8", 1, "◯ 12", "◯ 11",  "◯ 10",  "◯ 13"]  
        this.quest_5 = ["(10 * 5) + (4 * 7) - (7/2 * 8) - 40", 2, "◯ 38", "◯ 42", "◯ 46", "◯ 51"]
        this.quest_6 = ["(4 * 2/5) - (7 * 4/3)", 3, "◯ 113/15", "◯ -112/14", "◯ 117/14", "◯ -116/15"]
        this.quest_7 = ["(4/3 - 7/2) + (6/8 + 9/2) - (8/4 / 1/9)", 2, "◯ -10/3", "◯ 13/6", "◯ 10/3", "◯ -13/6"]
        this.quest_8 = [" {(1/3 * 3/4) - 10} + 89/14", 0, "◯ -95/28", "◯ 95/28", "◯ 96/27", "◯ 95/27"]
        this.quest_9 = [" (1 + 2 +3) / (7 + 10 + 9)", 2, "◯ 7/26", "◯ 6/26", "◯ 3/13", "◯ 5/13"]
        
        // Criação de lista de questões para o Boss
        this.Boss_0 =  ["Para produzir bolos, uma fábrica utiliza 5 bandejas de ovos por dia.\n Sabendo que em uma bandeja tem 30 ovos,\n quantos ovos serão necessários para produção de bolos no período de 15 dias?",
        3, "◯ 2200", "◯ 193",  "◯ 93",  "◯ 2250"]
        this.Boss_1 =  ["A professora de João pediu para ele decompor um número e \nele fez da seguinte forma: 4 x 1000 + 3 x 10 + 5 x 1 \nQual foi o número pedido?   ",
        2, "◯ 4035", "◯ 400",  "◯ 4000",  "◯ 4030"]
        this.Boss_2 = ["Se 20 gatos capturam 20 ratos em 20 dias, \nquantos dias levam 5 gatos para capturar 5 ratos?", 
        2, "◯ 15 dias", "◯ 38 dias",  "◯ 49 dias",  "◯ 20 dias"]  
        this.Boss_3 = ["Um dia tem 24 horas, 1 hora tem 60 minutos e 1 minuto tem 60 segundos. \nQue fração da hora corresponde a 35 minutos?  ", 
        1, "◯ 9/4", "◯ 7/12",  "◯ 9/14",  "◯ 10/18"]  
        this.Boss_4 = ["Num pacote de balas contendo 10 unidades, o peso líquido é de 49 gramas. \nEm 5 pacotes teremos quantos gramas?", 
        1, "◯ 130", "◯ 100",  "◯ 245",  "◯ 250"]  
        this.Boss_5 = ["Um fazendeiro tinha 285 bois. Comprou mais 176 bois e depois vendeu 85 deles. \nQuantos bois esse fazendeiro tem agora? ", 
        2, "◯ 380", "◯ 376", "◯ 395", "◯ 300"]
        this.Boss_6 = ["Pedro adubou 3/4 de sua horta. A parte da horta adubada por Pedro corresponde a: ", 
        3, "◯ 55%", "◯ 65%", "◯ 60%", "◯ 75%"]
        this.Boss_7 = ["O carro de João consome 1 litro de gasolina a cada 10 quilômetros percorridos. \nPara ir da sua casa ao sítio, que fica distante 63 quilômetros, o carro irá consumir: ", 
        2, "◯ 7,3 L.", "◯ 13 L.", "◯ 6,3 L.", "◯ 7 L."]
        this.Boss_8 = ["Uma merendeira preparou 558 pães que foram distribuídos igualmente em 18 cestas. \nQuantos pães foram colocados em cada cesta?  ", 
        0, "◯ 31", "◯ 28", "◯ 27", "◯ 33"]
        this.Boss_9 = ["Gilda comprou copos descartáveis de 200 mililitros, para servir refrigerantes, em sua festa de aniversário. \nQuantos copos ela encherá com 1 litro de refrigerante?", 
        2, "◯ 9", "◯ 5", "◯ 8", "◯ 10"]
        
        this.firstDialog = true;
        this.dialogs = new dialogs(this);   

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;

        console.group(this.player.body)
        console.log(this.physics)

        //---------------------------
          // Cria timer
          this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });

        // Cria grupo de Birds e inicia 5 itens
        this.birds = this.physics.add.group();
        this.birds.enableBody = true;
        this.birds.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 5; i++){
            
            var birds = this.birds.create(-10, -10, 'bird', 31);
            birds.setScale(0.2);
            birds.body.setSize(10, 10);
            birds.setActive(false);
            birds.setVisible(false);
            birds.on(Phaser.Animations.Events.ANIMATION_COMPLETE, remove_bird, this);
            
        }

        this.anims.create({
            key: 'birds_walk',
            frames: this.anims.generateFrameNumbers('bird', {frames: [31]}),
            frameRate: 20,
            repeat: -1
            });
        this.anims.create({
            key: 'birds_die',
            frames: this.anims.generateFrameNumbers('bird', {frames: [40,41,42,43]}),
            frameRate: 3,
            hideOnComplete: true,
            onComplete: remove_bird,
            //onCompleteParams: [this],
            repeat: 0
            });    
    }
  
    


    // update é chamada a cada novo quadro
    update ()
    {
        // verifica e trata se jogador em zona ativa
        this.checkActiveZone();

        // verifica se precisa avançar no diálogo
        if (this.dialogs.isActive && !this.spacePressed && this.keySPACE.isDown){
            this.dialogs.nextDlg();
            this.spacePressed = true;   // seta flag para false para esperar a tecla espaço ser levantada
        }
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }

        for (let birds of this.birds.getMatching('active', true)){
            setBirdsSpeed(birds, this.player);
        }

    }

    // trata zona ativa
    checkActiveZone(){
        // se jogador dentro de zona e o diálogo não está ativo
        if (this.player.body.embedded && !this.dialogs.isActive){
            // mostra a mensagem e verifica a tecla pressionada
            this.interact_txt.setVisible(true);
            if (this.keyE.isDown){
                this.startDialogOrQuestion();
            } 
        }
        // se diálogo ativo ou fora da zona, esconde a msg
        else{
            this.interact_txt.setVisible(false);
        }
    }

    startDialogOrQuestion(){
        if (this.physics.overlap(this.player, this.zone_dlg)){
            if (this.firstDialog){
                this.dialogs.updateDlgBox(this.txtLst_0);
                this.firstDialog = false;
            }
            else{
                this.dialogs.updateDlgBox(this.txtLst_1);
            }
        }
        if (this.physics.overlap(this.player, this.zone_ques)){
            var num = Math.floor((Math.random() * 10))
            if(num == 0){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
            }else if(num == 1){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
            }else if(num == 2){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
            }else if(num == 3){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
            }else if(num == 4){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
            }else if(num == 5){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
            }else if(num == 6){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_6, acertou_fcn, errou_fcn);
            }else if(num == 7){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_7, acertou_fcn, errou_fcn);
            }else if(num == 8){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_8, acertou_fcn, errou_fcn);
            }else{
                this.dialogs.scene.dialogs.makeQuestion(this.quest_9, acertou_fcn, errou_fcn);
            }
        }
        if(this.physics.overlap(this.player, this.zone_ques1)){
            var num2 = Math.floor((Math.random() * 10))
            if(num2 == 0){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
            }else if(num2 == 1){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
            }else if(num2 == 2){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
            }else if(num2 == 3){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
            }else if(num2 == 4){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
            }else if(num2 == 5){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
            }else if(num2 == 6){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_6, acertou_fcn, errou_fcn);
            }else if(num2 == 7){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_7, acertou_fcn, errou_fcn);
            }else if(num2 == 8){
                this.dialogs.scene.dialogs.makeQuestion(this.quest_8, acertou_fcn, errou_fcn);
            }else{
                this.dialogs.scene.dialogs.makeQuestion(this.quest_9, acertou_fcn, errou_fcn);
            }
        }
        
        if (this.physics.overlap(this.player, this.zone_Boss)){
            var num = Math.floor((Math.random() * 10))
            if(num == 0){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_0, acertou_fcn, errou_fcn);
            }else if(num == 1){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_1, acertou_fcn, errou_fcn);
            }else if(num == 2){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_2, acertou_fcn, errou_fcn);
            }else if(num == 3){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_3, acertou_fcn, errou_fcn);
            }else if(num == 4){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_4, acertou_fcn, errou_fcn);
            }else if(num == 5){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_5, acertou_fcn, errou_fcn);
            }else if(num == 6){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_6, acertou_fcn, errou_fcn);
            }else if(num == 7){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_7, acertou_fcn, errou_fcn);
            }else if(num == 8){
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_8, acertou_fcn, errou_fcn);
            }else{
                this.dialogs.scene.dialogs.makeQuestion(this.Boss_9, acertou_fcn, errou_fcn);
            }
        }
        
    }
}

function acertou_fcn(ptr){
    this.dialogs.hideBox();
    //Abre um "pop-up"
    alert("Acertou");
}

function errou_fcn(ptr){
    this.dialogs.hideBox();
    //Abre um "pop-up"
    alert("Errou");
}

function spawn(){
    if (Phaser.Geom.Rectangle.Overlaps(this.zone_birds.getBounds(), this.player.getBounds())){
        console.log('spawn');
        var birds = this.birds.getFirstDead(false);
        if (birds){    

            birds.body.reset(950, 250);

            birds.setActive(true);
            birds.setVisible(true);   
        }
    
    }
    this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });
}

function setBirdsSpeed(birds, player){
    var dx = player.x - birds.x;
    var dy = player.y - birds.y;
    var amp = Math.sqrt(dx*dx + dy*dy);
    birds.setVelocityX(30*dx/amp); 
    birds.body.setVelocityY(30*dy/amp);
}

function remove_bird(par0){
    console.log('rem', par0);
    console.log(this);
}