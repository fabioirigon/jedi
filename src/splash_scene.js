class splash_scene extends Phaser.Scene {

    constructor ()
    {
        super('splash_scene');
    }

    preload ()
    {
        this.load.image('bground', 'assets/images/splash_background.jpg');
    }

    create ()
    {
        var textOpts = {font: "40px Arial", fill: "#E50044",align: "center", backgroundColor: "#202020"};

        // adicionando imagem do pegaminho
        this.bground = this.add.image(400, 100, 'bground');

        this.text = this.add.text(300, 75, " O Resgate da Fada Pixie", {
            font: "45px Arial",
            fill: "#00F020",
            align: "center",
            backgroundColor: "#202020"
        });        

        this.R0 = this.add.text(100, 160, "* Novo Jogo", textOpts);        
        this.R1 = this.add.text(100, 240, "* Continuar Aventura", textOpts);        
        this.R2 = this.add.text(100, 320, "* Créditos", textOpts);

        //this.R0.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 64), Phaser.Geom.Rectangle.Contains);
        this.R0.setInteractive();
        this.R1.setInteractive();
        this.R2.setInteractive();

        this.R0.on('pointerover', function (pointer) {
            this.R0.setFill("#FFFF00");
        }, this);
        this.R0.on('pointerout', function (pointer) {
            this.R0.setFill("#E50044");
        }, this);

        this.R1.on('pointerover', function (pointer) {
            this.R1.setFill("#FFFF00");
        }, this);
        this.R1.on('pointerout', function (pointer) {
            this.R1.setFill("#E50044");
        }, this);

        this.R2.on('pointerover', function (pointer) {
            this.R2.setFill("#FFFF00");
        }, this);
        this.R2.on('pointerout', function (pointer) {
            this.R2.setFill("#E50044");
        }, this);


        this.R0.on('pointerup', function (pointer) {
            localStorage.setItem('hp', 100);
            localStorage.setItem('fase', 'Fase_01');
            this.scene.start('Fase_01', {'movingWall_sts': 0});
        }, this);
        this.R1.on('pointerup', function (pointer) {
            var fase = localStorage.getItem('fase') || 'Fase_01';
            this.scene.start(fase, {'movingWall_sts': 0});
        }, this);
        this.R2.on('pointerup', function (pointer) {
            console.log("créditos");
        }, this);
        //this.add.image(120, 160, 'megaset', 'contra2');
    }
}
