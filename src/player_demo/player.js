console.log("actors!! ")

//class player extends Phaser.Physics.Arcade.Sprite {
class player extends Actor {
  constructor(scene, x, y, texture, frame) {
    console.log("act 0", texture, frame)
    super(scene, x, y, texture, frame);
    console.log("2")
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(this.width/2, 2*this.height/3, true);
    this.setOffset(this.width/4, this.height/3);
    this.vx = 0;
    this.vy = 0;

    this.canvas = this.scene.sys.game.canvas;
    console.log('cw', this.canvas.width);


    this.arrows = scene.physics.add.group();
    this.arrows.enableBody = true;
    this.arrows.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 5; i++){
        var arrow = this.arrows.create(-10, -10, 'arrow');
        arrow.setScale(0.2);
        arrow.body.setSize(10, 10);
        arrow.setActive(false);
        arrow.setVisible(false);
    }
    this.arrows_count = 0;
    this.has_shild = false;

    this.has_bow = true;
    this.move_enable = true;
    this.attack_enable = true;
    this.facing = [0, 1];
    this.create_animations(texture);

    this.has_sword = false;
    this.swingZone =  this.scene.add.zone(-50, -50).setSize(25, 25);
    this.swing = this.scene.add.sprite(this.x, this.y, 'swordSwing_sp', 0)
    this.swing.setScale(1.5)
    this.swing.setVisible(false);

