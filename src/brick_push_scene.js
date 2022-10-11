class brick_push_scene extends Phaser.Scene {

    constructor ()
    {
        super('brick_push_scene');
    }

    preload ()
    {
        this.load.spritesheet('bricks', 'assets/images/brickWall.png', { frameWidth: 64, frameHeight: 64 }); 
        this.load.image('parch', 'assets/images/parch.png');
    }

    create ()
    {
        console.log("create")

        // adicionando imagem do pegaminho
        this.parch = this.add.image(400, 100, 'parch');

        // adiciona parede de tijolo
        this.tsp = this.add.tileSprite(400, 400, 800, 400, 'bricks', 0);
        this.tsp.setTileScale(4);

        // adiciona  a pergunta
        this.text = this.add.text(300, 75, "120 - 80 ?", {
            font: "35px Arial",
            fill: "#202020",
            align: "center"
        });        

        this.resp0 = this.add.sprite(32*4, 200+32*4,'bricks', 1);
        this.resp0.setOrigin(0,0)
        this.resp0.setScale(4)
        this.resp0.alpha=0
        this.resp1 = this.add.sprite(32*10, 200+32*6,'bricks', 1);
        this.resp1.setOrigin(0,0)
        this.resp1.setScale(4)
        this.resp1.alpha=0
        this.resp2 = this.add.sprite(32*16, 200+32*4,'bricks', 1);
        this.resp2.setOrigin(0,0)
        this.resp2.setScale(4)
        this.resp2.alpha=0


        //this.locker = this.physics.add.sprite(500, 100, 'items_sp', 5)
        //this.locker.setScale(6);

        this.R0 = this.add.text(32*4+100, 200+32*4+75, "20", {
            font: "40px Arial",
            fill: "#200040",
            align: "center"
        });        
        this.R1 = this.add.text(32*10+100, 200+32*6+75, "30", {
            font: "40px Arial",
            fill: "#550044",
            align: "center"
        });        

        this.R2 = this.add.text(32*16+100, 200+32*4+75, "40", {
            font: "40px Arial",
            fill: "#550044",
            align: "center"
        });        

        this.R0.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 64), Phaser.Geom.Rectangle.Contains);
        this.R1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 64), Phaser.Geom.Rectangle.Contains);
        this.R2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 64), Phaser.Geom.Rectangle.Contains);

        this.R0.on('pointerdown', function (pointer) {
            this.resp0.alpha=1;
        }, this);
        this.R1.on('pointerdown', function (pointer) {
            this.resp1.alpha=1;
        }, this);
        this.R2.on('pointerdown', function (pointer) {
            this.resp2.alpha=1;

        }, this);


        this.R0.on('pointerup', function (pointer) {
            this.scene.start('Phase_01', {'movingWall_sts': 2});
        }, this);
        this.R1.on('pointerup', function (pointer) {
            this.scene.start('Phase_01', {'movingWall_sts': 2});
        }, this);
        this.R2.on('pointerup', function (pointer) {
            this.scene.start('Phase_01', {'movingWall_sts': 1});
        }, this);
        /*
        this.input.on('pointerup', function (pointer) {
            this.scene.start('Phase_01', {'door_sts': 1});
        }, this);
        */

        //this.add.image(120, 160, 'megaset', 'contra2');
    }
}
