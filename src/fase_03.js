class Fase_03 extends Phaser.Scene {
	// O construtor registra o nome da cena
	constructor() {
		console.log('fase 03')
		super("Fase_03");
	}

	// função para carregamento de assets
	preload() {
		// Personagem principal
		this.load.spritesheet("playerbow_sp", "assets/spritesheets/playerbow_sp.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		// 
		this.load.spritesheet("spider_sp", "assets/spritesheets/spider11.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		// Elfa
		this.load.spritesheet("elfa", "assets/spritesheets/elfa.png", {
			frameWidth: 64,
			frameHeight: 64,
		});    
		// Robin Rocks
		this.load.spritesheet("robin_sp", "assets/spritesheets/robin_sp.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		// Good Witch
		this.load.spritesheet("witch_sp","assets/spritesheets/witch_sp.png", {
			frameWidth: 32,
			frameHeight: 48,
		});
		
		// Elementos gráficos do mapa
		this.load.spritesheet("tls_firstasset", "assets/maps/first_asset.png", {
			frameWidth: 32,
			frameHeight: 32,
			margin: 16,
		});
		this.load.spritesheet("tls_solaria", "assets/maps/solaria.png", {
			frameWidth: 16,
			frameHeight: 16,
		});
		this.load.spritesheet("tls_topdown-forest", "assets/maps/top-down-forest-tileset.png", {
			frameWidth: 32,
			frameHeight: 32,
			margin: 16 
		});

		this.load.spritesheet('elfa_bullet', 'assets/spritesheets/elfa_bullet.png', { frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('lightning_sp', 'assets/spritesheets/lightning.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('swordSwing_sp', 'assets/spritesheets/sw_swing.png', { frameWidth: 16, frameHeight: 16});

		this.load.image("tiles1", "assets/maps/first_asset.png");
		this.load.image("tiles2", "assets/maps/solaria.png");
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.image('arrow', 'assets/images/arrow.png');
		this.load.image("tiles3", "assets/maps/top-down-forest-tileset.png");

		this.load.tilemapTiledJSON("fase3", "assets/maps/fase.json");
	}

	create_map(){
		// criação do mapa e ligação com a imagem (tilesheet)
		this.map = this.make.tilemap({
			key: "fase3",
			tileWidth: 16,
			tileHeight: 16,
		});

		this.tileset1 = this.map.addTilesetImage("tls_firstasset", "tiles1");
		this.tileset2 = this.map.addTilesetImage("tls_topdown-forest", "tiles3");
		this.tileset3 = this.map.addTilesetImage("tls_solaria", "tiles2");

		// criação das camadas
		this.ground0Layer = this.map.createLayer(
			"ground0",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.groundLayer = this.map.createLayer(
			"ground",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.riverLayer = this.map.createLayer(
			"river",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.ground2Layer = this.map.createLayer(
			"ground2",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.bridge2Layer = this.map.createLayer(
			"bridge2",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.tree1Layer = this.map.createLayer(
			"tree1",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.tree2Layer = this.map.createLayer(
			"tree2",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.houseLayer = this.map.createLayer(
			"house",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.perfumariaLayer = this.map.createLayer(
			"perfumaria",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.bridgeLayer = this.map.createLayer(
			"bridge",
			[this.tileset1, this.tileset2, this.tileset3], 0, 0);
		this.bridgeLayer.setVisible(false);
	}

	create_actors(){

		// Criação do Robin Rock
		this.robin = this.physics.add.sprite(995, 90, "robin_sp", 26);
		this.robin.setScale(0.4);
		this.robin.body.immovable = true;
		this.robin.body.moves = false;

		// Criação do personagem principal
		//this.player = new player(this, 815, 100, 'playerbow_sp', 26);
		this.player = new player(this, 40, 730, 'playerbow_sp', 26);
		this.player.setScale(0.4);
		this.player.setSize(32, 32);
		this.player.setOffset(16, 32);
		this.player.has_bow = false;

		//this.spider = this.physics.add.sprite(810, 140, 'spider_sp', 0);
		//this.spider.setScale(0.5)
		//qthis.spider.body.setSize(this.spider.width*0.5, this.spider.height*0.5)

		this.light = this.add.sprite(this.player.x, this.player.y, 'lightning_sp')
		this.light.setScale(2);
		this.light.setVisible(false);
	
		
		// Criação da Good Witch
		this.bruxa = this.physics.add.sprite(1032, 660, "witch_sp", 1);
		this.bruxa.setScale(0.7);
		this.bruxa.setSize(16, 16);
		this.bruxa.setOffset(7, 26);
		this.bruxa.body.immovable = true;
		this.bruxa.body.moves = false;
		this.bruxa.flipX = true;

		// Criação das esferas do dragão
		var e1 = this.add.text(1135, 445, "1", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera1 = this.physics.add.sprite(1150, 450, "tls_solaria", 331);
		this.esfera1.body.immovable = true;
		this.esfera1.body.moves = false;

		var e2 = this.add.text(1135, 470, "2", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera2 = this.physics.add.sprite(1150, 475, "tls_solaria", 331);
		this.esfera2.body.immovable = true;
		this.esfera2.body.moves = false;

		var e3 = this.add.text(1135, 495, "3", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera3 = this.physics.add.sprite(1150, 500, "tls_solaria", 331);
		this.esfera3.body.immovable = true;
		this.esfera3.body.moves = false;

		var e4 = this.add.text(1135, 520, "4", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera4 = this.physics.add.sprite(1150, 525, "tls_solaria", 331);
		this.esfera4.body.immovable = true;
		this.esfera4.body.moves = false;
		
		var e5 = this.add.text(1135, 545, "5", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera5 = this.physics.add.sprite(1150, 550, "tls_solaria", 331);
		this.esfera5.body.immovable = true;
		this.esfera5.body.moves = false;

		var e6 = this.add.text(1135, 570, "6", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera6 = this.physics.add.sprite(1150, 575, "tls_solaria", 331);
		this.esfera6.body.immovable = true;
		this.esfera6.body.moves = false;
		
		var e7 = this.add.text(1135, 595, "7", {font: "12px Arial",fill: "#000000",align: "center"});
		this.esfera7 = this.physics.add.sprite(1150, 600, "tls_solaria", 331);
		this.esfera7.body.immovable = true;
		this.esfera7.body.moves = false;

		//game.input.onDown.add(changeTint, this);

		//criação da parede invisível
		this.invisible = this.physics.add.sprite(1048, 695, "tls_solaria", 345);
		this.invisible.body.immovable = true;
		this.invisible.body.moves = false;
		this.invisible.setSize(16, 40);

		// camera seguindo o jogador
		this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
		this.cameras.main.setZoom(2);
		
	}


	create_animations(){
		this.anims.create({
			key: 'witch_idle',
			frames: this.anims.generateFrameNumbers('witch_sp', {frames: [0, 1, 2, 3, 4, 5]}),
			frameRate: 8,
			repeat: -1
			});

			this.anims.create({
				key: 'lightning_anim',
				frames: this.anims.generateFrameNumbers('lightning_sp', {}),
				frameRate: 30,
				hideOnComplete: true,
				repeat: 1
				});

	}


	create_collisions(){

		//criação da colisão
		this.ground2Layer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.player, this.ground2Layer);
		//this.physics.add.collider(this.player.arrows, this.ground2Layer, projectilHitWall, null, this);

		this.tree1Layer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.player, this.tree1Layer);
		this.physics.add.collider(this.player.arrows, this.tree1Layer, projectilHitWall, null, this);

		this.tree2Layer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.player, this.tree2Layer);
		this.physics.add.collider(this.player.arrows, this.tree2Layer, projectilHitWall, null, this);

		this.houseLayer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.player, this.houseLayer);
		this.physics.add.collider(this.player.arrows, this.houseLayer, projectilHitWall, null, this);

			
		this.physics.add.collider(this.player, this.robin);
		this.physics.add.collider(this.player, this.bruxa);

		this.physics.add.collider(this.player, this.esfera1);
		this.physics.add.collider(this.player.arrows, this.esfera1, projectilHitCrystal, null, this);
		this.physics.add.collider(this.player, this.esfera2);
		this.physics.add.collider(this.player.arrows, this.esfera2, projectilHitCrystal2, null, this);
		this.physics.add.collider(this.player, this.esfera3);
		this.physics.add.collider(this.player.arrows, this.esfera3, projectilHitCrystal3, null, this);
		this.physics.add.collider(this.player, this.esfera4);
		this.physics.add.collider(this.player.arrows, this.esfera4, projectilHitCrystal, null, this);
		this.physics.add.collider(this.player, this.esfera5);
		this.physics.add.collider(this.player.arrows, this.esfera5, projectilHitCrystal5, null, this);
		this.physics.add.collider(this.player, this.esfera6);
		this.physics.add.collider(this.player.arrows, this.esfera6, projectilHitCrystal, null, this);
		this.physics.add.collider(this.player, this.esfera7);
		this.physics.add.collider(this.player.arrows, this.esfera7, projectilHitCrystal7, null, this);

		this.physics.add.collider(this.player, this.invisible);
	}

	// criação do diálogo
	create_tweens(){

		// Falas da primeira cena
//      var t88 = this.add.text(600, 450, "testando", {
//          font: "15px Arial",
//          fill: "#674ea7",
//          align: "center"
//      });        
		var px = this.cameras.main.width*0.35;
		var py = 2*this.cameras.main.height/3
		console.log(this.cameras.main.width, this.cameras.main.height, px, py);
		this.dialog_bg =  this.add.rectangle(this.cameras.main.width*0.5, this.cameras.main.height*0.65, 
			this.cameras.main.width*0.4, this.cameras.main.height*0.2, 0x000000);
		this.dialog_bg.setScrollFactor(0);
		this.dialog_bg.setVisible(false);

			this.interact_txt = this.add.text(px, py, "Pressione E para interagir", {
				font: "15px Arial",
				fill: "#A0A0A0",
				align: "center", 
				stroke: '#000000',
				strokeThickness: 4,
		});
		this.interact_txt.setScrollFactor(0)
		this.interact_txt.alpha = 1

		//text.stroke = '#000000';
		//text.strokeThickness = 6;
		//text.fill = '#43d637';

		/*
			var t0 = this.add.text(px, py, "Está perdido?\n Não se pode atravessar o Rio das Flores", {
					font: "15px Arial",
					fill: "#674ea7",
					align: "center"
			});        
			var t1 = this.add.text(px, py, "Siga para cima.\n As árvores te mostrarão o caminho", {
					font: "15px Arial",
					fill: "#674ea7",
					align: "center"
			});
			var t2 = this.add.text(px, py, "Obrigada bela bruxa!", {
				font: "15px Arial",
				fill: "#DC143C",
				align: "center"
			});        

			//t88.setScrollFactor(0);

			t0.setScrollFactor(0);
			t1.setScrollFactor(0);
			t2.setScrollFactor(0);

			t0.alpha = 0
			t1.alpha = 0
			t2.alpha = 0


			
			// timeline: sequência
			this.timeline = this.tweens.createTimeline({paused: true});

			// primeira fssss     sssala - bruxinha
			this.timeline.add({
					targets: t0,
					alpha: 1,
					ease: 'linear',
					duration: 1000, 
					yoyo: true,
					hold: 3000,
					onStart: this.showDlg, 
					onStartParams: [this.dialog_bg]

			});

			// segunda fala - bruxinha
			this.timeline.add({
					targets: t1,
					alpha: 1,
					ease: 'linear',
					duration: 1000,
					yoyo: true,
					hold: 3000
			});

			// terceira fala - aventureira
			this.timeline.add({
				targets: t2,
				alpha: 1,
				ease: 'linear',
				duration: 1000,
				yoyo: true,
				hold: 3000,
				onComplete: this.hideDlg, 
				onCompleteParams: [this.dialog_bg, this.player]

			});
			
	// ----------------------------------------------------------------
	// Falas da segunda cena

	
		var t3 = this.add.text(px, py, "Olá, o senhor sabe como atravessar o rio?", {
			font: "15px Arial",
			fill: "#DC143C"
			//align: "center"
		});   
				 
		var t4 = this.add.text(px, py, "O que me diz de uma troca justa?\n Uma resposta por outra.", {
				font: "15px Arial",
				fill: "#744700",
				align: "center"
		});
		
		var t5 = this.add.text(px, py, "Manda ver!", {
			font: "15px Arial",
			fill: "#DC143C",
			align: "center"
		});        

		t3.setScrollFactor(0);
		t4.setScrollFactor(0);
		t5.setScrollFactor(0);

		t3.alpha = 0
		t4.alpha = 0
		t5.alpha = 0

		// timeline: sequência
		this.timelineRobin = this.tweens.createTimeline({paused: true});
		this.timelineRobin.setCallback('onComplete', this.pergunta, null, this);

		// primeira fala - aventureira
		this.timelineRobin.add({
				targets: t3,
				alpha: 1,
				ease: 'linear',
				duration: 1000, 
				yoyo: true,
				hold: 3000,
				onStart: this.showDlg, 
				onStartParams: [this.dialog_bg]
		});

		// segunda fala - Robin Rock
		this.timelineRobin.add({
				targets: t4,
				alpha: 1,
				ease: 'linear',
				duration: 1000,
				yoyo: true,
				hold: 3000
		});

		// terceira fala - aventureira
		this.timelineRobin.add({
			targets: t5,
			alpha: 1,
			ease: 'linear',
			duration: 1000,
			yoyo: true,
			hold: 3000
		});

		// ----------------------------------------------------------------
		// Continuação da segunda cena

		var t6 = this.add.text(px, py, "Impressionante! Tome este arco!\n pressione ESPAÇO para atirar!", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
		});   
				 
		var t7 = this.add.text(px, py, "Para atravessar o rio, atire nos cristais\nde número primo que estão na outra margem.", {
				font: "15px Arial",
				fill: "#744700",
				align: "center"
		});
		
		var t8 = this.add.text(px, py, "Assim a ponte será revelada!", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
		});       

		var t9 = this.add.text(px, py, "Valeu meu consagrado!", {
			font: "15px Arial",
			fill: "#DC143C",
			align: "center"
		});  

		t6.setScrollFactor(0);
		t7.setScrollFactor(0);
		t8.setScrollFactor(0);
		t9.setScrollFactor(0);

		t6.alpha = 0
		t7.alpha = 0
		t8.alpha = 0
		t9.alpha = 0

		// timeline: sequência
		this.timelineRobin2 = this.tweens.createTimeline({paused: true});

		// 
		this.timelineRobin2.add({
				targets: t6,
				alpha: 1,
				ease: 'linear',
				duration: 1000, 
				yoyo: true,
				hold: 3000
		});

		// 
		this.timelineRobin2.add({
				targets: t7,
				alpha: 1,
				ease: 'linear',
				duration: 1000,
				yoyo: true,
				hold: 3000
		});

		// 
		this.timelineRobin2.add({
			targets: t8,
			alpha: 1,
			ease: 'linear',
			duration: 1000,
			yoyo: true,
			hold: 3000
		});

		// 
		this.timelineRobin2.add({
			targets: t9,
			alpha: 1,
			ease: 'linear',
			duration: 1000,
			yoyo: true,
			hold: 3000,
			onComplete: this.hideDlg, 
			onCompleteParams: [this.dialog_bg, this.player]

		});
		*/
	}

	// função para criação dos elementos
	create() {
		localStorage.setItem('fase', 'Fase_03');

		this.create_map();
		this.create_actors();
		this.create_animations();
		this.create_collisions();

		this.create_tweens();

		// adicionando uma zona com gatilho, quando entrar aciona a função onZone
		this.zoneDialog = true;
		this.zone = this.add.zone(1020, 650).setSize(80, 100);
		this.physics.world.enable(this.zone);
		this.physics.add.overlap(this.player, this.zone, this.onZone, null, this);

		this.zoneDialog2 = true;
		this.zone2 = this.add.zone(970, 90).setSize(100, 100);
		this.physics.world.enable(this.zone2);
		this.physics.add.overlap(this.player, this.zone2, this.onZone2, null, this);

		// adicionando uma zona de saida
		this.zoneSaida = this.add.zone(1200, 500).setSize(10, 80);
		this.physics.world.enable(this.zoneSaida);
		this.physics.add.overlap(this.player, this.zoneSaida, this.onZoneSaida, null, this);
		this.physics.add.collider(this.zoneSaida, this.player.arrows, projectilHitZone, null, this);
		this.zoneSaida.body.immovable = true;
		this.zoneSaida.body.moves = false;

		// adicionando uma parede na entrada do mapa
		this.parede = this.add.zone(5, 750).setSize(10, 80);
		this.physics.world.enable(this.parede);
		this.physics.add.collider(this.player.arrows, this.parede, projectilHitCrystal, null, this);
		this.physics.add.collider(this.player, this.parede, null, null, this);
		this.parede.body.immovable = true;
		this.parede.body.moves = false;

		// ligação das teclas de movimento
		this.keyA = this.input.keyboard.addKey("A");
		this.keyD = this.input.keyboard.addKey("D");
		this.keyW = this.input.keyboard.addKey("W");
		this.keyS = this.input.keyboard.addKey("S");
		this.keyE = this.input.keyboard.addKey("E");
		this.keySPACE = this.input.keyboard.addKey("Space");
		this.keyN = this.input.keyboard.addKey("N");
		this.keyEsc = this.input.keyboard.addKey("ESC");
		this.game_over = false;

		this.bruxa.play('witch_idle')

		this.crystal2 = false;
		this.crystal3 = false;
		this.crystal5 = false;
		this.crystal7 = false;
		this.ponte = true;

		this.txts = [
			["Está perdido?\n Não se pode atravessar o Rio das Flores", "Siga para cima.\n As árvores te mostrarão o caminho", "Obrigada bela bruxa!"],
			["Olá, o senhor sabe como atravessar o rio?", "O que me diz de uma troca justa?\n Uma resposta por outra.", "Manda ver!"],
			["Impressionante! Tome este arco!", "Para atravessar o rio, atire nos cristais\nde número primo que estão na outra margem.\nPressione ESPAÇO para atirar!", "Assim a ponte será revelada!", "Valeu meu consagrado!"]
			]

			this.Q0 =  ["Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?",
			1, "◯ 3589 livros", "◯ 3859 livros",  "◯ 30859 livros",  "◯ 38590 livros"]
			this.Q1 =  ["Tenho 6 caixas gigantes com 1000 livros cada!\nMais 4 caixas de 100 livros, mais 2 pacotes\nde 10 livros, e mais 3 livrinhos diversos.\nQuantos livros eu tenho?",
			2, "◯ 6342 livros", "◯ 64230 livros",  "◯ 6423 livros",  "◯ 6430 livros"]
			this.Q2 =  ["Tenho 4 caixas gigantes com 1000 livros cada!\nMais 7 caixas de 100 livros, mais 2 pacotes\nde 10 livros, e mais 5 livrinhos diversos.\nQuantos livros eu tenho?",
			0, "◯ 4725 livros", "◯ 4752 livros",  "◯ 47250 livros",  "◯ 427 livros"]
			this.questions = [this.Q0, this.Q1, this.Q2]

		this.dialogs = new dialogs(this);   
		this.dlgBox = true;
		this.askQuestion = true;
		//createQuestion(this);
		//this.dialogs.makeQuestion(this.Q0, acertou2, errou2)
		this.interact_txt.alpha = 1;
		this.create_elfa()
	}
 
	// update é chamada a cada novo quadro
	update() {

		//this.spider.setRotation(Math.atan2(this.player.x-this.spider.x, -this.player.y+this.spider.y))

		this.player.body.debugBodyColor = this.player.body.touching.none ? 0x0099ff : 0xff9900;
		if (this.player.body.embedded && this.dialogs.isActive==false){
				this.interact_txt.alpha = 1;
				if (Phaser.Input.Keyboard.JustDown(this.keyE)){
					if (this.physics.overlap(this.player, this.zone)){
						if (this.dlgBox){
							this.dialogs.updateDlgBox(this.txts[0]);
							this.dlgBox = false;
						}
						else{
							this.dialogs.updateDlgBox(this.txts[0], 1);
						}
					}
					if (this.physics.overlap(this.player, this.zone2))
					{
						if (this.zoneDialog2)
						{
							this.zoneDialog2 = false;
							this.dialogs.updateDlgBox(this.txts[1], 0, makeQuestion)
						}
						else if (this.askQuestion)
						{
							makeQuestion(this);
						}
						else{
							this.dialogs.updateDlgBox(this.txts[2], 1, null);
						}
					}
					//console.log("z2", Phaser.Geom.Rectangle.Overlaps(this.zone2, this.player));
					//console.log(this.zone)
				}
		}
		else{
			this.interact_txt.alpha = 0;
		}

		if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
			//console.log(this.player.anims)
			//this.player.anims.play('attack_up')
			console.log(this.player.x, this.player.y, this.player.has_bow, this.player.attack_enable)
			if (this.dialogs.isActive){
				this.dialogs.nextDlg();
			}
			
			else if (this.player.attack_enable && this.player.has_bow){
				this.player.attack_enable = true;
				this.player.attack();
			}
			

		}


		if(this.crystal2 && this.crystal3 && this.crystal5 && this.crystal7 && this.ponte){
			this.bridgeLayer.setVisible(true);
			this.bridge2Layer.setActive(false);
			this.invisible.destroy();
			this.ponte = false;
		}

		if (this.keyN.isDown) {
				this.scene.start('Fase_05')
		}

		if (this.game_over){
			if (this.keySPACE.isDown) {
					this.scene.restart();
			}            
		}
		
}

	onZoneSaida(){
		this.scene.start('Fase_05')
	}

	// a função limpa a flag 'zoneDialog' para executar o diálogo (tween) uma vez só
	onZone(){
		if (this.zoneDialog == true){

			if (0){
				// impede o movimento
				this.player.move_enable = false;
				this.player.anims.stop();
				
				//this.dlgBox.setVisible(true)
				this.timeline.play();

				this.zoneDialog = false;
			}

		}
	}

	onZone2(){


		//if (this.zoneDialog2 == true){
		if (false){


			this.zoneDialog = false;
			this.zoneDialog2 = false;

			//this.dlgBox.setVisible(true)
			this.timelineRobin.play();
			 
			// impede o movimento
			this.player.move_enable = false;
			this.player.anims.stop();
			
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);

//      setTimeout(() => {
//
//        // pergunta: 
//        this.quest = this.add.text(975, 660, "Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?", {
//          font: "15px Arial",
//          fill: "#744700",
//          align: "center"
//        });
//
//        this.a0 = this.add.text(1010, 735, "◯ 3589 livros", {
//            font: "15px Arial",
//            fill: "#744700",
//            align: "center"
//        });
//
//        this.a1 = this.add.text(1135, 735, "◯ 3859 livros", {
//            font: "15px Arial",
//            fill: "#744700",
//            align: "center"
//        });
//
//        this.a2 = this.add.text(1010, 765, "◯ 30859 livros", {
//            font: "15px Arial",
//            fill: "#744700",
//            align: "center"
//        });
//
//        this.a3 = this.add.text(1135, 765, "◯ 38590 livros", {
//          font: "15px Arial",
//          fill: "#744700",
//          align: "center"
//      });

//      this.quest.setScrollFactor(0);
//      this.a0.setScrollFactor(0);
//      this.a1.setScrollFactor(0);
//      this.a2.setScrollFactor(0);
//      this.a3.setScrollFactor(0);

 //     // deixa clicar e liga com a função
 //     this.a0.setInteractive();
 //     this.a0.on('pointerdown', this.errou, this);
 //     this.a1.setInteractive();
 //     this.a1.on('pointerdown', this.acertou, this);
 //     this.a2.setInteractive();
 //     this.a2.on('pointerdown', this.errou, this);
 //     this.a3.setInteractive();
 //     this.a3.on('pointerdown', this.errou, this);
 //     
 //   }, 15000);
//
		}
	}

	pergunta(){
		var px = this.cameras.main.width*0.4
		var py = this.cameras.main.height*0.6
		console.log('pergunta', px, py);

		// pergunta: 
		this.quest = this.add.text(px, py-25, "Tenho 3 caixas gigantes com 1000 livros cada!\nMais 8 caixas de 100 livros, mais 5 pacotes\nde 10 livros, e mais 9 livrinhos diversos.\nQuantos livros eu tenho?", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
			});

		this.a0 = this.add.text(px-40, py+45, "◯ 3589 livros", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
		});

		this.a1 = this.add.text(px+120, py+45, "◯ 3859 livros", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
		});

		this.a2 = this.add.text(px-40, py+65, "◯ 30859 livros", {
			font: "15px Arial",
			fill: "#744700",
			align: "center"
		});

		this.a3 = this.add.text(px+120, py+65, "◯ 38590 livros", {
		font: "15px Arial",
		fill: "#744700",
		align: "center"
		});
		this.quest.setScrollFactor(0);
		this.a0.setScrollFactor(0);
		this.a1.setScrollFactor(0);
		this.a2.setScrollFactor(0);
		this.a3.setScrollFactor(0);
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

	// função erro e acerto
	errou(){
			console.log("errou");
			 this.scene.restart();
	}

	create_elfa(){
			/*
			console.log("acertou");
			this.quest.setVisible(false);
			this.a0.setVisible(false);
			this.a1.setVisible(false);
			this.a2.setVisible(false);
			this.a3.setVisible(false);
			this.player.has_bow = true;
			this.timelineRobin2.play();
			setTimeout(() => {
				this.player.move_enable = true;
				//this.dlgBox.setVisible(false)
			}, 20000);

		//this.dlgTxt.setVisible(false);
		//this.r2.setVisible(false);

		this.alternatives.getChildren().forEach(function(alter){
			alter.setVisible(false);
			alter.setInteractive(false);
		 });
		*/
		
		// Criação da Elfa
		this.elfa = new Elfa(this, 225, 270, 'elfa', 26);
		this.elfa.setScale(0.4);
		this.elfa.setSize(32, 32);
		this.elfa.setOffset(16, 32);
		this.elfa.body.immovable = true;
		this.elfa.body.moves = false;
		this.elfa.flipX = true;

		this.physics.add.collider(this.elfa.bullets, this.tree1Layer, projectilHitWall, null, this);
		this.physics.add.collider(this.elfa.bullets, this.tree2Layer, projectilHitWall, null, this);
		this.physics.add.collider(this.elfa.bullets, this.ground2Layer, projectilHitWall, null, this);
		this.physics.add.collider(this.elfa, this.player.arrows, projectilHitActor, null, this);
		this.physics.add.collider(this.player, this.elfa.bullets, projectilHitActor, null, this);
		this.physics.add.collider(this.player, this.elfa);
	}

	gameOver(){
		console.log('game over');
		this.game_over = true;
		player.move_enable = false;
	
		var wd = window.innerWidth;
		var wh = window.innerHeight;        
		var txt_cfg = {font: "15px Arial",fill: "#F0F000", align: "center"}
		console.log(this.player.x, this.player.y, txt_cfg)
		var t0 = this.add.text(this.player.x, this.player.y, "Pressione Espaço para reiniciar", txt_cfg);
	}

	hideDlg(tween, targets, gameObject, player){
		gameObject.setVisible(false);
		player.move_enable = true;
	}

	showDlg(tween, targets, gameObject){
		console.log(gameObject)
		gameObject.setVisible(true);
	}

}

function projectilHitActor(actor, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);

	console.log('HP', actor.getHPValue())
	actor.getDamage(22);
	if (actor.getHPValue() == 0){
			actor.die();
	}
}


function projectilHitWall(projectil, wall){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
}

function projectilHitCrystal(crystal, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
	if(this.ponte){
		this.crystal2 = false;
		this.crystal3 = false;
		this.crystal5 = false;
		this.crystal7 = false;
		this.esfera2.tint = 0xffffff;
		this.esfera3.tint = 0xffffff;
		this.esfera5.tint = 0xffffff;
		this.esfera7.tint = 0xffffff;
	}
}

function projectilHitZone(zone, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
}

function projectilHitCrystal2(crystal, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
	this.crystal2 = true;
	this.esfera2.tint = 0x3388ff;
}

function projectilHitCrystal3(crystal, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
	this.crystal3 = true;
	this.esfera3.tint = 0x3388ff;
}

function projectilHitCrystal5(crystal, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
	this.crystal5 = true;
	this.esfera5.tint = 0x3388ff;
}

function projectilHitCrystal7(crystal, projectil){
	projectil.setActive(false);
	projectil.setVisible(false);
	projectil.setVelocity(0, 0);
	projectil.body.reset(-10, -10);
	this.crystal7 = true;
	this.esfera7.tint = 0x3388ff;
}

function makeQuestion(scene){
	
	var question = scene.questions[Math.floor(Math.random() * scene.questions.length)];
	console.log('mkquestion', question);
	//scene.dialogs.makeQuestion(question, acertou2, errou2)
	scene.dialogs.makeQuestion(question, acertou2, errou2)
}

function acertou2(pointer){
	console.log('acertou');
	this.dialogs.hideBox();
	this.askQuestion = false;
	this.dialogs.updateDlgBox(this.txts[2], 0, give_bow);
}

function give_bow(scene){
	scene.player.has_bow = true;
	scene.player.attack_enable  = true;
	scene.create_elfa()
}

function errou2(pointer){
	console.log('errou');
	//scene.light.setPosition(scene.player.x, scene.player.y);
	this.dialogs.hideBox();
	this.light.setPosition(this.player.x, this.player.y);
	this.light.setVisible(true)
	this.light.play("lightning_anim");
	this.player.getDamage(25);
	if (this.player.getHPValue() == 0){
		this.player.die();
	}
}