    this.scene.physics.world.enable(this.swingZone);
    this.swingZone.setOrigin(0.5, 0.5)
    this.enemyGroup = [];
  }

  create_animations(texture){
    this.anims.create({
        key: 'walk_up',
        frames: this.anims.generateFrameNumbers(texture, {start: 104, end: 112}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_left',
        frames: this.anims.generateFrameNumbers(texture, {start: 117, end: 125}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_down',
        frames: this.anims.generateFrameNumbers(texture, {start: 130, end: 138}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_right',
        frames: this.anims.generateFrameNumbers(texture, {start: 143, end: 151}),
        frameRate: 20,
        repeat: -1
        });

    this.anims.create({
        key: 'attack_up',
        frames: this.anims.generateFrameNumbers(texture, {start: 208, end: 220}),
        frameRate: 30,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_left',
        frames: this.anims.generateFrameNumbers(texture, {start: 221, end: 233}),
        frameRate: 30,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_down',
        frames: this.anims.generateFrameNumbers(texture, {start: 234, end: 246}),
        frameRate: 30,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_right',
        frames: this.anims.generateFrameNumbers(texture, {start: 247, end: 259}),
        frameRate: 30,
        repeat: 0
        });

    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers(texture, {start: 260, end: 265}),
        frameRate: 20,
        repeat: 0
        });

    this.anims.create({
      key: 'swing_up', 
      frames: this.anims.generateFrameNumbers(texture, {start: 156, end: 161}),
      frameRate: 20,
      repeat: 0
      });
    this.anims.create({
      key: 'swing_left', 
      frames: this.anims.generateFrameNumbers(texture, {start: 169, end: 174}),
      frameRate: 20,
      repeat: 0
      });
    this.anims.create({
      key: 'swing_down', 
      frames: this.anims.generateFrameNumbers(texture, {start: 182, end: 187}),
      frameRate: 20,
      repeat: 0
      });
    this.anims.create({
      key: 'swing_right', 
      frames: this.anims.generateFrameNumbers(texture, {start: 195, end: 200}),
      frameRate: 20,
      repeat: 0
      });

    this.scene.anims.create({
      key: 'swordSwing',
      frames: this.anims.generateFrameNumbers('swordSwing_sp', {start: 0, end: 4}),
      frameRate: 20,
      hideOnComplete: true,
      repeat: 0
      });

  }

  set_player_velocity(){
    
    if (this.scene.keyD?.isDown) {
        //console.log(this.velocity)
        this.vx = ((this.vx<210)?this.vx+20:210);
    }
    else if (this.scene.keyA?.isDown) {
      this.vx = ((this.vx>-210)?this.vx-20:-210);
    }
    else{
        this.vx=0;
    }

    // velocidade vertical
    if (this.scene.keyW.isDown) {
      this.vy = ((this.vy>-210)?this.vy-20:-210);
    }
    else if (this.scene.keyS.isDown) {
        this.vy = ((this.vy<210)?this.vy+20:210);
    }
    else{
        this.vy=0;
    }    
    this.setVelocityX(this.vx); 
    this.setVelocityY(this.vy); 

  }

  set_walk_animation(){
    if (this.body.velocity.x > 0){
      this.anims.play('walk_right', true);
      this.facing = [1, 0];
    }
    else if (this.body.velocity.x < 0){
      this.anims.play('walk_left', true);
      this.facing = [-1, 0];      
    }
    else if (this.body.velocity.y > 0){
      this.anims.play('walk_down', true);
      this.facing = [0, 1];
    }
    else if (this.body.velocity.y < 0){
      this.anims.play('walk_up', true);
      this.facing = [0, -1];
    }
    else{
      this.anims.stop();
    }
  }

  attack(){ 
    
    if (this.arrows.countActive(false) <= 0){
      return;
    }

    if(this.arrows_count <= 0) 
        return;
    else
        this.arrows_count -= 1;

    this.anims.stop();
    this.attack_enable = false;
    this.move_enable = false;
    this.on('animationcomplete', this.re_enable);
    if (this.facing[0] == 1)
      this.anims.play('attack_right');
    else if (this.facing[0] == -1)
      this.anims.play('attack_left');
    else if (this.facing[1] == 1)
      this.anims.play('attack_down');
    else
      this.anims.play('attack_up');
  }

  swattack(){
    //console.log('swing', this.facing, this.arrows.countActive(false));

    this.anims.stop();
    this.attack_enable = false;
    this.move_enable = false;
    this.on('animationcomplete', this.swingFinished);
    if (this.facing[0] == 1){
      this.swing.setPosition(this.body.x+30, this.body.y+5);
      this.anims.play('swing_right');
      this.swing.setRotation(0);
      this.swing.flipX = false;
      this.swing.flipY = false;
      this.swing.setVisible(true)
      this.swing.play("swordSwing")
      //this.swingZone.setPosition(this.body.x+25, this.body.y+5)
    }
    else if (this.facing[0] == -1){
      this.anims.play('swing_left');
      this.swing.setPosition(this.body.x-10, this.body.y+5);
      this.swing.setRotation(0)
      this.swing.flipX = true;
      this.swing.flipY = false;
      this.swing.setVisible(true)
      this.swing.play("swordSwing")
      //this.swingZone.setPosition(this.body.x-15, this.body.y+5)
    }
    else if (this.facing[1] == 1){
      this.anims.play('swing_down');
      //this.swingZone.setPosition(this.body.x+5, this.body.y+25)
      this.swing.setPosition(this.body.x+10, this.body.y+30);
      this.swing.setRotation(3.14*0.5);
      this.swing.flipX = false;
      this.swing.flipY = false;
      this.swing.setVisible(true)
      this.swing.play("swordSwing")
    }
    else{
      this.anims.play('swing_up');
      //this.swingZone.setPosition(this.body.x+5, this.body.y-15)
      this.swing.setPosition(this.body.x+5, this.body.y-15);
      this.swing.flipX = false;
      this.swing.flipY = true;
      this.swing.setRotation(3.14*1.5);
      this.swing.setVisible(true)
      this.swing.play("swordSwing")
    }
    if (typeof this.scene.checkSwingOverlap == 'function')
    {
      console.log('its a func');
      this.scene.checkSwingOverlap();
    }
    //console.log('ovlp ', Phaser.Geom.Intersects.RectangleToRectangle(this.scene.spider.body, this.swing))
  }

  swingFinished(){
    this.removeListener('animationcomplete');
    this.attack_enable = true;
    this.move_enable = true;
  }


  re_enable(){
    this.removeListener('animationcomplete');
    this.attack_enable = true;
    this.move_enable = true;

    var arrow = this.arrows.getFirstDead(false);
    if (arrow){
        var vx = this.facing[0] * 100
        var vy = this.facing[1] * 100

        arrow.body.reset(this.x, this.y);
        arrow.setActive(true);
        arrow.setVisible(true);

        arrow.setVelocityX(vx);
        arrow.setVelocityY(vy);
        var ang = 0;
        var pi = Phaser.Math.PI2/2;
        if (this.facing[0] == 1)
          ang = 0.5;
        else if (this.facing[0] == -1)
          ang = -0.5;
        else if  (this.facing[1] == 1)
           ang = 1;
        console.log(ang, this.facing);
        arrow.rotation = ang*pi;
    }
  }


  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);
  
    if (this.move_enable){
      this.set_player_velocity();
      this.set_walk_animation();
    }
    else{
      this.setVelocityX(0); 
      this.setVelocityY(0); 
    }

    if (this.scene.keySPACE.isDown && this.attack_enable && this.has_bow) {
      this.attack();
    }

    if (this.scene.keySPACE.isDown && this.attack_enable && this.has_sword) {
      this.swattack();
    }

   
    for (let v of this.arrows.getMatching('visible', true)){
      if (v.x > this.canvas.width || v.x < 0 || v.y > this.canvas.height || v.y <0){
        v.setActive(false);
        v.setVisible(false);
        v.setVelocity(0, 0);
        v.body.reset(-10, -10);
      }
    };
   
}

  die(){
    console.log('a')
    this.attack_enable = false;
    console.log('b')
    this.move_enable = false;
    console.log('c')
    this.body.enable=false;
    console.log(this.scene.gameOver)
    this.on('animationcomplete', this.scene.gameOver, this.scene);
    console.log('e')
    this.anims.play('die');
  }

}

