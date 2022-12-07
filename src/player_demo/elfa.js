
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
          var bullet = this.bullets.create(-10,-10, 'bullet');
          bullet.setActive(false);
          bullet.setVisible(false);
      }
  
      //this.anims.create({
         // key: 'elfa_idle',
         // frames: this.anims.generateFrameNumbers(texture_idle, {start: 0, end: 5}),
         // frameRate: 6,
         // yoyo:true,
         // repeat: -1
         // });
      this.anims.create({
          key: 'elfa_attack_up',
          frames: this.anims.generateFrameNumbers(texture_attack, {start: 208, end: 220}),
          frameRate: 20,
          repeat: 0
          });
      this.anims.create({
          key: 'elfa_attack_left',
          frames: this.anims.generateFrameNumbers(texture_attack, {start: 221, end: 233}),
          frameRate: 20,
          repeat: 0
          });
       this.anims.create({
          key: 'elfa_attack_down',
          frames: this.anims.generateFrameNumbers(texture_attack, {start: 234, end: 246}),
          frameRate: 20,
          repeat: 0
          });
       this.anims.create({
          key: 'elfa_attack_right',
          frames: this.anims.generateFrameNumbers(texture_attack, {start: 247, end: 259}),
          frameRate: 20,
          repeat: 0
          });
          
      this.anims.create({
          key: 'elfa_death',
          frames: this.anims.generateFrameNumbers(texture_death, {start: 260, end: 265}),
          frameRate: 20,
          repeat: 0,
  
          });
   
      this.anims.play('elfa_idle');
      this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });
    }
  
  
    attack(){ 
      if (this.body.enable == false){
          return;
      }
      var vx = this.scene.player.x - this.x
      var vy = this.scene.player.y - this.y
      var bullet = this.bullets.getFirstDead(false);
      if (bullet){
          bullet.body.reset(this.x, this.y);
          bullet.setActive(true);
          bullet.setVisible(true);
  
          bullet.setVelocityX(vx);
          bullet.setVelocityY(vy);        
      }
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
      this.body.enable=false;
      this.anims.play('elfa_death');
      this.on('animationcomplete', this.vanish);    
    }
    vanish(){
      this.setVisible(false);
    }
  
  }