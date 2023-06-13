class fase_01_spider extends Phaser.Scene {

    constructor ()
    {
        super('fase_01_spider'); 
    }

    // função para carregamento de assets
    preload ()
    {
        //load spritesheet
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });

        // load tile sheet
        this.load.image('tiles', 'assets/maps/dungeon-16-16.png');

        // load map
        this.load.tilemapTiledJSON('themap', 'assets/maps/the_map.json');

        this.load.spritesheet('swordSwing_sp', 'assets/spritesheets/sw_swing.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bullet', 'assets/spritesheets/elfa_bullet.png', { frameWidth: 16, frameHeight: 16});

        this.load.spritesheet("spider_sp", "assets/spritesheets/spider11.png", {
            frameWidth: 64,
            frameHeight: 64,
          });
      
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

    
        this.shooting_spider = this.physics.add.sprite(80, 540, 'spider_sp', 1);
        this.spider_bullet = this.physics.add.sprite(-10, -10, 'bullet', 0);
        this.spider_bullet.setActive(false);
        this.spider_bullet.setVisible(false);
        this.shoot_timer = this.time.addEvent({ delay: Phaser.Math.Between(2000, 4000), callback: spider_shoot, callbackScope: this });

        // criação da colisão com camadas
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.player, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.keyE = this.input.keyboard.addKey('E');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player, true, 0.2, 0.2)

        // criação das zonas
        this.zone_spider = this.add.zone(600, 400).setSize(400, 400);
        this.physics.world.enable(this.zone_spider);

        // flag para responder uma única vez à tecla pressionada
        this.spacePressed = false;

        this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });
        this.spiders = this.physics.add.group();
        this.spiders.enableBody = true;
        this.spiders.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 5; i++){
            var spider = this.spiders.create(-10, -10, 'spider_sp');
            spider.setScale(0.7);
            spider.body.setSize(10, 10);
            spider.setActive(false);
            spider.setVisible(false);
            spider.on(Phaser.Animations.Events.ANIMATION_COMPLETE, remove_spider, this);

        }
        this.anims.create({
            key: 'spider_walk',
            frames: this.anims.generateFrameNumbers('spider_sp', {frames: [24,25,26,27,28,29]}),
            frameRate: 20,
            repeat: -1
            });
        this.anims.create({
            key: 'spider_die',
            frames: this.anims.generateFrameNumbers('spider_sp', {frames: [40,41,42,43]}),
            frameRate: 3,
            hideOnComplete: true,
            onComplete: remove_spider,
            //onCompleteParams: [this],
            repeat: 0
            });    
    }

    // update é chamada a cada novo quadro
    update ()
    {
        // se tecla solta, limpa a flag
        if (!this.keySPACE.isDown){
            this.spacePressed = false;
        }

        for (let spider of this.spiders.getMatching('active', true)){
            spider.setRotation(Math.atan2(this.player.x-spider.x, -this.player.y+spider.y))
            setSpiderSpeed(spider, this.player);
        }

    }

    checkSwingOverlap(){
        for (let spider of this.spiders.getMatching('active', true)){
            if (Phaser.Geom.Rectangle.Overlaps(spider.getBounds(), this.player.swing.getBounds())){
                console.log('overl')
                //spider.setActive(false);
                //spider.setVisible(false);
                spider.body.setVelocity(0, 0);
                spider.play('spider_die');
                //console.log(spider.anims.getCurrentKey())
                console.log(spider.anims.currentAnim.key)
            }
        }
    }
}

function spawn(){
    if (Phaser.Geom.Rectangle.Overlaps(this.zone_spider.getBounds(), this.player.getBounds())){
        console.log('spawn');
        var spider = this.spiders.getFirstDead(false);
        if (spider){    

            //spider.body.reset(this.player.x, this.player.y);
            spider.body.reset(730, 550);
            spider.setActive(true);
            spider.setVisible(true);
            spider.play('spider_walk');
        }
    
    }
    this.spawn_timer = this.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: spawn, callbackScope: this });
}

function spider_shoot(){
    console.log('shoot')
    if (this.spider_bullet.isActive){
        console.log('bullet active')
    }
    else{

        this.spider_bullet.setActive(true);
        this.spider_bullet.setVisible(true);
        this.spider_bullet.setPosition(80, 550);
        var dx, dy, ampl;
        dx = this.player.x-80
        dy = this.player.y-550
        ampl = Math.sqrt(dx*dx + dy*dy)
        this.spider_bullet.setVelocity(180*dx/ampl, 180*dy/ampl);
    }

    this.shoot_timer = this.time.addEvent({ delay: Phaser.Math.Between(3000, 5000), callback: spider_shoot, callbackScope: this });
}


function setSpiderSpeed(spider, player){
    if (spider.anims.currentAnim.key == 'spider_die' ){
        if (spider.anims.isPlaying == false){
            spider.setActive(false);
        }
        return
    }
    var dx = player.x - spider.x;
    var dy = player.y - spider.y;
    var amp = Math.sqrt(dx*dx + dy*dy);
    spider.setVelocityX(100*dx/amp);
    spider.body.setVelocityY(100*dy/amp);
}

function remove_spider(par0){
    console.log('rem', par0);
    console.log(this);
}
