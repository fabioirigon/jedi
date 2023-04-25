
class Elfa extends Actor {
    constructor(scene, x, y, texture_idle, texture_attack, texture_death) {
      super(scene, x, y, texture_idle, 0);
      this.scene = scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.setSize(this.width/2, 2*this.height/3, true);
      this.setOffset(this.width/4, this.height/3);
      this.scene = scene
  
      this.bullets = scene.physics.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  
      for (var i = 0; i < 5; i++)
      {
          var bullet = this.bullets.create(-10,-10, 'elfa_bullet', 0);
          bullet.setScale(0.5);
          bullet.setActive(false);
          bullet.setVisible(false);
      }
  
      this.anims.create({
          key: 'elfa_idle',
          frames: this.anims.generateFrameNumbers('elfa', {start: 27, end: 28}),
          frameRate: 2,
          yoyo:true,
          repeat: -1
          });
      this.anims.create({
          key: 'elfa_attack_up',
          frames: this.anims.generateFrameNumbers('elfa', {start: 208, end: 220}),
          frameRate: 20,
          repeat: 0
          });
      this.anims.create({
          key: 'elfa_attack_left',
          frames: this.anims.generateFrameNumbers('elfa', {start: 221, end: 233}),
          frameRate: 20,
          repeat: 0
          });
       this.anims.create({
          key: 'elfa_attack_down',
          frames: this.anims.generateFrameNumbers('elfa', {start: 234, end: 246}),
          frameRate: 20,
          repeat: 0
          });
       this.anims.create({
          key: 'elfa_attack_right',
          frames: this.anims.generateFrameNumbers('elfa', {start: 247, end: 259}),
          frameRate: 20,
          repeat: 0
          });
          
          this.anims.create({
            key: 'elfa_death',
            frames: this.anims.generateFrameNumbers('elfa', {start: 260, end: 264}),
            frameRate: 10,
            repeat: 0
  
          });

          this.anims.create({
            key: 'bullet_anim',
            frames: this.anims.generateFrameNumbers('elfa_bullet', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
            });

          
      this.anims.play('elfa_idle');
      this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });
    }
  
  
    attack(){ 
      if (this.body.enable == false){
          return;
      }
      var vx = this.scene.player.x - this.x
      var vy = this.scene.player.y - this.y
      var amp = Math.sqrt(vx*vx+vy*vy)
      var bullet = this.bullets.getFirstDead(false);
      if (bullet){
          bullet.body.reset(this.x, this.y);
          bullet.anims.play('bullet_anim')
          bullet.setActive(true);
          bullet.setVisible(true);
  
          bullet.setVelocityX(160*vx/amp);
          bullet.setVelocityY(160*vy/amp);        
      }
      this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });

    }
  
    preUpdate (time, delta)
    {
      super.preUpdate(time, delta);
    }
  
    bulletHitWall(bullet, wall){
      bullet.setActive(false);
      bullet.setVisible(false);
    }
    die(){

      this.attack_enable = false;
      this.move_enable = false;
      this.body.enable = false;
      console.log("elfa_death", this, this.anims);
      this.anims.play('elfa_death');
      this.on('animationcomplete', this.vanish);
    }
    vanish(){
      this.setVisible(false);
    }
  
  }