
class Fase1 extends Phaser.Scene{
    preload ()
    {
        this.load.spritesheet('player_sp', 'assets/spritesheets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('knaiffs_sp', 'assets/spritesheets/knaiffs.png', {frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('meilin', 'assets/spritesheets/meilin.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('knife', 'assets/spritesheets/knife.png')
        this.load.image('tiles', 'assets/maps/tilesheet.png');
        this.load.tilemapTiledJSON('themap', 'assets/maps/map2.json');
        this.load.image('circle', 'assets/spritesheets/magic_circle.png')
        this.load.image('barrier', 'assets/spritesheets/barrier.png')
        this.load.image('shield', 'assets/spritesheets/shield.png')
        this.load.image('explosion', 'assets/spritesheets/explosion.png', {frameWidth: 32, frameHeight: 32})
        this.load.image('portal', 'assets/spritesheets/portal.png')


        this.load.audio('warning', 'assets/ost/warning.wav')
        this.load.audio('boss', 'assets/ost/boss_ost.mp3')
        this.load.audio('dash', 'assets/ost/dash.wav')
        this.load.audio('damage', 'assets/ost/damage.wav')
        this.load.audio('death', 'assets/ost/death.wav')
        this.load.audio('explosion', 'assets/ost/explosion.wav')
        this.load.audio('hit', 'assets/ost/hit.wav')
        this.load.audio('bgm', 'assets/ost/bgm.mp3')
    }

// função para criação dos elementos
    create ()
    {   
        this.gameTimer = 0


        this.boss_bgm = this.sound.add('boss', {loop: true}).setVolume(0.025)
        this.warning = this.sound.add('warning').setVolume(0.05)
        this.dash = this.sound.add('dash').setVolume(0.01)
        this.damage = this.sound.add('damage').setVolume(0.05)
        this.death = this.sound.add('death').setVolume(0.05)
        this.explosion = this.sound.add('explosion').setVolume(0.5)
        this.hit = this.sound.add('hit').setVolume(0.05)
        this.bgm = this.sound.add('bgm', {loop: true}).setVolume(0.025)
        this.bgm.play()



        this.soundPlayed = false

        this.t = Math.PI/2
        this.circleCenter = {x: 512, y: 384}
        this.circleRadius = 233

         this.boss = false


        const messer_pos = {x: 521, y: 151}
        const player_pos = {x: 35, y: 50}

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('Minifantasy_ForgottenPlainsTiles', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createDynamicLayer('Chao', this.tileset, 0, 0);
        this.wallsLayer = this.map.createDynamicLayer('Parede', this.tileset, 0, 0);
        
        
        // criação do rei
        this.player = this.physics.add.sprite(messer_pos.x, messer_pos.y, 'player_sp', 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        this.player.body.width = 30;
        this.player.hp = 100
        this.player.hasShield = true

        // creating Player's shield
        this.shield = this.physics.add.sprite(this.player.body.x+10,this.player.body.y+10,'shield')
        this.shield.setScale(0.08)
        this.shield.setVisible(false)
        this.shield.body.width = 20
        this.shield.body.height = 20
        this.shieldIsUp = false
        // criação da Meilin 

        this.meilin = this.physics.add.sprite(122, 80, 'meilin', 0)
        this.meilin.setScale(0.5)
        this.meilin.setFrame(27)
        this.physics.add.collider(this.player, this.meilin, (meilin)=> {
            meilin.body.setImmovable(true)
            meilin.setVelocity(0)
        })


        // criação do boss messer


        this.messer = this.physics.add.sprite(messer_pos.x, messer_pos.y, 'knaiffs_sp', 0);
        this.messer.setScale(0.5);
        this.messer.body.setSize(50, 80);
        this.messer.setFrame(27)

         // Messer's HUD
        
         this.healthWidth = 400;
         this.healthHeight = 10;
 
         this.messer.hp = 1000;
         this.messerLifeBackground = this.add.rectangle(0, 0, this.healthWidth, this.healthHeight, 0x000000);
         this.messerLife = this.add.rectangle(0, 0, 0.4*this.messer.hp, this.healthHeight, 0xff0000);
         this.messerLife.setVisible(false);
         this.messerLife.setOrigin(0, 0);
         this.messerLife.setScrollFactor(0);
         this.messerLife.setDepth(1);
         this.messerLifeBackground.setVisible(false);
         this.messerLifeBackground.setOrigin(0, 0);
         this.messerLifeBackground.setScrollFactor(0);
         this.messerLifeBackground.setDepth(1); 
 
         this.nomeText = this.add.text(0, this.healthHeight + 5, "Messer Kniffes", { fontFamily: 'comic-sans', fontSize: '16px', color: '#ffffff' });
         this.nomeText.setVisible(false);
         this.nomeText.setOrigin(0, 0);
         this.nomeText.setScrollFactor(0);
         this.nomeText.setDepth(1); 
         this.messerLifeBackground.setStrokeStyle(2,0x000000);
         this.nomeText.setStroke('#000000', 4);
         this.messerLife.x = this.player.x - this.cameras.main.scrollX - 200;
         this.messerLife.y = this.player.y - this.cameras.main.scrollY - 175;
         this.messerLifeBackground.x = this.player.x - this.cameras.main.scrollX - 200;
         this.messerLifeBackground.y = this.player.y - this.cameras.main.scrollY - 175;
         this.nomeText.x = this.player.x - this.cameras.main.scrollX - 40;
         this.nomeText.y = this.player.y - this.cameras.main.scrollY - 165;
        

         this.explosionEmitter = this.add.particles('explosion').createEmitter({
            x: 0, // Set the initial position of the explosion to the boss's position
            y: 0,
            lifespan: 200, // Duration of the particles
            speed: { min: 100, max: 400 }, // Speed range of the particles
            scale: { start: 0.02, end: 0 }, // Scale of the particles over time
            blendMode: 'ADD', // Blend mode for the particles
            frequency: -1, // Emit particles only once
            quantity: 10, // Number of particles to emit
        });

        //bossfight attributes for messer
        this.messer.circle
        this.messer.ease = 2

        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(65, 750, true);
        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.messer, this.wallsLayer)
        
        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyE = this.input.keyboard.addKey('E');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        //criacao das zonas
        this.zone_dlg = this.add.zone(98, 55).setSize(50, 50);
        this.physics.world.enable(this.zone_dlg);
        this.physics.add.overlap(this.player, this.zone_dlg);

        this.zone_boss = this.add.zone(messer_pos.x -20, messer_pos.y - 20).setSize(50, 50)
        this.physics.world.enable(this.zone_boss)
        this.physics.add.overlap(this.player, this.zone_boss)


        /*
        this.zone_ques = this.add.zone(200,80).setSize(100,70);
        this.physics.world.enable(this.zone_ques);
        this.physics.add.overlap(this.player, this.zone_ques);
*/
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
        var textos = ["Olá, jogador. Temo lhe dizer que o encontro em apuros.", "A saída desse jardim é logo a frente, mas sinto uma força descomunal que a bloqueia.", "Tenho uma arma que pode lhe ser útil, mas preciso que me responda:"];
        this.txtLst_0 = textos.map(text => `Meilin:\n${text}`)

        this.lockedDialogue = ['O caminho está bloqueado.']

        var messer_text = ['Você sobreviveu ao corredor de esqueletos, vejo.', 'Nunca pensei que chegaria tão longe, jovem guerreiro. Talvez eu tenha te subestimado, hehe.', 'De qualquer forma, sua curta jornada aqui termina:', 'Você entenderá porquê sou chamado de Messer Khenaifes, o lorde das facas!!']

        this.txtLst_1 = messer_text.map(text => `Messer:\n${text}`)


        this.quest_0 = ["Para produzir bolos, uma fábrica utiliza 5 bandejas de ovos por dia. Sabendo que em uma bandeja tem 30 ovos, quantos ovos serão necessários para produção de bolos no período de 15 dias?",
        1, "◯ 75", "◯ 150",  "◯ 450",  "◯ 2250"]
        
        
        this.dialogs = new dialogs(this);   

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;

        this.portal = this.physics.add.sprite(535, 16, 'portal')
        this.portal.setScale(0.05)
        this.portal.setVisible(false)

        //animação de corrida do player
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player_sp', {frames: [24, 25, 26, 27]}),
            frameRate: 10,
            repeat: 0
            });

        this.anims.create({
            key: 'meilin_talk',
                frames: this.anims.generateFrameNumbers('meilin', {frames: [91, 92, 93, 94, 95, 91]}),
                frameRate: 10,
                repeat: 0
                });
        
        //animação de interação com Meilin
        this.anims.create({
            key: 'meilin_stand',
            frames: this.anims.generateFrameNumbers('meilin', {frames: [91]}),
            frameRate: 10,
            repeat: 1
        })

        this.anims.create({
            key: 'knives_cast',
            frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [28, 29, 30]}),
            frameRate: 5,
            repeat: 0
        })

        this.anims.create({
            key: 'knives_storm',
            frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [31, 5, 18, 44]}),
            frameRate: 10,
            repeat: 1
        })


        this.anims.create({
            key: 'knives_falls',
            frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [261, 262, 263, 264]}),
            frameRate: 5,
            repeat: 0
        })

        this.anims.create({
            key: 'knives_stands',
            frames: this.anims.generateFrameNumbers('knaiffs_sp', {frames: [264, 263, 262, 261]}),
            frameRate: 5,
            repeat: 0
        })

        }




// update é chamada a cada novo quadro
    update (){
        this.gameTimer += 0.1 
        this.messerLife.width = 0.4*this.messer.hp

        if(this.player.hasShield){
            this.shield.setPosition(this.player.body.x, this.player.body.y)
            this.shield.setVisible(true)
            if(this.keyE?.isDown && !this.shieldIsUp){
                this.shield.setRotation(this.gameTimer*3)
                this.shield.setScale(0.1)
                this.time.delayedCall(500, ()=>{
                    this.shieldIsUp = true
                }, [], this);    
                
            }else{
                this.shield.setScale(0.08)
                this.shieldIsUp = false
            }
        }


        const arenaHeight = 736
        const arenaWidth = 466

        if(this.player.hp <= 0){
            this.scene.restart()
            this.boss_bgm.stop()
            this.death.play()
        } 

        const spawnKnife = (t) => {
            const knife= this.physics.add.sprite(this.messer.body.x, this.messer.body.y, 'knife')
            knife.isDeflected = false
            this.physics.world.enable(knife)
            knife.body.setAllowGravity(false)
            knife.setScale(0.02)
            knife.setRotation(t+Math.PI/2)

            const rand = Math.floor(Math.random()*5)

            knife.body.setVelocity(200*Math.cos(t*100)+20*rand*Math.sin(t*Math.PI) + rand*Math.cos(t)*Math.sin(t), 50*Math.sin(t*100)+20*rand*Math.cos(t*Math.PI)+rand*Math.cos(t)*Math.sin(t))

            this.dash.play()


            this.physics.add.collider(knife, this.wallsLayer, ()=>{
                knife.destroy()
            })

            this.physics.add.collider(knife, this.player, ()=> {
                if(this.player.hasShield && this.keyE?.isDown && !this.shieldIsUp){
                    knife.body.setVelocity(-knife.body.velocity.x*2, -knife.body.velocity.y*2)
                    knife.isDeflected = true
                }else{
                    this.player.hp = this.player.hp - 10
                    this.damage.play()
                    knife.destroy()
                }
            })

            this.physics.add.collider(knife, this.messer, ()=> {
                if(knife.isDeflected){
                    this.messer.hp -= 100
                    this.hit.play()
                }
            })

            this.physics.add.collider(this.messer, this.player, ()=>{
                this.player.hp -= 100
            })


            }


        const messerMoves = (t) => {
            this.messer.setPosition(512 - Math.cos(t) * this.circleRadius, 384 - Math.sin(t) * this.circleRadius)
            //this.messer.setVelocity((dx)*Math.cos(t)*300*Math.pow(Math.sin(t), 2)/Math.sqrt(dx*dx+dy*dy), (dy)*Math.cos(t)*300*Math.pow(Math.sin(t), 2)/Math.sqrt(dx*dx+dy*dy))
            // Messer's magic circle
            this.messer.circle.x = this.messer.body.x + 20
            this.messer.circle.y = this.messer.body.y + 40
            this.messer.circle.setRotation(Math.PI*2*t)
            
        }

        const messerKnives = () => {
            const prob = Math.floor(Math.random()*this.messer.ease)
            this.messer.anims.play('knives_storm', true)
            if(prob == 0){ // difficulty controller
                spawnKnife(this.t)
            }
            messerMoves(this.t)
            this.t += 0.01
        }

        if(this.boss){
            this.messerLife.setVisible(true);
            this.messerLifeBackground.setVisible(true);
            this.nomeText.setVisible(true);
            messerKnives()
            
            if(this.messer.hp <= 0){
                this.messerLife.setVisible(false);
                this.messerLifeBackground.setVisible(false);
                this.nomeText.setVisible(false);
                this.messer.ease = 0
                this.explosionEmitter.setPosition(this.messer.body.x+16, this.messer.body.y+32)
                this.explosionEmitter.explode()
                this.time.delayedCall(3000, ()=>{
                    this.boss = false
                    this.explosionEmitter.stop()
                    if(!this.soundPlayed){
                        this.explosion.play()
                        this.boss_bgm.stop()
                        this.bgm.play()
                        this.soundPlayed = true
                    }
                    this.shield.setVisible(false)
                    this.portal.setVisible(true)
                    this.messer.destroy()
                    this.messer.circle.destroy()
                }, [], this);             
            }
        }

        else{
            if(this.messer.hp <= 0){
                this.portal.setRotation(this.gameTimer)
                this.portalZone = this.add.zone(539, 0).setSize(50, 50);
                this.physics.world.enable(this.portalZone)
                this.physics.add.overlap(this.player, this.portalZone)
            } 
        }

     // verifica e trata se jogador em zona ativa
        this.checkActiveZone();


        if(this.dialogs.isActive){
            this.meilin.anims.play('meilin_stand', true);
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

            //264, 752-608

    createBarrier(n){
        for(let i = 0; i<n; i++){
            let barrier= this.physics.add.sprite(279, 771-26*i, 'barrier')
            barrier.setScale(0.05)
            barrier.setImmovable(true)
            this.physics.add.collider(this.player, barrier);

        }
    }

    startDialogsOrQuestion(){
        if (this.physics.overlap(this.player, this.zone_dlg)){
                this.dialogs.updateDlgBox(this.txtLst_0);
        }

        else if(this.physics.overlap(this.player, this.portalZone)) this.scene.stop()

        else if(this.physics.overlap(this.player, this.zone_boss)){ 
            this.bgm.stop()
            this.boss_bgm.play()
            this.zone_boss.destroy()
            this.messer.anims.play('knives_cast', true)
            this.warning.play()
            this.messer.circle= this.add.sprite(this.messer.body.x+20, this.messer.body.y+40, 'circle')
            this.messer.circle.setScale(0.1)
            this.createBarrier(7)
            this.time.delayedCall(3000, ()=>{
                this.boss = true
            
            }, [], this);              
        }

        else{
            this.dialogs.updateDlgBox(this.lockedDialogue)
        }
    }
}
